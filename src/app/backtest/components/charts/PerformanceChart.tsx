// components/charts/PerformanceChart.tsx
import React, { useState } from "react";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  LineChart,
  RefreshCw,
} from "lucide-react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart,
  Bar,
} from "recharts";
import { CustomTooltip } from "./CustomTooltip";
import { ChartType, TimeFrame } from "../../types";

interface PerformanceChartProps {
  chartData: any;
  stats: any;
  timeframe: TimeFrame;
  loading: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  chartData,
  stats,
  timeframe,
  loading,
}) => {
  const [chartType, setChartType] = useState<ChartType>("area");

  const theme = {
    primary: "#3b82f6",
    secondary: "#10b981",
    success: "#10b981",
    danger: "#ef4444",
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 overflow-hidden border border-gray-100 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Performance
          </h3>
          <div className="flex items-center mt-1">
            <div
              className={`text-lg font-bold ${
                parseFloat(stats.totalProfit) >= 0
                  ? "text-green-500"
                  : "text-red-500"
              } flex items-center`}
            >
              {parseFloat(stats.totalProfit) >= 0 ? (
                <ArrowUpCircle size={18} className="mr-1" />
              ) : (
                <ArrowDownCircle size={18} className="mr-1" />
              )}
              {stats.totalProfit}
            </div>
            <span className="text-xs ml-2 px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
              {timeframe}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setChartType("area")}
            className={`p-2 rounded-md ${
              chartType === "area"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <AreaChart />
          </button>
          <button
            onClick={() => setChartType("line")}
            className={`p-2 rounded-md ${
              chartType === "line"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <LineChart />
          </button>
          <button
            onClick={() => setChartType("candle")}
            className={`p-2 rounded-md ${
              chartType === "candle"
                ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <Bar />
          </button>
        </div>
      </div>

      <div className="h-[400px] mt-4">
        {chartData.performanceData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "area" ? (
              <AreaChart
                data={chartData.performanceData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value: string) =>
                    new Date(value).toLocaleDateString("vi-VN", {
                      month: "2-digit",
                      day: "2-digit",
                    })
                  }
                />
                <YAxis
                  tickFormatter={(value) => `${value.toFixed(2)}`}
                  stroke="#9ca3af"
                  fontSize={12}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.1}
                />
              </AreaChart>
            ) : chartType === "line" ? (
              <RechartsLineChart data={chartData.performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                  stroke="#9ca3af"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={["dataMin - 5", "dataMax + 5"]}
                  tickFormatter={(value) => `${value.toFixed(2)}`}
                  stroke="#9ca3af"
                  fontSize={12}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Performance"
                  stroke={theme.primary}
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{
                    r: 8,
                    strokeWidth: 0,
                    fill: theme.primary,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="dailyChange"
                  name="Daily Change"
                  stroke={theme.secondary}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={{ r: 0 }}
                />
              </RechartsLineChart>
            ) : (
              <ComposedChart data={chartData.performanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#374151"
                  opacity={0.1}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(date) => {
                    const d = new Date(date);
                    return `${d.getDate()}/${d.getMonth() + 1}`;
                  }}
                  stroke="#9ca3af"
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={["dataMin - 5", "dataMax + 5"]}
                  tickFormatter={(value) => `${value.toFixed(2)}`}
                  stroke="#9ca3af"
                  fontSize={12}
                  width={60}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="dailyChange"
                  name="Daily Change"
                  fill={theme.success}
                  barSize={8}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  name="Cumulative"
                  stroke={theme.primary}
                  strokeWidth={2}
                  dot={false}
                />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
            <div className="text-center">
              {loading ? (
                <>
                  <RefreshCw size={40} className="mx-auto mb-4 animate-spin" />
                  <p>Đang tải dữ liệu biểu đồ...</p>
                </>
              ) : (
                <>
                  <LineChart size={40} className="mx-auto mb-4 opacity-50" />
                  <p>Không có dữ liệu hiệu suất</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
