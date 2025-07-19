// components/charts/ChartGrids.tsx
import React from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";
import { DrawdownTooltip } from "./DrawdownTooltip";

interface ChartGridsProps {
  chartData: any;
  stats: any;
}

export const ChartGrids: React.FC<ChartGridsProps> = ({ chartData, stats }) => {
  const theme = {
    success: "#10b981",
    danger: "#ef4444",
    dangerLight: "#f87171",
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Drawdown chart */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Drawdown
        </h3>
        <div className="h-[250px]">
          {chartData.drawdownData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.drawdownData}>
                <defs>
                  <linearGradient
                    id="colorDrawdown"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor={theme.dangerLight}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={theme.danger}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                  stroke="#9ca3af"
                  padding={{ left: 5, right: 5 }}
                />
                <YAxis
                  tickFormatter={(value) => `${value.toFixed(2)}`}
                  stroke="#9ca3af"
                  fontSize={11}
                  width={40}
                />
                <Tooltip content={<DrawdownTooltip />} />
                <Area
                  type="monotone"
                  dataKey="drawdown"
                  stroke={theme.danger}
                  strokeWidth={2}
                  fill="url(#colorDrawdown)"
                  activeDot={{
                    r: 6,
                    strokeWidth: 0,
                    fill: theme.danger,
                  }}
                />
                <ReferenceLine
                  y={0}
                  stroke={theme.danger}
                  strokeDasharray="3 3"
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <p>Không có dữ liệu</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Win/Loss Distribution */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Trade Distribution
        </h3>
        <div className="h-[250px] flex items-center">
          {chartData.tradeDistribution[0]?.value > 0 ||
          chartData.tradeDistribution[1]?.value > 0 ? (
            <>
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData.tradeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      labelLine={false}
                      isAnimationActive={true}
                      animationDuration={1000}
                      animationBegin={200}
                    >
                      {chartData.tradeDistribution.map(
                        (entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        )
                      )}
                    </Pie>
                    <Tooltip
                      formatter={(value, name) => [`${value} giao dịch`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="w-1/2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Giao dịch thắng
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                      {chartData.tradeDistribution[0]?.value || 0}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        (
                        {(
                          ((chartData.tradeDistribution[0]?.value || 0) /
                            (stats.totalTrades || 1)) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((chartData.tradeDistribution[0]?.value || 0) /
                              (stats.totalTrades || 1)) *
                            100
                          }%`,
                        }}
                        transition={{ duration: 1 }}
                        className="h-full bg-green-500 rounded-full"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center mb-1">
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        Giao dịch thua
                      </span>
                    </div>
                    <div className="text-xl font-bold text-gray-800 dark:text-white">
                      {chartData.tradeDistribution[1]?.value || 0}
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        (
                        {(
                          ((chartData.tradeDistribution[1]?.value || 0) /
                            (stats.totalTrades || 1)) *
                          100
                        ).toFixed(1)}
                        %)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            ((chartData.tradeDistribution[1]?.value || 0) /
                              (stats.totalTrades || 1)) *
                            100
                          }%`,
                        }}
                        transition={{ duration: 1 }}
                        className="h-full bg-red-500 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <div className="text-center">
                <p>Không có dữ liệu giao dịch</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
