// components/tabs/TradesTab.tsx
import React from "react";
import { FilterControls } from "../controls/FilterControls";
import { TradesTable } from "../tables/TradesTable";

interface TradesTabProps {
  trades: any;
  loading: boolean;
  error: any;
  goToNextPage: () => void;
  goToPrevPage: () => void;
  goToFirstPage: () => void;
  goToPage: (page: number) => void;
  currentPage: number;
  hasMoreTrades: boolean;
  totalTrades: number;
  pageSize: number;
  disableAnimation?: boolean;
  selectedBotType: string;
  setSelectedBotType: (type: string) => void;
}

export const TradesTab: React.FC<TradesTabProps> = ({
  trades,
  loading,
  error,
  goToNextPage,
  goToPrevPage,
  goToFirstPage,
  goToPage,
  currentPage,
  hasMoreTrades,
  totalTrades,
  pageSize,
  disableAnimation,
  selectedBotType,
  setSelectedBotType,
}) => {
  if (
    !trades ||
    typeof trades !== "object" ||
    !Array.isArray(trades.filteredTrades)
  ) {
    return (
      <div className="text-center py-8 text-red-500">
        Không có dữ liệu giao dịch hoặc dữ liệu bị lỗi.
      </div>
    );
  }
  const {
    bots,
    selectedBotId,
    setSelectedBotId,
    filteredTrades,
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
    setCurrentPage,
    handleExport,
    isExporting,
  } = trades;

  console.log("Rendering TradesTab with trades:", {filteredTrades, searchTerm, error}  );
  

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 rounded-3xl border border-white/10">
      <div className="space-y-6">
        {/* Filter controls */}
       <FilterControls
  bots={bots}
  selectedBotId={selectedBotId}
  setSelectedBotId={setSelectedBotId}
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  selectedTypeFilter={selectedTypeFilter}
  setSelectedTypeFilter={setSelectedTypeFilter} // ✅ sửa đúng ở đây
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


        {/* Trades list */}
        <TradesTable
          trades={filteredTrades.map((trade) => ({
            ...trade,
            pnl: trade.pnl !== undefined ? trade.pnl : trade.profit,
          }))}
          loading={loading}
          error={error}
          searchTerm={searchTerm}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          hasMoreTrades={hasMoreTrades}
        />
      </div>
    </div>
  );
};

export default TradesTab;
