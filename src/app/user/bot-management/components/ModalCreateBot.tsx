import React from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

type BotFormValues = {
  botName: string;
  description: string;
  settings: string;
};

type BotCreateModalProps = {
  readonly visible: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (values: BotFormValues) => void;
  readonly loading?: boolean;
};

export default function BotCreateModal({
  visible,
  onClose,
  onSubmit,
  loading = false,
}: BotCreateModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BotFormValues>({});

  const handleFormSubmit = (data: BotFormValues) => {
    onSubmit(data);
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };


  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray bg-opacity-50 font-sans">
      <div className="bg-[#0f172a] rounded-2xl shadow-xl w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold text-white-900 mb-4">Tạo Bot mới</h2>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Tên Bot</label>
            <input
              type="text"
              className={clsx(
                "w-full rounded-md border px-3 py-2 text-white-500 focus:outline-none focus:ring-2",
                errors.botName
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              )}
              placeholder="Nhập tên bot"
              {...register("botName", {
                required: "Tên bot không được để trống",  
                minLength: {
                  value: 3,
                  message: "Tên bot phải có ít nhất 3 ký tự",
                },
              })}
            />
            {errors.botName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.botName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white-700 mb-1">Mô tả</label>
            <textarea
              rows={3}
              className={clsx(
                "w-full rounded-md border px-3 py-2 text-white-500 focus:outline-none focus:ring-2",
                errors.description
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              )}
              placeholder="Nhập mô tả bot"
              {...register("description", {
                required: "Mô tả không được để trống",
                minLength: {
                  value: 10,
                  message: "Mô tả phải có ít nhất 10 ký tự",
                },
              })}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="settings" className="block text-sm font-medium text-white-700 mb-1">Settings</label>
            <input
              type="text"
              className={clsx(
                "w-full rounded-md border px-3 py-2 text-white-500 focus:outline-none focus:ring-2",
                errors.settings
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-blue-400"
              )}
              placeholder="Settings bots"
              {...register("settings", {
                required: "Settings bot không được để trống",  
                minLength: {
                  value: 3,
                  message: "Settings bot phải có ít nhất 3 ký tự",
                },
              })}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-white-300 text-red-700 hover:bg-red-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Đang tạo..." : "Tạo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
