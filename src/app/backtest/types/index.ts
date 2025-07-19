// types/index.ts
export interface Bot {
  botId: string;
  botName: string;
}

export interface Trade {
  tradeId?: string;
  botName?: string;
  symbol?: string;
  type?: string;
  direction?: string;
  price?: number | string;
  entryDate?: string;
  exitPrice?: number | string;
  stopLoss?: number | string;
  takeProfit?: number | string;
  positionSize?: string;
  profit?: number | string;
  maxDrawdown?: number | string;
  tradeDuration?: string;
  status?: string;
}

export interface BotRank {
  botId: string;
  botName: string;
  totalProfit: number;
  winRate: number;
  totalTrades: number;
}

export interface WinRateData {
  winTrades: number;
  lossTrades: number;
  totalValidTrades: number;
  winRate: string;
}

export interface Stats {
  totalProfit: string;
  winRate: string;
  maxDrawdown: string;
  totalTrades: number;
  profitFactor: string;
  averageWin: string;
  averageLoss: string;
  consecutiveWins: number;
  consecutiveLosses: number;
  sharpeRatio: string;
  tradingFrequency: string;
  averageTradeDuration: string;
  largestWin: string;
  largestLoss: string;
  expectancy: string;
  annualizedReturn: string;
  volatility: string;
  recoveryFactor: string;
  sortinoRatio: string;
  calmarRatio: string;
  winLossRatio: string;
  downsideDeviation: string;
  dailyVaR: string;
  maxConsecutiveWins: number;
  maxConsecutiveLosses: number;
  profitPerDay: string;
  riskOfRuin: string;
}

export interface ChartData {
  index: number;
  date: string;
  value: number;
  dailyChange: number;
  barFill: string;
}

export interface TradeDistribution {
  name: string;
  value: number;
  fill: string;
}

export interface MonthlyPerformance {
  month: string;
  performance: number;
  fill: string;
}

export type ChartType = "area" | "line" | "candle";
export type TimeFrame = "1W" | "1M" | "3M" | "1Y" | "ALL";
export type RiskLevel = "low" | "medium" | "high";
export type ActiveTab = "overview" | "trades" | "analytics" | "topBot";
