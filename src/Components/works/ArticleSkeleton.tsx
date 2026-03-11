import React from "react";
const ArticleSkeleton: React.FC = () => {
  return (
    <div className="bg-white border border-gray-100 flex flex-col w-full p-6 gap-4 animate-pulse shadow-sm">

      {/* title */}
      <div className="h-6 w-3/4 bg-gray-200 rounded" />

      {/* meta */}
      <div className="flex gap-3">
        <div className="h-4 w-16 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded" />
      </div>

      {/* text lines */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-5/6" />
      </div>

      {/* button */}
      <div className="mt-auto h-12 w-40 bg-gray-200 rounded" />
    </div>
  );
};
export default ArticleSkeleton;
