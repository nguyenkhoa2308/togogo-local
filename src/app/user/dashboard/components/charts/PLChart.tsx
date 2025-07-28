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
import { BarChart3 } from "lucide-react";

const plDataSets = {
  "1d": {
    realized: [
      { time: "00:00", value: 150000 },
      { time: "04:00", value: 280000 },
      { time: "08:00", value: 420000 },
      { time: "12:00", value: 680000 },
      { time: "16:00", value: 850000 },
      { time: "20:00", value: 1200000 },
    ],
    unrealized: [
      { time: "00:00", value: -50000 },
      { time: "04:00", value: 80000 },
      { time: "08:00", value: 150000 },
      { time: "12:00", value: 200000 },
      { time: "16:00", value: 180000 },
      { time: "20:00", value: 220000 },
    ],
    daily: [
      { time: "00:00", value: 100000 },
      { time: "04:00", value: 200000 },
      { time: "08:00", value: 270000 },
      { time: "12:00", value: 480000 },
      { time: "16:00", value: 670000 },
      { time: "20:00", value: 850000 },
    ],
    cumulative: [
      { time: "00:00", value: 100000 },
      { time: "04:00", value: 300000 },
      { time: "08:00", value: 570000 },
      { time: "12:00", value: 1050000 },
      { time: "16:00", value: 1720000 },
      { time: "20:00", value: 2570000 },
    ],
  },
  "7d": {
    realized: [
      { time: "T2", value: 800000 },
      { time: "T3", value: 1200000 },
      { time: "T4", value: 950000 },
      { time: "T5", value: 1400000 },
      { time: "T6", value: 1800000 },
      { time: "T7", value: 2200000 },
      { time: "CN", value: 2800000 },
    ],
    unrealized: [
      { time: "T2", value: 200000 },
      { time: "T3", value: -100000 },
      { time: "T4", value: 300000 },
      { time: "T5", value: 150000 },
      { time: "T6", value: 400000 },
      { time: "T7", value: 250000 },
      { time: "CN", value: 350000 },
    ],
    daily: [
      { time: "T2", value: 600000 },
      { time: "T3", value: 400000 },
      { time: "T4", value: 750000 },
      { time: "T5", value: 550000 },
      { time: "T6", value: 900000 },
      { time: "T7", value: 650000 },
      { time: "CN", value: 850000 },
    ],
    cumulative: [
      { time: "T2", value: 1000000 },
      { time: "T3", value: 1400000 },
      { time: "T4", value: 2150000 },
      { time: "T5", value: 2700000 },
      { time: "T6", value: 3600000 },
      { time: "T7", value: 4250000 },
      { time: "CN", value: 5100000 },
    ],
  },
  "30d": {
    realized: [
      { time: "01/12", value: 2100000 },
      { time: "05/12", value: 2300000 },
      { time: "10/12", value: 1900000 },
      { time: "15/12", value: 2800000 },
      { time: "20/12", value: 3200000 },
      { time: "25/12", value: 2900000 },
      { time: "30/12", value: 7450000 },
    ],
    unrealized: [
      { time: "01/12", value: 800000 },
      { time: "05/12", value: -200000 },
      { time: "10/12", value: 1200000 },
      { time: "15/12", value: 600000 },
      { time: "20/12", value: 900000 },
      { time: "25/12", value: 1100000 },
      { time: "30/12", value: 1200000 },
    ],
    daily: [
      { time: "01/12", value: 150000 },
      { time: "05/12", value: 320000 },
      { time: "10/12", value: -80000 },
      { time: "15/12", value: 450000 },
      { time: "20/12", value: 280000 },
      { time: "25/12", value: 380000 },
      { time: "30/12", value: 850000 },
    ],
    cumulative: [
      { time: "01/12", value: 2950000 },
      { time: "05/12", value: 5250000 },
      { time: "10/12", value: 8070000 },
      { time: "15/12", value: 11950000 },
      { time: "20/12", value: 16430000 },
      { time: "25/12", value: 20910000 },
      { time: "30/12", value: 50520000 },
    ],
  },
  "90d": {
    realized: [
      { time: "T10", value: 15000000 },
      { time: "T11", value: 18000000 },
      { time: "T12", value: 22000000 },
      { time: "T1", value: 28000000 },
      { time: "T2", value: 35000000 },
      { time: "T3", value: 42000000 },
      { time: "T4", value: 58000000 },
    ],
    unrealized: [
      { time: "T10", value: 2000000 },
      { time: "T11", value: 1500000 },
      { time: "T12", value: 3200000 },
      { time: "T1", value: 2800000 },
      { time: "T2", value: 4100000 },
      { time: "T3", value: 3500000 },
      { time: "T4", value: 4800000 },
    ],
    daily: [
      { time: "T10", value: 180000 },
      { time: "T11", value: 220000 },
      { time: "T12", value: 280000 },
      { time: "T1", value: 350000 },
      { time: "T2", value: 420000 },
      { time: "T3", value: 480000 },
      { time: "T4", value: 650000 },
    ],
    cumulative: [
      { time: "T10", value: 17000000 },
      { time: "T11", value: 36500000 },
      { time: "T12", value: 61700000 },
      { time: "T1", value: 92500000 },
      { time: "T2", value: 132020000 },
      { time: "T3", value: 178020000 },
      { time: "T4", value: 241820000 },
    ],
  },
  "1y": {
    realized: [
      { time: "Q1-2024", value: 45000000 },
      { time: "Q2-2024", value: 62000000 },
      { time: "Q3-2024", value: 78000000 },
      { time: "Q4-2024", value: 95000000 },
      { time: "Q1-2025", value: 120000000 },
      { time: "Q2-2025", value: 156000000 },
    ],
    unrealized: [
      { time: "Q1-2024", value: 8000000 },
      { time: "Q2-2024", value: 12000000 },
      { time: "Q3-2024", value: 15000000 },
      { time: "Q4-2024", value: 18000000 },
      { time: "Q1-2025", value: 22000000 },
      { time: "Q2-2025", value: 28000000 },
    ],
    daily: [
      { time: "Q1-2024", value: 520000 },
      { time: "Q2-2024", value: 680000 },
      { time: "Q3-2024", value: 850000 },
      { time: "Q4-2024", value: 1020000 },
      { time: "Q1-2025", value: 1350000 },
      { time: "Q2-2025", value: 1680000 },
    ],
    cumulative: [
      { time: "Q1-2024", value: 53000000 },
      { time: "Q2-2024", value: 127000000 },
      { time: "Q3-2024", value: 220000000 },
      { time: "Q4-2024", value: 333000000 },
      { time: "Q1-2025", value: 475000000 },
      { time: "Q2-2025", value: 659000000 },
    ],
  },
};

