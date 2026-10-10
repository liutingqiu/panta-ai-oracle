// SPDX-License-Identifier: MIT

export type MarketStatus = 'OPEN' | 'RESOLVED' | 'CANCELLED';
export type PositionSide = 'YES' | 'NO';
export type TradeSignal = 'STRONG_BUY_YES' | 'BUY_YES' | 'NEUTRAL' | 'BUY_NO' | 'STRONG_BUY_NO';

export interface PantaMarket {
  id: string;
  title: string;
  category: 'Crypto' | 'AI' | 'Macro' | 'Tech' | 'Culture';
  yesPrice: number;        // e.g. 0.62 ($0.62 / 62% implied probability)
  noPrice: number;         // e.g. 0.38 ($0.38 / 38% implied probability)
  volume24h: number;       // in USD
  liquidity: number;       // total pool liquidity
  resolutionDate: string;  // ISO timestamp
  status: MarketStatus;
  creatorAddress: string;
  resolutionSource: string;
  description: string;
}

export interface AIPredictionAnalysis {
  marketId: string;
  aiProbabilityYes: number;   // 0.0 to 1.0
  marketImpliedYes: number;   // 0.0 to 1.0
  edge: number;               // aiProbabilityYes - marketImpliedYes
  confidence: number;         // 0.0 to 1.0
  signal: TradeSignal;
  recommendedPositionSize: number; // Kelly criterion fraction
  reasoning: string;
}

export interface TradeOrderRequest {
  marketId: string;
  side: PositionSide;
  amountQuote: number;       // e.g. 50 USDC
  slippageBps: number;       // e.g. 50 = 0.5%
  userPublicKey: string;
}

export interface TradeExecutionResult {
  txId: string;
  marketId: string;
  side: PositionSide;
  sharesPurchased: number;
  averageExecutionPrice: number;
  feePaid: number;
  timestamp: number;
}

export interface UserPosition {
  marketId: string;
  side: PositionSide;
  shares: number;
  avgEntryPrice: number;
  currentValue: number;
  unrealizedPnl: number;
  claimable: boolean;
}
