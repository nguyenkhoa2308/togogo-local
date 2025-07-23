// components/navigation/TabNavigation.tsx
import React from "react";
import {
  Activity,
  TrendingUp,
  BarChart,
  Layers,
  Clock,
  Star,
} from "lucide-react";
import { ActiveTab } from "../../types";

interface TabNavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = [
    {
      id: "overview" as ActiveTab,
      label: "Overview",
      icon: Layers,
    },
    {
      id: "trades" as ActiveTab,
      label: "Trades",
      icon: Activity,
    },
    {
      id: "analytics" as ActiveTab,
      label: "Analytics",
      icon: BarChart,
    },
    {
      id: "topBot" as ActiveTab,
      label: "Top Bot",
      icon: TrendingUp,
    },
    {
      id: "history3months" as ActiveTab,
      label: "Lịch sử 3 tháng",
      icon: Clock,
    },
    {
      id: "botReviews" as ActiveTab,
      label: "Đánh giá Bot",
      icon: Star,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm mb-6 overflow-hidden">
      <div className="flex border-b border-gray-200 dark:border-gray-700 relative">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            className={`px-6 py-4 text-sm font-medium transition-colors cursor-pointer ${
              activeTab === id
                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/30"
            }`}
            onClick={() => {
              setActiveTab(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{ transitionDuration: "0.15s" }}
          >
            <div className="flex items-center">
              <Icon size={18} className="mr-2" />
              {label}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
