export type MarketStatus = 'OPEN' | 'RESOLVED' | 'CANCELLED';
export type PositionSide = 'YES' | 'NO';
export type TradeSignal = 'STRONG_BUY_YES' | 'BUY_YES' | 'NEUTRAL' | 'BUY_NO' | 'STRONG_BUY_NO';
export interface PantaMarket {
    id: string;
    title: string;
    category: 'Crypto' | 'AI' | 'Macro' | 'Tech' | 'Culture';
    yesPrice: number;
    noPrice: number;
    volume24h: number;
    liquidity: number;
    resolutionDate: string;
    status: MarketStatus;
    creatorAddress: string;
    resolutionSource: string;
    description: string;
}
export interface AIPredictionAnalysis {
    marketId: string;
    aiProbabilityYes: number;
    marketImpliedYes: number;
    edge: number;
    confidence: number;
    signal: TradeSignal;
    recommendedPositionSize: number;
    reasoning: string;
}
export interface TradeOrderRequest {
    marketId: string;
    side: PositionSide;
    amountQuote: number;
    slippageBps: number;
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
