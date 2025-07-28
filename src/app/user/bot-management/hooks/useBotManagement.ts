"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { Bots, CreateBotInput } from "../types";
import { ApiService } from "../services/api";
import { BotMessages } from "@/lib/constants";
import toast from "react-hot-toast";

export const useBotManagement = () => {
  const [bots, setBots] = useState<Bots[]>([]);
  const [selectedBots, setSelectedBots] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newBotName, setNewBotName] = useState("");
  const [statusDropdown, setStatusDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [currentBot, setCurrentBot] = useState<Bots | null>(null);
  const [notification, setNotification] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const statusOptions = useMemo(
    () => [
      { value: "all", label: "Tất cả" },
      { value: "active", label: "Hoạt động" },
      { value: "paused", label: "Tạm dừng" },
    ],
    []
  );

  const fetchBots = useCallback(async () => {
    try {
      const response = await ApiService.loadBots();

      setBots(response);
    } catch (error) {
      console.error("Failed to fetch bots:", error);
      toast.error(BotMessages.FETCH_FAILED)
    }
  }, []);

  useEffect(() => {
    fetchBots();
  }, [fetchBots]);

 const filteredBots = useMemo(() => {
  return bots.filter((bot) => {
    const matchesSearch =
      !searchTerm || bot.botName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && bot.isActive) ||
      (statusFilter === "paused" && !bot.isActive);

    return matchesSearch && matchesStatus;
  });
}, [bots, searchTerm, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleSelectBot = useCallback((id: number) => {
    setSelectedBots((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedBots((prev) =>
      prev.length === filteredBots.length ? [] : filteredBots.map((b) => b.botId)
    );
  }, [filteredBots]);

  const handleBotAction = useCallback((id: number) => {
    setBots((prev) =>
      prev.map((bot) =>
        bot.botId === id ? { ...bot, isActive: !bot.isActive } : bot
      )
    );
    setSelectedBots((prev) => prev.filter((i) => i !== id));
  }, []);

  const paginatedBots = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredBots.slice(start, end);
  }, [filteredBots, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil(filteredBots.length / pageSize);
  }, [filteredBots.length, pageSize]);


  const getStatusLabel = useCallback(
    (value: string): string => {
      return statusOptions.find((opt) => opt.value === value)?.label || value;
    },
    [statusOptions]
  );
  const handleCreateBot = async (data: CreateBotInput) => {
    setLoading(true);
    try {
      await ApiService.createBot(data);
      toast.success(BotMessages.CREATE_SUCCESS);
      setShowModal(false);
      await fetchBots();
    } catch (err) {
      console.error(err);
      toast.error(BotMessages.CREATE_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBot = async (id: number) => {
    setLoading(true);
    try {
      await ApiService.delete(id);
      toast.success(BotMessages.DELETE_SUCCESS);
      await fetchBots();
    } catch (err) {
      console.error(err);
      toast.error(BotMessages.DELETE_FAILED);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateBot = async (id: number, data: Partial<Bots>) => {
    setLoading(true);
    try {
      await ApiService.update(id, data);
      toast.success(BotMessages.UPDATE_SUCCESS);
      await fetchBots();
    } catch (err) {
      console.error(err);
      toast.error(BotMessages.UPDATE_FAILED);
    } finally {
      setLoading(false);
    }
  };


  return {
    bots,
    filteredBots,
    selectedBots,
    searchTerm,
    statusFilter,
    statusOptions,
    notification,
    showModal,
    newBotName,
    statusDropdown,
    setSearchTerm,
    setStatusFilter,
    setNotification,
    setShowModal,
    setNewBotName,
    setStatusDropdown,
    handleSelectBot,
    handleSelectAll,
    handleBotAction,
    getStatusLabel,
    fetchBots,
    loading,
    handleCreateBot,
    handleDeleteBot,
    handleUpdateBot,
    updateModalVisible,
    setUpdateModalVisible,
    currentBot,
    setCurrentBot,
    confirmOpen,
    setConfirmOpen,
    selectedId,
    setSelectedId,
    paginatedBots,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
  };
};
