// components/cards/StatsCards.tsx - FIXED DUPLICATE IMPORTS
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  Percent,
  Activity,
  ArrowUpCircle,
  ArrowDownCircle,
  ArrowUpRight,
  HelpCircle,
} from "lucide-react";
import { Stats, WinRateData } from "../../types";

interface StatsCardsProps {
  stats: Stats;
  winRateData: WinRateData;
  profitToday: number;
  profitYesterday: number;
  profitLastWeek: number;
  profitLastMonth: number;
  showAdvancedStats: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  winRateData,
  profitToday,
  profitYesterday,
  profitLastWeek,
  profitLastMonth,
  showAdvancedStats,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  return (
    <>
      {/* Historical Profit Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Lợi nhuận Hôm nay
          </div>
          <div
            className={`text-2xl font-bold ${
              profitToday >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitToday >= 0 ? "+" : ""}
            {profitToday.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Từ 00:00 đến hiện tại
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Lợi nhuận Hôm qua
          </div>
          <div
            className={`text-2xl font-bold ${
              profitYesterday >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitYesterday >= 0 ? "+" : ""}
            {profitYesterday.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Cả ngày hôm qua (00:00 - 23:59)
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Lợi nhuận Tuần trước
          </div>
          <div
            className={`text-2xl font-bold ${
              profitLastWeek >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitLastWeek >= 0 ? "+" : ""}
            {profitLastWeek.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Từ thứ Hai đến Chủ Nhật tuần trước
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
            Lợi nhuận Tháng trước
          </div>
          <div
            className={`text-2xl font-bold ${
              profitLastMonth >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {profitLastMonth >= 0 ? "+" : ""}
            {profitLastMonth.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Cả tháng trước (từ ngày 1 đến ngày cuối)
          </div>
        </motion.div>
      </div>

      {/* Main Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex flex-col border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <DollarSign size={96} />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
            <DollarSign size={16} className="mr-1.5" />
            Total Profit
            <div
              className="relative ml-1 cursor-help"
              onMouseEnter={() => {
                setHoveredStat("totalProfit");
                setShowTooltip(true);
              }}
              onMouseLeave={() => {
                setShowTooltip(false);
              }}
            >
              <HelpCircle size={12} className="text-gray-400" />
              {showTooltip && hoveredStat === "totalProfit" && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                  Tổng lợi nhuận từ tất cả các giao dịch trong thời gian đã chọn
                </div>
              )}
            </div>
          </div>
          <div
            className={`text-3xl font-bold mb-2 ${
              parseFloat(stats.totalProfit) >= 0
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {stats.totalProfit}
          </div>
          <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs text-gray-500 dark:text-gray-400 flex items-center">
            vs previous:
            <span className="text-green-500 ml-1 flex items-center">
              <ArrowUpRight size={14} className="mr-0.5" />
              +2.4%
            </span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <Percent size={96} />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
            <Percent size={16} className="mr-1.5" />
            Win Rate
            <div
              className="relative ml-1 cursor-help"
              onMouseEnter={() => {
                setHoveredStat("winRate");
                setShowTooltip(true);
              }}
              onMouseLeave={() => {
                setShowTooltip(false);
              }}
            >
              <HelpCircle size={12} className="text-gray-400" />
              {showTooltip && hoveredStat === "winRate" && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                  Tỷ lệ giao dịch có lợi nhuận trong tổng số giao dịch
                </div>
              )}
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-500 mb-2">
            {winRateData.winRate}
          </div>
          <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: stats.winRate }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-blue-600 h-2 rounded-full"
              ></motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <Activity size={96} />
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center">
            <Activity size={16} className="mr-1.5" />
            Total Trades
            <div
              className="relative ml-1 cursor-help"
              onMouseEnter={() => {
                setHoveredStat("totalTrades");
                setShowTooltip(true);
              }}
              onMouseLeave={() => {
                setShowTooltip(false);
              }}
            >
              <HelpCircle size={12} className="text-gray-400" />
              {showTooltip && hoveredStat === "totalTrades" && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10">
                  Tổng số giao dịch đã thực hiện trong thời gian đã chọn
                </div>
              )}
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">{stats.totalTrades}</div>
          <div className="mt-2 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-xs">
            <span className="text-green-500 flex items-center">
              <ArrowUpCircle size={14} className="mr-1" />
              {winRateData.winTrades || 0} Thắng
            </span>
            <span className="text-red-500 flex items-center">
              <ArrowDownCircle size={14} className="mr-1" />
              {winRateData.lossTrades || 0} Thua
            </span>
          </div>
          <div className="mt-1 text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              ({winRateData.totalValidTrades} trades với kết quả)
            </span>
          </div>
        </motion.div>
      </div>

      {/* Advanced Stats Row (Expandable) */}
      {showAdvancedStats && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Profit Factor
            </div>
            <div className="text-lg font-semibold mt-1">
              {stats.profitFactor}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Avg Win
            </div>
            <div className="text-lg font-semibold mt-1 text-green-500">
              {stats.averageWin}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Avg Loss
            </div>
            <div className="text-lg font-semibold mt-1 text-red-500">
              {stats.averageLoss}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Expectancy
            </div>
            <div className="text-lg font-semibold mt-1">{stats.expectancy}</div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Win/Loss Ratio
            </div>
            <div className="text-lg font-semibold mt-1">
              {stats.winLossRatio}
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Sharpe Ratio
            </div>
            <div className="text-lg font-semibold mt-1">
              {stats.sharpeRatio}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};
