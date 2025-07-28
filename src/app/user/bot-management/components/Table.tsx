"use client";

import { Bots } from "../types";
import { Check, Eye, Edit, Pause, Play, Trash2, Zap } from "lucide-react";

interface TableProps {
  bots: Bots[];
  selectedBots: number[];
  handleSelectBot: (id: number) => void;
  handleSelectAll: () => void;
  handleBotAction: (id: number) => void;
}

export default function Table({
  bots,
  selectedBots,
  handleSelectBot,
  handleSelectAll,
  handleBotAction,
}: TableProps) {
  return (
    <>
      <div className="border-b border-[#64ffda14] p-4">
        <div className="flex items-center space-x-3">
          <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-[#00e5a1]" />
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-white">
              Danh sách Bot Trading
            </h3>
            <p className="text-[#94a3b8] text-xs sm:text-sm">
              Quản lý và theo dõi trạng thái bot
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-[#00e5a1] rounded-full animate-pulse"></div>
          <span className="text-[#94a3b8] text-xs sm:text-sm">
            Cập nhật realtime
          </span>
        </div>
      </div>
      <div className="block sm:hidden">
        {bots.length === 0 ? (
          <div className="text-center p-4 text-gray-500 text-sm">
            Không có bot nào.
          </div>
        ) : (
          bots.map((bot) => (
            <div
              key={bot.botId}
              className="border-b border-[#64ffda14] p-4 hover:bg-accent/20"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border border-[#64ffda14] bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1]"
                    checked={selectedBots.includes(bot.botId)}
                    onChange={() => handleSelectBot(bot.botId)}
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${bot.isActive ? "bg-[#00e5a1] animate-pulse" : "bg-gray-400"
                        }`}
                    ></div>
                    <span className="font-medium text-white text-sm">{bot.botName}</span>
                  </div>
                </div>
                <span
                  className={`border text-xs rounded-md px-2 py-0.5 font-bold ${bot.isActive
                      ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                      : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                    }`}
                >
                  {bot.isActive ? "Hoạt động" : "Dừng"}
                </span>
              </div>
              <div className="mt-2 text-sm text-[#94a3b8]">
                {bot.description.length > 50
                  ? `${bot.description.slice(0, 50)}...`
                  : bot.description}
              </div>
              <div className="mt-1 text-xs text-[#94a3b8]">
                {new Date(bot.createdDate).toLocaleDateString("vi-VN", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="mt-3 flex gap-1">
                <button
                  className="p-2 rounded-md hover:bg-[#334155]/20 text-gray-400 hover:text-white"
                  title="Xem chi tiết"
                  onClick={() => console.log("View details for bot:", bot.botId)}
                >
                  <Eye className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#334155]/20 text-gray-400 hover:text-white"
                  title="Chỉnh sửa"
                  onClick={() => console.log("Edit bot:", bot.botId)}
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  className="p-2 rounded-md hover:bg-[#334155]/20"
                  title={bot.isActive ? "Dừng bot" : "Bắt đầu bot"}
                  onClick={() => handleBotAction(bot.botId)}
                >
                  {bot.isActive ? (
                    <Pause className="w-5 h-5 text-[#ef4444]" />
                  ) : (
                    <Play className="w-5 h-5 text-[#00e5a1]" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="hidden sm:block">
        <table className="w-full">
          <thead className="bg-[#1e293b]/30">
            <tr>
              <th className="text-left p-3 sm:p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide w-12 rounded-tl-lg">
                <label className="inline-flex items-center cursor-pointer select-none relative">
                  <input
                    type="checkbox"
                    className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1]"
                    checked={
                      selectedBots.length === bots.length && bots.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                  <Check
                    className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                    strokeWidth={3}
                  />
                </label>
              </th>
              <th className="text-left p-3 sm:p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                Bot
              </th>
              <th className="text-left p-3 sm:p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                Mô tả
              </th>
              <th className="text-left p-3 sm:p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                Ngày tạo
              </th>
              <th className="text-left p-3 sm:p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide">
                Trạng thái
              </th>
              <th className="text-left p-3 sm:p-4 text-xs font-medium text-[#94a3b8] uppercase tracking-wide rounded-tr-lg">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {bots.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="text-center p-4 text-gray-500 text-sm"
                >
                  Không có bot nào.
                </td>
              </tr>
            ) : (
              bots.map((bot) => (
                <tr
                  className="border-b border-[#64ffda14] hover:bg-accent/20"
                  key={bot.botId}
                >
                  <td className="p-3 sm:p-4">
                    <label className="inline-flex items-center cursor-pointer select-none relative">
                      <input
                        type="checkbox"
                        className="peer appearance-none h-4 w-4 rounded border border-[#64ffda14] bg-[#1e293b] checked:bg-[#00e5a1] checked:border-[#00e5a1]"
                        checked={selectedBots.includes(bot.botId)}
                        onChange={() => handleSelectBot(bot.botId)}
                      />
                      <Check
                        className="absolute pointer-events-none left-0.5 top-0.5 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 peer-checked:text-black"
                        strokeWidth={3}
                      />
                    </label>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full ${bot.isActive ? "bg-[#00e5a1] animate-pulse" : "bg-gray-400"
                          }`}
                      ></div>
                      <div className="font-medium text-white text-sm">
                        {bot.botName}
                      </div>
                    </div>
                  </td>
                  <td className="p-3 sm:p-4 text-sm text-[#94a3b8]">
                    {bot.description.length > 50
                      ? `${bot.description.slice(0, 50)}...`
                      : bot.description}
                  </td>
                  <td className="p-3 sm:p-4 text-sm text-[#94a3b8]">
                    {new Date(bot.createdDate).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="p-3 sm:p-4">
                    <span
                      className={`inline-block whitespace-nowrap border text-xs rounded-md px-2 py-0.5 font-bold ${bot.isActive
                          ? "bg-[#00e5a1]/10 text-[#00e5a1] border-[#00e5a1]/20"
                          : "bg-orange-500/10 text-orange-400 border-orange-500/20"
                        }`}
                    >
                      {bot.isActive ? "Hoạt động" : "Dừng"}
                    </span>
                  </td>
                  <td className="p-3 sm:p-4">
                    <div className="flex items-center space-x-1">
                      <button
                        className="p-2 rounded-md hover:bg-[#334155]/20 text-gray-400 hover:text-white"
                        title="Xem chi tiết"
                        onClick={() => console.log("View details for bot:", bot.botId)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 rounded-md hover:bg-[#334155]/20 text-gray-400 hover:text-white"
                        title="Chỉnh sửa"
                        onClick={() => console.log("Edit bot:", bot.botId)}
                      >
                        <Edit className="w-5 h-5" />
                      </button>
                      <button
                        className="p-2 rounded-md hover:bg-[#334155]/20"
                        title={bot.isActive ? "Dừng bot" : "Bắt đầu bot"}
                        onClick={() => handleBotAction(bot.botId)}
                      >
                        {bot.isActive ? (
                          <Pause className="w-5 h-5 text-[#ef4444]" />
                        ) : (
                          <Play className="w-5 h-5 text-[#00e5a1]" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {selectedBots.length > 0 && (
        <div className="mt-3 p-3 bg-[#334155]/30 rounded-lg border border-[#64ffda0a]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-sm text-foreground">
              {selectedBots.length} bot đã chọn
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                className="px-3 py-2 bg-[#00E5A1] text-[#0a1529] rounded-md hover:bg-[#00D194] text-xs flex items-center font-bold"
              >
                <Play className="w-4 h-4 mr-1" />
                Khởi động
              </button>
              <button
                className="px-3 py-2 bg-orange-600 text-[#0a1529] rounded-md hover:bg-orange-700 text-xs flex items-center font-bold"
              >
                <Pause className="w-4 h-4 mr-1" />
                Tạm dừng
              </button>
              <button
                className="px-3 py-2 bg-[#ef4444]/60 text-white rounded-md hover:bg-[#ef4444]/50 text-xs flex items-center font-bold"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}