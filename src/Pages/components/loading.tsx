
import React from 'react';


const AdminPageLoading = () => {

  return (
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
{[...Array(10)].map((_, index) => (
  <div key={index} className="bg-white rounded-[12px] p-6 border border-gray-200">
    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
    <div className="flex items-center justify-end gap-4 mb-4">
      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
    </div>
    <div className="flex items-center justify-end gap-3">
      <div className="h-10 bg-gray-200 rounded w-28 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded w-28 animate-pulse"></div>
    </div>
  </div>
))}
</div>

  );
};

export default AdminPageLoading;
