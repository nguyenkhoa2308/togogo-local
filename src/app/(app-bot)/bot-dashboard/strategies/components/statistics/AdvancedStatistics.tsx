// components/statistics/AdvancedStatistics.tsx
import React from "react";
import { Stats, WinRateData, Trade } from "../../types";

interface AdvancedStatisticsProps {
  stats: Stats;
  winRateData: WinRateData;
  trades?: Trade[];
}

export const AdvancedStatistics: React.FC<AdvancedStatisticsProps> = ({
  stats,
  winRateData,
  trades = [],
}) => {
  // Tính lại nếu stats.averageWin hoặc averageLoss là 0.00
  let averageWin = stats.averageWin;
  let averageLoss = stats.averageLoss;
  if ((averageWin === "0.00" || averageLoss === "0.00") && trades.length > 0) {
    const winTrades = trades.filter((t) => {
      const profitValue =
        typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
      return typeof profitValue === "number" && profitValue > 0;
    });
    const lossTrades = trades.filter((t) => {
      const profitValue =
        typeof t.profit === "string" ? parseFloat(t.profit) : t.profit;
      return typeof profitValue === "number" && profitValue < 0;
    });
    const grossProfitAll = winTrades.reduce(
      (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
      0
    );
    const grossLossAll = Math.abs(
      lossTrades.reduce(
        (sum, t) => sum + (typeof t.profit === "number" ? t.profit : 0),
        0
      )
    );
    averageWin =
      winTrades.length > 0
        ? (grossProfitAll / winTrades.length).toFixed(2)
        : "0.00";
    averageLoss =
      lossTrades.length > 0
        ? (grossLossAll / lossTrades.length).toFixed(2)
        : "0.00";
  }

  return (
    <>
      {/* Advanced Statistics Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Thống kê chi tiết
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-12">
            <div>
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-4 pb-1 border-b border-gray-200 dark:border-gray-700">
                Performance Metrics
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Total Profit
                  </dt>
                  <dd
                    className={`text-sm font-medium ${
                      parseFloat(stats.totalProfit) >= 0
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {stats.totalProfit}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Annualized Return
                  </dt>
                  <dd className="text-sm font-medium">
                    {stats.annualizedReturn}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Win Rate
                  </dt>
                  <dd className="text-sm font-medium">{winRateData.winRate}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Profit Factor
                  </dt>
                  <dd className="text-sm font-medium">{stats.profitFactor}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Expectancy
                  </dt>
                  <dd className="text-sm font-medium">{stats.expectancy}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Profit Per Day
                  </dt>
                  <dd className="text-sm font-medium">{stats.profitPerDay}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-4 pb-1 border-b border-gray-200 dark:border-gray-700">
                Risk Metrics
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Volatility
                  </dt>
                  <dd className="text-sm font-medium">{stats.volatility}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Sharpe Ratio
                  </dt>
                  <dd className="text-sm font-medium">{stats.sharpeRatio}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Sortino Ratio
                  </dt>
                  <dd className="text-sm font-medium">{stats.sortinoRatio}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Calmar Ratio
                  </dt>
                  <dd className="text-sm font-medium">{stats.calmarRatio}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Risk of Ruin
                  </dt>
                  <dd className="text-sm font-medium">{stats.riskOfRuin}</dd>
                </div>
              </dl>
            </div>

            <div>
              <h4 className="text-md font-medium text-gray-800 dark:text-gray-300 mb-4 pb-1 border-b border-gray-200 dark:border-gray-700">
                Trade Statistics
              </h4>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Total Trades
                  </dt>
                  <dd className="text-sm font-medium">{stats.totalTrades}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Average Win
                  </dt>
                  <dd className="text-sm font-medium text-green-600 dark:text-green-400">
                    {averageWin}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Average Loss
                  </dt>
                  <dd className="text-sm font-medium text-red-600 dark:text-red-400">
                    {averageLoss}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Largest Win
                  </dt>
                  <dd className="text-sm font-medium text-green-600 dark:text-green-400">
                    {stats.largestWin}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Largest Loss
                  </dt>
                  <dd className="text-sm font-medium text-red-600 dark:text-red-400">
                    {stats.largestLoss}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">
                    Max Consecutive Wins
                  </dt>
                  <dd className="text-sm font-medium">
                    {stats.maxConsecutiveWins}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Win Rate Details */}
      <div className="col-span-12 lg:col-span-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-2">Chi tiết hiệu suất Bot</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-gray-500">Giao dịch thắng</div>
              <div className="text-xl font-bold text-green-500">
                {winRateData.winTrades}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Giao dịch thua</div>
              <div className="text-xl font-bold text-red-500">
                {winRateData.lossTrades}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-500">Win Rate</div>
              <div className="text-xl font-bold text-blue-500">
                {winRateData.winRate}
              </div>
            </div>
          </div>
          <div className="mt-3 text-center">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Chỉ tính {winRateData.totalValidTrades} giao dịch có kết quả (loại
              bỏ Pending)
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
