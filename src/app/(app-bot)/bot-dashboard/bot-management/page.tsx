// Refactored version: all custom components replaced by raw HTML + TailwindCSS
"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Trash2,
  Play,
  Pause,
  Settings,
  Search,
  MoreHorizontal,
  TrendingUp,
  Clock,
  Zap,
  Star,
  Activity,
  BarChart3,
  Crown,
  Shield,
  Download,
  Upload,
  Target,
} from "lucide-react";
import { TradingBot, BotMetrics, AccountInfo, BotTemplate } from "../types";

const tradingBots: TradingBot[] = [
  {
    id: "01",
    strategy: "VN30F_MOMENTUM",
    symbol: "VN30F2405",
    volume: "5 HỢP ĐỒNG",
    status: "HOẠT ĐỘNG",
    pnl: "+5,200,000",
    pnlValue: 5200000,
    position: "MUA DÀI 1,250.5",
    risk: "511: 5,200",
    riskLevel: "medium",
    actions: ["ĐÓNG", "SỬA"],
  },
  {
    id: "02",
    strategy: "HNX30F_MEANREV",
    symbol: "HNX30F2405",
    volume: "3 HỢP ĐỒNG",
    status: "HOẠT ĐỘNG",
    pnl: "+1,800,000",
    pnlValue: 1800000,
    position: "BÁN NGẮN 890.0",
    risk: "TR: 900",
    riskLevel: "low",
    actions: ["ĐÓNG", "SỬA"],
  },
  {
    id: "03",
    strategy: "ROBOT_ARBITRAGE",
    symbol: "VN30F/HNX30F",
    volume: "2 HỢP ĐỒNG",
    status: "HOẠT ĐỘNG",
    pnl: "+450,000",
    pnlValue: 450000,
    position: "SPREAD 12.5",
    risk: "511: 8.5",
    riskLevel: "high",
    actions: ["ĐÓNG", "SỬA"],
  },
];

const accountInfo: AccountInfo = {
  id: "acc_001",
  username: "trader_pro_vn",
  email: "trader@vnderivatives.com",
  accountType: "VIP",
  joinDate: "2024-01-15",
  lastLogin: "2024-07-15T08:30:00Z",
  totalBalance: 2500000000, // 2.5 billion VND
  availableBalance: 1850000000,
  marginUsed: 650000000,
  marginAvailable: 1200000000,
  totalPnL: 450000000,
  dailyPnL: 12500000,
  weeklyPnL: 85000000,
  monthlyPnL: 320000000,
  maxBots: 50,
  activeBots: 8,
  totalTrades: 2456,
  winRate: 78.5,
  status: "active",
  riskLevel: "moderate",
  apiConnections: [
    {
      exchange: "HOSE",
      status: "connected",
      lastSync: "2024-07-15T08:28:00Z",
    },
    {
      exchange: "HNX",
      status: "connected",
      lastSync: "2024-07-15T08:28:00Z",
    },
    {
      exchange: "UPCOM",
      status: "disconnected",
      lastSync: "2024-07-15T07:45:00Z",
    },
  ],
};

const botMetrics: BotMetrics = {
  totalBots: 12,
  activeBots: 8,
  pausedBots: 3,
  errorBots: 1,
  profitableBots: 9,
  todayTrades: 47,
  todayPnL: 12500000,
  avgDailyPnL: 8750000,
  bestPerformer: "VN30F_MOMENTUM",
  worstPerformer: "HNX30F_SCALPING",
  totalVolume: 1250000000,
  successRate: 78.5,
};

const botTemplates: BotTemplate[] = [
  {
    id: "template_001",
    name: "VN30F Momentum Pro",
    description:
      "Chiến lược momentum chuyên nghiệp cho VN30F với RSI và Volume analysis",
    strategy: "momentum",
    riskLevel: "medium",
    expectedReturn: "15-25%/tháng",
    timeframe: "15m-1h",
    minCapital: 100000000,
    difficulty: "intermediate",
    popularity: 95,
    tags: ["momentum", "vn30f", "popular", "tested"],
  },
  {
    id: "template_002",
    name: "HNX30F Mean Reversion",
    description: "Chiến lược mean reversion an toàn cho HNX30F",
    strategy: "mean-reversion",
    riskLevel: "low",
    expectedReturn: "8-12%/tháng",
    timeframe: "1h-4h",
    minCapital: 50000000,
    difficulty: "beginner",
    popularity: 87,
    tags: ["safe", "hnx30f", "beginner", "stable"],
  },
  {
    id: "template_003",
    name: "Arbitrage Master",
    description: "Bot arbitrage tự động giữa các sàn giao dịch",
    strategy: "arbitrage",
    riskLevel: "low",
    expectedReturn: "5-8%/tháng",
    timeframe: "1m-5m",
    minCapital: 200000000,
    difficulty: "advanced",
    popularity: 78,
    tags: ["arbitrage", "low-risk", "advanced", "multi-exchange"],
  },
  {
    id: "template_004",
    name: "Scalping Ultra",
    description: "Bot scalping tốc độ cao cho trader kinh nghiệm",
    strategy: "scalping",
    riskLevel: "high",
    expectedReturn: "20-40%/tháng",
    timeframe: "1m-15m",
    minCapital: 150000000,
    difficulty: "advanced",
    popularity: 82,
    tags: ["scalping", "high-frequency", "advanced", "profitable"],
  },
];

