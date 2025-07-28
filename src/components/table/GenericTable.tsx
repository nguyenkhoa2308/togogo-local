"use client";

import React from "react";

type Column<T> = {
    key: keyof T | string;
    label: string;
    render?: (row: T) => React.ReactNode;
    className?: string;
};

type GenericTableProps<T> = {
    data: T[];
    columns: Column<T>[];
    selectedKeys?: Array<number | string>;
    onSelectRow?: (key: number | string) => void;
    onSelectAll?: () => void;
    rowKey: (row: T) => number | string;
    actions?: (row: T) => React.ReactNode;

     pagination?: {
        currentPage: number;
        pageSize: number;
        total: number;
        onPageChange: (page: number) => void;
    };
};

export function GenericTable<T>({
    data,
    columns,
    selectedKeys = [],
    onSelectRow,
    onSelectAll,
    rowKey,
    actions,
    pagination,
}: GenericTableProps<T>) {
    const allSelected = selectedKeys.length === data.length && data.length > 0;

    const totalPages = pagination ? Math.ceil(pagination.total / pagination.pageSize) : 1;
    const currentPage = pagination?.currentPage || 1;

   return (
  <div className="overflow-auto border border-[#64ffda14] rounded-lg">
    <table className="w-full text-sm text-left text-gray-400">
      <thead className="bg-[#1e293b]/30 text-xs uppercase">
        <tr>
          {onSelectRow && (
            <th className="p-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onSelectAll}
                className="accent-[#00e5a1]"
              />
            </th>
          )}
          {columns.map((col, idx) => (
            <th key={idx} className={`p-3 ${col.className || ""}`}>
              {col.label}
            </th>
          ))}
          {actions && <th className="p-3">Hành động</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + (onSelectRow ? 2 : 1)}
              className="text-center p-4 text-gray-500"
            >
              Không có dữ liệu.
            </td>
          </tr>
        ) : (
          data.map((row) => {
            const key = rowKey(row);
            return (
              <tr
                key={key}
                className="border-b border-[#64ffda14] hover:bg-accent/20"
              >
                {onSelectRow && (
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedKeys.includes(key)}
                      onChange={() => onSelectRow(key)}
                      className="accent-[#00e5a1]"
                    />
                  </td>
                )}
                {columns.map((col, idx) => (
                  <td key={idx} className={`p-3 ${col.className || ""}`}>
                    {col.render ? col.render(row) : (row as any)[col.key]}
                  </td>
                ))}
                {actions && <td className="p-3">{actions(row)}</td>}
              </tr>
            );
          })
        )}
      </tbody>
    </table>

    {/* ✅ Pagination OUTSIDE table */}
    {pagination && totalPages > 1 && (
      <div className="flex justify-between items-center px-4 py-2 bg-[#1e293b]/20 text-sm text-gray-400">
        <div>
          Trang {pagination.currentPage} / {totalPages}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => pagination.onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-[#00e5a1] rounded disabled:opacity-50"
          >
            Trước
          </button>
          <button
            onClick={() => pagination.onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-[#00e5a1] rounded disabled:opacity-50"
          >
            Sau
          </button>
        </div>
      </div>
    )}
  </div>
);

}

