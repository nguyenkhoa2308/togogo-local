// components/tabs/TopBotTab.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  TrendingUp,
  Activity,
  Clock,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Helpers } from "../../utils/helpers";
import { TopBotCharts } from "../charts/TopBotCharts";

interface TopBotTabProps {
  botRankings: any;
  loadingRankings: boolean;
  handleBotClick: (id: string) => void;
  rankingTimeframe: string;
  onRankingTimeframeChange: (v: string) => void;
  disableAnimation?: boolean;
}

export const TopBotTab: React.FC<TopBotTabProps> = ({
  botRankings,
  loadingRankings,
  handleBotClick,
  rankingTimeframe,
  onRankingTimeframeChange,
  disableAnimation,
}) => {
  // Calculate summary statistics with proper error handling
  const calculateStats = () => {
    if (!botRankings || botRankings.length === 0) {
      return {
        totalProfit: 0,
        totalTrades: 0,
        avgProfitPerTrade: 0,
        avgTradeDuration: 0,
        totalWinningTrades: 0,
        totalLosingTrades: 0,
        maxProfit: 0,
        maxLoss: 0,
      };
    }

    const totalProfit = botRankings.reduce((sum: number, bot: any) => {
      return sum + (Number(bot.totalProfit) || 0);
    }, 0);

    const totalTrades = botRankings.reduce((sum: number, bot: any) => {
      return sum + (Number(bot.totalTrades) || 0);
    }, 0);

    const totalWinningTrades = botRankings.reduce((sum: number, bot: any) => {
      return sum + (Number(bot.winningTrades) || 0);
    }, 0);

    const totalLosingTrades = botRankings.reduce((sum: number, bot: any) => {
      return sum + (Number(bot.losingTrades) || 0);
    }, 0);

    const avgProfitPerTrade = totalTrades > 0 ? totalProfit / totalTrades : 0;

    // Calculate max profit and loss from individual trades
    let maxProfit = 0;
    let maxLoss = 0;
    botRankings.forEach((bot: any) => {
      const trades = bot.trades || [];
      trades.forEach((trade: any) => {
        const profit = Number(trade.profit) || 0;
        if (profit > maxProfit) maxProfit = profit;
        if (profit < maxLoss) maxLoss = profit;
      });
    });

    return {
      totalProfit,
      totalTrades,
      avgProfitPerTrade,
      totalWinningTrades,
      totalLosingTrades,
      maxProfit,
      maxLoss,
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-white/10">
      <div className="space-y-6">
        {/* Filter Ranking Timeframe */}
        <div className="flex justify-end mb-2">
          <select
            className="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded px-3 py-1 text-sm text-gray-700 dark:text-gray-200 focus:outline-none"
            value={rankingTimeframe}
            onChange={(e) => onRankingTimeframeChange(e.target.value)}
          >
            <option value="all">Tất cả</option>
            <option value="week">Tuần này</option>
            <option value="month">Tháng này</option>
          </select>
        </div>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 rounded-xl border-cyan-400/40 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Tổng lợi nhuận</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Helpers.formatNumber(stats.totalProfit, 2)}
                </h3>
              </div>
              <TrendingUp className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 rounded-xl border-cyan-400/40 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Tổng số giao dịch</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalTrades}</h3>
              </div>
              <Activity className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 rounded-xl border-cyan-400/40 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Lợi nhuận/Giao dịch</p>
                <h3 className="text-2xl font-bold mt-1">
                  {Helpers.formatNumber(stats.avgProfitPerTrade, 2)}
                </h3>
              </div>
              <Target className="w-8 h-8 opacity-80" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-500 rounded-xl border-cyan-400/40 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-80">Giao dịch thắng/thua</p>
                <h3 className="text-2xl font-bold mt-1">
                  {stats.totalWinningTrades}/{stats.totalLosingTrades}
                </h3>
              </div>
              <div className="flex gap-2">
                <ArrowUpRight className="w-8 h-8 opacity-80" />
                <ArrowDownRight className="w-8 h-8 opacity-80" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Bot Rankings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
            <Trophy size={24} className="mr-3 text-yellow-500" />
            Bảng xếp hạng Bot
          </h2>

          {loadingRankings ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              Loading rankings...
            </div>
          ) : botRankings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">
                      #
                    </th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400">
                      Tên Bot
                    </th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">
                      Lợi nhuận
                    </th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">
                      Lợi nhuận/GD
                    </th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">
                      Số giao dịch
                    </th>
                    <th className="pb-3 font-medium text-gray-500 dark:text-gray-400 text-right">
                      Thắng/Thua
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {botRankings.map((bot: any, index: number) => {
                    const totalTrades = Number(bot.totalTrades) || 0;
                    const winningTrades = Number(bot.winningTrades) || 0;
                    const losingTrades = Number(bot.losingTrades) || 0;
                    const profitPerTrade =
                      totalTrades > 0
                        ? Number(bot.totalProfit) / totalTrades
                        : 0;

                    return (
                      <tr
                        key={bot.botId}
                        onClick={() => handleBotClick(bot.botId)}
                        className="border-b border-gray-100 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/30 cursor-pointer transition-colors"
                      >
                        <td className="py-4">
                          <div className="flex items-center">
                            <span className="font-mono text-gray-600 dark:text-gray-400 w-6">
                              {index + 1}.
                            </span>
                            {Helpers.getTopIcon(index)}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {bot.botName}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={`font-semibold ${
                              Number(bot.totalProfit) >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {Helpers.formatNumber(
                              Number(bot.totalProfit) || 0,
                              2
                            )}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span
                            className={`font-semibold ${
                              profitPerTrade >= 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {Helpers.formatNumber(profitPerTrade, 2)}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {totalTrades}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <span className="font-medium text-gray-800 dark:text-gray-200">
                            {winningTrades}/{losingTrades}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No bot rankings available.
            </div>
          )}
        </div>

        {/* Charts Section */}
        {!loadingRankings && botRankings.length > 0 && (
          <TopBotCharts botRankings={botRankings} />
        )}
      </div>
    </div>
  );
};

export default TopBotTab;