const tabs = [
  { id: "realized", label: "P&L Thực Hiện", color: "#00E5A1" },
  { id: "unrealized", label: "P&L Chưa Thực Hiện", color: "#F43F5E" },
  { id: "daily", label: "P&L Hàng Ngày", color: "#FACC15" },
  { id: "cumulative", label: "P&L Tích Lũy", color: "#38BDF8" },
];
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

export default function PLChart() {
  const [activeTab, setActiveTab] = useState("realized");
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");

  const currentData = plDataSets[selectedTimeRange][activeTab];
  const timeRangeLabel = timeRangeLabels[selectedTimeRange];
  const currentColor = tabs.find((t) => t.id === activeTab)?.color || "#00E5A1";
  const latestValue = currentData[currentData.length - 1]?.value;

  return (
    <div className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-2 border-[#64ffda14] shadow hover:shadow-lg transition-all">
      {/* Header */}
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-[#00E5A1]" />
            <div>
              <h3 className="text-base font-semibold">Biểu Đồ P&L Chi Tiết</h3>
              <p className="text-sm text-[#94a3b8] mt-0.5">
                Theo dõi chi tiết các loại P&L với bộ lọc thời gian •{" "}
                {timeRangeLabel}
              </p>
            </div>
          </div>

          {/* Time Range Buttons */}
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

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 text-sm font-medium flex-1 rounded-md transition-all border border-[#64ffda14] 
                ${
                  activeTab === tab.id
                    ? "bg-[#00E5A1] text-[#0f172a]"
                    : "bg-[#1e293b]/30 hover:bg-[#1e293b]/10"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Biểu đồ */}
      <div className="p-6 pt-0">
        <div className="h-[300px] w-full">
          {currentData.length > 1 ? (
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
                  tickFormatter={(v) => `₫${(v / 1_000_000).toFixed(1)}M`}
                />
                <Tooltip
                  content={({ active, payload, label }) =>
                    active && payload?.length ? (
                      <div className="rounded-md border border-[#00E5A1] bg-[#1e293b] p-3 text-sm">
                        <p className="text-[#e2e8f0] font-medium">
                          Thời gian: {label}
                        </p>
                        <p
                          className={`font-medium ${
                            payload[0].value >= 0
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          P&L: ₫{(payload[0].value / 1_000_000).toFixed(2)}M
                        </p>
                      </div>
                    ) : null
                  }
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={currentColor}
                  strokeWidth={2}
                  strokeOpacity={1}
                  dot={{ fill: currentColor, r: 4 }}
                  activeDot={{ r: 6, stroke: currentColor, strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-[#94a3b8] pt-10">
              Không có đủ dữ liệu để hiển thị
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 pt-4 border-t border-[#64ffda14] grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-[#94a3b8]">Loại P&L</div>
            <div className="font-semibold">
              {tabs.find((t) => t.id === activeTab)?.label}
            </div>
          </div>
          <div>
            <div className="text-xs text-[#94a3b8]">Khoảng Thời Gian</div>
            <div className="font-semibold">{timeRangeLabel}</div>
          </div>
          <div>
            <div className="text-xs text-[#94a3b8]">Giá Trị Hiện Tại</div>
            <div
              className={`font-semibold ${
                latestValue >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              ₫{(latestValue / 1_000_000).toFixed(2)}M
            </div>
          </div>
          <div>
            <div className="text-xs text-[#94a3b8]">Điểm Dữ Liệu</div>
            <div className="font-semibold">{currentData.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
