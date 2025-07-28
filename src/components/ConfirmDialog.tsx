import React from "react";
import { createPortal } from "react-dom";
import clsx from "clsx";

type ConfirmDialogProps = {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmDialog({
  isOpen,
  title = "Xác nhận",
  description = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Xác nhận",
  cancelText = "Huỷ",
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={clsx(
              "px-4 py-2 text-sm text-white bg-red-600 rounded hover:bg-red-700"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
