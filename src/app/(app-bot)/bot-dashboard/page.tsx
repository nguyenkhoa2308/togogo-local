"use client";

import { useState } from "react";
import {
  DollarSign,
  TrendingUp,
  Bot,
  Target,
  Download,
  Clock,
  LogIn,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Shield,
  Wallet,
  CreditCard,
  Play,
  User,
  BotIcon,
} from "lucide-react";
import { ActivityLogDialog } from "./components/dialog/ActivityLogDialog";

export default function Dashboard() {
  const [showActivityDialog, setShowActivityDialog] = useState(false);

  const stats = [
    {
      title: "Tổng tài sản",
      value: "₫261.1M",
      change: "+25%",
      trend: "up",
      icon: DollarSign,
      color: "bg-[#00e5a1]",
      desc: "Hôm nay",
    },
    {
      title: "P&L Thực hiện",
      value: "₫7.45M",
      change: "+24.5%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-green-600",
      desc: "Tháng này",
    },
    {
      title: "Bot Active",
      value: "5",
      change: "+3",
      trend: "up",
      icon: Bot,
      color: "bg-purple-600",
      desc: "Đang chạy",
    },
    {
      title: "Win Rate",
      value: "78.5%",
      change: "+7%",
      trend: "up",
      icon: Target,
      color: "bg-blue-600",
      desc: "Tuần này",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Đăng nhập hệ thống",
      target: "Web Dashboard",
      time: "15:42",
      status: "success" as const,
      icon: LogIn,
      module: "AUTH",
    },
    {
      id: 2,
      action: "Nạp tiền thành công",
      target: "₫50,000,000",
      time: "15:35",
      status: "success" as const,
      icon: CreditCard,
      module: "PAYMENT",
    },
    {
      id: 3,
      action: "Khởi động bot",
      target: "VNINDEX-MOMENTUM",
      time: "15:30",
      status: "success" as const,
      icon: Play,
      module: "BOT",
    },
  ];

  const robots = [
    {
      id: 1,
      strategy: "VNINDEX-MOMENTUM",
      symbol: "VN30F-240X",
      volume: "5 HỢP ĐỒNG",
      status: "ACTIVE",
      pnl: "+5,200,000",
      pnlPercent: "+12.5%",
      position: "LONG 95%",
      risk: "11.5K",
      maxRisk: "20K",
      lastUpdate: "15:42:32",
    },
    {
      id: 2,
      strategy: "HNX30E-MEANREV",
      symbol: "HNX30F-240X",
      volume: "3 HỢP ĐỒNG",
      status: "ACTIVE",
      pnl: "+3,800,000",
      pnlPercent: "+8.7%",
      position: "SHORT 80%",
      risk: "8.3K",
      maxRisk: "20K",
      lastUpdate: "15:41:15",
    },
    {
      id: 3,
      strategy: "ARBITRAGE-SPREAD",
      symbol: "VN30F+HNX30F",
      volume: "2 HỢP ĐỒNG",
      status: "ACTIVE",
      pnl: "+450,000",
      pnlPercent: "+2.1%",
      position: "SPREAD 75%",
      risk: "11.8K",
      maxRisk: "20K",
      lastUpdate: "15:40:28",
    },
  ];

  const accountMetrics = [
    {
      label: "Số dư khả dụng",
      value: "₫261,119,681",
      icon: Wallet,
      color: "text-[#00e5a1]",
    },
    {
      label: "Ký quỹ ban đầu",
      value: "₫137,623,084",
      icon: Shield,
      color: "text-white",
    },
    {
      label: "P&L chưa thực hiện",
      value: "+₫47,450,000",
      icon: TrendingUp,
      color: "text-[#00e5a1]",
    },
    {
      label: "Margin Ratio",
      value: "52.7%",
      icon: Activity,
      color: "text-orange-400",
    },
  ];

  const handleBotAction = (action: string, strategy: string) => {
    if (action === "stop") {
      alert(`Đã dừng bot ${strategy}`);
    } else if (action === "edit") {
      alert(`Chỉnh sửa bot ${strategy}`);
    }
  };

  // const getStatusColor = (status: string) => {
  //   switch (status) {
  //     case "success":
  //       return "text-[#00e5a1]";
  //     case "warning":
  //       return "text-orange-400";
  //     case "info":
  //       return "text-blue-400";
  //     default:
  //       return "text-gray-400";
  //   }
  // };

  const getModuleColor = (module: string) => {
    switch (module) {
      case "AUTH":
        return "bg-blue-500/10 border-blue-500/30 text-blue-400";
      case "PAYMENT":
        return "bg-[#00e5a1]/10 border-[#00e5a1]/30 text-[#00e5a1]";
      case "BOT":
        return "bg-purple-500/10 border-purple-500/30 text-purple-400";
      default:
        return "bg-gray-500/10 border-gray-500/30 text-gray-400";
    }
  };

  return (
    <div
      className="w-full p-6 space-y-6 bg-[#020617]"
      style={{
        backgroundImage: `
      radial-gradient(circle at 20% 30%, #00e5a105 0%, transparent 40%),
      radial-gradient(circle at 80% 70%, #00e5a103 0%, transparent 40%),
      linear-gradient(135deg, #020617 0%, #0f172a 25%, #1e293b 50%, #0f172a 75%, #020617 100%)`,
      }}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div>
          <h1 className="text-2xl lg:text-3xl text-white font-bold">
            Dashboard Overview
          </h1>
          <p className="text-[#94a3b8] text-sm mt-1">
            Tổng quan hệ thống giao dịch tự động • Cập nhật lúc 15:42:32 ICT
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-3 py-2 border  border-[#00E5A1]/50 bg-[#1e293b]/30 text-[#00E5A1] rounded-md hover:bg-[#00e5a1]/10 text-xs flex items-center cursor-pointer">
            <Download className="w-4 h-4 mr-2" /> Báo cáo
          </button>
          <button className="px-3 py-2 bg-[#00E5A1] text-[#0a1529] rounded-md hover:bg-[#00D194] text-[#0A1529] text-xs flex items-center cursor-pointer">
            <Bot className="w-4 h-4 mr-2" /> Tạo bot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-6 hover:shadow-lg transition-all duration-300 ease-in-out border-[#00e5a114]"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <p className="text-xs text-[#94a3b8] mb-1">{stat.title}</p>
                    {/* <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium border border-white/10 text-white -translate-y-[2px]">
                      {stat.desc}
                    </span> */}
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                  <div className="flex items-center mt-1 text-sm">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4 text-[#00e5a1] mr-1" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        stat.trend === "up" ? "text-[#00e5a1]" : "text-red-500"
                      }
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div
                  className={`${stat.color} p-3 rounded-xl shadow-sm flex-shrink-0`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <div className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-6 hover:shadow-lg transition-all duration-300 ease-in-out border-[#00e5a114]">
            <div className="border-b border-[#00e5a114] p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-[#00e5a1]" />
                  <div>
                    <h3 className="font-semibold text-white">
                      Hoạt động gần đây
                    </h3>
                    <p className="text-[#94a3b8] text-xs mt-0.5">
                      Theo dõi các thao tác trong hệ thống
                    </p>
                  </div>
                </div>
                <button
                  className="px-3 py-2 whitespace-nowrap border border-[#00E5A1]/50 bg-[#1e293b]/30 text-[#00E5A1] rounded-md hover:bg-[#00e5a1]/10 text-xs flex items-center cursor-pointer"
                  onClick={() => setShowActivityDialog(true)}
                >
                  Xem tất cả
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="flex items-center space-x-4 justify-between p-3 bg-[#334155]/30 rounded-lg border border-[#64ffda14]/30"
                    >
                      <div
                        className={`p-2 rounded-lg border ${getModuleColor(
                          activity.module
                        )}`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium text-xs">
                          {activity.action}
                        </p>
                        <p className="text-[#94a3b8] text-xs truncate mt-1">
                          {activity.target}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-white text-xs font-medium">
                          {activity.time}
                        </p>
                        <span className="bg-[#00e5a1]/10 text-[#00e5a1] border border-[#00e5a1]/20 text-[10px] rounded-md px-2 py-0.5">
                          Thành công
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-2 hover:shadow-lg transition-all duration-300 ease-in-out border-[#00e5a114]">
            <div className="border-b border-[#00e5a114] p-6">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-[#00e5a1]" />
                <h3 className="font-semibold text-white">
                  Thông tin tài khoản
                </h3>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {accountMetrics.map((metric, index) => {
                  const Icon = metric.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-[#334155]/30 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4 text-[#94a3b8]" />
                        <span className="text-[#94a3b8] text-xs max-w-[60%] sm:max-w-max">
                          {metric.label}
                        </span>
                      </div>
                      <span className={`font-semibold text-xs ${metric.color}`}>
                        {metric.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] rounded-lg border p-6 text-white flex flex-col gap-2 hover:shadow-lg transition-all duration-300 ease-in-out border-[#00e5a114]">
        <div className="border-b border-[#00e5a114] p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <BotIcon className="w-5 h-5 text-[#00e5a1]" />
              <div>
                <h3 className="font-semibold text-white">Robot Giao dịch</h3>
                <p className="text-[#94a3b8] text-xs mt-0.5">
                  Quản lý các bot đang hoạt động
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#00e5a1] rounded-full animate-pulse"></div>
              <span className="text-[#94a3b8] text-xs">
                Thị trường mở • 15:42:32 ICT
              </span>
            </div>
          </div>
        </div>
        <div className="hidden xl:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1e293b]/30">
              <tr>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  #
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Chiến lược
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Mã CK
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Khối lượng
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  P&L
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Vị thế
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Rủi ro
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Cập nhật
                </th>
                <th className="text-left p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {robots.map((robot, index) => (
                <tr
                  key={robot.id}
                  className="border-b border-[#64ffda14]/30 hover:bg-[#334155]/20 transition-colors"
                >
                  <td className="p-4">
                    <span className="text-white border border-[#64ffda14] text-[10px] rounded-md px-2 py-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </td>
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white text-xs">
                        {robot.strategy}
                      </div>
                      <span className="bg-[#00e5a1]/10 text-[#00e5a1] border border-[#00e5a1]/20 text-[10px] rounded-md px-2 py-0.5 font-bold">
                        {robot.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <code className="bg-[#1e293b] px-2 py-1 rounded text-[10px] font-mono">
                      {robot.symbol}
                    </code>
                  </td>
                  <td className="p-4 text-xs font-medium text-white">
                    {robot.volume}
                  </td>
                  <td className="p-4 text-right">
                    <div>
                      <div className="text-[#00e5a1] font-semibold text-xs">
                        ₫{robot.pnl.replace("+", "")}
                      </div>
                      <div className="text-[#00e5a1] text-[10px]">
                        {robot.pnlPercent}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-medium text-[#ededed]">
                    {robot.position}
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <span className="text-orange-400 text-xs font-medium">
                        {robot.risk}/{robot.maxRisk}
                      </span>
                      <div className="w-16 bg-[#1e293b] rounded-full h-1.5">
                        <div
                          className="bg-orange-400 h-1.5 rounded-full"
                          style={{
                            width: `${
                              (parseFloat(robot.risk.replace("K", "")) /
                                parseFloat(robot.maxRisk.replace("K", ""))) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-xs text-muted-[#ededed]">
                    {robot.lastUpdate}
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <button
                        className="text-[10px] px-3 h-7 bg-[#ef4444]/60 rounded-md font-bold cursor-pointer"
                        onClick={() => handleBotAction("stop", robot.strategy)}
                      >
                        Dừng
                      </button>
                      <button
                        className="text-[10px] px-3 h-7 bg-[#1e293b]/30 border border-[#1e293b] rounded-md font-bold cursor-pointer"
                        onClick={() => handleBotAction("edit", robot.strategy)}
                      >
                        Sửa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="xl:hidden p-6 space-y-4">
          {robots.map((robot, index) => (
            <div
              key={robot.id}
              className="border border-border/50 bg-[##334155]/20"
            >
              <div className="p-4">
                <div className="flex flex-col sm:flex-rowitems-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white border border-[#64ffda14] text-[10px] font-bold rounded-md px-2 py-0.5">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="bg-[#00e5a1]/10 text-[#00e5a1] border border-[#00e5a1]/20 text-[10px] rounded-md px-2 py-0.5 font-bold">
                        {robot.status}
                      </span>
                    </div>
                    <h4 className="font-semibold text-white text-sm">
                      {robot.strategy}
                    </h4>
                    <code className="text-xs text-[#94a3b8] text-xs">
                      {robot.symbol}
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#94a3b8] text-sm">P&L</span>
                    <div className="text-right">
                      <div className="text-[#00e5a1] font-semibold text-sm">
                        ₫{robot.pnl.replace("+", "")}
                      </div>
                      <div className="text-[#00e5a1] text-xs">
                        {robot.pnlPercent}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-2 text-sm mb-3">
                  <div>
                    <span className="text-[#94a3b8]">Khối lượng</span>
                    <div className="font-medium text-white text-xs">
                      {robot.volume}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#94a3b8] sm:text-right block">
                      Vị thế
                    </span>
                    <div className="font-medium text-white text-xs">
                      {robot.position}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#94a3b8] text-sm">Rủi ro</span>
                  <div className="flex items-center space-x-2 flex-col sm:flex-row">
                    <span className="text-orange-400 text-xs sm:hidden mb-1">
                      {robot.risk}/{robot.maxRisk}
                    </span>
                    <div className="w-16 bg-[#1e293b] rounded-full h-1.5">
                      <div
                        className="bg-orange-400 h-1.5 rounded-full"
                        style={{
                          width: `${
                            (parseFloat(robot.risk.replace("K", "")) /
                              parseFloat(robot.maxRisk.replace("K", ""))) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-orange-400 text-xs hidden sm:block">
                      {robot.risk}/{robot.maxRisk}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    className="flex-1 text-[10px] px-3 h-7 bg-[#ef4444]/60 rounded-md font-bold cursor-pointer"
                    onClick={() => handleBotAction("stop", robot.strategy)}
                  >
                    Dừng
                  </button>
                  <button
                    className="flex-1 text-[10px] px-3 h-7 bg-[#1e293b]/30 border border-[#1e293b] rounded-md font-bold cursor-pointer"
                    onClick={() => handleBotAction("edit", robot.strategy)}
                  >
                    Sửa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-[#94a3b8] text-xs">Tổng robot:</span>
              <span className="font-medium text-white text-xs">5 / 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94a3b8] text-xs">Đang hoạt động:</span>
              <span className="font-medium text-[#00e5a1] text-xs">3 bots</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#94a3b8] text-xs">Tổng P&L:</span>
              <span className="font-medium text-[#00e5a1] text-xs">
                +₫9,450,000
              </span>
            </div>
          </div>
        </div>
      </div>

      <ActivityLogDialog
        isOpen={showActivityDialog}
        onClose={() => setShowActivityDialog(false)}
      />
    </div>
  );
}