export default function BotManagement() {
  const [bots, setBots] = useState(tradingBots);
  const [selectedBots, setSelectedBots] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterStrategy, setFilterStrategy] = useState("all");
  const [sortBy, setSortBy] = useState("pnl");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [newBot, setNewBot] = useState({
    strategy: "",
    symbol: "",
    volume: "",
    riskLevel: "medium" as "low" | "medium" | "high",
    description: "",
  });
  const [tab, setTab] = useState("basic");

  const filteredBots = useMemo(() => {
    let filtered = bots.filter((bot) => {
      const matchesSearch =
        bot.strategy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || bot.status === filterStatus;
      const matchesStrategy =
        filterStrategy === "all" || bot.strategy.includes(filterStrategy);
      return matchesSearch && matchesStatus && matchesStrategy;
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "pnl":
          return b.pnlValue - a.pnlValue;
        case "volume":
          return b.volume.localeCompare(a.volume);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }, [bots, searchTerm, filterStatus, filterStrategy, sortBy]);

  const handleCreateBot = () => {
    const bot = {
      id: String(bots.length + 1).padStart(2, "0"),
      strategy: newBot.strategy,
      symbol: newBot.symbol,
      volume: newBot.volume,
      status: "TẠM DỪNG" as const,
      pnl: "+0",
      pnlValue: 0,
      position: "CHƯA CÓ VỊ THẾ",
      risk: "CHƯA THIẾT LẬP",
      riskLevel: newBot.riskLevel,
      actions: ["KHỞI ĐỘNG", "SỬA"],
    };
    setBots([...bots, bot]);
    setNewBot({
      strategy: "",
      symbol: "",
      volume: "",
      riskLevel: "medium",
      description: "",
    });
  };

  const handleToggleBot = (botId: string) => {
    setBots(
      bots.map((bot) =>
        bot.id === botId
          ? {
              ...bot,
              status: bot.status === "HOẠT ĐỘNG" ? "TẠM DỪNG" : "HOẠT ĐỘNG",
            }
          : bot
      )
    );
  };

  const handleBulkAction = (action: string) => {
    switch (action) {
      case "start":
        setBots(
          bots.map((bot) =>
            selectedBots.includes(bot.id)
              ? { ...bot, status: "HOẠT ĐỘNG" }
              : bot
          )
        );
        break;
      case "pause":
        setBots(
          bots.map((bot) =>
            selectedBots.includes(bot.id) ? { ...bot, status: "TẠM DỪNG" } : bot
          )
        );
        break;
      case "delete":
        setBots(bots.filter((bot) => !selectedBots.includes(bot.id)));
        break;
    }
    setSelectedBots([]);
  };

  const handleDeleteBot = (botId: string) => {
    setBots(bots.filter((bot) => bot.id !== botId));
  };

  const handleSelectBot = (botId: string) => {
    setSelectedBots((prev) =>
      prev.includes(botId)
        ? prev.filter((id) => id !== botId)
        : [...prev, botId]
    );
  };

  const handleSelectAll = () => {
    setSelectedBots(
      selectedBots.length === filteredBots.length
        ? []
        : filteredBots.map((bot) => bot.id)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "HOẠT ĐỘNG":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "DỪNG":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "TẠM DỪNG":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000000) {
      return `${(amount / 1000000000).toFixed(1)}B`;
    } else if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else {
      return `${amount.toLocaleString()}`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Account Overview và Bot Quick Stats*/}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 rounded-lg bg-gradient-to-br from-[#1a2332] to-[#0f1419] border border-slate-700/50 shadow p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold text-white">
                    {accountInfo.username}
                  </h2>
                  <span className="inline-block rounded px-2 py-1 text-xs font-semibold bg-gradient-to-r from-yellow-400 to-yellow-600 text-black">
                    <Crown className="w-3 h-3 mr-1 inline" />
                    {accountInfo.accountType}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{accountInfo.email}</p>
              </div>
            </div>
            <div className="text-right text-sm text-gray-400 space-x-2">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span>
                <span>Online</span>
              </span>
              <span>•</span>
              <span>Hoạt động 5 phút trước</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-gray-400 text-xs">Tổng tài sản</p>
              <p className="text-white font-semibold">
                {formatCurrency(accountInfo.totalBalance)}đ
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Tài sản khả dụng</p>
              <p className="text-green-400 font-semibold">
                {formatCurrency(accountInfo.availableBalance)}đ
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">P&L tháng này</p>
              <p className="text-green-400 font-semibold">
                +{formatCurrency(accountInfo.monthlyPnL)}đ
              </p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Tỷ lệ thắng</p>
              <p className="text-blue-400 font-semibold">
                {accountInfo.winRate}%
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-[#1a2332] border border-slate-700/50 shadow p-4">
          <h3 className="text-white flex items-center space-x-2 text-lg font-semibold mb-4">
            <Activity className="w-5 h-5" />
            <span>Bot Overview</span>
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-400">
              <span>Tổng số bot</span>
              <span className="text-white font-semibold">
                {botMetrics.totalBots}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Đang hoạt động</span>
              <span className="text-green-400 font-semibold">
                {botMetrics.activeBots}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Tạm dừng</span>
              <span className="text-yellow-400 font-semibold">
                {botMetrics.pausedBots}
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Lỗi</span>
              <span className="text-red-400 font-semibold">
                {botMetrics.errorBots}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-700 mt-2">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Giới hạn bot</span>
                <span className="text-white font-semibold">
                  {accountInfo.activeBots}/{accountInfo.maxBots}
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded h-2 mt-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-2"
                  style={{
                    width: `${
                      (accountInfo.activeBots / accountInfo.maxBots) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-lg bg-[#1a2332] border border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Hôm nay</p>
              <p className="text-green-400 font-semibold">
                +{formatCurrency(botMetrics.todayPnL)}đ
              </p>
              <p className="text-xs text-gray-500">
                {botMetrics.todayTrades} giao dịch
              </p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>

        <div className="rounded-lg bg-[#1a2332] border border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Tỷ lệ thành công</p>
              <p className="text-blue-400 font-semibold">
                {botMetrics.successRate}%
              </p>
              <p className="text-xs text-gray-500">Trung bình 7 ngày</p>
            </div>
            <Target className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="rounded-lg bg-[#1a2332] border border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Bot hiệu quả nhất</p>
              <p className="text-white font-semibold">
                {botMetrics.bestPerformer}
              </p>
              <p className="text-xs text-green-400">+15.2% hôm nay</p>
            </div>
            <Star className="w-8 h-8 text-yellow-400" />
          </div>
        </div>

        <div className="rounded-lg bg-[#1a2332] border border-slate-700/50 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Khối lượng giao dịch</p>
              <p className="text-white font-semibold">
                {formatCurrency(botMetrics.totalVolume)}đ
              </p>
              <p className="text-xs text-gray-500">30 ngày qua</p>
            </div>
            <BarChart3 className="w-8 h-8 text-purple-400" />
          </div>
        </div>
      </div>
      {/* Header with Actions */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Zap className="w-6 h-6 text-blue-400" />
            <span>Quản lý Bot Trading</span>
          </h1>
          <p className="text-gray-400 mt-1">
            Tạo, quản lý và giám sát các bot giao dịch tự động
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            className="px-4 py-2 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded-md flex items-center"
            onClick={() => setIsTemplateDialogOpen(true)}
          >
            <Download className="w-4 h-4 mr-2" />
            Template
          </button>
          <button className="px-4 py-2 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded-md flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button
            onClick={() => setIsCreateDialogOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tạo Bot Mới
          </button>
        </div>
      </div>
      {/* Search and Filters */}
      <div className="bg-[#1a2332] border border-slate-700/50 rounded-lg p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm bot theo tên hoặc chiến lược..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-md bg-[#0f1419] border border-slate-600 text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-40 px-3 py-2 rounded-md bg-[#0f1419] border border-slate-600 text-white"
              title="Lọc bot"
            >
              <option value="all">Tất cả</option>
              <option value="HOẠT ĐỘNG">Hoạt động</option>
              <option value="TẠM DỪNG">Tạm dừng</option>
              <option value="DỪNG">Dừng</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-40 px-3 py-2 rounded-md bg-[#0f1419] border border-slate-600 text-white"
              title="Lọc bot"
            >
              <option value="pnl">P&amp;L</option>
              <option value="volume">Khối lượng</option>
              <option value="status">Trạng thái</option>
            </select>

            <button
              onClick={() =>
                setViewMode(viewMode === "grid" ? "table" : "grid")
              }
              className="px-3 py-2 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded-md"
              title="Hiển thị biểu đồ"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="bg-[#1a2332] border border-slate-700/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-white font-medium">
              {selectedBots.length} bot đã chọn
            </span>
            {selectedBots.length === 0 ? (
              <button
                onClick={() => handleSelectAll()}
                className="px-3 py-1 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded"
              >
                Chọn tất cả
              </button>
            ) : (
              <button
                onClick={() => setSelectedBots([])}
                className="px-3 py-1 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded"
              >
                Bỏ chọn
              </button>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() =>
                selectedBots.length > 0 && handleBulkAction("start")
              }
              disabled={selectedBots.length === 0}
              className={`px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded flex items-center ${
                selectedBots.length > 0 ? "" : "opacity-50 cursor-not-allowed"
              }`}
            >
              <Play className="w-4 h-4 mr-1" /> Khởi động
            </button>
            <button
              onClick={() =>
                selectedBots.length > 0 && handleBulkAction("pause")
              }
              className={`px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded flex items-center ${
                selectedBots.length > 0 ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={selectedBots.length === 0}
            >
              <Pause className="w-4 h-4 mr-1" /> Tạm dừng
            </button>
            <button
              onClick={() =>
                selectedBots.length > 0 && handleBulkAction("delete")
              }
              className={`px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded flex items-center ${
                selectedBots.length > 0 ? "" : "opacity-50 cursor-not-allowed"
              }`}
              disabled={selectedBots.length === 0}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Xóa
            </button>
          </div>
        </div>
      </div>

      {/* Bot Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot, index) => (
          <div
            key={index}
            className="bg-[#1a2332] border border-slate-700/50 hover:border-blue-500/30 rounded-lg p-4 space-y-4 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedBots.includes(bot.id)}
                  onChange={() => handleSelectBot(bot.id)}
                  className="form-checkbox h-4 w-4 text-blue-500 border-slate-600 bg-[#0f1419]"
                  title="Checkbox"
                />
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    #{bot.id}
                  </span>
                </div>
                <div>
                  <div className="text-white text-sm font-semibold">
                    {bot.strategy}
                  </div>
                  <div className="text-gray-400 text-xs">
                    {bot.symbol} • {bot.volume}
                  </div>
                </div>
              </div>
              <button className="text-gray-400 hover:text-white" title="Button">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <span
                className={`text-xs px-2 py-1 rounded border ${getStatusColor(
                  bot.status
                )}`}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-current mr-1"></span>
                {bot.status}
              </span>
              <span className="text-xs text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                2h 15m
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">P&amp;L:</span>
                <span
                  className={`font-medium ${
                    bot.pnlValue >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {bot.pnl}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Vị thế:</span>
                <span className="text-white">{bot.position}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Rủi ro:</span>
                <span className={`${getRiskColor(bot.riskLevel)} font-medium`}>
                  {bot.riskLevel === "low"
                    ? "Thấp"
                    : bot.riskLevel === "medium"
                    ? "TB"
                    : "Cao"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-3 text-center pt-3 border-t border-slate-700/50 text-xs text-gray-400">
              <div>
                <div>Trades</div>
                <div className="text-white font-medium text-sm">47</div>
              </div>
              <div>
                <div>Win Rate</div>
                <div className="text-green-400 font-medium text-sm">78%</div>
              </div>
              <div>
                <div>Uptime</div>
                <div className="text-blue-400 font-medium text-sm">99.2%</div>
              </div>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleToggleBot(bot.id)}
                className={`flex-1 px-3 py-2 rounded text-sm font-medium flex items-center justify-center space-x-1 ${
                  bot.status === "HOẠT ĐỘNG"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }`}
              >
                {bot.status === "HOẠT ĐỘNG" ? (
                  <>
                    <Pause className="w-4 h-4" /> <span>Dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> <span>Khởi động</span>
                  </>
                )}
              </button>
              <button
                className="px-3 py-2 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded-md"
                title="Settings Button"
              >
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Create Bot Dialog */}
      {isCreateDialogOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="w-full max-w-2xl bg-[#1a2332] border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-semibold flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Tạo Bot Trading Mới</span>
              </h2>
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div>
              <div className="grid grid-cols-3 mb-4 bg-slate-800 text-center text-white rounded overflow-hidden">
                <button
                  className={`py-2 ${tab === "basic" ? "bg-slate-700" : ""}`}
                  onClick={() => setTab("basic")}
                >
                  Thông tin cơ bản
                </button>
                <button
                  className={`py-2 ${tab === "strategy" ? "bg-slate-700" : ""}`}
                  onClick={() => setTab("strategy")}
                >
                  Chiến lược
                </button>
                <button
                  className={`py-2 ${tab === "risk" ? "bg-slate-700" : ""}`}
                  onClick={() => setTab("risk")}
                >
                  Quản lý rủi ro
                </button>
              </div>

              {tab === "basic" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">
                        Tên chiến lược
                      </label>
                      <input
                        value={newBot.strategy}
                        onChange={(e) =>
                          setNewBot({ ...newBot, strategy: e.target.value })
                        }
                        placeholder="VD: VN30F_SCALPING"
                        className="w-full px-3 py-2 rounded bg-[#0f1419] border border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">
                        Mã phái sinh
                      </label>
                      <select
                        value={newBot.symbol}
                        onChange={(e) =>
                          setNewBot({ ...newBot, symbol: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded bg-[#0f1419] border border-slate-600 text-white"
                        title="Chọn mã"
                      >
                        <option value="">Chọn mã</option>
                        <option value="VN30F2405">VN30F2405</option>
                        <option value="HNX30F2405">HNX30F2405</option>
                        <option value="VN30F2406">VN30F2406</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">
                        Khối lượng
                      </label>
                      <input
                        value={newBot.volume}
                        onChange={(e) =>
                          setNewBot({ ...newBot, volume: e.target.value })
                        }
                        placeholder="VD: 5 HỢP ĐỒNG"
                        className="w-full px-3 py-2 rounded bg-[#0f1419] border border-slate-600 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm text-gray-400">
                        Mức độ rủi ro
                      </label>
                      <select
                        value={newBot.riskLevel}
                        onChange={(e) =>
                          setNewBot({
                            ...newBot,
                            riskLevel: e.target.value as
                              | "low"
                              | "medium"
                              | "high",
                          })
                        }
                        title="Chọn mức độ rủi ro"
                        className="w-full px-3 py-2 rounded bg-[#0f1419] border border-slate-600 text-white"
                      >
                        <option value="low">Thấp</option>
                        <option value="medium">Trung bình</option>
                        <option value="high">Cao</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm text-gray-400">Mô tả</label>
                    <textarea
                      value={newBot.description}
                      onChange={(e) =>
                        setNewBot({ ...newBot, description: e.target.value })
                      }
                      placeholder="Mô tả chiến lược và cách thức hoạt động..."
                      className="w-full px-3 py-2 rounded bg-[#0f1419] border border-slate-600 text-white"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {tab === "strategy" && (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-400">Cấu hình chiến lược chi tiết</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tính năng đang phát triển...
                  </p>
                </div>
              )}

              {tab === "risk" && (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-400">Thiết lập quản lý rủi ro</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Tính năng đang phát triển...
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-6">
              <button
                onClick={() => setIsCreateDialogOpen(false)}
                className="px-4 py-2 border border-slate-600 text-gray-300 hover:bg-slate-700 rounded"
              >
                Hủy
              </button>
              <button
                onClick={handleCreateBot}
                disabled={!newBot.strategy || !newBot.symbol || !newBot.volume}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
              >
                Tạo Bot
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Bot Templates Dialog */}
      {isTemplateDialogOpen && (
        <div className="fixed inset-0 z-999 bg-black/60 flex items-center justify-center">
          <div className="w-full max-w-5xl max-h-[80vh] overflow-y-auto bg-[#1a2332] border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white text-lg font-semibold flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Bot Templates</span>
              </h2>
              <button
                onClick={() => setIsTemplateDialogOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {botTemplates.map((template) => (
                <div
                  key={template.id}
                  className="bg-[#0f1419] border border-slate-600 rounded-lg p-4 hover:border-blue-500 cursor-pointer"
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setIsTemplateDialogOpen(false);
                    setIsCreateDialogOpen(true);
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-white font-bold text-xs ${
                          template.difficulty === "beginner"
                            ? "bg-green-600"
                            : template.difficulty === "intermediate"
                            ? "bg-yellow-600"
                            : "bg-red-600"
                        }`}
                      >
                        {template.difficulty === "beginner"
                          ? "B"
                          : template.difficulty === "intermediate"
                          ? "I"
                          : "A"}
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">
                          {template.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {template.expectedReturn}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{template.popularity}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-300 mb-2 line-clamp-2">
                    {template.description}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {template.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-slate-700 text-white px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Khung thời gian: {template.timeframe}</span>
                    <span>
                      Vốn tối thiểu: {formatCurrency(template.minCapital)}đ
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
