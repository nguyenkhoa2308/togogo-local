"use client";


import {
  TrendingUp,
  Target,
  Activity,
  Star,
} from "lucide-react";
export const Statistic = () => {

      const stats = [
        {
          label: "Tổng P&L hôm nay",
          value: "+₫10.4M",
          valueClass: "text-[#00e5a1]",
          sub: "47 giao dịch",
          subClass: "text-[#94a3b8]",
          icon: TrendingUp,
          textColor: "text-[#00e5a1]",
        },
        {
          label: "Tỷ lệ thắng",
          value: "76.8%",
          valueClass: "",
          sub: "Trung bình tuần",
          subClass: "text-[#94a3b8]",
          icon: Target,
          textColor: "text-cyan-500",
        },
        {
          label: "Bot hiệu quả nhất",
          value: "VNINDEX-MOMENTUM",
          valueClass: "text-base sm:text-lg",
          sub: "+12.5% ROI",
          subClass: "text-[#00e5a1]",
          icon: Star,
          textColor: "text-yellow-500",
        },
        {
          label: "Tổng volume",
          value: "17 HĐ",
          valueClass: "",
          sub: "24h qua",
          subClass: "text-[#94a3b8]",
          icon: Activity,
          textColor: "text-purple-500",
        },
      ];
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-[#0f172a] text-white rounded-xl border border-[#64ffda14] p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs sm:text-sm text-[#94a3b8]">{stat.label}</p>
                                    <p className={`text-base sm:text-lg font-bold ${stat.valueClass}`}>
                                        {stat.value}
                                    </p>
                                    <p className={`text-xs ${stat.subClass}`}>{stat.sub}</p>
                                </div>
                                <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${stat.textColor}`} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}
