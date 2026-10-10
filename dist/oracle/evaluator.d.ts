import { PantaMarket, AIPredictionAnalysis } from '../types.js';
export declare class PantaAIEvaluator {
    /**
     * Evaluates a Panta market against multi-factor data models and computes Kelly optimal allocation.
     */
    static evaluateMarket(market: PantaMarket): AIPredictionAnalysis;
    /**
     * Scans a batch of Panta markets and ranks them by absolute trading edge.
     */
    static scanOpportunities(markets: PantaMarket[]): AIPredictionAnalysis[];
}
