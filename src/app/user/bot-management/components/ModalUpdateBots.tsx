import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import { Bots } from "../types";
import { Modal } from "antd";
type UpdateBotValues = {
  botName: string;
  description: string;
};

type ModalUpdateBotProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateBotValues) => void;
  bot?: Bots;
  loading?: boolean;
};

export default function ModalUpdateBot({
  visible,
  onClose,
  onSubmit,
  bot,
  loading = false,
}: ModalUpdateBotProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateBotValues>();

  useEffect(() => {
    if (bot) {
      reset({
        botName: bot.botName || "",
        description: bot.description || "",
      });
    }
  }, [bot, reset]);

  const handleFormSubmit: SubmitHandler<UpdateBotValues> = (data) => {
  Modal.confirm({
    title: "Xác nhận cập nhật",
    content: "Bạn có chắc muốn cập nhật bot này?",
    okText: "Xác nhận",
    cancelText: "Hủy",
    onOk: () => {
      onSubmit(data); 
    },
  });
};

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-50 font-sans">
      <div className="bg-[#0f172a] rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Cập nhật Bot</h2>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Tên Bot</label>
            <input
              type="text"
              className={clsx(
                "w-full rounded-md px-3 py-2 bg-[#1e293b] text-white border focus:outline-none",
                errors.botName
                  ? "border-red-500 focus:ring-red-400"
                  : "border-[#334155] focus:ring-[#00e5a1]"
              )}
              {...register("botName", {
                required: "Tên bot không được để trống",
                minLength: {
                  value: 3,
                  message: "Tên bot phải có ít nhất 3 ký tự",
                },
              })}
              placeholder="Nhập tên bot"
            />
            {errors.botName && (
              <p className="text-sm text-red-500 mt-1">{errors.botName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Mô tả</label>
            <textarea
              rows={3}
              className={clsx(
                "w-full rounded-md px-3 py-2 bg-[#1e293b] text-white border focus:outline-none",
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-[#334155] focus:ring-[#00e5a1]"
              )}
              {...register("description", {
                required: "Mô tả không được để trống",
                minLength: {
                  value: 10,
                  message: "Mô tả phải có ít nhất 10 ký tự",
                },
              })}
              placeholder="Nhập mô tả bot"
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-gray-500 text-white hover:bg-red-600 hover:border-red-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-[#00e5a1] text-[#0f172a] hover:bg-[#00d194] disabled:opacity-50"
            >
              {loading ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
