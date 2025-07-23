export interface TradingBot {
  id: string;
  strategy: string;
  symbol: string;
  volume: string;
  status: "HOẠT ĐỘNG" | "DỪNG" | "TẠM DỪNG";
  pnl: string;
  pnlValue: number;
  position: string;
  risk: string;
  riskLevel: "low" | "medium" | "high";
  actions: string[];
}

export interface DashboardStats {
  totalAssets: string;
  realizedPnl: string;
  activeTrades: string;
  winRate: string;
}

export interface AccountInfo {
  id: string;
  username: string;
  email: string;
  accountType: "VIP" | "Premium" | "Basic";
  joinDate: string;
  lastLogin: string;
  totalBalance: number;
  availableBalance: number;
  marginUsed: number;
  marginAvailable: number;
  totalPnL: number;
  dailyPnL: number;
  weeklyPnL: number;
  monthlyPnL: number;
  maxBots: number;
  activeBots: number;
  totalTrades: number;
  winRate: number;
  status: "active" | "suspended" | "pending";
  riskLevel: "conservative" | "moderate" | "aggressive";
  apiConnections: {
    exchange: string;
    status: "connected" | "disconnected" | "error";
    lastSync: string;
  }[];
}

export interface BotMetrics {
  totalBots: number;
  activeBots: number;
  pausedBots: number;
  errorBots: number;
  profitableBots: number;
  todayTrades: number;
  todayPnL: number;
  avgDailyPnL: number;
  bestPerformer: string;
  worstPerformer: string;
  totalVolume: number;
  successRate: number;
}

export interface BotTemplate {
  id: string;
  name: string;
  description: string;
  strategy: string;
  riskLevel: "low" | "medium" | "high";
  expectedReturn: string;
  timeframe: string;
  minCapital: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  popularity: number;
  tags: string[];
}
