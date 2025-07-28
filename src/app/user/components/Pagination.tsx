"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pageNumbers: number[] = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-[#94a3b8]">
        Trang {currentPage} / {totalPages}
      </div>

      <nav className="mx-auto flex w-full justify-center">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none border border-[#64ffda14] h-10 px-4 py-2 gap-1 pl-2.5 select-none ${
              currentPage === 1
                ? "pointer-events-none opacity-50 text-[#94a3b8]"
                : "hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer"
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Trước</span>
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none border border-[#64ffda14] h-10 w-10 cursor-pointer select-none ${
                currentPage === pageNum
                  ? "border border-input bg-[#00e5a1]/30 hover:bg-[#00e5a1]/40"
                  : "hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {pageNum}
            </button>
          ))}

          {totalPages > maxVisiblePages && currentPage < totalPages - 2 && (
            <span className="flex h-9 w-9 items-center justify-center">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">More pages</span>
            </span>
          )}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-none border border-[#64ffda14] h-10 px-4 py-2 gap-1 pr-2.5 select-none ${
              currentPage === totalPages
                ? "pointer-events-none opacity-50 text-[#94a3b8]"
                : "hover:bg-accent hover:text-accent-foreground text-foreground cursor-pointer"
            }`}
          >
            <span>Sau</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </div>
  );
}
