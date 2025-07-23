import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Calendar,
  Download,
  RefreshCw,
  XCircle,
  Settings2,
  X,
} from "lucide-react";
import { Bot } from "../../types";
import { Helpers } from "../../utils/helpers";

interface FilterControlsProps {
  bots: Bot[];
  selectedBotId: string;
  setSelectedBotId: (botId: string) => void;
  selectedBotType: string;
  setSelectedBotType: (type: string) => void;
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
  error: string | null;
  setCurrentPage: (page: number) => void;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  bots,
  selectedBotId,
  setSelectedBotId,
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
  error,
  setCurrentPage,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const handleResetFilters = () => {
    setSelectedBotId(bots[0]?.botId || "");
    setSelectedBotType("");
    setSearchTerm("");
    setSelectedTypeFilter("");
    setSelectedStatusFilter("");
    setStartDateFilter("");
    setEndDateFilter("");
    setCurrentPage(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 flex-wrap">
        {/* Main Filters: Search and Bot Selection */}
        <div className="flex flex-1 items-center gap-3 flex-wrap min-w-0"> {/* Use min-w-0 to allow shrinking */}
          {/* Search Box */}
          <div className="relative flex-1 min-w-[150px]">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-8 py-2.5 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200 text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XCircle size={16} className="opacity-50" />
              </button>
            )}
          </div>

          {/* Bot Selection */}
          <div className="relative flex-1 min-w-[150px]">
            <select
              value={selectedBotId}
              onChange={(e) => setSelectedBotId(e.target.value)}
              className="appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200 text-sm transition-all"
            >
              {/* Option "Tất cả Bot" hoặc "Đang tải" chỉ hiển thị khi không có bot nào */}
              {bots.length === 0 ? (
                <>
                  {error && <option value="">Lỗi tải bots</option>}
                </>
              ) : (
                <option value={bots[0]?.botId || ""}>
                  {bots[0]?.botName || "Chọn Bot"} 
                </option>
              )}
              {bots.map((bot) => (
                <option key={bot.botId} value={bot.botId}>
                  {bot.botName}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500 dark:text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Toggle Advanced Filters Button */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex-shrink-0 px-3 py-2.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1.5"
          >
            <Settings2 size={16} className={`${showAdvancedFilters ? 'rotate-180' : ''} transition-transform duration-200`} />
            Bộ lọc nâng cao
            <ChevronDown size={16} className={`${showAdvancedFilters ? 'rotate-180' : ''} transition-transform duration-200`} />
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className={`flex-shrink-0 px-3 py-2.5 justify-center 
              ${
                isExporting
                  ? "bg-blue-400 dark:bg-blue-700 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700"
              } 
              text-white font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center`}
          >
            {isExporting ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Download size={18} />
            )}
          </button>

          {/* Reset Filters Button */}
          <button
            onClick={handleResetFilters}
            className="flex-shrink-0 px-3 py-2.5 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all duration-200 flex items-center gap-1.5"
          >
            <X size={16} />
            Reset
          </button>
        </div>
      </div>

      {showAdvancedFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"> 
          {/* Type Filter */}
          <div className="relative">
            <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Loại giao dịch
            </label>
            <select
              id="type-filter"
              value={selectedTypeFilter}
              onChange={(e) => {
                setSelectedTypeFilter(e.target.value);
                setCurrentPage(0);
              }}
              className="appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 pr-8 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200 text-sm transition-all"
            >
              <option value="">Tất cả Loại</option>
              <option value="Buy">BUY</option>
              <option value="Sell">SELL</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-500 dark:text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>
              
          {/* Status Filter */}
          <div className="relative">
            <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trạng thái
            </label>
            <select
              id="status-filter"
              value={selectedStatusFilter}
              onChange={(e) => {
                setSelectedStatusFilter(e.target.value);
                setCurrentPage(0);
              }}
              className="appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2.5 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200"
            >
              <option value="">Tất cả Trạng thái</option>
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
              <option value="Pending">Pending</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 top-7 flex items-center px-2 text-gray-500 dark:text-gray-400">
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Order Code Filter - THÊM VÀO ĐÂY */}
  <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loại bot</label>
            <select
              value={selectedBotType}
              onChange={(e) => {
                const type = e.target.value;
                setSelectedBotType(type);
                const filtered = Helpers.filterBotsByType(bots, type);
                setSelectedBotId(filtered[0]?.botId || "");
                setCurrentPage(0);
              }}
              className="appearance-none w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2.5 pr-10 text-sm text-gray-700 dark:text-gray-200"
            >
              <option value="">Tất cả loại Bot</option>
              <option value="phaisinh">Phái sinh</option>
              <option value="coin">Coin</option>
              <option value="bot">Bot</option>
            </select>
            <ChevronDown size={16} className="absolute top-9 right-2 text-gray-400 pointer-events-none" />
          </div>
          {/* END THÊM VÀO ĐÂY */}

          {/* Date Range Pickers (Vẫn giữ nguyên, giờ có thể chiếm 1 hoặc 2 cột tùy screen size) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Từ ngày
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="startDate"
                  value={startDateFilter}
                  onChange={(e) => setStartDateFilter(e.target.value)}
                  className="pl-8 pr-2 py-2.5 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200 text-sm transition-all"
                />
              </div>
            </div>
            <div className="relative">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Đến ngày
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <Calendar size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  id="endDate"
                  value={endDateFilter}
                  onChange={(e) => setEndDateFilter(e.target.value)}
                  className="pl-8 pr-2 py-2.5 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-700 dark:text-gray-200 text-sm transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};