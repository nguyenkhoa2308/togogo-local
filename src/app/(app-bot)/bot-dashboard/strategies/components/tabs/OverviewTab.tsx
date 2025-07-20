'use client';

import React from "react";
import { StatsCards } from "../cards/StatsCards";
import { PerformanceChart } from "../charts/PerformanceChart";
import { ChartGrids } from "../charts/ChartGrids";
import { RecentTradesTable } from "../tables/RecentTradesTable";
import { FilterControls } from "../controls/FilterControls";
import { Bot, Trade, WinRateData } from "../../types"; // Import các kiểu dữ liệu cần thiết

// ✅ BƯỚC 1: ĐỊNH NGHĨA LẠI PROPS CHO CHÍNH XÁC
interface OverviewTabProps {
  bots: Bot[];
  selectedBotId: string;
  setSelectedBotId: (id: string) => void;
  timeframe: any; // Giữ nguyên nếu không thay đổi
  setTimeframe: (tf: any) => void;
  showAdvancedStats: boolean;
  setShowAdvancedStats: (v: boolean) => void;
  stats: any;
  profitToday: number;
  profitYesterday: number;
  profitLastWeek: number;
  profitLastMonth: number;
  winRateData: WinRateData;
  chartData: any;
  trades: Trade[];
  loading: boolean;
  error: string | null;
  setActiveTab: (tab: any) => void;
  
  // Thêm đầy đủ các props cho FilterControls
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedTypeFilter: string;
  setSelectedTypeFilter: (type: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (status: string) => void;
  startDateFilter: string;
  setStartDateFilter: (date: string) => void;
  endDateFilter: string;
  setEndDateFilter: (date: string) => void;
  orderCodeFilter: string;
  setOrderCodeFilter: (code: string) => void;
  handleExport: () => void;
  isExporting: boolean;
  setCurrentPage: (page: number) => void;
  selectedBotType: string;
  setSelectedBotType: (type: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  // Nhận tất cả props đã được định nghĩa ở trên
  bots,
  selectedBotId,
  setSelectedBotId,
  timeframe,
  setTimeframe,
  showAdvancedStats,
  setShowAdvancedStats,
  stats,
  profitToday,
  profitYesterday,
  profitLastWeek,
  profitLastMonth,
  winRateData,
  chartData,
  trades,
  loading,
  error,
  setActiveTab,
  selectedBotType,
  setSelectedBotType,
  // Nhận các props cho filter
  searchTerm,
  setSearchTerm,
  selectedTypeFilter,
  setSelectedTypeFilter,
  selectedStatusFilter,
  setSelectedStatusFilter,
  startDateFilter,
  setStartDateFilter,
  endDateFilter,
  setEndDateFilter,
  orderCodeFilter,
  setOrderCodeFilter,
  handleExport,
  isExporting,
  setCurrentPage,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-white/10">
      <div className="space-y-6">
        <FilterControls
          bots={bots}
          selectedBotId={selectedBotId}
          setSelectedBotId={setSelectedBotId}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedTypeFilter={selectedTypeFilter}
          setSelectedTypeFilter={setSelectedTypeFilter}
          selectedStatusFilter={selectedStatusFilter}
          setSelectedStatusFilter={setSelectedStatusFilter}
          startDateFilter={startDateFilter}
          setStartDateFilter={setStartDateFilter}
          endDateFilter={endDateFilter}
          setEndDateFilter={setEndDateFilter}
          orderCodeFilter={orderCodeFilter}
          setOrderCodeFilter={setOrderCodeFilter}
          handleExport={handleExport}
          isExporting={isExporting}
          error={error}
          setCurrentPage={setCurrentPage}
          selectedBotType={selectedBotType}
          setSelectedBotType={setSelectedBotType}
        />

        {/* Các component còn lại giữ nguyên */}
        <StatsCards
          stats={stats}
          winRateData={winRateData}
          profitToday={profitToday}
          profitYesterday={profitYesterday}
          profitLastWeek={profitLastWeek}
          profitLastMonth={profitLastMonth}
          showAdvancedStats={showAdvancedStats}
          trades={trades}
        />

        <PerformanceChart
          chartData={{
            ...chartData,
            performanceData: chartData.performanceData
              ? chartData.performanceData.slice(-200)
              : [],
          }}
          stats={stats}
          timeframe={timeframe}
          loading={loading}
        />

        <ChartGrids
          chartData={{
            ...chartData,
            performanceData: chartData.performanceData
              ? chartData.performanceData.slice(-200)
              : [],
          }}
          stats={stats}
        />

        <RecentTradesTable
          trades={trades ? trades.slice(0, 50) : []}
          loading={loading}
          error={error}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};

export default OverviewTab;