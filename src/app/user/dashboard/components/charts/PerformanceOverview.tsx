import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp } from "lucide-react";

const performanceDataSets = {
  "1d": [
    { time: "00:00", value: 260800000 },
    { time: "04:00", value: 260900000 },
    { time: "08:00", value: 261000000 },
    { time: "12:00", value: 260950000 },
    { time: "16:00", value: 261050000 },
    { time: "20:00", value: 261100000 },
  ],
  "7d": [
    { time: "T2", value: 255000000 },
    { time: "T3", value: 257000000 },
    { time: "T4", value: 259000000 },
    { time: "T5", value: 258000000 },
    { time: "T6", value: 260000000 },
    { time: "T7", value: 261000000 },
    { time: "CN", value: 261100000 },
  ],
  "30d": [
    { time: "01/12", value: 245000000 },
    { time: "05/12", value: 248000000 },
    { time: "10/12", value: 252000000 },
    { time: "15/12", value: 247000000 },
    { time: "20/12", value: 251000000 },
    { time: "25/12", value: 255000000 },
    { time: "30/12", value: 261100000 },
  ],
  "90d": [
    { time: "T10", value: 230000000 },
    { time: "T11", value: 235000000 },
    { time: "T12", value: 245000000 },
    { time: "T1", value: 250000000 },
    { time: "T2", value: 255000000 },
    { time: "T3", value: 258000000 },
    { time: "T4", value: 261100000 },
  ],
  "1y": [
    { time: "Q1", value: 180000000 },
    { time: "Q2", value: 200000000 },
    { time: "Q3", value: 220000000 },
    { time: "Q4", value: 240000000 },
    { time: "Q1", value: 255000000 },
    { time: "Q2", value: 261100000 },
  ],
};

const timeRangeOptions = [
  { value: "1d", label: "1D" },
  { value: "7d", label: "7D" },
  { value: "30d", label: "30D" },
  { value: "90d", label: "90D" },
  { value: "1y", label: "1Y" },
];

const timeRangeLabels = {
  "1d": "1 Ngày",
  "7d": "7 Ngày",
  "30d": "30 Ngày",
  "90d": "90 Ngày",
  "1y": "1 Năm",
};

export default function PerformanceOverview() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");

  const currentData = performanceDataSets[selectedTimeRange];
  const timeRangeLabel = timeRangeLabels[selectedTimeRange];

  const firstValue = currentData[0]?.value || 0;
  const lastValue = currentData[currentData.length - 1]?.value || 0;
  const growthPercent =
    firstValue > 0
      ? (((lastValue - firstValue) / firstValue) * 100).toFixed(1)
      : "0.0";

  const maxValue = Math.max(...currentData.map((d) => d.value));

  return (
    <div className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-6 border-[#00e5a114] hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-[#00E5A1]" />
            <div>
              <h3 className="text-base font-semibold">Tổng Quan Hiệu Suất</h3>
              <p className="text-sm text-[#94a3b8] mt-0.5">
                Tăng trưởng tài sản theo thời gian cho tổng portfolio •{" "}
                {timeRangeLabel}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            {timeRangeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedTimeRange(option.value)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all border border-[#64ffda14] 
                  ${
                    selectedTimeRange === option.value
                      ? "bg-[#00E5A1] text-[#0f172a]"
                      : "bg-[#1e293b]/30 hover:bg-[#1e293b]/10"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="p-6 pt-0">
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={currentData}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis
                dataKey="time"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v) => `₫${(v / 1_000_000).toFixed(0)}M`}
              />
              <Tooltip
                content={({ active, payload, label }) =>
                  active && payload?.length ? (
                    <div className="rounded-md border border-[#00E5A1]/20 bg-[#1e293b] p-3 text-sm">
                      <p className="text-[#e2e8f0] font-medium">
                        Thời gian: {label}
                      </p>
                      <p className="text-[#00E5A1] font-semibold">
                        Tài sản: ₫{(payload[0].value / 1_000_000).toFixed(1)}M
                      </p>
                    </div>
                  ) : null
                }
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00E5A1"
                strokeWidth={2}
                strokeOpacity={1}
                dot={{ fill: "#00E5A1", r: 4 }}
                activeDot={{ r: 6, stroke: "#00E5A1", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Thống kê tổng quan */}
        <div className="mt-4 pt-4 border-t border-[#00E5A1]/20 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-[#94a3b8]">Tài Sản Hiện Tại</div>
            <div className="font-semibold text-foreground">
              ₫{(lastValue / 1_000_000).toFixed(1)}M
            </div>
          </div>
          <div>
            <div className="text-xs text-[#94a3b8]">
              Tăng Trưởng {timeRangeLabel}
            </div>
            <div
              className={`font-semibold ${
                growthPercent >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {growthPercent >= 0 ? "+" : ""}
              {growthPercent}%
            </div>
          </div>
          <div>
            <div className="text-xs text-[#94a3b8]">Cao Nhất</div>
            <div className="font-semibold text-foreground">
              ₫{(maxValue / 1_000_000).toFixed(1)}M
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
