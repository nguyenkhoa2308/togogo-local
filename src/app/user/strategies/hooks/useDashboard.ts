// hooks/useDashboard.ts - FIXED VERSION
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Bot,
  Trade,
  BotRank,
  WinRateData,
  Stats,
  ActiveTab,
  TimeFrame,
  ChartType,
  RiskLevel,
} from "../types";
import { ApiService } from "../services/api";
import { StatsCalculator } from "../utils/statsCalculator";
import { ChartDataGenerator } from "../utils/chartDataGenerator";
import { startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

// Define the expected structure for the API response for bot rankings
interface BotRankingApiResponse {
  botId: string;
  botName: string;
  totalProfit: number;
  totalTrades: number;
}

export const useDashboard = () => {
  // State declarations
  const [bots, setBots] = useState<Bot[]>([]);
  const [selectedBotId, setSelectedBotId] = useState<string>("");
  const [trades, setTrades] = useState<Trade[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>("overview");
  const [timeframe, setTimeframe] = useState<TimeFrame>("1M");
  const [statsExpanded, setStatsExpanded] = useState(false);
  const [loadingRankings, setLoadingRankings] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;
  const [hasMoreTrades, setHasMoreTrades] = useState(false);
  const [totalTrades, setTotalTrades] = useState<number>(0);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState<string>("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [chartType, setChartType] = useState<ChartType>("area");
  const [showAdvancedStats, setShowAdvancedStats] = useState(false);
  const [riskLevel, setRiskLevel] = useState<RiskLevel>("medium");
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [botRankingsData, setBotRankingsData] = useState<BotRank[]>([]);
  const [profitToday, setProfitToday] = useState<number>(0);
  const [profitYesterday, setProfitYesterday] = useState<number>(0);
  const [profitLastWeek, setProfitLastWeek] = useState<number>(0);
  const [profitLastMonth, setProfitLastMonth] = useState<number>(0);
  const [winRateData, setWinRateData] = useState<WinRateData>({
    winTrades: 0,
    lossTrades: 0,
    totalValidTrades: 0,
    winRate: "0.00%",
  });
  const [allTrades, setAllTrades] = useState<Trade[]>([]);
  const [rankingTimeframe, setRankingTimeframe] = useState("all");
  const [filterMode, setFilterMode] = useState<"week" | "all">("week");
  const [selectedBotType, setSelectedBotType] = useState<string>("");

  const theme = "dark"; // Placeholder for theme

  // Fetch bots from API
  const loadBots = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedBots = await ApiService.loadBots();
      setBots(fetchedBots);
      // Select the first bot by default if available
      if (fetchedBots.length > 0) {
        setSelectedBotId(fetchedBots[0].botId);
      }
    } catch (err) {
      setError("Failed to load bots.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // FIXED: Fetch ALL trades (all pages) for selected bot, with filters
  const fetchAllTrades = useCallback(async () => {
    if (!selectedBotId) return;
    setLoading(true);
    setError(null);
    try {
      let allFetchedTrades: Trade[] = [];
      let pageIndex = 0;
      const pageSize = 1000; // Đặt nhỏ để tránh backend giới hạn
      let hasMore = true;
      while (hasMore) {
        const response = await ApiService.fetchTrades({
          botId: selectedBotId,
          pageIndex,
          pageSize,
          type: selectedTypeFilter,
          status: selectedStatusFilter,
          startDate: startDateFilter,
          endDate: endDateFilter,
        });
        const trades = response.trades || [];
        allFetchedTrades = allFetchedTrades.concat(trades);
        if (trades.length < pageSize) {
          hasMore = false;
        } else {
          pageIndex++;
        }
      }
      console.log(
        "[DEBUG] API trades for bot",
        selectedBotId,
        allFetchedTrades
      );
      setAllTrades(allFetchedTrades);
      // Update paginated trades for display
      const start = currentPage * pageSize;
      const end = start + pageSize;
      setTrades(allFetchedTrades.slice(start, end));
      setTotalTrades(allFetchedTrades.length);
      setHasMoreTrades(end < allFetchedTrades.length);
      console.log("[DEBUG] setTrades:", allFetchedTrades.slice(start, end));
    } catch (err) {
      setError("Failed to load trades.");
      console.error("[DEBUG] Error loading trades:", err);
    } finally {
      setLoading(false);
    }
  }, [
    selectedBotId,
    currentPage,
    selectedTypeFilter,
    selectedStatusFilter,
    startDateFilter,
    endDateFilter,
  ]);

  // Handle pagination from cached data
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (allTrades.length === 0) return;

      const start = newPage * pageSize;
      const end = start + pageSize;
      setTrades(allTrades.slice(start, end));
      setCurrentPage(newPage);
      setHasMoreTrades(end < allTrades.length);
    },
    [allTrades, pageSize]
  );

  // Update trades when page size changes
  useEffect(() => {
    if (allTrades.length > 0) {
      const start = currentPage * pageSize;
      const end = start + pageSize;
      setTrades(allTrades.slice(start, end));
      setHasMoreTrades(end < allTrades.length);
    }
  }, [pageSize, currentPage, allTrades]);

  // FIXED: Enhanced navigation functions with better validation
  const goToNextPage = useCallback(() => {
    console.log("goToNextPage called:", {
      hasMoreTrades,
      loading,
      currentPage,
    });
    if (hasMoreTrades && !loading) {
      setCurrentPage((prev) => {
        console.log(`Moving from page ${prev} to page ${prev + 1}`);
        return prev + 1;
      });
    }
  }, [hasMoreTrades, loading]);

  const goToPrevPage = useCallback(() => {
    console.log("goToPrevPage called:", { currentPage, loading });
    if (currentPage > 0 && !loading) {
      setCurrentPage((prev) => {
        console.log(`Moving from page ${prev} to page ${prev - 1}`);
        return prev - 1;
      });
    }
  }, [currentPage, loading]);

  const goToFirstPage = useCallback(() => {
    console.log("goToFirstPage called:", { currentPage, loading });
    if (currentPage > 0 && !loading) {
      console.log("Resetting to page 0");
      setCurrentPage(0);
    }
  }, [currentPage, loading]);

  const goToPage = useCallback(
    (pageNumber: number) => {
      console.log("goToPage called:", { pageNumber, loading, currentPage });
      if (!loading && pageNumber >= 0 && pageNumber !== currentPage) {
        console.log(`Jumping to page ${pageNumber}`);
        setCurrentPage(pageNumber);
      }
    },
    [loading, currentPage]
  );

  // Reset to page 0 và cache chỉ khi selectedBotId hoặc filter thực sự thay đổi và selectedBotId hợp lệ
  useEffect(() => {
    if (selectedBotId) {
      setCurrentPage(0);
      setTotalTrades(0);
      setHasMoreTrades(false);
      setAllTrades([]); // Clear cached trades
    }
  }, [
    selectedBotId,
    selectedTypeFilter,
    selectedStatusFilter,
    startDateFilter,
    endDateFilter,
  ]);

  // Fetch trades when bot/filters change
  useEffect(() => {
    fetchAllTrades();
  }, [
    selectedBotId,
    selectedTypeFilter,
    selectedStatusFilter,
    startDateFilter,
    endDateFilter,
  ]);

  // Update pagination when page changes (using cached data)
  useEffect(() => {
    if (allTrades.length > 0) {
      handlePageChange(currentPage);
    }
  }, [currentPage, handlePageChange]);

  // Calculate summary statistics
  const stats = useMemo(() => {
    return StatsCalculator.calculateStats(allTrades);
  }, [allTrades]);

  const filteredTrades = useMemo(() => {
    console.log("Filtering11 allTrades with searchTerm aaaa:", searchTerm);
    if (!searchTerm) {
      return trades;
    }
    console.log("Search term:", searchTerm);
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return trades.filter((trade) => {
      const safeLowerCaseIncludes = (value: any) => {
        return String(value || "")
          .toLowerCase()
          .includes(lowerCaseSearchTerm);
      };

      return (
        safeLowerCaseIncludes(trade.symbol) ||
        safeLowerCaseIncludes(trade.botName) ||
        safeLowerCaseIncludes(trade.tradeId) ||
        safeLowerCaseIncludes(trade.status)
      );
    });
  }, [trades, searchTerm]);

  // Phân trang trên filteredTrades
  const paginatedTrades = useMemo(() => {
    const start = currentPage * pageSize;
    const end = start + pageSize;
    return filteredTrades.slice(start, end);
  }, [filteredTrades, currentPage, pageSize]);

  // Lấy tuần hiện tại (Thứ 2 đến Chủ nhật)
  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 }); // Thứ 2 tuần này
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 }); // Chủ nhật tuần này

  // Lọc trades trong tuần hiện tại (dùng allTrades thay vì trades)
  const tradesThisWeek = useMemo(() => {
    return allTrades.filter((trade) => {
      if (!trade.entryDate) return false;
      const d = new Date(trade.entryDate);
      return d >= weekStart && d <= weekEnd;
    });
  }, [allTrades, weekStart, weekEnd]);

  // Chọn tập trade cho filter
  const tradesForFilter = filterMode === "week" ? tradesThisWeek : trades;

  // Generate chart data
  const chartData = useMemo(() => {
    const data = {
      performanceData: ChartDataGenerator.generatePerformanceData(
        trades,
        theme
      ),
      drawdownData: ChartDataGenerator.generateDrawdownData(trades, theme),
      tradeDistribution: ChartDataGenerator.generateTradeDistribution(
        tradesThisWeek,
        theme
      ),
      symbolDistribution: ChartDataGenerator.generateSymbolDistribution(
        trades,
        theme
      ),
      monthlyPerformance: ChartDataGenerator.generateMonthlyPerformance(
        trades,
        theme
      ),
      dailyPerformance: ChartDataGenerator.generateDailyPerformance(
        trades,
        theme
      ),
      profitDistribution: ChartDataGenerator.generateProfitDistribution(
        trades,
        theme
      ),
      riskMetricsData: ChartDataGenerator.generateRiskMetricsData(stats),
      tradeTiming: ChartDataGenerator.generateTradeTiming(trades, theme),
      weekdayDistribution: ChartDataGenerator.generateWeekdayDistribution(
        tradesThisWeek,
        theme
      ),
      dailyTradeCount: ChartDataGenerator.generateDailyTradeCount(
        tradesThisWeek,
        weekStart,
        weekEnd,
        theme
      ),
    };
    // Thêm log kiểm tra dữ liệu drawdownData
    console.log(
      "[DEBUG] drawdownData for bot:",
      selectedBotId,
      data.drawdownData
    );
    if (data.drawdownData && data.drawdownData.length > 0) {
      data.drawdownData.forEach((item, idx) => {
        console.log(
          `[DRAW] idx=${idx}, date=${item.date}, value=${item.value}`
        );
      });
    }
    return data;
  }, [allTrades, stats, theme, tradesThisWeek, weekStart, weekEnd]);

  // Calculate bot rankings for the Top Bot tab
  const botRankings = useMemo<BotRank[]>(() => {
    if (activeTab === "topBot") {
      return botRankingsData.map((bot) => ({
        ...bot,
        botId: String(bot.botId),
      }));
    } else {
      const rankings = bots.map((bot) => {
        const botTrades = trades.filter((t) => t.botName === bot.botName);
        const completedBotTrades = botTrades.filter(
          (t) => t.status === "Completed"
        );
        const winTrades = completedBotTrades.filter(
          (t) => typeof t.profit === "number" && t.profit > 0
        ).length;
        const lossTrades = completedBotTrades.filter(
          (t) => typeof t.profit === "number" && t.profit < 0
        ).length;
        const totalCompletedTrades = completedBotTrades.length;

        const winRate =
          totalCompletedTrades > 0
            ? lossTrades === 0 && winTrades > 0
              ? 100
              : (winTrades / totalCompletedTrades) * 100
            : 0;

        return {
          botId: bot.botId,
          botName: bot.botName,
          totalProfit: StatsCalculator.calculateTotalProfit(botTrades),
          winRate,
          totalTrades: totalCompletedTrades,
          winningTrades: winTrades,
          losingTrades: lossTrades,
        };
      });
      return rankings.sort((a, b) => b.totalProfit - a.totalProfit);
    }
  }, [bots, trades, activeTab, botRankingsData]);

  // Load bots on component mount
  useEffect(() => {
    loadBots();
  }, [loadBots]);

  // Hàm lấy đủ toàn bộ giao dịch cho 1 bot (phân trang)
  const fetchAllTradesForBot = async (botId: string, pageSize = 10000) => {
    let allTrades: any[] = [];
    let pageIndex = 0;
    let hasMore = true;
    while (hasMore) {
      const response = await ApiService.fetchTrades({
        botId,
        pageIndex,
        pageSize,
        type: "",
        status: "",
        startDate: "",
        endDate: "",
      });
      const trades = response.trades || [];
      allTrades = allTrades.concat(trades);
      if (trades.length < pageSize) {
        hasMore = false;
      } else {
        pageIndex++;
      }
    }
    return allTrades;
  };

  // Fetch all bots profit when Top Bot tab is active
  useEffect(() => {
    if (activeTab === "topBot" && bots.length > 0) {
      const fetchRankingsAndDetailedTrades = async () => {
        setLoadingRankings(true);
        try {
          // 1. Fetch initial ranking data (total profit/trades) from API
          const rankingsDataFromApi: BotRankingApiResponse[] =
            await ApiService.fetchAllBotsProfit(bots);

          // 2. For each bot in the ranking, fetch đủ toàn bộ giao dịch (phân trang)
          const detailedRankings: BotRank[] = [];
          for (const bot of rankingsDataFromApi) {
            try {
              // Lấy đủ toàn bộ giao dịch cho bot (phân trang)
              const botTrades = await fetchAllTradesForBot(bot.botId, 10000);

              // Tính toán các chỉ số chuẩn xác
              const winTrades = botTrades.filter(
                (trade) => typeof trade.profit === "number" && trade.profit > 0
              ).length;
              const lossTrades = botTrades.filter(
                (trade) => typeof trade.profit === "number" && trade.profit < 0
              ).length;
              const totalCompletedTradesForBot = botTrades.filter(
                (t) => t.status === "Completed"
              ).length;
              const winRate =
                totalCompletedTradesForBot > 0
                  ? (winTrades / totalCompletedTradesForBot) * 100
                  : winTrades + lossTrades > 0
                  ? (winTrades / (winTrades + lossTrades)) * 100
                  : 0;
              const totalProfit = botTrades.reduce(
                (sum, trade) =>
                  sum + (typeof trade.profit === "number" ? trade.profit : 0),
                0
              );
              // Add the detailed info to the rankings list
              detailedRankings.push({
                botId: bot.botId,
                botName: bot.botName,
                totalProfit: totalProfit,
                totalTrades: botTrades.length,
                winningTrades: winTrades,
                losingTrades: lossTrades,
                winRate: winRate,
              });
            } catch (tradeError) {
              console.error(
                `Error fetching trades for bot ${bot.botName}:`,
                tradeError
              );
              // Add bot with data from initial ranking và winRate mặc định nếu lỗi fetch trades
              detailedRankings.push({
                botId: bot.botId,
                botName: bot.botName,
                totalProfit: bot.totalProfit,
                totalTrades: bot.totalTrades,
                winningTrades: 0,
                losingTrades: 0,
                winRate: 0,
              });
            }
          }

          // Add logging here to inspect detailedRankings before setting state
          console.log(
            "Calculated detailedRankings (full fetch):",
            detailedRankings
          );

          // Sort the detailed rankings by total profit before setting state (optional, fetchAllBotsProfit already sorts)
          detailedRankings.sort((a, b) => b.totalProfit - a.totalProfit);

          setBotRankingsData(detailedRankings);
        } catch (error) {
          console.error("Error in fetchRankingsAndDetailedTrades:", error);
          setBotRankingsData([]); // Clear data on error
        } finally {
          setLoadingRankings(false);
        }
      };

      fetchRankingsAndDetailedTrades();
    }
  }, [activeTab, bots]);

  // Calculate daily, weekly, monthly profit
  useEffect(() => {
    if (allTrades.length > 0) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const now = new Date();

      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const endOfYesterday = new Date(yesterday);
      endOfYesterday.setHours(23, 59, 59, 999);

      const currentDay = now.getDay();
      const lastWeekEnd = new Date(now);
      lastWeekEnd.setDate(now.getDate() - currentDay);
      lastWeekEnd.setHours(23, 59, 59, 999);

      const lastWeekStart = new Date(lastWeekEnd);
      lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
      lastWeekStart.setHours(0, 0, 0, 0);

      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const lastMonthStart = new Date(
        currentYear,
        currentMonth - 1,
        1,
        0,
        0,
        0,
        0
      );

      const lastMonthEnd = new Date(
        currentYear,
        currentMonth,
        0,
        23,
        59,
        59,
        999
      );

      setProfitToday(
        StatsCalculator.calculateProfitForPeriod(allTrades, today, now)
      );
      setProfitYesterday(
        StatsCalculator.calculateProfitForPeriod(
          allTrades,
          yesterday,
          endOfYesterday
        )
      );
      setProfitLastWeek(
        StatsCalculator.calculateProfitForPeriod(
          allTrades,
          lastWeekStart,
          lastWeekEnd
        )
      );
      setProfitLastMonth(
        StatsCalculator.calculateProfitForPeriod(
          allTrades,
          lastMonthStart,
          lastMonthEnd
        )
      );
    } else {
      setProfitToday(0);
      setProfitYesterday(0);
      setProfitLastWeek(0);
      setProfitLastMonth(0);
    }
  }, [allTrades]);

  // Calculate Win Rate after fetching trades
  useEffect(() => {
    if (allTrades.length > 0) {
      const winRateData = StatsCalculator.calculateWinRateData(allTrades);
      setWinRateData(winRateData);
      console.log("Total trades:", allTrades.length);
      console.log("Win trades:", winRateData.winTrades);
      console.log("Loss trades:", winRateData.lossTrades);
      console.log("Win Rate:", winRateData.winRate);
    } else {
      setWinRateData({
        winTrades: 0,
        lossTrades: 0,
        totalValidTrades: 0,
        winRate: "0.00%",
      });
    }
  }, [allTrades, selectedBotId]);

  // Export function
  const handleExport = () => {
    if (!trades.length) {
      console.log("No trades to export");
      return;
    }

    setIsExporting(true);

    setTimeout(() => {
      const headers = [
        "Trade ID",
        "Bot",
        "Symbol",
        "Type",
        "Direction",
        "Price",
        "Exit Price",
        "Stop Loss",
        "Take Profit",
        "Position Size",
        "Entry Date",
        "Duration",
        "P&L",
        "Status",
      ];

      const rows = trades.map((trade) => [
        `"${trade.tradeId || ""}"`,
        `"${trade.botName || ""}"`,
        `"${trade.symbol || ""}"`,
        `"${trade.type || ""}"`,
        `"${trade.direction || ""}"`,
        `"${
          typeof trade.price === "number"
            ? trade.price.toFixed(2)
            : trade.price || ""
        }"`,
        `"${
          typeof trade.exitPrice === "number"
            ? trade.exitPrice.toFixed(2)
            : trade.exitPrice || ""
        }"`,
        `"${
          typeof trade.stopLoss === "number"
            ? trade.stopLoss.toFixed(2)
            : trade.stopLoss || ""
        }"`,
        `"${
          typeof trade.takeProfit === "number"
            ? trade.takeProfit.toFixed(2)
            : trade.takeProfit || ""
        }"`,
        `"${trade.positionSize || ""}"`,
        `"${
          trade.entryDate
            ? new Date(
                new Date(trade.entryDate).getTime() + 7 * 60 * 60 * 1000
              ).toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })
            : "N/A"
        }"`,
        `"${trade.tradeDuration || ""}"`,
        `"${
          typeof trade.profit === "number"
            ? trade.profit.toFixed(2)
            : trade.profit || ""
        }"`,
        `"${trade.status || ""}"`,
      ]);

      const csvContent = [
        headers.join(","),
        ...rows.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", "trades_export.csv");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      setIsExporting(false);
    }, 800);
  };

  // Handle bot click - Restored function
  const handleBotClick = (botId: string) => {
    setSelectedBotId(botId);
    setActiveTab("trades"); // Navigate to Trades tab
  };

  // FIXED: Improved pagination info helper
  const paginationInfo = useMemo(() => {
    const startItem = trades.length > 0 ? currentPage * pageSize + 1 : 0;
    const endItem = currentPage * pageSize + trades.length;

    // More conservative total pages calculation
    const totalPages = hasMoreTrades
      ? currentPage + 2 // We know there's at least one more page
      : Math.max(1, Math.ceil(endItem / pageSize));

    return {
      startItem,
      endItem,
      totalPages,
      currentPage: currentPage + 1, // Display 1-based page numbers
      isFirstPage: currentPage === 0,
      isLastPage: !hasMoreTrades,
      showingCount: trades.length,
    };
  }, [currentPage, trades.length, hasMoreTrades, pageSize]);

  // Helper để lấy start/end date theo filter
  const getRankingDateRange = () => {
    const now = new Date();
    if (rankingTimeframe === "week") {
      return {
        startDate: startOfWeek(now, { weekStartsOn: 1 }),
        endDate: endOfWeek(now, { weekStartsOn: 1 }),
      };
    }
    if (rankingTimeframe === "month") {
      return { startDate: startOfMonth(now), endDate: endOfMonth(now) };
    }
    return { startDate: null, endDate: null };
  };

  // Hàm lấy lại ranking khi đổi filter
  const fetchBotRankings = useCallback(async () => {
    setLoadingRankings(true);
    try {
      const { startDate, endDate } = getRankingDateRange();
      const botsData = await Promise.all(
        bots.map(async (bot) => {
          const tradesRes = await ApiService.fetchTrades({
            botId: bot.botId,
            pageIndex: 0,
            pageSize: 10000,
            startDate: startDate ? startDate.toISOString() : "",
            endDate: endDate ? endDate.toISOString() : "",
          });
          const trades = tradesRes.trades || [];
          const winTrades = trades.filter(
            (t) => typeof t.profit === "number" && t.profit > 0
          ).length;
          const lossTrades = trades.filter(
            (t) => typeof t.profit === "number" && t.profit < 0
          ).length;
          const totalProfit = trades.reduce(
            (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
            0
          );
          return {
            botId: bot.botId,
            botName: bot.botName,
            totalProfit,
            totalTrades: trades.length,
            winningTrades: winTrades,
            losingTrades: lossTrades,
          };
        })
      );
      setBotRankingsData(
        botsData.sort((a, b) => b.totalProfit - a.totalProfit)
      );
    } finally {
      setLoadingRankings(false);
    }
  }, [bots, rankingTimeframe]);

  // Gọi lại khi đổi filter hoặc danh sách bot
  useEffect(() => {
    if (activeTab === "topBot") {
      fetchBotRankings();
    }
  }, [fetchBotRankings, activeTab]);

  // Hàm đổi filter
  const onRankingTimeframeChange = (value: string) => {
    setRankingTimeframe(value);
  };

  // Add a filteredBots function for bot type filtering
  const getFilteredBots = (selectedBotType: string) => {
    if (!selectedBotType) return bots;
    return bots.filter((bot) => bot.type === selectedBotType);
  };

  // Reset filter về mặc định khi đổi bot
  useEffect(() => {
    if (selectedBotId) {
      setSelectedTypeFilter("");
      setSelectedStatusFilter("");
      setStartDateFilter("");
      setEndDateFilter("");
      setSearchTerm("");
      setCurrentPage(0);
    }
  }, [selectedBotId]);

  // Filter allTrades based on searchTerm (cho History3MonthsTab)
  const filteredAllTrades = useMemo(() => {
    console.log("Filtering allTrades with searchTerm:", searchTerm);
    if (!searchTerm) {
      return trades;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return trades.filter((trade) => {
      const safeLowerCaseIncludes = (value: any) => {
        return String(value || "")
          .toLowerCase()
          .includes(lowerCaseSearchTerm);
      };

      return (
        safeLowerCaseIncludes(trade.symbol) ||
        safeLowerCaseIncludes(trade.botName) ||
        safeLowerCaseIncludes(trade.tradeId) ||
        safeLowerCaseIncludes(trade.status)
      );
    });
  }, [trades, searchTerm]);

  return {
    // State
    bots,
    setBots,
    selectedBotId,
    setSelectedBotId,
    trades,
    allTrades,
    filteredTrades,
    loading,
    error,
    activeTab,
    setActiveTab,
    timeframe,
    setTimeframe,
    statsExpanded,
    setStatsExpanded,
    loadingRankings,
    currentPage,
    setCurrentPage,
    hasMoreTrades,
    totalTrades,
    selectedTypeFilter,
    setSelectedTypeFilter,
    selectedStatusFilter,
    setSelectedStatusFilter,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    searchTerm,
    setSearchTerm,
    chartType,
    setChartType,
    showAdvancedStats,
    setShowAdvancedStats,
    riskLevel,
    setRiskLevel,
    showTooltip,
    setShowTooltip,
    hoveredStat,
    setHoveredStat,
    isExporting,
    setIsExporting,
    profitToday,
    profitYesterday,
    profitLastWeek,
    profitLastMonth,
    winRateData,
    stats,
    chartData,
    theme,
    pageSize,
    paginationInfo,
    botRankingsData,
    rankingTimeframe,
    onRankingTimeframeChange,
    filterMode,
    setFilterMode,
    getFilteredBots,
    selectedBotType,
    setSelectedBotType,
    filteredAllTrades,

    // Functions
    handleExport,
    loadBots,
    fetchAllTrades,
    botRankings,
    handleBotClick,
    goToNextPage,
    goToPrevPage,
    goToFirstPage,
    goToPage,
  };
};
