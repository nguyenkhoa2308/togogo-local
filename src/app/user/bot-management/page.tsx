"use client";

import {
  Play,
  Pause,
  Settings,
  Download,
  Upload,
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import Filter from "./components/Filter";

import { useBotManagement } from "./hooks/useBotManagement";
import BotCreateModal from "./components/ModalCreateBot";
import { useCallback, useEffect } from "react";
import { Bots } from "./types";
import { GenericTable } from "@/components/table/GenericTable";

import ModalUpdateBot from "./components/ModalUpdateBots";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Statistic } from "./components/Statistic";

export default function BotManagement() {
  const {
    bots,
    selectedBots,
    searchTerm,
    statusFilter,
    statusDropdown,
    notification,
    showModal,
    filteredBots,
    setSearchTerm,
    setStatusFilter,
    setStatusDropdown,
    setShowModal,
    paginatedBots,
    // handleSelectBot,
    handleSelectAll,
    handleBotAction,
    handleCreateBot,
    handleDeleteBot,
    handleUpdateBot,
    updateModalVisible,
    currentBot,
    setCurrentBot,
    setUpdateModalVisible,
    confirmOpen,
    setConfirmOpen,
    selectedId,
    setSelectedId,
    currentPage,
    setCurrentPage,
    pageSize,
  } = useBotManagement();

  const openUpdateModal = useCallback((botId: number) => {
    const bot = bots.find((b) => b.botId === botId);
    if (bot) {
      setCurrentBot(bot);
      setUpdateModalVisible(true);
    }
  }, [bots]);
  useEffect(() => {
    console.log("currentBot changed", currentBot);
  }, [currentBot]);
  const botColumns = [
    {
      key: "botName",
      label: "Tên Bot",
      render: (bot: Bots) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${bot.isActive ? "bg-[#00e5a1]" : "bg-gray-400"}`} />
          <span>{bot.botName}</span>
        </div>
      ),
    },
    {
      key: "description",
      label: "Mô tả",
      render: (bot: Bots) =>
        bot.description.length > 50
          ? bot.description.slice(0, 50) + "..."
          : bot.description,
    },
    {
      key: "createdDate",
      label: "Ngày tạo",
      render: (bot: Bots) =>
        new Date(bot.createdDate).toLocaleString("vi-VN"),
    },
    {
      key: "isActive",
      label: "Trạng thái",
      render: (bot: Bots) => (
        <span
          className={`inline-block px-2 py-0.5 text-xs rounded-md font-bold ${bot.isActive
            ? "bg-[#00e5a1]/10 text-[#00e5a1]"
            : "bg-orange-500/10 text-orange-400"
            }`}
        >
          {bot.isActive ? "Hoạt động" : "Dừng"}
        </span>
      ),
    },
  ];

  return (
    <div className="w-full p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold">Bot Management</h1>
          <p className="text-xs sm:text-sm text-[#94a3b8] mt-1">
            Quản lý bot giao dịch tự động
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="px-3 py-2 border border-[#00E5A1]/50 bg-[#1e293b]/30 text-[#00E5A1] rounded-md hover:bg-[#00e5a1]/10 text-xs flex items-center font-bold">
            <Download className="w-4 h-4 mr-2" /> Template
          </button>
          <button className="px-3 py-2 border border-[#00E5A1]/50 bg-[#1e293b]/30 text-[#00E5A1] rounded-md hover:bg-[#00e5a1]/10 text-xs flex items-center font-bold">
            <Upload className="w-4 h-4 mr-2" /> Import
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-3 py-2 bg-[#00E5A1] text-[#0a1529] rounded-md hover:bg-[#00D194] text-xs flex items-center font-bold"
          >
            <Plus className="w-4 h-4 mr-2" /> Tạo bot mới
          </button>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="p-3 bg-green-200 text-green-800 rounded shadow text-sm">
          {notification}
        </div>
      )}

      {/* Statistic Grid */}
      <Statistic />

      {/* Main Content */}
      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-3">
          <div className="bg-[#0f172a] text-white rounded-xl border border-[#64ffda14] p-4 sm:p-6">
            <Filter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              statusDropdown={statusDropdown}
              setStatusDropDown={setStatusDropdown}
              handleSelectStatus={(value) => {
                setStatusFilter(value);
                setStatusDropdown(false);
              }}
            />

            <GenericTable
              data={paginatedBots}
              columns={botColumns}
              rowKey={(bot) => bot.botId}
              selectedKeys={selectedBots}
              //  onSelectRow={handleSelectBot}
              onSelectAll={handleSelectAll}
              pagination={{
                currentPage,
                pageSize,
                total: filteredBots.length,
                onPageChange: setCurrentPage,
              }}
              actions={(bot) => (
                <div className="flex gap-2">
                  {/* Sửa bot */}
                  <button
                    onClick={() => openUpdateModal(bot.botId)}
                    title="Chỉnh sửa"
                  >
                    <Edit className="w-4 h-4 text-blue-400" />
                  </button>

                  {/* Start/Stop bot */}
                  <button
                    onClick={() => handleBotAction(bot.botId)}
                    title={bot.isActive ? "Dừng bot" : "Khởi động bot"}
                  >
                    {bot.isActive ? (
                      <Pause className="w-4 h-4 text-red-500" />
                    ) : (
                      <Play className="w-4 h-4 text-green-500" />
                    )}
                  </button>

                  {/* Xoá bot */}
                  <button
                    onClick={() => {
                      setSelectedId(bot.botId);
                      setConfirmOpen(true);
                    }}
                    title="Xoá bot"
                  >
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>

                </div>
              )}
            />
            <div className="border-t border-[#64ffda14] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-[#94a3b8] gap-2">
                <span>Hiển thị {bots.length} trong tổng số {bots.length} bot</span>
                <div className="flex items-center gap-4">
                  <span>
                    Hoạt động: <span className="text-[#00e5a1] font-semibold">{bots.filter(b => b.isActive).length}</span>
                  </span>
                  <span>
                    Tạm dừng: <span className="text-orange-500 font-semibold">{bots.filter(b => !b.isActive).length}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-[#0f172a] text-white rounded-xl border border-[#64ffda14] p-4 sm:p-6">
            <div className="border-b border-[#64ffda14] p-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Tổng quan</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Tổng số bot</span>
                <span className="text-white font-semibold">{bots.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Đang hoạt động</span>
                <span className="text-[#00e5a1] font-semibold">{bots.filter(b => b.isActive).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Tạm dừng</span>
                <span className="text-orange-400 font-semibold">{bots.filter(b => !b.isActive).length}</span>
              </div>
              <div className="border-t border-[#64ffda14] pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#94a3b8] text-sm">Avg Win Rate</span>
                  <span className="text-white font-semibold">74.6%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#94a3b8] text-sm">Total P&L</span>
                <span className="text-[#00e5a1] font-semibold">+₫10.4M</span>
              </div>
            </div>
          </div>
          <div className="bg-[#0f172a] text-white rounded-xl border border-[#64ffda14] p-4 sm:p-6">
            <div className="border-b border-[#64ffda14] p-4">
              <h3 className="text-base sm:text-lg font-semibold text-white">Hành động</h3>
            </div>
            <div className="p-4 space-y-2 flex flex-col">
              <button
                className="p-3 border border-[#64ffda14] bg-[#1e293b]/30 rounded-md hover:bg-[#1e293b]/10 text-sm flex items-center font-bold"
              >
                <Play className="w-4 h-4 mr-4" /> Khởi động tất cả
              </button>
              <button
                className="p-3 border border-[#64ffda14] bg-[#1e293b]/30 rounded-md hover:bg-[#1e293b]/10 text-sm flex items-center font-bold"
              >
                <Pause className="w-4 h-4 mr-4" /> Tạm dừng tất cả
              </button>
              <button
                className="p-3 border border-[#64ffda14] bg-[#1e293b]/30 rounded-md hover:bg-[#1e293b]/10 text-sm flex items-center font-bold"
              >
                <Settings className="w-4 h-4 mr-4" /> Cài đặt chung
              </button>
            </div>
          </div>
        </aside>
      </section>
      <BotCreateModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateBot}

      />
      <ModalUpdateBot
        visible={updateModalVisible}
        onClose={() => setUpdateModalVisible(false)}
        onSubmit={(data) => {
          if (currentBot) {
            handleUpdateBot(currentBot.botId, data);
            setUpdateModalVisible(false);
          }
        }}
        bot={currentBot || undefined}
      />
      <ConfirmDialog
        isOpen={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setSelectedId(null);
        }}
        onConfirm={async () => {
          if (selectedId !== null) {
            await handleDeleteBot(selectedId);
            setConfirmOpen(false);
            setSelectedId(null);
          }
        }}
        title="Xoá bot"
        description="Bạn có chắc chắn muốn xoá bot này không?"
        confirmText="Xoá"
        cancelText="Huỷ"
      />
    </div>
  );
}