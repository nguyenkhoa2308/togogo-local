// components/controls/AnalyticsControls.tsx
import React from "react";
import {
  ChevronDown,
  ArrowDownCircle,
  Activity,
  ArrowUpCircle,
} from "lucide-react";
import { Bot, TimeFrame, RiskLevel } from "../../types";

interface AnalyticsControlsProps {
  bots: Bot[];
  selectedBotId: string;
  setSelectedBotId: (botId: string) => void;
  timeframe: TimeFrame;
  setTimeframe: (timeframe: TimeFrame) => void;
  riskLevel: RiskLevel;
  setRiskLevel: (level: RiskLevel) => void;
  error: string | null;
}

export const AnalyticsControls: React.FC<AnalyticsControlsProps> = ({
  bots,
  selectedBotId,
  setSelectedBotId,
  timeframe,
  setTimeframe,
  riskLevel,
  setRiskLevel,
  error,
}) => {
  const timeframes: TimeFrame[] = ["1W", "1M", "3M", "1Y", "ALL"];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <select
            value={selectedBotId}
            onChange={(e) => setSelectedBotId(e.target.value)}
            className="appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200 transition-all"
          >
            {bots.length === 0 && <option value="">Đang tải bots...</option>}
            {error && <option value="">Lỗi tải bots</option>}
            {bots.map((bot) => (
              <option key={bot.botId} value={bot.botId}>
                {bot.botName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 dark:text-gray-400">
            <ChevronDown size={18} />
          </div>
        </div>

        <div className="flex items-center space-x-1 rounded-lg p-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
          {timeframes.map((tf) => (
            <button
              key={tf}
              className={`px-3 py-2 text-sm rounded transition-all ${
                timeframe === tf
                  ? "bg-white dark:bg-gray-600 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-650"
              }`}
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-1 rounded-lg p-1 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 ml-auto">
          <button
            className={`px-3 py-2 text-sm rounded transition-all flex items-center ${
              riskLevel === "low"
                ? "bg-white dark:bg-gray-600 shadow-sm text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-650"
            }`}
            onClick={() => setRiskLevel("low")}
          >
            <ArrowDownCircle size={16} className="mr-1.5" />
            Thấp
          </button>
          <button
            className={`px-3 py-2 text-sm rounded transition-all flex items-center ${
              riskLevel === "medium"
                ? "bg-white dark:bg-gray-600 shadow-sm text-blue-600 dark:text-blue-400"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-650"
            }`}
            onClick={() => setRiskLevel("medium")}
          >
            <Activity size={16} className="mr-1.5" />
            Trung bình
          </button>
          <button
            className={`px-3 py-2 text-sm rounded transition-all flex items-center ${
              riskLevel === "high"
                ? "bg-white dark:bg-gray-600 shadow-sm text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-650"
            }`}
            onClick={() => setRiskLevel("high")}
          >
            <ArrowUpCircle size={16} className="mr-1.5" />
            Cao
          </button>
        </div>
      </div>
    </div>
  );
};
