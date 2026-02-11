import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const generatePages = (current: number, total: number): (number | string)[] => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  
  const pages: (number | string)[] = [1];
  
  if (current > 3) pages.push('...');
  
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    if (!pages.includes(i)) pages.push(i);
  }
  
  if (current < total - 2) pages.push('...');
  if (!pages.includes(total)) pages.push(total);
  
  return pages;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const buttonClass = "w-10 h-10 md:w-12 md:h-12 rounded-[5px] font-bold text-[16px] md:text-[18px] transition-colors flex items-center justify-center cursor-pointer";
  
  return (
    <div className="flex justify-center items-center gap-2 md:gap-3 py-8 md:py-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${buttonClass} bg-[#43617E] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#2d4a5f]`}
      >
        {'<'}
      </button>
      
      <div className="flex gap-2 md:gap-3">
        {generatePages(currentPage, totalPages).map((page, idx) => 
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className={`${buttonClass} text-gray-400`}>...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`${buttonClass} ${currentPage === page ? 'bg-[#43617E] text-white' : 'bg-white text-[#B8B2B2] border border-[#E0E0E0] hover:border-[#43617E] hover:text-[#43617E]'}`}
            >
              {page}
            </button>
          )
        )}
      </div>
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${buttonClass} bg-[#43617E] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#2d4a5f]`}
      >
        {'>'}
      </button>
    </div>
  );
};

export default Pagination;