"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  Bot,
  TrendingUp,
  Settings,
  BarChart3,
  Wallet,
  History,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

// export function Sidebar({ currentPage, onPageChange }: SidebarProps) {
export function SideBar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      description: "Tổng quan hệ thống",
    },
    {
      id: "bot-management",
      label: "Quản lý Bot",
      icon: Bot,
      description: "Tạo và quản lý bot",
    },
    {
      id: "strategies",
      label: "Chiến lược",
      icon: TrendingUp,
      description: "Cấu hình chiến lược",
    },
    {
      id: "analytics",
      label: "Phân tích",
      icon: BarChart3,
      description: "Báo cáo hiệu suất",
    },
    {
      id: "portfolio",
      label: "Portfolio",
      icon: Wallet,
      description: "Quản lý tài sản",
    },
    {
      id: "history",
      label: "Lịch sử",
      icon: History,
      description: "Lịch sử giao dịch",
    },
    {
      id: "risk",
      label: "Quản lý rủi ro",
      icon: AlertTriangle,
      description: "Cài đặt rủi ro",
    },
    {
      id: "settings",
      label: "Cài đặt",
      icon: Settings,
      description: "Cài đặt hệ thống",
    },
  ];

  return (
    <div
      className={`bg-[#1a2332] border-r border-slate-700/50 transition-all duration-300 no-scrollbar ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-screen sticky top-0`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <h2 className="text-white font-semibold text-sm">
                  VN DERIVATIVES
                </h2>
                <p className="text-gray-400 text-xs">Bot Trading Pro</p>
              </div>
            </div>
          )}
          <button
            // variant="ghost"
            // size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white p-1 h-8 w-8"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <Link
              href={`/bot-dashboard/${item.id === "dashboard" ? "" : item.id}`}
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors group ${
                activeTab === item.id
                  ? "bg-gray-700 border-r-2 border-green-500"
                  : ""
              } hover:bg-gray-700`}
            >
              <item.icon className={`w-5 h-5 flex-shrink-0`} />
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium">{item.label}</div>
                  <div className="text-xs text-gray-500">
                    {item.description}
                  </div>
                </div>
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        {!isCollapsed && (
          <div className="text-center">
            <div className="text-xs text-gray-400 mb-1">Phiên bản</div>
            <div className="text-sm text-white font-medium">v2.1.0</div>
          </div>
        )}
      </div>
    </div>
  );
}
