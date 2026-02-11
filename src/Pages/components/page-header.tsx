import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components/Common/button';
import { SearchIcon } from '../../icons/admin';

interface HeaderInfo {
    total: number;
    searchQuery: string;
    setSearchQuery: any;
    setStartSearch: any;
    btnLoading: any;
    title: string;
    titleSingle: string;
    type: string;
    onClick?: () => void;
}

const AdminPageHeader = (data: HeaderInfo) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className='flex flex-col text-center md:text-right w-full md:w-auto'>
        <h1 className="text-[32px] font-bold text-primary">{data?.title}</h1>
        <div>
          <p className="text-[#6B7280] text-[24px]">عدد {data?.title} : {data?.total}</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2 w-[280px] xxl:w-[371px]">
        <input
          type="text"
          value={data.searchQuery}
          onChange={(e) => data.setSearchQuery(e.target.value)}
          placeholder={`ابحث في ${data?.title} التي تريدها`}
          className="bg-white px-4 py-3 border border-gray-300 rounded-lg text-right w-full outline-none focus:border-primary"
        />
   
        <Button
          className='w-full flex flex-col md:flex-row items-center justify-center space-x-2'
          onClick={() => data.setStartSearch(true)} 
          type={'tertiary'}
          loading={data?.btnLoading}
        >
          <>
            <SearchIcon />
            <span>بحث</span>
          </>
        </Button>
      </div>

      <Button
        className='w-[230px] md:w-[221px] m-px'
        type='tertiary'
        onClick={data.onClick ? data.onClick : () => navigate(`/admin/${data?.type}/add`)}
      >
        إضافة {data?.titleSingle}
      </Button>
    </div>
  );
};

export default AdminPageHeader;