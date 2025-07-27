import { useState, useMemo } from "react";
import {
  Bot,
  Play,
  Pause,
  Settings,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreHorizontal,
  FileText,
  Shield,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CheckIcon,
} from "lucide-react";

// Extended bot data for pagination testing
const allBotData = [
  {
    id: 1,
    name: "ARBITRAGE_SPREAD",
    account: "TOGO_CLIENT_01",
    strategy: "Arbitrage Trading",
    status: "active",
    runtime: "4h 23m",
    trades: 15,
    pnl: "+₫4,350,000",
    pnlPercent: "+2.8%",
    winRate: "87.5%",
    contracts: 12,
    stopLoss: "-2.5%",
    lastAction: "2 phút trước",
  },
  {
    id: 2,
    name: "MOMENTUM_HUNTER",
    account: "TOGO_CLIENT_02",
    strategy: "Momentum Trading",
    status: "active",
    runtime: "2h 15m",
    trades: 8,
    pnl: "+₫2,450,000",
    pnlPercent: "+1.9%",
    winRate: "75.0%",
    contracts: 8,
    stopLoss: "-3.0%",
    lastAction: "5 phút trước",
  },
  {
    id: 3,
    name: "GRID_MASTER",
    account: "TOGO_CLIENT_03",
    strategy: "Grid Trading",
    status: "active",
    runtime: "6h 45m",
    trades: 23,
    pnl: "+₫1,850,000",
    pnlPercent: "+1.2%",
    winRate: "91.3%",
    contracts: 18,
    stopLoss: "-1.5%",
    lastAction: "1 phút trước",
  },
  {
    id: 4,
    name: "SCALPING_PRO",
    account: "TOGO_CLIENT_04",
    strategy: "Scalping",
    status: "paused",
    runtime: "0h 00m",
    trades: 0,
    pnl: "₫0",
    pnlPercent: "0.0%",
    winRate: "0.0%",
    contracts: 0,
    stopLoss: "-5.0%",
    lastAction: "25 phút trước",
  },
  {
    id: 5,
    name: "TREND_FOLLOWER",
    account: "TOGO_CLIENT_05",
    strategy: "Trend Following",
    status: "active",
    runtime: "3h 12m",
    trades: 12,
    pnl: "-₫850,000",
    pnlPercent: "-0.5%",
    winRate: "66.7%",
    contracts: 6,
    stopLoss: "-4.0%",
    lastAction: "8 phút trước",
  },
  {
    id: 6,
    name: "DCA_MASTER",
    account: "TOGO_CLIENT_06",
    strategy: "DCA Strategy",
    status: "active",
    runtime: "8h 30m",
    trades: 45,
    pnl: "+₫3,200,000",
    pnlPercent: "+2.1%",
    winRate: "84.4%",
    contracts: 25,
    stopLoss: "-2.0%",
    lastAction: "3 phút trước",
  },
  {
    id: 7,
    name: "FUTURES_HUNTER",
    account: "TOGO_CLIENT_07",
    strategy: "Futures Trading",
    status: "error",
    runtime: "0h 00m",
    trades: 0,
    pnl: "-₫200,000",
    pnlPercent: "-0.1%",
    winRate: "0.0%",
    contracts: 0,
    stopLoss: "-6.0%",
    lastAction: "1 giờ trước",
  },
  {
    id: 8,
    name: "SWING_TRADER",
    account: "TOGO_CLIENT_08",
    strategy: "Swing Trading",
    status: "active",
    runtime: "12h 05m",
    trades: 7,
    pnl: "+₫5,600,000",
    pnlPercent: "+3.2%",
    winRate: "85.7%",
    contracts: 4,
    stopLoss: "-3.5%",
    lastAction: "15 phút trước",
  },
  {
    id: 9,
    name: "OPTIONS_PRO",
    account: "TOGO_CLIENT_09",
    strategy: "Options Trading",
    status: "paused",
    runtime: "0h 00m",
    trades: 0,
    pnl: "₫0",
    pnlPercent: "0.0%",
    winRate: "0.0%",
    contracts: 0,
    stopLoss: "-7.0%",
    lastAction: "45 phút trước",
  },
  {
    id: 10,
    name: "CRYPTO_ARBITRAGE",
    account: "TOGO_CLIENT_10",
    strategy: "Crypto Arbitrage",
    status: "active",
    runtime: "5h 20m",
    trades: 28,
    pnl: "+₫2,890,000",
    pnlPercent: "+1.8%",
    winRate: "89.3%",
    contracts: 16,
    stopLoss: "-2.2%",
    lastAction: "6 phút trước",
  },
  {
    id: 11,
    name: "MEAN_REVERSION",
    account: "TOGO_CLIENT_11",
    strategy: "Mean Reversion",
    status: "active",
    runtime: "9h 15m",
    trades: 18,
    pnl: "+₫1,450,000",
    pnlPercent: "+1.0%",
    winRate: "72.2%",
    contracts: 9,
    stopLoss: "-3.8%",
    lastAction: "12 phút trước",
  },
  {
    id: 12,
    name: "NEWS_TRADER",
    account: "TOGO_CLIENT_12",
    strategy: "News Trading",
    status: "paused",
    runtime: "0h 00m",
    trades: 0,
    pnl: "₫0",
    pnlPercent: "0.0%",
    winRate: "0.0%",
    contracts: 0,
    stopLoss: "-8.0%",
    lastAction: "2 giờ trước",
  },
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <span className="inline-flex items-center justify-between gap-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-1 text-xs font-medium">
          <CheckCircle className="w-3 h-3" />
          Hoạt Động
        </span>
      );
    case "paused":
      return (
        <span className="inline-flex items-center justify-between gap-2 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-2 py-1 text-xs font-medium">
          <Pause className="w-3 h-3" />
          Tạm Dừng
        </span>
      );
    case "error":
      return (
        <span className="inline-flex items-center justify-between gap-2 rounded-full bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 text-xs font-medium">
          <AlertTriangle className="w-3 h-3" />
          Lỗi
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center justify-between rounded-full bg-secondary text-secondary-foreground px-2 py-1 text-xs font-medium">
          Không Xác Định
        </span>
      );
  }
};

