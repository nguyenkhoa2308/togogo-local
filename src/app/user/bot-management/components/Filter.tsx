"use client";

import { useMemo } from "react";
import {
  Search,
  Settings2,
  XCircle,
  ChevronDown,
  Check,
  X,
} from "lucide-react";

interface FilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  statusDropdown: boolean;
  setStatusDropDown: (open: boolean) => void;
  handleSelectStatus: (status: string) => void;
}

export default function Filter({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  statusDropdown,
  setStatusDropDown,
  handleSelectStatus,
}: FilterProps) {
  const statusOptions = useMemo(
    () => [
      { value: "all", label: "Tất cả" },
      { value: "active", label: "Hoạt động" },
      { value: "paused", label: "Tạm dừng" },
    ],
    []
  );

  const getLabelByValue = (value: string): string => {
    return statusOptions.find((opt) => opt.value === value)?.label || value;
  };

  return (
    <div className="p-4 sm:p-6 border-b border-[#64ffda14]">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1 max-w-md">
          <input
            placeholder="Tìm kiếm bot..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-10 pr-3 rounded-md bg-[#1E293B] border border-[#64ffda14] text-sm text-white outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Xoá chuỗi tìm kiếm"
            >
              <XCircle size={16} className="opacity-50" />
            </button>
          )}
        </div>
        <div className="relative min-w-[120px] sm:min-w-[150px]">
          <button
            onClick={() => setStatusDropDown(!statusDropdown)}
            className="flex justify-between items-center gap-3 bg-[#0F172A] w-full text-white text-sm px-3 py-1.5 rounded-md border border-[#64ffda14] hover:bg-white/10"
            title="Chọn trạng thái bot"
          >
            <span className="truncate">{getLabelByValue(statusFilter)}</span>
            <ChevronDown
              className={`size-4 shrink-0 transition-transform ${
                statusDropdown ? "rotate-180" : ""
              }`}
            />
          </button>
          {statusDropdown && (
            <div className="absolute z-10 mt-1 w-full bg-[#0F172A] border border-white/10 rounded-md shadow-lg">
              {statusOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectStatus(option.value)}
                  className={`block text-xs w-full text-left px-3 py-2 hover:bg-white/10 ${
                    option.value === statusFilter ? "bg-white/5" : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{option.label}</span>
                    {option.value === statusFilter && <Check className="w-4 h-4" />}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium rounded-lg text-sm flex items-center gap-1.5"
          >
            <Settings2 size={16} />
            Bộ lọc
            <ChevronDown size={12} />
          </button>
          <button
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium rounded-lg text-sm flex items-center gap-1.5"
          >
            <X size={16} />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}