// components/tables/RecentTradesTable.tsx
import React from "react";
import {
  RefreshCw,
  AlertCircle,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { Trade, ActiveTab } from "../../types";
import { Helpers } from "../../utils/helpers";

interface RecentTradesTableProps {
  trades: Trade[];
  loading: boolean;
  error: string | null;
  setActiveTab: (tab: ActiveTab) => void;
}

export const RecentTradesTable: React.FC<RecentTradesTableProps> = ({
  trades,
  loading,
  error,
  setActiveTab,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Giao dịch gần đây
          </h3>
          <button
            onClick={() => setActiveTab("trades")}
            className="text-blue-500 dark:text-blue-400 text-sm hover:underline flex items-center transition-all hover:translate-x-0.5"
          >
            Xem tất cả
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          <div className="flex justify-center mb-3">
            <RefreshCw size={24} className="animate-spin" />
          </div>
          Đang tải dữ liệu...
        </div>
      ) : error ? (
        <div className="p-6 text-center text-red-500">
          <div className="flex justify-center mb-3">
            <AlertCircle size={24} />
          </div>
          {error}
        </div>
      ) : trades.length === 0 ? (
        <div className="p-6 text-center text-gray-500 dark:text-gray-400">
          Không có giao dịch nào
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-750">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Cặp
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Giá vào
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Ngày vào
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  P&L
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {trades.slice(0, 5).map((trade, index) => (
                <tr
                  key={trade.tradeId || index}
                  className="hover:bg-white dark:hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-4 truncate max-w-[60px] text-sm text-gray-900 dark:text-gray-200">
                    #{index + 1}
                  </td>
                  <td className="px-6 py-4 break-words line-clamp-2 max-w-[120px] text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <div className="w-7 h-7 rounded-full mr-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                        {Helpers.getSymbolIcon(trade.symbol)}
                      </div>
                      <span className="break-words line-clamp-2 max-w-[80px]">
                        {trade.symbol || "N/A"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 truncate max-w-[80px] text-sm text-gray-900 dark:text-gray-200">
                    {typeof trade.price === "number"
                      ? Helpers.formatLocaleNumber(trade.price)
                      : trade.price || "N/A"}
                  </td>
                  <td className="px-6 py-4 truncate max-w-[100px] text-sm text-gray-500 dark:text-gray-400">
                    {Helpers.formatDateTime(trade.entryDate)}
                  </td>
                  <td className="px-4 py-2 text-right truncate max-w-[80px]">
                    <span
                      className={`flex items-center ${Helpers.getProfitColorClass(
                        trade.profit
                      )} truncate max-w-[60px]`}
                    >
                      {Helpers.parseProfitValue(trade.profit) >= 0 ? (
                        <ArrowUpCircle size={16} className="mr-1" />
                      ) : (
                        <ArrowDownCircle size={16} className="mr-1" />
                      )}
                      {Helpers.getProfitDisplay(trade.profit)}
                    </span>
                  </td>
                  <td className="px-6 py-4 break-words line-clamp-2 max-w-[100px] text-sm">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full break-words line-clamp-2 max-w-[80px] ${Helpers.getStatusColorClass(
                        trade.status || "",
                        trade.profit
                      )}`}
                    >
                      {Helpers.getTradeStatus(trade)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
