import React, { useState, useEffect, useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ReferenceLine,
  ComposedChart,
  Line,
  Area,
  AreaChart,
  Cell,
  ReferenceDot,
  PieChart,
  Pie,
  Legend,
  LineChart,
  LabelList,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Clock,
  Target,
  DollarSign,
  Activity,
  Award,
  Eye,
  EyeOff,
  Settings,
  Download,
  RefreshCw,
  Maximize2,
  Filter,
  Zap,
  Shield,
  Globe,
  Sparkles,
} from "lucide-react";
import { ApiService } from "../../services/api";
import { ChartDataGenerator } from "../../utils/chartDataGenerator";

// Helper chia an toàn
function safeDivide(a: any, b: any, fixed = 2) {
  const numA = Number(a);
  const numB = Number(b);
  if (
    a === undefined ||
    a === null ||
    b === undefined ||
    b === null ||
    isNaN(numA) ||
    isNaN(numB) ||
    !isFinite(numA) ||
    !isFinite(numB) ||
    numB === 0
  ) {
    return "0.00";
  }
  const result = numA / numB;
  return isNaN(result) || !isFinite(result) ? "0.00" : result.toFixed(fixed);
}

// Enhanced ProfitDistributionTooltip component
const ProfitDistributionTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gradient-to-br from-gray-900/98 via-purple-900/95 to-gray-900/98 border border-purple-400/40 rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"></div>
          <p className="text-white font-bold text-sm">{label}</p>
        </div>
        <div className="space-y-2">
          <p className="text-purple-200 text-sm">
            Số giao dịch:{" "}
            <span className="text-white font-semibold text-base">
              {payload[0].value}
            </span>
          </p>
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              style={{ width: `${(payload[0].value / 40) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

// Enhanced Custom Tooltip
const CustomTooltip = ({
  active,
  payload,
  label,
  formatter,
  theme = "default",
}: {
  active?: any;
  payload?: any;
  label?: any;
  formatter?: (value: any, name?: any) => any;
  theme?: string;
}) => {
  if (active && payload && payload.length) {
    const themeConfig: {
      [key: string]: { bg: string; accent: string; icon: any };
    } = {
      monthly: {
        bg: "from-blue-900/98 via-cyan-900/95 to-blue-900/98",
        accent: "blue-400",
        icon: BarChart3,
      },
      profit: {
        bg: "from-purple-900/98 via-pink-900/95 to-purple-900/98",
        accent: "purple-400",
        icon: DollarSign,
      },
      risk: {
        bg: "from-emerald-900/98 via-teal-900/95 to-emerald-900/98",
        accent: "emerald-400",
        icon: Shield,
      },
      timing: {
        bg: "from-amber-900/98 via-orange-900/95 to-amber-900/98",
        accent: "amber-400",
        icon: Clock,
      },
      default: {
        bg: "from-gray-900/98 via-slate-900/95 to-gray-900/98",
        accent: "gray-400",
        icon: Activity,
      },
    };

    const config = themeConfig[theme];
    const Icon = config.icon;

    return (
      <div
        className={`bg-gradient-to-br ${config.bg} border border-${config.accent}/40 rounded-2xl p-5`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`p-2 bg-gradient-to-br from-${config.accent} to-${config.accent}/60 rounded-lg`}
          >
            <Icon size={14} className="text-white" />
          </div>
          <p className="text-white font-bold text-sm">{label}</p>
        </div>
        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-300 text-sm">{entry.name}:</span>
              <span
                className="text-white font-semibold text-sm"
                style={{ color: entry.color }}
              >
                {formatter
                  ? formatter(entry.value, entry.name)[0]
                  : entry.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// Advanced Performance Indicator
const PerformanceIndicator = ({
  value,
  threshold,
  reverse = false,
  size = "sm",
  showDetails = false,
}: {
  value: any;
  threshold: number;
  reverse?: boolean;
  size?: string;
  showDetails?: boolean;
}) => {
  const numValue = parseFloat(value);
  const isGood = reverse ? numValue < threshold : numValue > threshold;
  const iconSize = size === "lg" ? 18 : 14;

  const getPerformanceLevel = () => {
    const ratio = reverse ? threshold / numValue : numValue / threshold;
    if (ratio >= 2)
      return { level: "Xuất sắc", color: "emerald", intensity: "500" };
    if (ratio >= 1.5) return { level: "Tốt", color: "green", intensity: "400" };
    if (ratio >= 1) return { level: "Khá", color: "yellow", intensity: "400" };
    return { level: "Cần cải thiện", color: "red", intensity: "400" };
  };

  const performance = getPerformanceLevel();

  return (
    <div
      className={`flex items-center gap-2 text-${performance.color}-${performance.intensity}`}
    >
      <div
        className={`p-1.5 bg-${performance.color}-${performance.intensity}/20 rounded-lg`}
      >
        {isGood ? (
          <TrendingUp size={iconSize} />
        ) : (
          <TrendingDown size={iconSize} />
        )}
      </div>
      <div className="flex flex-col">
        <span
          className={`${size === "lg" ? "text-sm" : "text-xs"} font-semibold`}
        >
          {performance.level}
        </span>
        {showDetails && (
          <span className="text-xs text-gray-400">
            {reverse ? `< ${threshold}` : `> ${threshold}`}
          </span>
        )}
      </div>
    </div>
  );
};

// Advanced Chart Header
const ChartHeader = ({
  icon: Icon,
  title,
  subtitle,
  gradient,
  onToggleFullscreen,
  onRefresh,
  showControls = true,
}: {
  icon: any;
  title: string;
  subtitle?: string;
  gradient: string;
  onToggleFullscreen?: () => void;
  onRefresh?: () => void;
  showControls?: boolean;
}) => (
  <div className="relative mb-8">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div
          className={`relative p-3 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg overflow-hidden`}
        >
          <Icon className="text-white relative z-10" size={24} />
          <div className="absolute inset-0 bg-white/20 rounded-full blur-xl transform scale-150"></div>
        </div>
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h3>
          <p className="text-gray-400 text-sm font-medium mt-1">{subtitle}</p>
        </div>
      </div>

      {showControls && (
        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl"
          >
            <RefreshCw
              size={16}
              className="text-gray-400 group-hover:text-white"
            />
          </button>
          <button
            onClick={onToggleFullscreen}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl"
          >
            <Maximize2
              size={16}
              className="text-gray-400 group-hover:text-white"
            />
          </button>
        </div>
      )}
    </div>

    <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full opacity-5"></div>
    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full opacity-5"></div>
  </div>
);

// Advanced Metric Card
const MetricCard = ({
  icon: Icon,
  label,
  value,
  change,
  threshold,
  reverse = false,
  gradient,
}: {
  icon: any;
  label: string;
  value: string;
  change?: string;
  threshold: number;
  reverse?: boolean;
  gradient: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-800/60 border border-white/10 rounded-2xl p-6 group cursor-pointer overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0`}
      ></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${gradient} rounded-xl`}>
            <Icon size={20} className="text-white" />
          </div>
          <PerformanceIndicator
            value={value}
            threshold={threshold}
            reverse={reverse}
            showDetails={isHovered}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-gray-300 text-sm font-semibold tracking-wide">
            {label}
          </h4>
          <p className="text-white text-2xl font-bold">{value}</p>
          {change && (
            <p className="text-green-400 text-xs font-medium flex items-center gap-1">
              <TrendingUp size={12} />
              {change}
            </p>
          )}
        </div>
      </div>

      <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
    </div>
  );
};

interface AnalyticsChartsProps {
  chartData?: any;
  stats?: any;
  trades?: any[];
  winRateData?: any;
  selectedBotId?: string | null;
}

export const AnalyticsCharts: React.FC<AnalyticsChartsProps> = React.memo(
  ({ chartData, stats, trades, winRateData, selectedBotId }) => {
    const [selectedChart, setSelectedChart] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [loadingProfitDist, setLoadingProfitDist] = useState(false);
    const [maxRows, setMaxRows] = useState(20);

    // Lấy winRate từ winRateData nếu có, fallback sang stats.winRate
    let winRateValue = "0.00%";
    if (winRateData && winRateData.winRate) {
      winRateValue = winRateData.winRate;
    } else if (stats && stats.winRate) {
      winRateValue = stats.winRate;
    }
    // Chuyển winRate về số trên thang 3.0 (ví dụ: 60% => 1.8)
    let winRateScore = 0;
    if (typeof winRateValue === "string" && winRateValue.includes("%")) {
      const num = parseFloat(winRateValue.replace("%", ""));
      winRateScore = Math.max(0, Math.min(3, (num / 100) * 3));
    } else if (!isNaN(Number(winRateValue))) {
      winRateScore = Math.max(0, Math.min(3, (Number(winRateValue) / 100) * 3));
    }

    const handleRefresh = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1000);
    };

    // Memo hóa riskMetricsData
    const riskMetricsData = useMemo(() => {
      return chartData.riskMetricsData
        ? chartData.riskMetricsData.filter(
            (item: any) => !item.name.toLowerCase().includes("win")
          )
        : [];
    }, [chartData.riskMetricsData]);

    // Memo hóa completedTrades
    const completedTrades = useMemo(() => {
      return (trades || []).filter(
        (t) =>
          t &&
          t.entryDate &&
          ["Completed", "Win", "Loss"].includes(t.status) &&
          !isNaN(new Date(t.entryDate).getTime())
      );
    }, [trades]);

    // Memo hóa tradesThisMonth
    const tradesThisMonth = useMemo(() => {
      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();
      return (trades || []).filter((trade) => {
        if (!trade.entryDate) return false;
        const date = new Date(trade.entryDate);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      });
    }, [trades]);

    // Memo hóa timingData
    const timingData = useMemo(() => {
      return ChartDataGenerator.generateTradeTiming(completedTrades, undefined);
    }, [completedTrades]);

    // Memo hóa profitDistribution
    const profitDistribution = useMemo(() => {
      // Lấy dữ liệu từ ChartDataGenerator để có trường fill (màu)
      return ChartDataGenerator.generateProfitDistribution(trades || [], {
        danger: "#dc2626",
        success: "#059669",
      });
    }, [trades, selectedBotId]);

    // Memo hóa các biến phụ trợ cho PieChart
    const totalTrades = useMemo(
      () =>
        profitDistribution.reduce((sum, item) => sum + (item.count || 0), 0),
      [profitDistribution]
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 w-full px-2 sm:px-4 md:px-8 py-4 md:py-6">
        {/* Enhanced Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
            <div>
              <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-1 sm:mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-gray-400 text-base sm:text-lg">
                Phân tích chuyên sâu hiệu suất giao dịch
              </p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="px-3 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl flex items-center gap-1 sm:gap-2 text-xs sm:text-base">
                <Download size={16} className="sm:hidden" />
                <Download size={18} className="hidden sm:inline" />
                <span className="hidden sm:inline">Xuất báo cáo</span>
              </button>
              <button className="p-2 sm:p-3 bg-white/5 border border-white/10 rounded-xl">
                <Settings size={16} className="sm:hidden text-gray-400" />
                <Settings
                  size={18}
                  className="hidden sm:inline text-gray-400"
                />
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-8">
            <MetricCard
              icon={Activity}
              label="Tổng giao dịch"
              value={stats.totalTrades}
              threshold={1000}
              gradient="from-blue-500 to-cyan-600"
            />
            <MetricCard
              icon={Target}
              label="Tỷ lệ thắng"
              value={winRateValue}
              threshold={60}
              gradient="from-green-500 to-emerald-600"
            />
            <MetricCard
              icon={Shield}
              label="Max Drawdown"
              value={stats.maxDrawdown}
              threshold={20}
              reverse={true}
              gradient="from-purple-500 to-pink-600"
            />
            <MetricCard
              icon={DollarSign}
              label="Tổng volume"
              value={stats.totalVolume}
              threshold={100000}
              gradient="from-orange-500 to-red-600"
            />
          </div>
        </div>

        {/* Main Charts Grid */}
        <div className="space-y-6 sm:space-y-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
            {/* Monthly Performance - Enhanced AreaChart */}
            <div className="relative bg-gradient-to-br from-slate-900/80 via-blue-900/10 to-slate-900/80 rounded-3xl p-8 border border-blue-500/20 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-cyan-600/5 opacity-0"></div>

              <ChartHeader
                icon={BarChart3}
                title="Hiệu Suất Theo Tháng"
                subtitle="Xu hướng tăng trưởng và biến động qua thời gian"
                gradient="from-blue-500 to-cyan-600"
                onRefresh={handleRefresh}
                onToggleFullscreen={() => setSelectedChart("monthly")}
              />

              <div className="h-[350px] relative z-10">
                {chartData.monthlyPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData.monthlyPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <defs>
                        <linearGradient
                          id="monthlyArea"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#3b82f6"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="50%"
                            stopColor="#06b6d4"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="100%"
                            stopColor="#1e3a8a"
                            stopOpacity={0.1}
                          />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur
                            stdDeviation="3"
                            result="coloredBlur"
                          />
                          <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                          </feMerge>
                        </filter>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 12,
                          fill: "#9ca3af",
                          fontWeight: 600,
                        }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 12,
                          fill: "#9ca3af",
                          fontWeight: 600,
                        }}
                        tickFormatter={(value) => `${value.toFixed(1)}%`}
                      />
                      <Tooltip
                        content={(props) => (
                          <CustomTooltip
                            {...props}
                            theme="monthly"
                            formatter={(value: any) => [
                              `${value.toFixed(2)}%`,
                              "Hiệu suất",
                            ]}
                          />
                        )}
                      />
                      <Area
                        type="monotone"
                        dataKey="performance"
                        stroke="#3b82f6"
                        fill="url(#monthlyArea)"
                        strokeWidth={3}
                        filter="url(#glow)"
                        dot={{
                          r: 6,
                          fill: "#fff",
                          stroke: "#3b82f6",
                          strokeWidth: 3,
                        }}
                        activeDot={{
                          r: 10,
                          fill: "#3b82f6",
                          stroke: "#fff",
                          strokeWidth: 3,
                        }}
                        isAnimationActive={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-blue-300">
                    <Activity className="mb-4 opacity-50" size={48} />
                    <p className="font-medium text-lg">
                      Không có dữ liệu hiệu suất
                    </p>
                  </div>
                )}
                {/* Thống kê phụ bên dưới biểu đồ hiệu suất theo tháng */}
                {chartData.monthlyPerformance.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-4 border border-blue-400/10">
                    <div>
                      <span className="text-gray-400">Tổng số tháng:</span>
                      <span className="ml-2 text-white font-bold">
                        {chartData.monthlyPerformance.length}
                      </span>
                    </div>
                    {chartData.monthlyPerformance.length === 1 ? (
                      <div className="col-span-2 md:col-span-3 text-center">
                        <span className="text-gray-400">Tháng duy nhất:</span>
                        <span
                          className={
                            chartData.monthlyPerformance[0].performance >= 0
                              ? "ml-2 text-green-400 font-bold"
                              : "ml-2 text-red-400 font-bold"
                          }
                        >
                          {chartData.monthlyPerformance[0].month} (
                          {chartData.monthlyPerformance[0].performance.toFixed(
                            2
                          )}
                          %)
                        </span>
                      </div>
                    ) : (
                      <>
                        {/* Tháng lãi nhiều nhất */}
                        {chartData.monthlyPerformance.some(
                          (m: { performance: number }) => m.performance > 0
                        ) && (
                          <div>
                            <span className="text-gray-400">
                              Tháng lãi nhiều nhất:
                            </span>
                            <span className="ml-2 text-green-400 font-bold">
                              {
                                chartData.monthlyPerformance
                                  .filter(
                                    (m: { performance: number }) =>
                                      m.performance > 0
                                  )
                                  .reduce(
                                    (
                                      max: {
                                        performance: number;
                                        month: string;
                                      },
                                      cur: {
                                        performance: number;
                                        month: string;
                                      }
                                    ) =>
                                      cur.performance > max.performance
                                        ? cur
                                        : max
                                  ).month
                              }{" "}
                              (
                              {chartData.monthlyPerformance
                                .filter(
                                  (m: { performance: number }) =>
                                    m.performance > 0
                                )
                                .reduce(
                                  (
                                    max: { performance: number; month: string },
                                    cur: { performance: number; month: string }
                                  ) =>
                                    cur.performance > max.performance
                                      ? cur
                                      : max
                                )
                                .performance.toFixed(2)}
                              %)
                            </span>
                          </div>
                        )}
                        {/* Tháng lỗ nhiều nhất */}
                        {chartData.monthlyPerformance.some(
                          (m: { performance: number }) => m.performance < 0
                        ) && (
                          <div>
                            <span className="text-gray-400">
                              Tháng lỗ nhiều nhất:
                            </span>
                            <span className="ml-2 text-red-400 font-bold">
                              {
                                chartData.monthlyPerformance
                                  .filter(
                                    (m: { performance: number }) =>
                                      m.performance < 0
                                  )
                                  .reduce(
                                    (
                                      min: {
                                        performance: number;
                                        month: string;
                                      },
                                      cur: {
                                        performance: number;
                                        month: string;
                                      }
                                    ) =>
                                      cur.performance < min.performance
                                        ? cur
                                        : min
                                  ).month
                              }{" "}
                              (
                              {chartData.monthlyPerformance
                                .filter(
                                  (m: { performance: number }) =>
                                    m.performance < 0
                                )
                                .reduce(
                                  (
                                    min: { performance: number; month: string },
                                    cur: { performance: number; month: string }
                                  ) =>
                                    cur.performance < min.performance
                                      ? cur
                                      : min
                                )
                                .performance.toFixed(2)}
                              %)
                            </span>
                          </div>
                        )}
                      </>
                    )}
                    <div>
                      <span className="text-gray-400">Số tháng lãi:</span>
                      <span className="ml-2 text-green-300 font-bold">
                        {
                          chartData.monthlyPerformance.filter(
                            (m: { performance: number; month: string }) =>
                              m.performance > 0
                          ).length
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Số tháng lỗ:</span>
                      <span className="ml-2 text-red-300 font-bold">
                        {
                          chartData.monthlyPerformance.filter(
                            (m: { performance: number; month: string }) =>
                              m.performance < 0
                          ).length
                        }
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">
                        Trung bình hiệu suất tháng:
                      </span>
                      <span className="ml-2 text-blue-300 font-bold">
                        {(
                          chartData.monthlyPerformance.reduce(
                            (
                              sum: number,
                              m: { performance: number; month: string }
                            ) => sum + m.performance,
                            0
                          ) / chartData.monthlyPerformance.length
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profit Distribution - Enhanced PieChart */}
            <div className="relative bg-gradient-to-br from-slate-900/80 via-purple-900/10 to-slate-900/80 rounded-3xl p-8 border border-purple-500/20 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0"></div>

              <ChartHeader
                icon={DollarSign}
                title="Phân Phối Lợi Nhuận"
                subtitle="Tổng quan phân phối lợi nhuận các giao dịch"
                gradient="from-purple-500 to-pink-600"
                onRefresh={handleRefresh}
                onToggleFullscreen={() => setSelectedChart("profit")}
              />

              <div className="relative z-10 flex flex-col gap-6 items-stretch w-full">
                {loadingProfitDist ? (
                  <div className="flex items-center justify-center h-full text-purple-300 w-full">
                    <div className="flex items-center gap-3">
                      <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full" />
                      <span className="text-lg">Đang tải dữ liệu...</span>
                    </div>
                  </div>
                ) : profitDistribution.length > 0 ? (
                  <>
                    {/* PieChart */}
                    <div className="w-full flex items-center justify-center h-[320px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <defs>
                            <linearGradient
                              id="pieGradient1"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#a21caf" />
                              <stop offset="100%" stopColor="#f472b6" />
                            </linearGradient>
                            <linearGradient
                              id="pieGradient2"
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="1"
                            >
                              <stop offset="0%" stopColor="#3b82f6" />
                              <stop offset="100%" stopColor="#06b6d4" />
                            </linearGradient>
                          </defs>
                          <Pie
                            data={profitDistribution}
                            dataKey="count"
                            nameKey="range"
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={140}
                            paddingAngle={2}
                            label={renderCustomPieLabel}
                            labelLine={false}
                            isAnimationActive={false}
                          >
                            {profitDistribution.map((entry, idx) => (
                              <Cell key={entry.range} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                const total = profitDistribution.reduce(
                                  (sum, item) => sum + (item.count || 0),
                                  0
                                );
                                const percent =
                                  total > 0
                                    ? ((data.count / total) * 100).toFixed(1)
                                    : "0.0";
                                return (
                                  <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-4 shadow-xl min-w-[160px]">
                                    <div className="text-white font-bold mb-1">
                                      {data.range}
                                    </div>
                                    <div className="text-purple-300 text-sm">
                                      Số giao dịch:{" "}
                                      <span className="text-white font-semibold">
                                        {data.count}
                                      </span>
                                    </div>
                                    <div className="text-pink-400 text-xs mt-1">
                                      Tỉ lệ: {percent}%
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    {/* Bảng chi tiết phân phối lợi nhuận */}
                    <div className="w-full bg-gradient-to-br from-slate-800/60 to-slate-900/80 border border-purple-500/10 rounded-2xl p-4 shadow-lg flex flex-col justify-between">
                      <div className="font-bold text-white mb-2 text-center text-base">
                        Bảng chi tiết
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-purple-300">
                            <th className="py-1 px-2 text-center font-semibold">
                              Khoảng lợi nhuận
                            </th>
                            <th className="py-1 px-2 text-center font-semibold">
                              Số giao dịch
                            </th>
                            <th className="py-1 px-2 text-center font-semibold">
                              Tỉ lệ (%)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {profitDistribution.slice(0, maxRows).map((row) => {
                            const percent =
                              totalTrades > 0
                                ? ((row.count / totalTrades) * 100).toFixed(1)
                                : "0.0";
                            return (
                              <tr
                                key={row.range}
                                className="text-center border-b border-purple-500/5 last:border-0"
                              >
                                <td className="py-1 px-2 text-purple-200 font-semibold">
                                  {row.range}
                                </td>
                                <td className="py-1 px-2 text-white font-bold">
                                  {row.count}
                                </td>
                                <td className="py-1 px-2 text-pink-400 font-bold">
                                  {percent}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {profitDistribution.length > maxRows && (
                        <tfoot>
                          <tr>
                            <td colSpan={3} className="py-2 text-center">
                              <button
                                className="px-4 py-1 rounded bg-purple-700 text-white hover:bg-purple-800"
                                onClick={() => setMaxRows((prev) => prev + 20)}
                              >
                                Xem thêm
                              </button>
                            </td>
                          </tr>
                        </tfoot>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-purple-300 w-full">
                    Không có dữ liệu
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="w-full relative bg-gradient-to-br from-slate-900/80 via-amber-900/10 to-slate-900/80 rounded-3xl p-8 border border-amber-500/20 group overflow-hidden mt-8">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600/5 via-transparent to-orange-600/5 opacity-0"></div>

            <ChartHeader
              icon={Clock}
              title="Phân Bố Thời Gian Giao Dịch"
              subtitle="Phân tích hiệu quả và khối lượng theo giờ"
              gradient="from-amber-500 to-orange-600"
              onRefresh={handleRefresh}
              onToggleFullscreen={() => setSelectedChart("timing")}
            />

            {/* Time Analysis Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-400/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap size={14} className="text-amber-400" />
                  <span className="text-amber-300 text-xs font-semibold">
                    Giờ cao điểm
                  </span>
                </div>
                <p className="text-white text-lg font-bold">
                  {(() => {
                    const maxTrade = timingData.reduce(
                      (max: any, curr: any) =>
                        curr.totalTrades > max.totalTrades ? curr : max,
                      { totalTrades: -1 }
                    );
                    return maxTrade &&
                      typeof maxTrade.label === "string" &&
                      maxTrade.totalTrades > 0
                      ? maxTrade.label
                      : "--";
                  })()}
                </p>
                <p className="text-amber-200 text-xs">
                  {(() => {
                    const maxTrade = timingData.reduce(
                      (max: any, curr: any) =>
                        curr.totalTrades > max.totalTrades ? curr : max,
                      { totalTrades: -1 }
                    );
                    return isFinite(maxTrade?.totalTrades) &&
                      maxTrade.totalTrades > 0
                      ? maxTrade.totalTrades
                      : "0";
                  })()}{" "}
                  {"giao dịch"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-green-400/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={14} className="text-green-400" />
                  <span className="text-green-300 text-xs font-semibold">
                    Volume cao nhất
                  </span>
                </div>
                <p className="text-white text-lg font-bold">
                  $
                  {(() => {
                    const maxVolume = timingData.reduce(
                      (max: any, curr: any) =>
                        curr.totalVolume > max.totalVolume ? curr : max,
                      { totalVolume: -1 }
                    );
                    return isFinite(maxVolume?.totalVolume) &&
                      maxVolume.totalVolume > 0
                      ? (maxVolume.totalVolume / 1000).toFixed(1)
                      : "0.0";
                  })()}
                </p>
                <p className="text-green-200 text-xs">
                  Lúc{" "}
                  {(() => {
                    const maxVolume = timingData.reduce(
                      (max: any, curr: any) =>
                        curr.totalVolume > max.totalVolume ? curr : max,
                      { totalVolume: -1 }
                    );
                    return maxVolume &&
                      typeof maxVolume.label === "string" &&
                      maxVolume.totalVolume > 0
                      ? maxVolume.label
                      : "--";
                  })()}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-400/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign size={14} className="text-blue-400" />
                  <span className="text-blue-300 text-xs font-semibold">
                    Avg trade size
                  </span>
                </div>
                <p className="text-white text-lg font-bold">
                  {(() => {
                    const totalVolume = timingData.reduce(
                      (sum: number, item: any) =>
                        isFinite(item.totalVolume)
                          ? sum + item.totalVolume
                          : sum,
                      0
                    );
                    const totalTrades = timingData.reduce(
                      (sum: number, item: any) =>
                        isFinite(item.totalTrades)
                          ? sum + item.totalTrades
                          : sum,
                      0
                    );
                    return totalTrades > 0
                      ? (totalVolume / totalTrades).toFixed(2)
                      : "0.00";
                  })()}
                </p>
                <p className="text-blue-200 text-xs">Trung bình</p>
              </div>
            </div>

            <div className="h-[320px] relative z-10">
              {timingData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={timingData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#374151"
                        opacity={0.3}
                      />
                      <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#fde68a",
                          fontWeight: 600,
                        }}
                        interval={0}
                        angle={-45}
                        textAnchor="end"
                        height={60}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{
                          fontSize: 11,
                          fill: "#fde68a",
                          fontWeight: 600,
                        }}
                        label={{
                          value: "Số giao dịch",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fill: "#fde68a" },
                        }}
                      />
                      <Tooltip
                        content={({ active, payload, label }: any) => {
                          if (active && payload && payload.length) {
                            const data = payload[0].payload;
                            return (
                              <div className="bg-gradient-to-br from-amber-900/98 via-orange-900/95 to-amber-900/98 border border-amber-400/40 rounded-2xl p-5">
                                <div className="flex items-center gap-2 mb-3">
                                  <Clock size={16} className="text-amber-400" />
                                  <p className="text-white font-bold">
                                    {label}
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-amber-200 text-sm">
                                      Giao dịch:
                                    </span>
                                    <span className="text-white font-semibold">
                                      {data.totalTrades}
                                    </span>
                                  </div>
                                  <div className="flex items-center justify-between">
                                    <span className="text-emerald-200 text-sm">
                                      Volume:
                                    </span>
                                    <span className="text-green-400 font-semibold">
                                      ${data.totalVolume.toLocaleString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Bar dataKey="totalTrades" isAnimationActive={false}>
                        {(() => {
                          const maxTrade = Math.max(
                            ...timingData.map((d: any) => d.totalTrades)
                          );
                          return timingData.map((entry: any, idx: number) => (
                            <Cell
                              key={entry.label}
                              fill={
                                entry.totalTrades === maxTrade
                                  ? "#f59e42"
                                  : "#3b82f6"
                              }
                              stroke={
                                entry.totalTrades === maxTrade
                                  ? "#ef4444"
                                  : undefined
                              }
                              strokeWidth={
                                entry.totalTrades === maxTrade ? 2 : 0
                              }
                            />
                          ));
                        })()}
                      </Bar>
                      {/* Hiển thị số lượng giao dịch trên đầu mỗi cột nếu đủ cao */}
                      <LabelList
                        dataKey="totalTrades"
                        position="top"
                        formatter={(value: any) => (value > 0 ? value : "")}
                        style={{
                          fill: "#fff",
                          fontWeight: 700,
                          fontSize: 13,
                          textShadow: "0 1px 4px #0008",
                        }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                  {/* Chú thích khung giờ giao dịch nhiều nhất */}
                  {(() => {
                    const maxTrade = Math.max(
                      ...timingData.map((d: any) => d.totalTrades)
                    );
                    const peak = timingData.find(
                      (d: any) => d.totalTrades === maxTrade
                    );
                    return peak && maxTrade > 0 ? (
                      <div className="mt-3 text-center text-amber-300 font-semibold text-base">
                        Khung giờ giao dịch nhiều nhất:{" "}
                        <span className="text-white font-bold">
                          {peak.label}
                        </span>{" "}
                        (
                        <span className="text-orange-400">
                          {peak.totalTrades} giao dịch
                        </span>
                        )
                      </div>
                    ) : null;
                  })()}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-amber-300">
                  <Clock className="mb-4 opacity-50" size={48} />
                  <p className="font-medium text-lg">
                    Không có dữ liệu thời gian
                  </p>
                </div>
              )}
            </div>

            {/* Time Performance Summary */}
            <div className="mt-6 relative z-10">
              <div className="w-full rounded-xl overflow-hidden bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-400/20 p-4">
                <h4 className="text-amber-300 font-semibold mb-3 flex items-center gap-2">
                  <Activity size={16} />
                  Thống Kê Giao Dịch Theo Thời Gian
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">
                      Tổng giao dịch
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {(() => {
                        const totalTrades = timingData.reduce(
                          (sum: number, item: any) =>
                            isFinite(item.totalTrades)
                              ? sum + item.totalTrades
                              : sum,
                          0
                        );
                        return totalTrades;
                      })()}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">
                      Tổng volume
                    </span>
                    <span className="text-2xl font-bold text-green-400">
                      $
                      {(() => {
                        const totalVolume = timingData.reduce(
                          (sum: number, item: any) =>
                            isFinite(item.totalVolume)
                              ? sum + item.totalVolume
                              : sum,
                          0
                        );
                        return isFinite(totalVolume)
                          ? (totalVolume / 1000).toFixed(1)
                          : "0.0";
                      })()}
                      K
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">
                      Avg trade size
                    </span>
                    <span className="text-2xl font-bold text-white">
                      {(() => {
                        const totalVolume = timingData.reduce(
                          (sum: number, item: any) =>
                            isFinite(item.totalVolume)
                              ? sum + item.totalVolume
                              : sum,
                          0
                        );
                        const totalTrades = timingData.reduce(
                          (sum: number, item: any) =>
                            isFinite(item.totalTrades)
                              ? sum + item.totalTrades
                              : sum,
                          0
                        );
                        return totalTrades > 0
                          ? (totalVolume / totalTrades).toFixed(2)
                          : "0.00";
                      })()}
                    </span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-gray-400 mb-1">
                      Giờ hoạt động nhiều nhất
                    </span>
                    <span className="text-2xl font-bold text-amber-300">
                      {(() => {
                        const maxTrade = Math.max(
                          ...timingData.map((d: any) => d.totalTrades)
                        );
                        const peak = timingData.find(
                          (d: any) => d.totalTrades === maxTrade
                        );
                        return peak && maxTrade > 0 ? peak.label : "-";
                      })()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Bottom Section - Performance Insights */}
          <div className="bg-gradient-to-br from-slate-900/80 via-slate-800/40 to-slate-900/80 rounded-3xl shadow p-8 border border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    Thông Tin Chi Tiết
                  </h3>
                  <p className="text-gray-400 text-sm font-medium">
                    Phân tích sâu các chỉ số quan trọng
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-xl text-sm font-semibold border border-green-500/30">
                  Hiệu suất tốt
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Activity,
                  label: "Total Trades",
                  value: stats.totalTrades,
                  description: "Tổng số giao dịch thực hiện",
                  threshold: 1000,
                  gradient: "from-blue-500 to-cyan-600",
                  improvement: "+156 trades",
                },
                {
                  icon: Target,
                  label: "Win Rate",
                  value: winRateValue,
                  description: "Tỷ lệ giao dịch thành công",
                  threshold: 60,
                  gradient: "from-emerald-500 to-teal-600",
                  improvement: "+2.4%",
                },
                {
                  icon: TrendingUp,
                  label: "Profit Factor",
                  value: stats.profitFactor,
                  description: "Hệ số lợi nhuận",
                  threshold: 1.5,
                  gradient: "from-purple-500 to-pink-600",
                  improvement: "+0.12",
                },
                {
                  icon: Shield,
                  label: "Max Drawdown",
                  value: stats.maxDrawdown,
                  description: "Tổn thất tối đa",
                  threshold: 20,
                  reverse: true,
                  gradient: "from-orange-500 to-red-600",
                  improvement: "-1.2%",
                },
              ].map((metric, index) => (
                <div
                  key={index}
                  className="relative bg-gradient-to-br from-slate-800/60 via-slate-900/40 to-slate-800/60 rounded-2xl p-6 group cursor-pointer overflow-hidden"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${metric.gradient} opacity-0`}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 bg-gradient-to-br ${metric.gradient} rounded-xl`}
                      >
                        <metric.icon size={20} className="text-white" />
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-white">
                          {metric.value}
                        </p>
                        <p className="text-xs text-green-400 font-semibold">
                          {metric.improvement}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-white font-semibold">
                        {metric.label}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {metric.description}
                      </p>
                      <PerformanceIndicator
                        value={metric.value}
                        threshold={metric.threshold}
                        reverse={metric.reverse}
                        size="sm"
                      />
                    </div>
                  </div>

                  <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full"></div>
                </div>
              ))}
            </div>

            {/* Additional Insights */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Zap size={20} className="text-blue-400" />
                  <h4 className="text-white font-semibold">Điểm Mạnh</h4>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Win rate ổn định trên 60%</li>
                  <li>• Volume giao dịch tăng đều</li>
                  <li>• Kiểm soát drawdown tốt</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Globe size={20} className="text-amber-400" />
                  <h4 className="text-white font-semibold">Cơ Hội Cải Thiện</h4>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Tăng frequency trong khung giờ cao điểm</li>
                  <li>• Tối ưu hóa trade size</li>
                  <li>• Cải thiện profit factor</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-purple-500/20 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Target size={20} className="text-purple-400" />
                  <h4 className="text-white font-semibold">
                    Mục Tiêu Tiếp Theo
                  </h4>
                </div>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Đạt win rate 65%+</li>
                  <li>• Giữ drawdown dưới 8%</li>
                  <li>• Tăng total volume 25%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-white/10">
              <div className="flex items-center gap-4">
                <RefreshCw className="animate-spin text-blue-400" size={24} />
                <span className="text-white font-semibold">
                  Đang cập nhật dữ liệu...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

export default AnalyticsCharts;

// Hàm vẽ cung tròn SVG cho gauge
function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
  return ["M", start.x, start.y, "A", r, r, 0, arcSweep, 0, end.x, end.y].join(
    " "
  );
}
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  };
}

function renderCustomPieLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
}) {
  if (percent < 0.03) return null;
  // Tính toán vị trí text nằm giữa lát
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={16}
      fontWeight={700}
      style={{ textShadow: "0 1px 4px #0008" }}
    >
      {(percent * 100).toFixed(1)}%
    </text>
  );
}
