# Panta AI Oracle: Autonomous Prediction Market Terminal & Edge Engine ⚡

> **Submitted to Crypto World's Fair — Colosseum Hackathon | Panta API Sidetrack ($5,000 USDG Prize Pool)**  
> **Live Interactive Terminal:** [https://liutingqiu.github.io/panta-ai-oracle/](https://liutingqiu.github.io/panta-ai-oracle/)  
> **Open Source GitHub Repository:** [https://github.com/liutingqiu/panta-ai-oracle](https://github.com/liutingqiu/panta-ai-oracle)  
> **Lead Engineer & Author:** Tingqiu Liu (`@liutingqiu`, `tianqi689@gmail.com`)

---

## 🎯 Executive Summary & The Problem

Prediction markets (such as Polymarket, Panta, and Kalshi) are rapidly becoming the global benchmark for crowd-sourced truth and forecasting. However, for everyday traders, developers, and algorithmic agents, two critical bottlenecks exist:
1. **The Intelligence Gap:** Prediction markets display crowd odds, but traders lack systematic, quantitative models to identify *when* odds are mathematically mispriced relative to fundamental data.
2. **Infrastructure Fragmentation:** Builders wanting to integrate prediction markets into trading terminals, AI agent workflows, or alert bots must handle custom transaction construction, orderbook parsing, and settlement logic from scratch.

---

## 💡 The Solution: Panta AI Oracle

**Panta AI Oracle** is an autonomous market intelligence terminal, edge evaluator, and execution agent built directly on top of the **Panta API** and Solana.

### Core Features:

### 1. Panta API Native Market Discovery & Order Routing
- Integrates seamlessly with the Panta API (`https://api.panta.market/v1/`): discovers active prediction pools, tracks real-time implied probability curves ($P_{\text{YES}}$ / $P_{\text{NO}}$), and monitors 24H volume and liquidity.
- Constructs fee-optimized Solana swap transactions for buying YES or NO outcome shares with automatic 0.5% fee quotes and slippage tolerance.

### 2. Multi-Factor AI Probability & Edge Valuation Engine
- Evaluates event outcomes using data-driven heuristic models across Crypto, AI Agents, Tech, and Macro categories.
- Computes the exact mathematical **Edge**:
  $$\text{Edge} = P_{\text{AI Model}} - P_{\text{Market Implied}}$$
- Generates actionable signals: `STRONG_BUY_YES`, `BUY_YES`, `NEUTRAL`, `BUY_NO`, `STRONG_BUY_NO`.

### 3. Quantitative Risk Management (Half-Kelly Criterion)
- Implements the mathematical **Kelly Criterion** for optimal capital growth:
  $$f^* = \frac{b \cdot p - q}{b}$$
- Automatically bounds position sizes to a safe conservative limit ($\le 20\%$ bankroll) to protect capital against tail variance.

### 4. Interactive Live Web Terminal & Position Tracker
- Deployed on **GitHub Pages** with zero runtime dependencies.
- Features real-time probability visualization bars, AI reasoning cards, and one-click trade simulation with instant Solana transaction generation.

---

## 🔬 Mathematical Framework

Given market implied odds $P_{\text{market}} = \text{yesPrice}$, and AI forecasted fair probability $P_{\text{model}}$:

1. **Expected Value ($EV$):**
   $$EV_{\text{YES}} = \frac{P_{\text{model}}}{\text{yesPrice}} - 1$$
2. **Kelly Fraction ($f^*$):**
   $$f^* = \frac{\left(\frac{1 - \text{yesPrice}}{\text{yesPrice}}\right) \cdot P_{\text{model}} - (1 - P_{\text{model}})}{\frac{1 - \text{yesPrice}}{\text{yesPrice}}}$$
3. **Execution Size:**
   $$\text{Allocation} = \text{Bankroll} \times \min(0.20, \max(0, 0.5 \cdot f^*))$$

---

## 🛠️ Architecture & Tech Stack

```text
panta-ai-oracle/
├── src/
│   ├── types.ts                   # Panta market interfaces, orders, AI analysis, signals
│   ├── client.ts                  # Panta API SDK client (discovery, trade execution, PnL)
│   ├── oracle/
│   │   └── evaluator.ts           # Multi-factor probability engine & Kelly allocator
│   └── index.ts                   # Main export barrel
├── tests/
│   └── oracle.test.js             # 6 automated unit tests (discovery, edge, Kelly, trades)
├── index.html                     # Live interactive trading terminal & visualizer
├── PITCH_DECK.md                  # Complete project pitch deck & presentation
└── README.md                      # Developer guide & API reference
```

- **SDK Runtime:** Node.js (ESM), TypeScript 5.6
- **Test Suite:** `node:test` + `node:assert/strict` (6/6 passed, 100% green)
- **Frontend:** Pure HTML5/CSS/JS (Lightweight, responsive, deployed on GitHub Pages)
- **Blockchain:** Solana Mainnet / Panta Protocol Router

---

## 🚀 Impact Potential on the Panta Ecosystem

1. **Bridging AI & Prediction Markets:** Demonstrates how autonomous agents can become active market participants and liquidity catalysts on Panta.
2. **Terminal Integrations:** Provides an embeddable TypeScript SDK that other builders can drop into their trading bots, Telegram bots, or DeFi dashboards.
3. **Increased Protocol Volume & Fees:** By surfacing mispriced opportunities, the agent drives informed trading volume, generating creator royalties and Panta protocol revenue.

---

## 🏆 Project Deliverables & Links

- **Live Interactive Terminal:** [https://liutingqiu.github.io/panta-ai-oracle/](https://liutingqiu.github.io/panta-ai-oracle/)
- **GitHub Repository:** [https://github.com/liutingqiu/panta-ai-oracle](https://github.com/liutingqiu/panta-ai-oracle)
- **Superteam Earn Profile:** [https://superteam.fun/earn/t/liutingqiu](https://superteam.fun/earn/t/liutingqiu)
- **Lead Developer Contact:** Tingqiu Liu (`tianqi689@gmail.com`) / GitHub: `liutingqiu`

---
*Built with ❤️ for Panta and the Solana Global Builder Community.*
