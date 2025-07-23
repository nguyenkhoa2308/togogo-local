// components/tables/TradesTable.tsx
import React from "react";
import {
  RefreshCw,
  AlertCircle,
  Activity,
  ChevronLeft,
  ChevronRight,
  ArrowUpCircle,
  ArrowDownCircle,
  User,
  Hash,
  Bot,
  TrendingUp,
  TrendingDown,
  Calendar,
  BadgeDollarSign,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { Trade } from "../../types";
import { Helpers } from "../../utils/helpers";

interface TradesTableProps {
  trades: Trade[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  hasMoreTrades: boolean;
}

const columnDefs = [
  { key: "tradeId", label: "ID", icon: <Hash size={16} /> },
  { key: "botName", label: "Bot", icon: <Bot size={16} /> },
  { key: "symbol", label: "Cặp", icon: <BadgeDollarSign size={16} /> },
  { key: "type", label: "Loại", icon: <TrendingUp size={16} /> },
  { key: "direction", label: "Chiều", icon: <TrendingUp size={16} /> },
  { key: "price", label: "Giá vào", icon: <BadgeDollarSign size={16} /> },
  { key: "entryDate", label: "Ngày vào", icon: <Calendar size={16} /> },
  { key: "exitPrice", label: "Giá thoát", icon: <BadgeDollarSign size={16} /> },
  { key: "positionSize", label: "Size", icon: <User size={16} /> },
  { key: "pnl", label: "P&L", icon: <TrendingUp size={16} /> },
  { key: "status", label: "Trạng thái", icon: <ShieldCheck size={16} /> },
  { key: "maxDrawdown", label: "Max DD", icon: <TrendingDown size={16} /> },
  { key: "tradeDuration", label: "Thời gian giữ", icon: <Clock size={16} /> },
];

// Helper để trả về className phân biệt màu Long/Short rõ ràng cho Tailwind build
function getDirectionClass(direction: string) {
  if (direction === "Long")
    return "bg-green-600 text-white border border-green-500";
  if (direction === "Short")
    return "bg-red-600 text-white border border-red-500";
  return "bg-gray-400 text-white border border-gray-300";
}

// Helper để trả về className cho BUY/SELL
function getTypeClass(type: string) {
  if (type === "BUY") return "bg-green-600 text-white border border-green-500";
  if (type === "SELL") return "bg-red-600 text-white border border-red-500";
  return "bg-gray-400 text-white border border-gray-300";
}

// Helper để trả về className cho Win/Loss
function getStatusClass(status: string, pnl: any) {
  if (status === "Win" || (pnl && parseFloat(pnl) > 0))
    return "bg-blue-600 text-white border border-blue-500";
  if (status === "Loss" || (pnl && parseFloat(pnl) < 0))
    return "bg-purple-600 text-white border border-purple-500";
  if (status === "Pending")
    return "bg-yellow-600 text-white border border-yellow-500";
  return "bg-gray-400 text-white border border-gray-300";
}

export const TradesTable: React.FC<TradesTableProps> = ({
  trades,
  loading,
  error,
  searchTerm,
  currentPage,
  setCurrentPage,
  hasMoreTrades,
}) => {
  const Row = ({ index, data }: any) => {
    const trade = data[index];
    return (
      <tr
        key={trade.tradeId || index}
        className="h-12 min-h-[48px] border-b border-blue-100/10 group cursor-pointer"
      >
        {/* ID */}
        <td className="px-4 py-2 font-semibold text-blue-900 dark:text-blue-200 font-mono text-right align-middle truncate max-w-[120px]">
          {trade.tradeId || `#${index + 1}`}
        </td>
        {/* Bot */}
        <td className="px-4 py-2 align-middle break-words line-clamp-2 max-w-[180px]">
          <span className="flex items-center gap-2">
            <Bot size={16} className="text-blue-400" />
            <span className="font-medium break-words line-clamp-2 max-w-[120px]">
              {trade.botName || "N/A"}
            </span>
          </span>
        </td>
        {/* Cặp */}
        <td className="px-4 py-2 align-middle truncate max-w-[100px]">
          <span className="flex items-center gap-2">
            <BadgeDollarSign size={14} className="text-green-400" />
            <span className="font-mono truncate max-w-[60px]">
              {trade.symbol || "N/A"}
            </span>
          </span>
        </td>
        {/* Loại */}
        <td className="px-4 py-2 align-middle truncate max-w-[80px] text-center">
          <span
            className={
              "px-2 py-1 rounded-full text-xs font-bold truncate max-w-[60px] shadow " +
              getTypeClass(trade.type)
            }
          >
            {trade.type || "N/A"}
          </span>
        </td>
        {/* Chiều */}
        <td className="px-4 py-2 align-middle truncate max-w-[80px] text-center">
          <span
            className={
              "px-2 py-1 rounded-full text-xs font-bold truncate max-w-[60px] shadow " +
              getDirectionClass(trade.direction)
            }
          >
            {trade.direction || "N/A"}
          </span>
        </td>
        {/* Giá vào */}
        <td className="px-4 py-2 align-middle truncate max-w-[100px] text-right font-mono">
          {typeof trade.price === "number" ? (
            Helpers.formatLocaleNumber(trade.price)
          ) : (
            <span className="font-mono">{trade.price || "N/A"}</span>
          )}
        </td>
        {/* Ngày vào */}
        <td className="px-4 py-2 align-middle">
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-blue-400" />
            <span>{Helpers.formatDateTime(trade.entryDate)}</span>
          </span>
        </td>
        {/* Giá thoát */}
        <td className="px-4 py-2 align-middle truncate max-w-[100px] text-right font-mono">
          {typeof trade.exitPrice === "number" ? (
            Helpers.formatLocaleNumber(trade.exitPrice)
          ) : (
            <span className="font-mono">{trade.exitPrice || "N/A"}</span>
          )}
        </td>
        {/* Size */}
        <td className="px-4 py-2 align-middle truncate max-w-[80px] text-right font-mono">
          {trade.positionSize || "N/A"}
        </td>
        {/* P&L */}
        <td className="px-4 py-2 align-middle truncate max-w-[100px] text-right font-mono">
          <span
            className={`flex items-center gap-2 font-bold font-mono truncate max-w-[80px] '
              + (Helpers.parseProfitValue(trade.pnl) > 0
                ? "text-green-700"
                : "text-red-700"
              )`}
          >
            {Helpers.parseProfitValue(trade.pnl) > 0 ? (
              <ArrowUpCircle size={16} className="text-green-700" />
            ) : (
              <ArrowDownCircle size={16} className="text-red-700" />
            )}
            {typeof trade.pnl === "number"
              ? `${trade.pnl > 0 ? "+" : ""}${trade.pnl.toFixed(2)}`
              : trade.pnl || "N/A"}
          </span>
        </td>
        {/* Trạng thái */}
        <td className="px-4 py-2 align-middle break-words line-clamp-2 max-w-[120px] text-center">
          <span
            className={`px-2 py-1 rounded-full text-xs font-bold justify-center break-words line-clamp-2 max-w-[100px] ${getStatusClass(
              trade.status || "",
              trade.pnl
            )}`}
          >
            {Helpers.getTradeStatus(trade)}
          </span> 
        </td>
        {/* Max DD */}
        <td className="px-4 py-2 align-middle truncate max-w-[80px] text-right font-mono">
          <span className="flex items-center gap-2 font-mono">
            <TrendingDown size={14} className="text-red-400" />
            <span className="truncate max-w-[60px]">
              {typeof trade.maxDrawdown === "number"
                ? `${trade.maxDrawdown.toFixed(2)}%`
                : trade.maxDrawdown || "N/A"}
            </span>
          </span>
        </td>
        {/* Thời gian giữ */}
        <td className="px-4 py-2 align-middle truncate max-w-[100px] text-right font-mono">
          {Helpers.formatDuration(trade.tradeDuration)}
        </td>
      </tr>
    );
  };

  return (
    <div className="w-full py-2 sm:py-4 font-['Inter','Roboto','Arial',sans-serif]">
      <div className="bg-white/30 dark:bg-gray-900/60 border border-blue-400/30 rounded-2xl p-0 overflow-x-auto relative">
        <div className="sticky top-0 z-20">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-2 sm:px-6 py-2 sm:py-4 border-b border-blue-400/20 bg-gradient-to-r from-blue-100/60 via-white/40 to-blue-200/60 dark:from-gray-900/80 dark:to-gray-800/80 gap-2 sm:gap-0">
            <h3 className="text-base sm:text-xl font-bold flex items-center gap-2 text-blue-700 dark:text-blue-300">
              <TrendingUp size={18} className="sm:hidden mr-1" />
              <TrendingUp size={22} className="hidden sm:inline mr-1" />
              Danh sách giao dịch
            </h3>
            <div className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              {trades.length} giao dịch{" "}
              {searchTerm && <span>phù hợp với "{searchTerm}"</span>}
            </div>
          </div>
        </div>
        {error ? (
          <div className="p-8 flex flex-col items-center justify-center text-red-500">
            <AlertCircle size={32} className="mb-2" />
            <span className="font-semibold text-lg">Lỗi khi tải dữ liệu</span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              {error}
            </p>
          </div>
        ) : loading ? (
          <div className="p-8 flex flex-col items-center justify-center text-blue-500">
            <RefreshCw size={32} className="animate-spin mb-2" />
            <span className="font-semibold text-lg">Đang tải dữ liệu...</span>
          </div>
        ) : trades.length === 0 ? (
          <div className="p-8 flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
            <Activity size={32} className="mb-2" />
            <span className="font-semibold text-lg">
              Không có giao dịch nào
            </span>
            {searchTerm && (
              <p className="text-sm text-gray-400 mt-2">
                Không tìm thấy giao dịch phù hợp với "{searchTerm}"
              </p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-0 sm:min-w-[700px] md:min-w-[1100px] text-xs sm:text-sm text-left">
              <thead>
                <tr className="bg-gradient-to-r from-blue-200/60 via-white/40 to-blue-100/60 dark:from-gray-900/80 dark:to-gray-800/80 sticky top-0 z-10">
                  {columnDefs.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 font-bold text-blue-700 dark:text-blue-200 uppercase tracking-wider text-xs whitespace-nowrap border-b border-blue-400/20"
                    >
                      <span className="flex items-center gap-1">
                        {col.icon}
                        {col.label}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {trades.map((trade, index) => (
                  <Row
                    key={trade.tradeId || index}
                    index={index}
                    data={trades}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
        {/* Pagination Controls */}
        {!loading && !error && trades.length > 0 && (
          <div className="flex justify-between items-center px-6 py-4 border-t border-blue-400/20 bg-gradient-to-r from-blue-100/60 via-white/40 to-blue-200/60 dark:from-gray-900/80 dark:to-gray-800/80">
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0 || loading}
              className="px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <ChevronLeft size={18} /> Trước
            </button>
            <span className="text-base font-bold text-blue-700 dark:text-blue-200 bg-white/60 dark:bg-gray-800/60 px-4 py-2 rounded-xl shadow">
              Trang {currentPage + 1}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={!hasMoreTrades || loading}
              className="px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-200 bg-white/70 dark:bg-gray-800/70 rounded-xl shadow hover:bg-blue-100 dark:hover:bg-blue-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Tiếp <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
