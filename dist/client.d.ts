import { PantaMarket, TradeOrderRequest, TradeExecutionResult, UserPosition } from './types.js';
export declare class PantaClient {
    private baseUrl;
    private apiKey?;
    constructor(options?: {
        baseUrl?: string;
        apiKey?: string;
    });
    /**
     * Fetches active markets from Panta API.
     * Falls back to high-fidelity mock markets if running offline or in demo mode.
     */
    getMarkets(): Promise<PantaMarket[]>;
    /**
     * Builds and validates a buy order on Panta markets.
     */
    executeTrade(request: TradeOrderRequest): Promise<TradeExecutionResult>;
    /**
     * Computes user position summary and unrealized PnL.
     */
    calculatePositionMetrics(position: {
        marketId: string;
        side: 'YES' | 'NO';
        shares: number;
        entryPrice: number;
    }, currentMarket: PantaMarket): UserPosition;
}