const getStopLossBadge = (stopLoss: string) => {
  const percentage = parseFloat(stopLoss.replace("%", "").replace("-", ""));

  if (percentage <= 2) {
    return (
      <span className="inline-flex items-center rounded-full bg-green-500/10 text-green-400 border border-green-500/30 px-2 py-1 text-xs font-medium">
        {stopLoss}
      </span>
    );
  } else if (percentage <= 5) {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 px-2 py-1 text-xs font-medium">
        {stopLoss}
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center rounded-full bg-red-500/10 text-red-400 border border-red-500/30 px-2 py-1 text-xs font-medium">
        {stopLoss}
      </span>
    );
  }
};

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "active", label: "Hoạt Động" },
  { value: "paused", label: "Tạm Dừng" },
  { value: "error", label: "Lỗi" },
];

export default function BotsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter and search logic
  const filteredBots = useMemo(() => {
    return allBotData.filter((bot) => {
      const matchesSearch =
        bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bot.strategy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || bot.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredBots.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBots = filteredBots.slice(startIndex, endIndex);

  // Reset to first page when filters change
  const handleFilterChange = (newFilter: string) => {
    setStatusFilter(newFilter);
    setStatusDropdown(false);
    setCurrentPage(1);
  };

  const handleSearchChange = (newSearch: string) => {
    setSearchTerm(newSearch);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (newItemsPerPage: string) => {
    setItemsPerPage(parseInt(newItemsPerPage));
    setCurrentPage(1);
  };

  const getLabelByValue = (
    options: { value: string; label: string }[],
    value: string
  ): string => {
    return options.find((opt) => opt.value === value)?.label || value;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  // Calculate totals for summary
  const totalContracts = allBotData.reduce(
    (sum, bot) => sum + bot.contracts,
    0
  );

  return (
    <div className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-2 hover:shadow-lg transition-all duration-300 ease-in-out border-[#64ffda14]">
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-[#00e5a1]" />
            <div>
              <h3 className="text-white font-semibold leading-none tracking-tight">
                Theo dõi bot
              </h3>
              <p className="text-xs text-[#94a3b8] mt-1">
                Theo dõi hiệu suất, trạng thái và quản lý rủi ro của tất cả bot
                trading
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#64ffda14] bg-background px-2 py-1 text-xs font-medium text-white">
              <Clock className="w-3 h-3" />
              Cập nhật mỗi 30s
            </span>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Tìm kiếm bot, tài khoản hoặc chiến lược..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-[#64ffda14] px-10 py-2 text-xs placeholder:text-[#94a3b8] outline-none"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setStatusDropdown(!statusDropdown)}
              className="appearance-none outline-none flex justify-between items-center gap-3 bg-[#0F172A] w-[180px] h-10 text-[#94a3b8] text-sm px-3 py-1.5 rounded-md border border-[#64ffda14] transition-colors"
              title="Chọn trạng thái bot"
            >
              <div className="truncate">
                <span className="mr-1">
                  {getLabelByValue(statusOptions, statusFilter)}
                </span>
              </div>
              <Filter className="w-4 h-4 text-[#94a3b8] pointer-events-none" />
            </button>

            {statusDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-[#0F172A] border border-white/10 rounded-md shadow-lg">
                {statusOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleFilterChange(option.value)}
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

          <div className="relative">
            <select
              value={itemsPerPage.toString()}
              onChange={(e) => handleItemsPerPageChange(e.target.value)}
              className="flex h-10 w-[130px] items-center justify-between rounded-md border border-[#64ffda14] px-3 py-2 text-sm text-[#94a3b8] placeholder:text-[#94a3b8] outline-none appearance-none cursor-pointer"
            >
              <option value="5">5 / trang</option>
              <option value="10">10 / trang</option>
              <option value="20">20 / trang</option>
              <option value="50">50 / trang</option>
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-sm text-[#94a3b8] mt-2">
          <span>
            Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredBots.length)}{" "}
            trong số {filteredBots.length} bot
          </span>
          {searchTerm && <span>Kết quả tìm kiếm cho "{searchTerm}"</span>}
        </div>
      </div>

      <div className="p-6 pt-0">
        <div className="h-full min-h-[400px] overflow-auto">
          <table className="w-full table-auto caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b border-[#64ffda14] bg-[#1e293b]/30 transition-colors">
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Tên Bot
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Tài Khoản
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Chiến Lược
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Trạng Thái
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Thời Gian Chạy
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Giao Dịch
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  P&L
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Tỷ Lệ Thắng
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Số Hợp Đồng
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Cắt Lỗ
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Hành Động Cuối
                </th>
                <th className="px-4 py-3 text-left align-middle text-[#94a3b8] text-sm">
                  Thao Tác
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {currentBots.length > 0 ? (
                currentBots.map((bot) => (
                  <tr
                    key={bot.id}
                    className="border-b border-[#64ffda14]/30 hover:bg-[#334155]/20 transition-colors"
                  >
                    <td className="px-4 py-3 align-middle break-words w-[220px]">
                      <div className="flex items-start gap-2">
                        <Bot className="w-4 h-4 text-[#94a3b8]" />
                        <span className="text-sm font-medium">{bot.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle break-words max-w-[150px]">
                      <span className="inline-flex items-center rounded-full border border-[#64ffda14] bg-background px-2 py-1 text-xs font-medium text-white">
                        {bot.account}
                      </span>
                    </td>
                    <td className="px-4 py-3 align-middle text-sm text-[#94a3b8] break-words max-w-[180px]">
                      {bot.strategy}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {getStatusBadge(bot.status)}
                    </td>
                    <td className="px-4 py-3 align-middle text-sm font-medium">
                      {bot.runtime}
                    </td>
                    <td className="px-4 py-3 align-middle text-sm font-medium">
                      {bot.trades}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="text-sm font-medium">
                        <div
                          className={`${
                            bot.pnl.startsWith("+")
                              ? "text-green-400"
                              : bot.pnl.startsWith("-")
                              ? "text-red-400"
                              : "text-[#94a3b8]"
                          }`}
                        >
                          {bot.pnl.slice(1)}
                        </div>
                        <div
                          className={`text-xs ${
                            bot.pnlPercent.startsWith("+")
                              ? "text-green-400"
                              : bot.pnlPercent.startsWith("-")
                              ? "text-red-400"
                              : "text-[#94a3b8]"
                          }`}
                        >
                          {bot.pnlPercent}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 align-middle text-sm font-medium">
                      {bot.winRate}
                    </td>
                    <td className="px-4 py-3 align-middle text-sm font-medium">
                      {bot.contracts}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      {getStopLossBadge(bot.stopLoss)}
                    </td>
                    <td className="px-4 py-3 align-middle text-xs text-[#94a3b8] break-words max-w-[120px]">
                      {bot.lastAction}
                    </td>
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-1">
                        {bot.status === "active" ? (
                          <button
                            className="inline-flex items-center justify-center rounded-md border border-[#ef4444]/10 bg-[#ef4444]/10 h-7 w-7 p-0 text-sm text-[#ef4444] font-medium transition-colors hover:bg-[#ef4444]/20 cursor-pointer"
                            title="Dừng lại"
                          >
                            <Pause className="w-3 h-3" />
                          </button>
                        ) : (
                          <button
                            className="inline-flex items-center justify-center rounded-md border border-[#64ffda14] bg-[#1e293b]/30 h-7 w-7 p-0 text-sm text-[#00E5A1] font-medium transition-colors hover:bg-[#00e5a1]/10 cursor-pointer"
                            title="Chạy"
                          >
                            <Play className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          className="inline-flex items-center justify-center rounded-md border border-[#64ffda14] bg-[#1e293b]/30 h-7 w-7 p-0 text-sm text-[#00E5A1] font-medium transition-colors hover:bg-[#00e5a1]/10 cursor-pointer"
                          title="Cài đặt"
                        >
                          <Settings className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="p-8 text-center text-[#94a3b8]">
                    {searchTerm || statusFilter !== "all"
                      ? "Không tìm thấy bot nào phù hợp với bộ lọc"
                      : "Không có bot nào"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-[#94a3b8]">
              Trang {currentPage} / {totalPages}
            </div>

            <nav className="mx-auto flex w-full justify-center">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none border border-[#64ffda14] h-10 px-4 py-2 gap-1 pl-2.5 select-none ${
                    currentPage === 1
                      ? "pointer-events-none opacity-50 text-[#94a3b8]"
                      : "hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer"
                  }`}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Trước</span>
                </button>

                {getPageNumbers().map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none border border-[#64ffda14] h-10 w-10 cursor-pointer select-none ${
                      currentPage === pageNum
                        ? "border border-input bg-[#00e5a1]/30 hover:bg-[#00e5a1]/40"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <span className="flex h-9 w-9 items-center justify-center">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More pages</span>
                  </span>
                )}

                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none border border-[#64ffda14] h-10 px-4 py-2 gap-1 pr-2.5 select-none ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50 text-[#94a3b8]"
                      : "hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer"
                  }`}
                >
                  <span>Sau</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
        )}

        {/* Summary Footer */}
        <div className="mt-4 pt-4 border-t border-[#64ffda14]">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-xs text-[#94a3b8]">Tổng Bot</div>
              <div className="font-medium text-foreground">
                {allBotData.length}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#94a3b8]">Đang Hoạt Động</div>
              <div className="font-medium text-green-400">
                {allBotData.filter((bot) => bot.status === "active").length}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#94a3b8]">Tạm Dừng</div>
              <div className="font-medium text-yellow-400">
                {allBotData.filter((bot) => bot.status === "paused").length}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#94a3b8]">Lỗi</div>
              <div className="font-medium text-red-400">
                {allBotData.filter((bot) => bot.status === "error").length}
              </div>
            </div>
            <div>
              <div className="text-xs text-[#94a3b8]">Tổng Hợp Đồng</div>
              <div className="font-medium text-foreground">
                {totalContracts}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
