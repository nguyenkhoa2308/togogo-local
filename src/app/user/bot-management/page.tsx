"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Settings,
  Search,
  Upload,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Target,
  Activity,
  Star,
  Zap,
  // Filter,
  // RefreshCw,
  X,
  ChevronDown,
  CheckIcon,
  Settings2,
  XCircle,
} from "lucide-react";

export default function BotManagement() {
  // const [botsState, setBotsState] = useState(bots);
  const [selectedBots, setSelectedBots] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusDropdown, setStatusDropDown] = useState(false);
  const [notification, setNotification] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [newBotName, setNewBotName] = useState("");

  const bots = [
    {
      id: 1,
      name: "VNINDEX-MOMENTUM",
      symbol: "VN30F-240X",
      description: "Bot momentum dành cho VN30F",
      status: "ACTIVE",
      pnl: "+5,200,000",
      pnlPercent: "+12.5%",
      position: "LONG 95%",
      volume: "5 HĐ",
      risk: "MEDIUM",
      trades: 156,
      winRate: 78.2,
      uptime: 98.5,
      isActive: true,
      lastUpdate: "15:42:32",
      strategy: "Momentum",
    },
    {
      id: 2,
      name: "HNX30F-MEANREV",
      symbol: "HNX30F-240X",
      description: "Bot mean reversion cho HNX30F",
      status: "ACTIVE",
      pnl: "+3,800,000",
      pnlPercent: "+8.7%",
      position: "SHORT 80%",
      volume: "3 HĐ",
      risk: "LOW",
      trades: 89,
      winRate: 71.9,
      uptime: 96.8,
      isActive: true,
      lastUpdate: "15:40:18",
      strategy: "Mean Reversion",
    },
    {
      id: 3,
      name: "ARBITRAGE-SPREAD",
      symbol: "VN30F+HNX30F",
      description: "Bot arbitrage spread trading",
      status: "ACTIVE",
      pnl: "+450,000",
      pnlPercent: "+2.1%",
      position: "SPREAD 75%",
      volume: "2 HĐ",
      risk: "HIGH",
      trades: 45,
      winRate: 84.4,
      uptime: 97.2,
      isActive: true,
      lastUpdate: "15:38:45",
      strategy: "Arbitrage",
    },
    {
      id: 4,
      name: "SCALPING-PRO",
      symbol: "VN30F-240X",
      description: "Bot scalping tần suất cao",
      status: "PAUSED",
      pnl: "-180,000",
      pnlPercent: "-1.2%",
      position: "FLAT",
      volume: "1 HĐ",
      risk: "MEDIUM",
      trades: 23,
      winRate: 65.2,
      uptime: 89.1,
      isActive: false,
      lastUpdate: "14:25:12",
      strategy: "Scalping",
    },
    {
      id: 5,
      name: "GRID-TRADER",
      symbol: "VN30F-240X",
      description: "Bot grid trading tự động",
      status: "ACTIVE",
      pnl: "+1,240,000",
      pnlPercent: "+5.8%",
      position: "GRID 1:950-980",
      volume: "4 HĐ",
      risk: "MEDIUM",
      trades: 78,
      winRate: 68.9,
      uptime: 94.3,
      isActive: true,
      lastUpdate: "15:41:55",
      strategy: "Grid Trading",
    },
    {
      id: 6,
      name: "TREND-FOLLOWER",
      symbol: "HNX30F-240X",
      description: "Bot theo xu hướng dài hạn",
      status: "ACTIVE",
      pnl: "+890,000",
      pnlPercent: "+4.2%",
      position: "SHORT 240.5",
      volume: "2 HĐ",
      risk: "LOW",
      trades: 34,
      winRate: 76.5,
      uptime: 99.1,
      isActive: true,
      lastUpdate: "15:39:22",
      strategy: "Trend Following",
    },
  ];

  const stats = [
    {
      label: "Tổng P&L hôm nay",
      value: "+₫10.4M",
      valueClass: "text-[#00e5a1]",
      sub: "47 giao dịch",
      subClass: "text-[#94a3b8]",
      icon: TrendingUp,
      textColor: "text-[#00e5a1]",
    },
    {
      label: "Tỷ lệ thắng",
      value: "76.8%",
      valueClass: "",
      sub: "Trung bình tuần",
      subClass: "text-[#94a3b8]",
      icon: Target,
      textColor: "text-cyan-500",
    },
    {
      label: "Bot hiệu quả nhất",
      value: "VNINDEX-MOMENTUM",
      valueClass: "text-lg",
      sub: "+12.5% ROI",
      subClass: "text-[#00e5a1]",
      icon: Star,
      textColor: "text-yellow-500",
    },

    {
      label: "Tổng volume",
      value: "17 HĐ",
      valueClass: "",
      sub: "24h qua",
      subClass: "text-[#94a3b8]",
      icon: Activity,
      textColor: "text-purple-500",
    },
  ];

  const statusOptions = [
    { value: "all", label: "Tất cả" },
    { value: "active", label: "Hoạt động" },
    { value: "paused", label: "Tạm dừng" },
  ];

  const filteredBots = bots.filter((bot) => {
    const matchSearch = bot.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && bot.status === "ACTIVE") ||
      (statusFilter === "paused" && bot.status === "PAUSED");
    return matchSearch && matchStatus;
  });

  const handleSelectBot = (id: number) => {
    setSelectedBots((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedBots(
      selectedBots.length === filteredBots.length
        ? []
        : filteredBots.map((b) => b.id)
    );
  };

  const handleBotAction = (id: number) => {
    filteredBots.forEach((bot) =>
      bot.id === id ? { ...bot, isActive: !bot.isActive } : bot
    );
  };

  const handleCreateBot = () => {
    setNotification(`Đã tạo bot mới: ${newBotName}`);
    setShowModal(false);
    setNewBotName("");
  };

  const handleSelectStatus = (status: string) => {
    setStatusFilter(status);
    setStatusDropDown(false);
  };

  const getLabelByValue = (
    options: { value: string; label: string }[],
    value: string
  ): string => {
    return options.find((opt) => opt.value === value)?.label || value;
  };

  // const activeBots = bots.filter((b) => b.status === "ACTIVE").length;
  // const pausedBots = bots.filter((b) => b.status === "PAUSED").length;

  return (
    <div className="w-full p-6 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">Bot Management</h1>
          <p className="text-sm text-[#94a3b8] mt-1">
            Quản lý bot giao dịch tự động
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-2 border border-[#00E5A1]/50 bg-[#1e293b]/30 text-[#00E5A1] rounded-md hover:bg-[#00e5a1]/10 text-xs flex items-center cursor-pointer font-bold">
            <Download className="w-4 h-4 mr-2" /> Template
          </button>
          <button className="px-3 py-2 border border-[#00E5A1]/50 bg-[#1e293b]/30 text-[#00E5A1] rounded-md hover:bg-[#00e5a1]/10 text-xs flex items-center cursor-pointer font-bold">
            <Upload className="w-4 h-4 mr-2" /> Import
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-2 bg-[#00E5A1] text-[#0a1529] rounded-md hover:bg-[#00D194] text-[#0A1529] text-xs flex items-center cursor-pointer font-bold"
          >
            <Plus className="w-4 h-4 mr-2" /> Tạo bot mới
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="mb-4 p-3 bg-green-200 text-green-800 rounded shadow">
          {notification}
        </div>
      )}

      {/* Statistic Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-[#0f172a] text-white flex flex-col gap-6 rounded-xl border border-[#64ffda14] p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#94a3b8]">{stat.label}</p>
                  <p className={`text font-bold ${stat.valueClass}`}>
                    {stat.value}
                  </p>
                  <p className={`text-xs ${stat.subClass}`}>{stat.sub}</p>
                </div>
                <Icon className={`w-7 h-7 ${stat.textColor}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <section className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <div className="bg-[#0f172a] text-white flex flex-col gap-6 rounded-xl border border-[#64ffda14] p-4">
            <div className="border-b border-[#64ffda14] p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-3">
                  <Zap className="w-7 h-7 text-[#00e5a1]" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      Danh sách Bot Trading
                    </h3>
                    <p className="text-[#94a3b8] text-sm">
                      Quản lý và theo dõi trạng thái bot
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#00e5a1] rounded-full animate-pulse"></div>
                  <span className="text-[#94a3b8] text-sm">
                    Cập nhật realtime
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 border-b border-[#64ffda14]">
              <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="relative flex-1 max-w-md">
                  <div className="relative">
                    <input
                      placeholder="Tìm kiếm bot..."
                      className="w-full h-9 pl-10 pr-3 rounded-md bg-[#1E293B] border border-[#64ffda14] text-sm text-white outline-none"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  </div>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      title="Xoá chuỗi tìm kiếm"
                    >
                      <XCircle size={16} className="opacity-50" />
                    </button>
                  )}
                </div>
                <div className="relative min-w-[150px]">
                  <button
                    onClick={() => setStatusDropDown(!statusDropdown)}
                    className="appearance-none outline-none flex justify-between items-center gap-3 bg-[#0F172A] w-full text-white text-sm px-3 py-1.5 rounded-md border border-[#64ffda14] transition-colors hover:bg-white/10"
                    title="Chọn trạng thái bot"
                  >
                    <div className="truncate">
                      <span className="mr-1">
                        {getLabelByValue(statusOptions, statusFilter)}
                      </span>
                    </div>
                    <ChevronDown
                      className={`size-4 shrink-0 transition-transform ${
                        statusDropdown ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {statusDropdown && (
                    <div className="absolute z-10 mt-1 w-full bg-[#0F172A] border border-white/10 rounded-md shadow-lg">
                      {statusOptions.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => handleSelectStatus(option.value)}
                          className={`block text-xs w-full text-left px-3 py-2 hover:bg-white/10 transition-colors ${
                            option.value === statusFilter ? "bg-white/5" : ""
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1 text-sm">
                              {option.label}
                            </div>

                            {option.value === statusFilter ? (
                              <CheckIcon className="w-4 h-4" />
                            ) : (
                              ""
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 flex-wrap">
                  {/* Toggle Advanced Filters Button */}
                  <button
                    // onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    className="flex-shrink-0 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1.5 text-sm cursor-pointer"
                  >
                    <Settings2
                      size={16}
                      // className={`${
                      //   // showAdvancedFilters ? "rotate-180" : ""
                      // } transition-transform duration-200`}
                    />
                    Bộ lọc
                    <ChevronDown
                      size={12}
                      // className={`${
                      //   // showAdvancedFilters ? "rotate-180" : ""
                      // } transition-transform duration-200`}
                    />
                  </button>

                  <button
                  // onClick={handleExport}
                  // disabled={isExporting}
                  //       className={`flex-shrink-0 px-3 py-2.5 justify-center
                  // ${
                  //   isExporting
                  //     ? "bg-blue-400 dark:bg-blue-700 cursor-not-allowed"
                  //     : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
                  // }
                  // text-white font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center`}
                  >
                    {/* {isExporting ? (
                      <RefreshCw size={18} className="animate-spin" />
                    ) : (
                      <Download size={18} />
                    )} */}
                  </button>

                  {/* Reset Filters Button */}
                  <button
                    // onClick={handleResetFilters}
                    className="flex-shrink-0 px-3 py-1.5 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1.5 text-sm cursor-pointer"
                  >
                    <X size={16} />
                    Reset
                  </button>
                </div>
              </div>
              {/* Bulk Actions */}
              {selectedBots.length > 0 && (
                <div className="mt-4 p-3 bg-[#334155]/30 rounded-lg border border-[#64ffda0a]">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-foreground">
                      {selectedBots.length} bot đã chọn
                    </span>
                    <div className="flex items-center space-x-2">
                      <button
                        className="px-3 py-2 bg-[#00E5A1] text-[#0a1529] rounded-md hover:bg-[#00D194] text-[#0A1529] text-xs flex items-center cursor-pointer font-bold"
                        // onClick={() => handleBulkAction("start")}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Khởi động
                      </button>
                      <button
                        className="px-3 py-2 bg-orange-600 text-[#0a1529] rounded-md hover:bg-orange-700 text-[#0A1529] text-xs flex items-center cursor-pointer font-bold"
                        // onClick={() => handleBulkAction("stop")}
                      >
                        <Pause className="w-4 h-4 mr-1" />
                        Tạm dừng
                      </button>
                      <button
                        className="px-3 py-2 bg-[#ef4444]/60 text-white rounded-md hover:bg-[#ef4444]/50 text-[#0A1529] text-xs flex items-center cursor-pointer font-bold"
                        // onClick={() => handleBulkAction("delete")}
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Xóa
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="hidden xl:block">
              <table className="w-full">
                <thead className="bg-[#1e293b]/30">
                  <tr>
                    <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide w-12">
                      <label className="inline-flex items-center cursor-pointer select-none relative">
                        <input
                          type="checkbox"
                          className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] outline-none bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          checked={
                            selectedBots.length === filteredBots.length &&
                            filteredBots.length > 0
                          }
                          onChange={() => handleSelectAll()}
                        />
                        {/* Lucide icon */}
                        <CheckIcon
                          className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                          strokeWidth={3}
                        />
                      </label>
                    </th>

                    <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Bot
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      P&L
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Hiệu suất
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Trạng thái
                    </th>
                    <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBots.map((bot) => (
                    <tr
                      className="border-b border-[#64ffda14] hover:bg-accent/20 transition-colors"
                      key={bot.id}
                    >
                      <td className="p-4">
                        <label className="inline-flex items-center cursor-pointer select-none relative">
                          <input
                            type="checkbox"
                            className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] outline-none bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            checked={selectedBots.includes(bot.id)}
                            onChange={() => handleSelectBot(bot.id)}
                          />
                          {/* Lucide icon */}
                          <CheckIcon
                            className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                            strokeWidth={3}
                          />
                        </label>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              bot.isActive
                                ? "bg-[#00e5a1] animate-pulse"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium text-white text-sm">
                              {bot.name}
                            </div>
                            <div className="text-xs text-[#94a3b8]">
                              {bot.symbol} • {bot.volume}
                            </div>
                            <div className="text-xs text-[#94a3b8]">
                              {bot.position}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <div
                            className={`font-semibold text-sm ${
                              bot.pnl.startsWith("+")
                                ? "text-[#00e5a1]"
                                : "text-[#ef4444]"
                            }`}
                          >
                            ₫{bot.pnl}
                          </div>
                          <div
                            className={`text-xs ${
                              bot.pnlPercent.startsWith("+")
                                ? "text-[#00e5a1]"
                                : "text-[#ef4444]"
                            }`}
                          >
                            {bot.pnlPercent}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-[#94a3b8]">Win:</span>
                            <div className="flex items-center space-x-2">
                              <div className="bg-[#1e293b] rounded-full h-1.5 w-12">
                             <div
                                  className="bg-[#00e5a1] h-1.5 rounded-full"
                                  style={{ width: `${bot.winRate}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-medium text-white">
                                {bot.winRate}%
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-[#94a3b8]">
                              Risk:
                            </span>
                            <span
                              className={`text-xs rounded-lg px-2 py-0.5 font-bold border ${
                                bot.risk.toLowerCase() === "low"
                                  ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                                  : bot.risk.toLowerCase() === "medium"
                                  ? "text-yellow-500 bg-[#f0b1001a] border-yellow-500/20"
                                  : "text-red-500 bg-[#fb2c361a] border-red-500/20"
                              }`}
                            >
                              {bot.risk}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-2">
                          <span
                            className={`border text-xs rounded-md px-2 py-0.5 font-bold ${
                              bot.isActive
                                ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                                : "bg-orange-500/10 text-orange-400 border-orange-500/20 "
                            }`}
                          >
                            {bot.status}
                          </span>
                          <div className="text-xs mt-1.5 text-[#94a3b8]">
                            {bot.trades} trades
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-1">
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                            title="Xem chi tiết"
                            // onClick={onClose}
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                            title="Chỉnh sửa"
                            // onClick={onClose}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          {!bot.isActive ? (
                            <button
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                              title="Bắt đầu bot"
                              // onClick={onClose}
                            >
                              <Play className="w-5 h-5 text-[#00e5a1]" />
                            </button>
                          ) : (
                            <button
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                              title="Dừng bot"
                              onClick={() => {
                                handleBotAction(bot.id);
                              }}
                            >
                              <Pause className="w-5 h-5 text-[#ef4444]" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="hidden lg:block xl:hidden">
              <table className="w-full">
                <thead className="bg-[#1e293b]/30">
                  <tr>
                    <th className="text-left p-3 text-xs font-medium text-[#94a3b8] uppercase tracking-wide w-10">
                      <label className="inline-flex items-center cursor-pointer select-none relative">
                        <input
                          type="checkbox"
                          className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] outline-none bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                          checked={
                            selectedBots.length === filteredBots.length &&
                            filteredBots.length > 0
                          }
                          onChange={() => handleSelectAll()}
                        />
                        {/* Lucide icon */}
                        <CheckIcon
                          className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                          strokeWidth={3}
                        />
                      </label>
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Bot
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      P&L
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Trạng thái
                    </th>
                    <th className="text-left p-3 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBots.map((bot) => (
                    <tr
                      className="border-b border-[#64ffda14] hover:bg-accent/20 transition-colors"
                      key={bot.id}
                    >
                      <td className="p-3">
                        <label className="inline-flex items-center cursor-pointer select-none relative">
                          <input
                            type="checkbox"
                            className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] outline-none bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            checked={selectedBots.includes(bot.id)}
                            onChange={() => handleSelectBot(bot.id)}
                          />
                          {/* Lucide icon */}
                          <CheckIcon
                            className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                            strokeWidth={3}
                          />
                        </label>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              bot.isActive
                                ? "bg-[#00e5a1] animate-pulse"
                                : "bg-gray-400"
                            }`}
                          ></div>
                          <div>
                            <div className="font-medium text-white text-sm">
                              {bot.name}
                            </div>
                            <div className="text-xs text-[#94a3b8]">
                              {bot.symbol}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div>
                          <div
                            className={`font-semibold text-sm ${
                              bot.pnl.startsWith("+")
                                ? "text-[#00e5a1]"
                                : "text-[#ef4444]"
                            }`}
                          >
                            ₫{bot.pnl}
                          </div>
                          <div
                            className={`text-xs ${
                              bot.pnlPercent.startsWith("+")
                                ? "text-[#00e5a1]"
                                : "text-[#ef4444]"
                            }`}
                          >
                            {bot.pnlPercent}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="space-y-2">
                          <span
                            className={`border text-xs rounded-md px-2 py-0.5 font-bold ${
                              bot.isActive
                                ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                                : "bg-orange-500/10 text-orange-400 border-orange-500/20 "
                            }`}
                          >
                            {bot.status}
                          </span>
                          <div className="text-xs mt-1.5 text-[#94a3b8]">
                            {bot.winRate} win
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-1">
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                            title="Xem chi tiết"
                            // onClick={onClose}
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                            title="Chỉnh sửa"
                            // onClick={onClose}
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          {!bot.isActive ? (
                            <button
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                              title="Bắt đầu bot"
                              // onClick={onClose}
                            >
                              <Play className="w-5 h-5 text-[#00e5a1]" />
                            </button>
                          ) : (
                            <button
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                              title="Dừng bot"
                              // onClick={onClose}
                            >
                              <Pause className="w-5 h-5 text-[#ef4444]" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="lg:hidden p-6 space-y-4">
              {filteredBots.map((bot) => (
                <div
                  className="text-white flex flex-col gap-6 rounded-xl border border-[#64ffda14] bg-[#334155]/20"
                  key={bot.id}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <label className="inline-flex items-center cursor-pointer select-none relative">
                          <input
                            type="checkbox"
                            className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] outline-none bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            checked={selectedBots.includes(bot.id)}
                            onChange={() => handleSelectBot(bot.id)}
                          />
                          {/* Lucide icon */}
                          <CheckIcon
                            className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                            strokeWidth={3}
                          />
                        </label>
                        <div className="w-2 h-2 rounded-full bg-[#00e5a1] animate-pulse"></div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            {bot.name}
                          </h4>
                          <div className="text-xs text-[#94a3b8]">
                            {bot.symbol}• {bot.position}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`border text-xs rounded-md px-2 py-0.5 font-bold ${
                          bot.isActive
                            ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                            : "bg-orange-500/10 text-orange-400 border-orange-500/20 "
                        }`}
                      >
                        {bot.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                      <div>
                        <span className="text-[#94a3b8] text-sm">P&amp;L</span>
                        <div
                          className={`font-semibold text-sm ${
                            bot.pnl.startsWith("+")
                              ? "text-[#00e5a1]"
                              : "text-[#ef4444]"
                          }`}
                        >
                          {bot.pnl}₫
                        </div>
                        <div
                          className={`text-sm ${
                            bot.pnlPercent.startsWith("+")
                              ? "text-[#00e5a1]"
                              : "text-[#ef4444]"
                          }`}
                        >
                          {bot.pnlPercent}
                        </div>
                      </div>
                      <div>
                        <span className="text-[#94a3b8] text-sm">
                          Hiệu suất
                        </span>
                        <div className="font-medium text-white mb-2">
                          {bot.winRate}% Win
                        </div>
                        <span
                          className={`text-sm rounded-lg px-2 py-1 font-bold border ${
                            bot.risk.toLowerCase() === "low"
                              ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                              : bot.risk.toLowerCase() === "medium"
                              ? "text-yellow-500 bg-[#f0b1001a] border-yellow-500/20"
                              : "text-red-500 bg-[#fb2c361a] border-red-500/20"
                          }`}
                        >
                          {bot.risk} Risk
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#94a3b8] text-sm">
                        Vị thế: {bot.position}
                      </span>
                      <span className="text-[#94a3b8] text-sm">
                        {bot.trades} trades
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="inline-flex items-center justify-center flex-1 whitespace-nowrap text-sm font-bold transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                        title="Xem chi tiết"
                        // onClick={onClose}
                      >
                        <Eye className="w-4 h-4 mr-2" /> Xem
                      </button>
                      <button
                        className="inline-flex items-center justify-center flex-1 whitespace-nowrap text-sm font-bold transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer"
                        title="Chỉnh sửa"
                        // onClick={onClose}
                      >
                        <Edit className="w-4 h-4 mr-2" /> Sửa
                      </button>
                      {!bot.isActive ? (
                        <button
                          className="inline-flex items-center justify-center flex-1 whitespace-nowrap text-sm font-bold transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer bg-[#00e5a1] text-black"
                          title="Bắt đầu bot"
                          // onClick={onClose}
                        >
                          <Play className="w-4 h-4 mr-2 text-black" /> Bắt đầu
                        </button>
                      ) : (
                        <button
                          className="inline-flex items-center justify-center flex-1 whitespace-nowrap text-sm font-bold transition-all p-2 rounded-md hover:bg-[#334155]/20 cursor-pointer bg-[#ef4444]/60"
                          title="Dừng bot"
                          // onClick={onClose}
                        >
                          <Pause className="w-4 h-4 mr-2" /> Tạm dừng
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-[#64ffda14] p-4">
              <div className="flex items-center justify-between text-sm text-[#94a3b8]">
                <span>Hiển thị 6 trong tổng số 6 bot</span>
                <div className="flex items-center space-x-4">
                  <span>
                    Hoạt động:{" "}
                    <span className="text-[#00e5a1] font-semibold">5</span>
                  </span>
                  <span>
                    Tạm dừng:{" "}
                    <span className="text-orange-500 font-semibold">5</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-[#0f172a] text-white flex flex-col gap-6 rounded-xl border border-[#64ffda14] p-6">
            <div className="border-b border-[#64ffda14] p-4">
              <h3 className="text-lg font-semibold text-white">Tổng quan</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Tổng số bot</span>
                <span className="text-white font-semibold">6</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Đang hoạt động</span>
                <span className="text-[#00e5a1] font-semibold">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Tạm dừng</span>
                <span className="text-orange-400 font-semibold">1</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8] text-sm">Avg Win Rate</span>
                  <span className="text-white font-semibold">74.6%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Total P&amp;L</span>
                <span className="text-[#00e5a1] font-semibold">+₫10.4M</span>
              </div>
            </div>
          </div>
          <div className="bg-[#0f172a] text-white flex flex-col gap-6 rounded-xl border border-[#64ffda14] p-6">
            <div className="border-b border-[#64ffda14] p-4">
              <h3 className="text-lg font-semibold text-white">Tổng quan</h3>
            </div>
            <div className="p-4 space-y-2 flex flex-col">
              <button
                // onClick={() => handleBotAction("Khởi động tất cả", "ALL")}
                className="p-4 border border-[#64ffda14] bg-[#1e293b]/30 rounded-md hover:bg-[#1e293b]/10 text-sm flex items-center cursor-pointer font-bold w-full"
              >
                <Play className="w-4 h-4 mr-4" /> Khởi động tất cả
              </button>
              <button
                // onClick={() => handleBotAction("Tạm dừng tất cả", "ALL")}
                className="p-4 border border-[#64ffda14] bg-[#1e293b]/30 rounded-md hover:bg-[#1e293b]/10 text-sm flex items-center cursor-pointer font-bold w-full"
              >
                <Pause className="w-4 h-4 mr-4" />
                Tạm dừng tất cả
              </button>
              <button
                // onClick={() => handleBotAction("Mở cài đặt chung", "ALL")}
                className="p-4 border border-[#64ffda14] bg-[#1e293b]/30 rounded-md hover:bg-[#1e293b]/10 text-sm flex items-center cursor-pointer font-bold w-full"
              >
                <Settings className="w-4 h-4 mr-4" />
                Cài đặt chung
              </button>
            </div>
          </div>
        </aside>
      </section>

      {/* Modal tạo bot */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Tạo bot mới</h2>
              <button onClick={() => setShowModal(false)} title="Đóng">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tên bot"
                value={newBotName}
                onChange={(e) => setNewBotName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                onClick={handleCreateBot}
                disabled={!newBotName.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Tạo bot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
