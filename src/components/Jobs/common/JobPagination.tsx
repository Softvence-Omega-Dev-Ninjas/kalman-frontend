// components/Jobs/Pagination.tsx
import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const visiblePages: (number | string)[] = [];

    // Always show first page
    visiblePages.push(1);

    // Calculate range around current page
    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    // Add ellipsis after first page if needed
    if (start > 2) {
      visiblePages.push("...");
    }

    // Add pages around current page
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    // Add ellipsis before last page if needed
    if (end < totalPages - 1) {
      visiblePages.push("...");
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      visiblePages.push(totalPages);
    }

    return visiblePages;
  };

  const visiblePages = getVisiblePages();

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-3 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        <span className="text-lg font-semibold"><MdKeyboardArrowLeft /></span>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === "number" && onPageChange(page)}
          disabled={page === "..."}
          className={`flex items-center justify-center w-10 h-10 rounded-md text-sm font-medium transition-colors duration-200 ${
            page === currentPage
              ? "bg-orange-500 text-white"
              : page === "..."
              ? "bg-transparent text-gray-600 cursor-default"
              : "bg-white text-gray-700 hover:bg-orange-100 hover:text-orange-600"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200 ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-orange-500 text-white hover:bg-orange-600"
        }`}
      >
        <span className="text-lg font-semibold"><MdKeyboardArrowRight /></span>
      </button>
    </div>

    // <div className="flex items-center justify-center space-x-2 mt-8">
    //   {/* Previous Button */}
    //   <button
    //     onClick={() => onPageChange(currentPage - 1)}
    //     disabled={currentPage === 1}
    //     className={`flex items-center justify-center w-10 h-10 rounded-md border ${
    //       currentPage === 1
    //         ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
    //         : "bg-white border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-200"
    //     }`}
    //   >
    //     <span className="text-lg font-semibold">←</span>
    //   </button>

    //   {/* Page Numbers */}
    //   {visiblePages.map((page, index) => (
    //     <button
    //       key={index}
    //       onClick={() => typeof page === "number" && onPageChange(page)}
    //       className={`flex items-center justify-center w-10 h-10 rounded-md border font-semibold text-sm ${
    //         page === currentPage
    //           ? "bg-orange-500 border-orange-500 text-white shadow-sm"
    //           : page === "..."
    //           ? "bg-white border-gray-300 text-gray-500 cursor-default"
    //           : "bg-white border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-200"
    //       }`}
    //       disabled={page === "..."}
    //     >
    //       {page}
    //     </button>
    //   ))}

    //   {/* Next Button */}
    //   <button
    //     onClick={() => onPageChange(currentPage + 1)}
    //     disabled={currentPage === totalPages}
    //     className={`flex items-center justify-center w-10 h-10 rounded-md border ${
    //       currentPage === totalPages
    //         ? "bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed"
    //         : "bg-white border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white transition-colors duration-200"
    //     }`}
    //   >
    //     <span className="text-lg font-semibold">→</span>
    //   </button>
    // </div>
  );
};

export default Pagination;
