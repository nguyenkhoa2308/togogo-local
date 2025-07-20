// components/tabs/AnalyticsTab.tsx
'use client';

import React from "react";
import { FilterControls } from "../controls/FilterControls";
import AnalyticsCharts from "../charts/AnalyticsCharts";
import { AdvancedStatistics } from "../statistics/AdvancedStatistics";

interface AnalyticsTabProps {
  bots: any;
  selectedBotId: string;
  setSelectedBotId: (id: string) => void;
  timeframe: any;
  setTimeframe: (tf: any) => void;
  riskLevel: any;
  setRiskLevel: (v: any) => void;
  chartData: any;
  stats: any;
  winRateData: any;
  trades: any;
  error: any;
  allTrades: any;
  disableAnimation?: boolean;
  selectedBotType: string;
  setSelectedBotType: (type: string) => void;

  // Filter props
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
  handleExport: () => void;
  isExporting: boolean;
  setCurrentPage: (page: number) => void;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({
  bots,
  selectedBotId,
  setSelectedBotId,
  timeframe,
  setTimeframe,
  riskLevel,
  setRiskLevel,
  chartData,
  stats,
  winRateData,
  trades,
  error,
  allTrades,
  disableAnimation,
  selectedBotType,
  setSelectedBotType,
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
  handleExport,
  isExporting,
  setCurrentPage,
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-white/10">
      <div className="space-y-6">
        {/* Filter Controls */}
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
          handleExport={handleExport}
          isExporting={isExporting}
          error={error}
          setCurrentPage={setCurrentPage}
          selectedBotType={selectedBotType}
          setSelectedBotType={setSelectedBotType}
        />

        {/* Charts */}
        <AnalyticsCharts
          chartData={chartData}
          stats={stats}
          trades={allTrades}
          winRateData={winRateData}
        />

        {/* Table */}
        <AdvancedStatistics
          stats={stats}
          winRateData={winRateData}
          trades={trades}
        />
      </div>
    </div>
  );
};

export default AnalyticsTab;
