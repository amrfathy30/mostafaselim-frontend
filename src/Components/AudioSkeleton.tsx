import React from "react";

const AudioSkeleton: React.FC = () => {
  return (
    <div className="bg-[#F3F4F6] rounded-2xl animate-pulse">
      <div className="bg-white rounded-2xl p-5 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4 shadow-sm">
        {/* Image Skeleton */}
        <div className="w-full md:w-24 h-24 bg-gray-200 rounded-xl shrink-0" />

        {/* Content Skeleton */}
        <div className="flex flex-col flex-1">
          {/* Title and Badge Row */}
          <div className="flex justify-between flex-col md:flex-row gap-3 mb-3">
            <div className="h-6 w-3/4 md:w-1/2 bg-gray-200 rounded self-start" />
            <div className="h-8 w-20 bg-gray-200 rounded-lg shrink-0" />
          </div>

          {/* Meta Info row (Speaker, Category, Date) */}
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="h-4 w-24 bg-gray-200 rounded" />
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-28 bg-gray-200 rounded" />
          </div>

          {/* Button Skeleton */}
          <div className="h-8 w-32 bg-gray-200 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default AudioSkeleton;
