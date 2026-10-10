# Panta AI Oracle & Prediction Market Terminal ⚡

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/Tests-6%2F6%20Passed-brightgreen)](tests/oracle.test.js)
[![Panta API](https://img.shields.io/badge/Panta%20API-v1.0-purple)](https://docs.panta.market/)
[![Live Terminal](https://img.shields.io/badge/Live%20Terminal-GitHub%20Pages-success)](https://liutingqiu.github.io/panta-ai-oracle/)

**Autonomous Prediction Market Scanner, Real-Time Edge Evaluator, and Trade Execution Agent built on Panta API & Solana.**

Submitted to the **Crypto World's Fair — Colosseum Hackathon | Panta API Sidetrack ($5,000 USDG Prize Pool)**.

---

## 🌟 Overview

Prediction markets are the ultimate truth layer for decentralized finance. Through the **Panta API**, developers can tap into core prediction market infrastructure on Solana — discovering markets, pricing contracts, and routing trades.

**Panta AI Oracle** supercharges this infrastructure with an autonomous intelligence layer:
1. **Market Scanner:** Polls active Panta pools across Crypto, AI Agents, Tech, and Macro events.
2. **Probability & Edge Evaluator:** Computes divergence between market-implied odds and model fair value ($\text{Edge} = P_{\text{model}} - P_{\text{market}}$).
3. **Kelly Criterion Allocator:** Dynamically sizes positions based on statistical edge and confidence scores while capping max drawdown risk ($\le 20\%$).
4. **Interactive Terminal:** Web3 dark-mode dashboard with live probability meters and one-click execution.

---

## 🌐 Live Interactive Terminal

Access the live trading terminal directly in your browser:  
👉 **[https://liutingqiu.github.io/panta-ai-oracle/](https://liutingqiu.github.io/panta-ai-oracle/)**

---

## 📦 Quick Start & Usage

```bash
git clone https://github.com/liutingqiu/panta-ai-oracle.git
cd panta-ai-oracle
npm install
npm test
```

### TypeScript / ESM Example

```typescript
import { PantaClient, PantaAIEvaluator } from 'panta-ai-oracle';

// 1. Initialize Panta API Client
const client = new PantaClient();
const markets = await client.getMarkets();

// 2. Scan and rank markets by highest edge
const opportunities = PantaAIEvaluator.scanOpportunities(markets);

for (const opp of opportunities) {
  console.log(`Market: ${opp.marketId}`);
  console.log(`Signal: ${opp.signal} (Edge: ${(opp.edge * 100).toFixed(1)}%)`);
  console.log(`Kelly Position: ${(opp.recommendedPositionSize * 100).toFixed(1)}%`);
  console.log(`Reasoning: ${opp.reasoning}\n`);
}

// 3. Execute simulated trade with 0.5% protocol fee calculation
const trade = await client.executeTrade({
  marketId: opportunities[0].marketId,
  side: 'YES',
  amountQuote: 100, // 100 USDC
  slippageBps: 50,
  userPublicKey: 'your-solana-wallet-pubkey'
});

console.log(`Executed: ${trade.txId} | Shares: ${trade.sharesPurchased.toFixed(2)}`);
```

---

## 🧪 Automated Test Suite

Run the unit tests covering market discovery, normalization, edge detection, Kelly allocation, and trade calculations:

```bash
node --test tests/oracle.test.js
```

Output:
```text
✔ 1. PantaClient discovers active markets with normalized probabilities (1.9ms)
✔ 2. PantaAIEvaluator computes valid edge and trading signals (0.7ms)
✔ 3. Kelly Criterion allocates within safe risk boundaries (<= 20%) (0.4ms)
✔ 4. Scanning and ranking detects highest mispricing opportunities first (0.5ms)
✔ 5. Trade execution calculator accurately applies 0.5% fee and pricing (0.3ms)
✔ 6. User position calculator computes exact unrealized PnL (0.2ms)

ℹ pass 6
ℹ fail 0
```

---

## 📖 Hackathon Documentation

Read the full project pitch deck, mathematical framework, and market impact analysis:  
👉 **[PITCH_DECK.md](PITCH_DECK.md)**

---

## 📄 License

Released under the [MIT License](LICENSE).
