import React, { useEffect, useMemo, useState, useRef } from "react";
import { Trade, Bot } from "../../types";
import { TradesTable } from "../tables/TradesTable";
import { ApiService } from "../../services/api";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  BadgeDollarSign,
  Trophy,
  ArrowUpCircle,
  ArrowDownCircle,
  PercentCircle,
  Calculator,
  Star,
  AlertTriangle,
  ChevronDown,
  Bot as BotIcon,
  Calendar,
} from "lucide-react";
import { FilterControls } from "../controls/FilterControls";

function getLast3MonthsKeys(now = new Date()) {
  // Lấy key dạng 'YYYY-M' cho 3 tháng trước (không lấy tháng hiện tại)
  const months: string[] = [];
  for (let i = 1; i <= 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push(`${d.getFullYear()}-${d.getMonth() + 1}`);
  }
  return months;
}

function getMonthLabel(key: string) {
  const [year, month] = key.split("-");
  return `Tháng ${month}/${year}`;
}

interface History3MonthsTabProps {
  bots: Bot[];
  filteredTrades: Trade[];
  selectedBotId: string;
  setSelectedBotId: (id: string) => void;
  selectedBotType: string;
  setSelectedBotType: (type: string) => void;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  selectedTypeFilter: string;
  setSelectedTypeFilter: (v: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (v: string) => void;
  startDateFilter: string;
  setStartDateFilter: (v: string) => void;
  endDateFilter: string;
  setEndDateFilter: (v: string) => void;
  setCurrentPage: (v: number) => void;
}

export const History3MonthsTab: React.FC<History3MonthsTabProps> = React.memo(
  ({
    bots,
    filteredTrades,
    selectedBotId,
    setSelectedBotId,
    selectedBotType,
    setSelectedBotType,
    searchTerm,
    setSearchTerm,
    selectedTypeFilter,
    setSelectedTypeFilter,
    selectedStatusFilter,
    setSelectedStatusFilter,
    startDateFilter,
    setStartDateFilter,
    endDateFilter,
    setEndDateFilter,
    setCurrentPage,
  }) => {
    const [now, setNow] = useState<Date>(new Date());
    const last3Months = useMemo(() => getLast3MonthsKeys(now), [now]);
    const [selectedMonth, setSelectedMonth] = useState<string>("all3months");

    // Khi đổi bot, reset trang và tháng
    useEffect(() => {
      setCurrentPage(1);
      setSelectedMonth("all3months");
    }, [selectedBotId]);

    // Dùng filteredTrades đã được filter đúng như TradesTab
    // (filteredTrades đã chỉ chứa các giao dịch đúng bot, filter, v.v.)
    const tradesOfBot = filteredTrades;

    // Lọc giao dịch của 3 tháng trước (không lấy tháng hiện tại)
    const tradesByMonth = useMemo(() => {
      const byMonth: Record<string, Trade[]> = {};
      last3Months.forEach((key) => (byMonth[key] = []));
      tradesOfBot.forEach((trade) => {
        if (!trade.entryDate) return;
        const d = new Date(trade.entryDate);
        const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
        // Debug log
        console.log(
          "Trade:",
          trade,
          "entryDate:",
          trade.entryDate,
          "Parsed:",
          d,
          "Key:",
          key,
          "last3Months:",
          last3Months
        );
        if (last3Months.includes(key)) {
          byMonth[key].push(trade);
        }
      });
      return byMonth;
    }, [tradesOfBot, last3Months]);

    // Giao dịch của tháng đang chọn hoặc cả 3 tháng
    const filteredTradesByMonth = useMemo(() => {
      if (selectedMonth === "all3months") {
        return last3Months.flatMap((key) => tradesByMonth[key] || []);
      }
      return tradesByMonth[selectedMonth] || [];
    }, [selectedMonth, tradesByMonth, last3Months]);

    // Chỉ số tổng kết tháng hoặc tổng hợp 3 tháng
    const summary = useMemo(() => {
      let totalProfit = 0;
      let win = 0;
      let lose = 0;
      let total = filteredTradesByMonth.length;
      let maxProfit: number | null = null;
      let minProfit: number | null = null;
      filteredTradesByMonth.forEach((trade) => {
        const profit =
          typeof trade.profit === "number"
            ? trade.profit
            : Number(trade.profit) || 0;
        totalProfit += profit;
        if (profit > 0) win++;
        if (profit < 0) lose++;
        if (maxProfit === null || profit > maxProfit) maxProfit = profit;
        if (minProfit === null || profit < minProfit) minProfit = profit;
      });
      const winrate = total > 0 ? ((win / total) * 100).toFixed(1) : "0";
      const loseRate = total > 0 ? ((lose / total) * 100).toFixed(1) : "0";
      const avgProfit = total > 0 ? (totalProfit / total).toFixed(0) : "0";
      return {
        totalProfit,
        total,
        winrate,
        win,
        lose,
        loseRate,
        avgProfit,
        maxProfit,
        minProfit,
      };
    }, [filteredTradesByMonth]);

    // Phân trang cho filteredTradesByMonth
    const pageSize = 20;
    const [currentPage, setLocalCurrentPage] = useState(0);
    useEffect(() => {
      setLocalCurrentPage(0);
    }, [selectedMonth, filteredTrades]);
    const paginatedTrades = useMemo(() => {
      const start = currentPage * pageSize;
      const end = start + pageSize;
      return filteredTradesByMonth.slice(start, end);
    }, [filteredTradesByMonth, currentPage]);

    return (
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-white/10">
        <div className="py-6 space-y-6">
          {/* Dropdown chọn bot giống các tab khác */}
          <FilterControls
            bots={bots}
            selectedBotId={selectedBotId}
            setSelectedBotId={setSelectedBotId}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedTypeFilter={selectedTypeFilter}
            setSelectedTypeFilter={setSelectedTypeFilter}
            selectedStatusFilter={selectedStatusFilter}
            setSelectedStatusFilter={setSelectedStatusFilter}
            startDateFilter={startDateFilter}
            setStartDateFilter={setStartDateFilter}
            endDateFilter={endDateFilter}
            setEndDateFilter={setEndDateFilter}
            handleExport={() => {}}
            isExporting={false}
            error={null}
            setCurrentPage={setCurrentPage}
            selectedBotType={selectedBotType}
            setSelectedBotType={setSelectedBotType}
          />
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              Lịch sử giao dịch 3 tháng trước
            </h2>
            <p className="text-gray-400">
              Theo dõi hiệu suất giao dịch của từng bot
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 bg-gradient-to-r from-gray-900/50 via-gray-800/50 to-gray-900/50 rounded-2xl border border-gray-700/50 backdrop-blur-sm"
          >
            {/* Month Selection */}
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2 text-blue-300 font-semibold">
                <Calendar size={20} className="text-blue-400" />
                <span>Tháng:</span>
              </div>
              <div className="relative flex-1 max-w-xs">
                <select
                  className="w-full appearance-none bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-blue-400/30 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 hover:border-blue-400/60 shadow-lg"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="all3months" className="bg-gray-800">
                    3 tháng gần nhất
                  </option>
                  {last3Months.map((key) => (
                    <option key={key} value={key} className="bg-gray-800">
                      {getMonthLabel(key)}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="overflow-hidden bg-gradient-to-br from-gray-900/90 via-blue-900/10 to-purple-900/10 border-0 shadow-2xl rounded-3xl backdrop-blur-sm">
              {/* Header */}
              <div className="relative px-8 py-6 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 border-b border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 backdrop-blur-sm" />
                <div className="relative flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg">
                    <Trophy size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-200 to-cyan-200 bg-clip-text text-transparent">
                      Chỉ số tổng hợp
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Thống kê hiệu suất giao dịch
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="p-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                  {/* Total Profit */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl shadow-lg">
                          <BadgeDollarSign size={20} className="text-white" />
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            summary.totalProfit >= 0
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {summary.totalProfit >= 0 ? "Lãi" : "Lỗ"}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Tổng lãi/lỗ
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {summary.totalProfit >= 0 ? "+" : ""}
                        {typeof summary.totalProfit === "number"
                          ? summary.totalProfit.toLocaleString("vi-VN")
                          : 0}{" "}
                        đ
                      </div>
                    </div>
                  </div>

                  {/* Total Trades */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl shadow-lg">
                          <Calculator size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Tổng số giao dịch
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {summary.total}
                      </div>
                    </div>
                  </div>

                  {/* Win Rate */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-xl shadow-lg">
                          <PercentCircle size={20} className="text-white" />
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            parseFloat(summary.winrate) >= 50
                              ? "bg-green-500/20 text-green-300"
                              : "bg-red-500/20 text-red-300"
                          }`}
                        >
                          {parseFloat(summary.winrate) >= 50
                            ? "Tốt"
                            : "Cần cải thiện"}
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Tỷ lệ thắng
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {summary.winrate}%
                      </div>
                    </div>
                  </div>

                  {/* Win Trades */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl shadow-lg">
                          <ArrowUpCircle size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Lệnh thắng
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {summary.win}
                      </div>
                    </div>
                  </div>

                  {/* Lose Trades */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-xl shadow-lg">
                          <ArrowDownCircle size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Lệnh thua
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {summary.lose}
                      </div>
                    </div>
                  </div>

                  {/* Additional stats for better grid layout */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl shadow-lg">
                          <Calculator size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Lợi nhuận TB/lệnh
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {Number(summary.avgProfit).toLocaleString("vi-VN")} đ
                      </div>
                    </div>
                  </div>

                  {/* Max Profit */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-xl shadow-lg">
                          <TrendingUp size={20} className="text-white" />
                        </div>
                        <Star size={16} className="text-emerald-400" />
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Lệnh lãi lớn nhất
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {typeof summary.maxProfit === "number" &&
                        summary.maxProfit !== null
                          ? (summary.maxProfit as number).toLocaleString(
                              "vi-VN"
                            ) + " đ"
                          : "-"}
                      </div>
                    </div>
                  </div>

                  {/* Min Profit */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-red-400 to-rose-400 rounded-xl shadow-lg">
                          <TrendingDown size={20} className="text-white" />
                        </div>
                        <AlertTriangle size={16} className="text-red-400" />
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Lệnh lỗ lớn nhất
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {typeof summary.minProfit === "number" &&
                        summary.minProfit !== null
                          ? (summary.minProfit as number).toLocaleString(
                              "vi-VN"
                            ) + " đ"
                          : "-"}
                      </div>
                    </div>
                  </div>

                  {/* Loss Rate */}
                  <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-800/80 to-gray-900/80 p-6 shadow-xl flex flex-col items-center justify-center text-center max-w-xs w-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-xl shadow-lg">
                          <PercentCircle size={20} className="text-white" />
                        </div>
                      </div>
                      <div className="text-xs text-gray-400 font-medium mb-2">
                        Tỷ lệ thua
                      </div>
                      <div className="text-xl md:text-2xl font-bold break-words max-w-[120px] mx-auto">
                        {summary.loseRate}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Trades Table */}
          <div>
            <TradesTable
              trades={paginatedTrades}
              loading={false}
              error={null}
              searchTerm={searchTerm}
              currentPage={currentPage}
              setCurrentPage={setLocalCurrentPage}
              hasMoreTrades={
                filteredTradesByMonth.length > currentPage * pageSize
              }
            />
          </div>
        </div>
      </div>
    );
  }
);

export default History3MonthsTab;
