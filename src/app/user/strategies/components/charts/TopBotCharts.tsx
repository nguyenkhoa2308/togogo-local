// ✅ PHIÊN BẢN CUỐI CHUẨN UI — Biểu đồ rõ chữ, spacing hợp lý, đầy đủ chức năng

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Target,
  BarChart3,
  DollarSign,
  Activity,
} from "lucide-react";

interface BotRanking {
  botId: number;
  botName: string;
  totalProfit: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
}

const formatNumber = (value: number, decimals = 2): string => {
  return new Intl.NumberFormat("vi-VN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

const getTopIcon = (index: number) => {
  const colors = [
    "bg-yellow-400",
    "bg-gray-400",
    "bg-orange-500",
    "bg-blue-500",
  ];
  return (
    <div
      className={`w-6 h-6 ${
        colors[index] || "bg-sky-500"
      } rounded-full flex items-center justify-center text-white text-xs font-bold shadow`}
    >
      {index + 1}
    </div>
  );
};

interface TopBotChartsProps {
  botRankings: BotRanking[];
}

export const TopBotCharts: React.FC<TopBotChartsProps> = ({ botRankings }) => {
  const profitDistribution = React.useMemo(() => {
    return botRankings
      .map((bot) => ({ name: bot.botName, profit: Number(bot.totalProfit) }))
      .sort((a, b) => b.profit - a.profit);
  }, [botRankings]);

  const profitPerTradeDistribution = React.useMemo(() => {
    return botRankings
      .map((bot) => {
        const totalTrades = Number(bot.totalTrades) || 0;
        const profitPerTrade =
          totalTrades > 0 ? Number(bot.totalProfit) / totalTrades : 0;
        return { name: bot.botName, profitPerTrade };
      })
      .sort((a, b) => b.profitPerTrade - a.profitPerTrade);
  }, [botRankings]);

  const tradesDistribution = React.useMemo(() => {
    return botRankings
      .map((bot) => ({
        name: bot.botName,
        winning: Number(bot.winningTrades),
        losing: Number(bot.losingTrades),
      }))
      .sort((a, b) => b.winning + b.losing - (a.winning + a.losing));
  }, [botRankings]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-950/90 p-4 rounded-xl shadow-xl border border-cyan-700/50 backdrop-blur-sm">
          <p className="text-sm font-semibold text-cyan-400 mb-3">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex justify-between text-slate-300 text-sm mb-1"
            >
              <span>{entry.name}:</span>
              <span className="font-mono font-semibold text-right">
                {formatNumber(entry.value)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartContainer = ({
    children,
    title,
    icon: Icon,
  }: {
    children: React.ReactNode;
    title: string;
    icon: React.ElementType;
  }) => (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-md overflow-x-auto">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-gradient-to-tr from-cyan-500 to-blue-600 rounded-xl">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white tracking-wide break-words line-clamp-2 max-w-[200px]">
          {title}
        </h3>
      </div>
      <div className="min-w-[600px] h-[320px] px-2">{children}</div>
    </div>
  );

  return (
    <div className="py-10 px-4">
      <div className="max-w-screen-xl mx-auto space-y-10 bg-slate-900/80 rounded-3xl px-6 py-10">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-emerald-400">
            PHÁI SINH TRADING ANALYTICS
          </h1>
          <p className="text-slate-400 mt-2 text-lg">
            Professional Trading Bot Performance Dashboard
          </p>
        </div>

        <ChartContainer title="PHÂN BỐ LỢI NHUẬN TỔNG" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={profitDistribution}>
              <defs>
                <linearGradient id="gradientProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity={1} />
                  <stop offset="100%" stopColor="#0e7490" stopOpacity={0.5} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                height={60}
                interval={0}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <text
                      x={x}
                      y={y}
                      fontSize={11}
                      fill="#cbd5e1"
                      transform={`rotate(-25,${x},${y})`}
                      textAnchor="end"
                    >
                      {payload.value}
                    </text>
                  );
                }}
                stroke="#94a3b8"
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="profit"
                stroke="#06b6d4"
                strokeWidth={3}
                fill="url(#gradientProfit)"
                name="Lợi nhuận"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer title="LỢI NHUẬN TRUNG BÌNH / GIAO DỊCH" icon={Target}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={profitPerTradeDistribution}>
              <defs>
                <linearGradient id="gradientAvg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                  <stop offset="100%" stopColor="#059669" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" stroke="#334155" />
              <XAxis
                type="number"
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
              />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
                width={140}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                dataKey="profitPerTrade"
                fill="url(#gradientAvg)"
                radius={[0, 6, 6, 0]}
                name="Lợi nhuận/GD"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer
          title="PHÂN TÍCH GIAO DỊCH THẮNG / THUA"
          icon={BarChart3}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tradesDistribution}>
              <defs>
                <linearGradient id="greenWin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4ade80" stopOpacity={1} />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity={0.8} />
                </linearGradient>
                <linearGradient id="redLose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f87171" stopOpacity={1} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="name"
                height={60}
                interval={0}
                tick={(props) => {
                  const { x, y, payload } = props;
                  return (
                    <text
                      x={x}
                      y={y}
                      fontSize={11}
                      fill="#cbd5e1"
                      transform={`rotate(-25,${x},${y})`}
                      textAnchor="end"
                    >
                      {payload.value}
                    </text>
                  );
                }}
                stroke="#94a3b8"
              />
              <YAxis
                stroke="#94a3b8"
                tick={{ fontSize: 12, fill: "#cbd5e1" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: "#94A3B8" }} />
              <Bar
                dataKey="winning"
                fill="url(#greenWin)"
                name="Giao dịch thắng"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="losing"
                fill="url(#redLose)"
                name="Giao dịch thua"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* ✅ TOP PERFORMANCE BOTS */}
        <div className="mt-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white tracking-wide">
              TOP PERFORMANCE BOTS
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {botRankings.slice(0, 4).map((bot, index) => {
              const totalTrades = Number(bot.totalTrades);
              const profitPerTrade =
                totalTrades > 0 ? Number(bot.totalProfit) / totalTrades : 0;
              return (
                <div
                  key={bot.botId}
                  className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/80 rounded-xl p-6 hover:shadow-xl transition-all"
                >
                  <div className="absolute -top-3 -right-3">
                    {getTopIcon(index)}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-1">
                    {bot.botName}
                  </h4>
                  <p className="text-slate-400 text-sm mb-4">
                    Trading Bot #{bot.botId}
                  </p>
                  <div className="text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Tổng lợi nhuận</span>
                      <span className="font-mono font-semibold text-emerald-400">
                        +{formatNumber(bot.totalProfit)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Lợi nhuận/GD</span>
                      <span className="font-mono text-emerald-400">
                        {formatNumber(profitPerTrade)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Giao dịch</span>
                      <span className="font-mono text-slate-300">
                        {totalTrades}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 mt-2">
                      <span className="text-green-400">
                        Thắng: {bot.winningTrades}
                      </span>
                      <span className="text-red-400">
                        Thua: {bot.losingTrades}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TopBotCharts);
