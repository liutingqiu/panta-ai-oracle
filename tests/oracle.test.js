// SPDX-License-Identifier: MIT
import test from 'node:test';
import assert from 'node:assert/strict';
import { PantaClient, PantaAIEvaluator } from '../dist/index.js';

test('1. PantaClient discovers active markets with normalized probabilities', async () => {
  const client = new PantaClient();
  const markets = await client.getMarkets();

  assert.ok(markets.length >= 4, 'Should return at least 4 active markets');
  for (const m of markets) {
    assert.ok(m.id && m.title, 'Market must have id and title');
    assert.ok(m.yesPrice > 0 && m.yesPrice < 1, 'YES price must be between 0 and 1');
    assert.ok(m.noPrice > 0 && m.noPrice < 1, 'NO price must be between 0 and 1');
    assert.equal(Math.round((m.yesPrice + m.noPrice) * 100) / 100, 1.0, 'YES + NO price must sum to 1.0');
    assert.ok(m.liquidity > 0, 'Liquidity must be positive');
  }
});

test('2. PantaAIEvaluator computes valid edge and trading signals', async () => {
  const client = new PantaClient();
  const markets = await client.getMarkets();

  const solMarket = markets.find(m => m.id === 'mkt-sol-1000-2026');
  assert.ok(solMarket);

  const analysis = PantaAIEvaluator.evaluateMarket(solMarket);
  assert.equal(analysis.marketId, solMarket.id);
  assert.equal(analysis.marketImpliedYes, solMarket.yesPrice);
  assert.equal(Math.round((analysis.aiProbabilityYes - analysis.marketImpliedYes) * 1000) / 1000, analysis.edge);
  assert.ok(analysis.confidence >= 0.5 && analysis.confidence <= 1.0);
  assert.equal(analysis.signal, 'STRONG_BUY_YES');
  assert.ok(analysis.recommendedPositionSize > 0, 'Kelly allocation must be positive for positive edge');
});

test('3. Kelly Criterion allocates within safe risk boundaries (<= 20%)', async () => {
  const client = new PantaClient();
  const markets = await client.getMarkets();

  for (const m of markets) {
    const analysis = PantaAIEvaluator.evaluateMarket(m);
    assert.ok(analysis.recommendedPositionSize >= 0, 'Kelly size cannot be negative');
    assert.ok(analysis.recommendedPositionSize <= 0.20, 'Half-Kelly must be capped at 20% max bankroll');
  }
});

test('4. Scanning and ranking detects highest mispricing opportunities first', async () => {
  const client = new PantaClient();
  const markets = await client.getMarkets();

  const ranked = PantaAIEvaluator.scanOpportunities(markets);
  assert.equal(ranked.length, markets.length);

  // Assert descending order of absolute edge
  for (let i = 1; i < ranked.length; i++) {
    assert.ok(Math.abs(ranked[i - 1].edge) >= Math.abs(ranked[i].edge), 'Must be sorted by descending absolute edge');
  }
});

test('5. Trade execution calculator accurately applies 0.5% fee and pricing', async () => {
  const client = new PantaClient();
  const trade = await client.executeTrade({
    marketId: 'mkt-sol-1000-2026',
    side: 'YES',
    amountQuote: 100, // 100 USDC
    slippageBps: 50,
    userPublicKey: '7f94ed44d4044a6989775235c68f8375'
  });

  assert.equal(trade.marketId, 'mkt-sol-1000-2026');
  assert.equal(trade.side, 'YES');
  assert.equal(trade.feePaid, 0.5); // 0.5% of 100
  const expectedShares = 99.5 / 0.38;
  assert.ok(Math.abs(trade.sharesPurchased - expectedShares) < 1e-4);
  assert.ok(trade.txId.startsWith('tx_panta_'));
});

test('6. User position calculator computes exact unrealized PnL', async () => {
  const client = new PantaClient();
  const markets = await client.getMarkets();
  const m = markets[0];

  const pos = client.calculatePositionMetrics({
    marketId: m.id,
    side: 'YES',
    shares: 200,
    entryPrice: 0.30
  }, m);

  assert.equal(pos.marketId, m.id);
  assert.equal(pos.shares, 200);
  assert.equal(pos.avgEntryPrice, 0.30);
  assert.equal(pos.currentValue, 200 * m.yesPrice); // 200 * 0.38 = 76
  assert.equal(pos.unrealizedPnl, (200 * m.yesPrice) - (200 * 0.30)); // 76 - 60 = 16
  assert.equal(pos.claimable, false); // status is OPEN
});
