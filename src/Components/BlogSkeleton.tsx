import React from "react";

const BlogSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-[10px] flex flex-col w-full max-w-[453px] p-[13px] font-expo animate-pulse mx-auto h-full shadow-sm">
      {/* Image Skeleton */}
      <div className="w-full h-[200px] bg-gray-200 rounded-[7px] mb-[11px]" />

      <div className="w-full flex flex-col items-center px-[3px]">
        {/* Title Skeleton */}
        <div className="w-full h-[20px] bg-gray-200 rounded my-2" />
        <div className="w-2/3 h-[20px] bg-gray-200 rounded self-start mb-4" />

        {/* Meta Info Skeleton */}
        <div className="w-full flex items-center justify-start flex-wrap gap-[11px] mb-4">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-[45px] bg-gray-200 rounded-[5px] mt-2" />
      </div>
    </div>
  );
};

export default BlogSkeleton;
