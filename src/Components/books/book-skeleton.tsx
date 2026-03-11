import React from "react";

const BookSkeleton: React.FC = () => {
  return (
    <div className="bg-white flex flex-col text-center border border-gray-100 h-fit p-4 md:p-6 rounded-[24px] md:rounded-[33px] animate-pulse shadow-sm">
      {/* Image Skeleton */}
      <div className="w-full h-[180px] md:h-[200px] bg-gray-200 rounded-[20px] mb-4" />
      {/* Title and Views Skeleton */}
      <div className="flex justify-center items-center gap-2 mb-4 h-[40px] flex-wrap">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
      </div>

      {/* Date/Edition Skeleton */}
      <div className="h-4 w-3/4 bg-gray-200 rounded self-center mb-1" />

      {/* Publishing House Skeleton */}
      <div className="h-3 w-1/2 bg-gray-200 rounded self-center mb-4" />

      {/* Buttons Skeleton */}
      <div className="mt-2 flex items-center flex-wrap justify-center w-full gap-4 px-2 pb-2">
        <div className="h-[44px] bg-gray-200 rounded-md flex-1 min-w-[150px]" />
        <div className="h-4 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default BookSkeleton;
