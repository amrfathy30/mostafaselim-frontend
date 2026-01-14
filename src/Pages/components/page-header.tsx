import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components/Common/button';
import { SearchIcon } from '../../icons/admin';

interface HeaderInfo {
    total: number;
    searchQuery:string;
    setSearchQuery:any;
    setStartSearch:any;
    btnLoading:any;
    title:string;
    titleSingle:string
    type:string
}

const AdminPageHeader = (data:HeaderInfo) => {
  const navigate = useNavigate();


  return (
    <div className="mb-8 flex justify-between items-center">
    <div className='flex flex-col'>
      <h1 className="text-[32px] font-bold text-primary">{data?.title}</h1>
      <div>
        <p className="text-[#6B7280] text-[24px]">عدد {data?.title} : {data?.total}</p>
      </div>
    </div>
    {/* Search Box */}
    <div className="flex flex-col items-center space-y-2 w-[280px] xxl:w-[371px]">
      <input
        type="text"
        value={data.searchQuery}
        onChange={(e) => data.setSearchQuery(e.target.value)}
        placeholder={`ابحث في ${data?.title} التي تريدها`}
        className="bg-white px-4 py-3 border border-gray-300 rounded-lg text-right w-full outline-none focus:border-primary"
      />
   
      <Button
      className='w-full flex items-center justify-center h-[52px] space-x-2'
       onClick={()=>data.setStartSearch(true)} type={'tertiary'}
       loading={data?.btnLoading}>
        <>
        <SearchIcon />
        <span>بحث</span>
        </>
      </Button>
    </div>
    {/* Add */}
    <Button
      className='w-[221px]'
      type='tertiary'
      onClick={() => navigate(`/admin/${data?.type}/add`)}>
      إضافة {data?.titleSingle}
    </Button>
  </div>

  );
};

export default AdminPageHeader;
