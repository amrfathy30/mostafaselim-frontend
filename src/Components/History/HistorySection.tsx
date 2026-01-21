import React, { useEffect, useState } from 'react';
import HistoryCard from './HistoryCard';
import { getHomeData } from '../../services/homeService';
import { HistoryItem } from '../../Types/history';
import SectionTitle from '../Common/SectionTitle';

const HistorySection= ({data}) => {


  return (
    <section id="work_history" className="relative py-8 md:py-12 lg:py-16 bg-[#F5F5F5] overflow-hidden w-full px-4 sm:px-6 md:px-12 lg:px-[100px] xxl:px-[154px]">
      <div className="relative z-10">
        
        <SectionTitle title={'تاريخ الأعمال والجوائز'}/>

        <div className="w-full flex flex-col items-center ">
          <div className="hidden md:flex flex-col items-center pl-[3px] mb-[9px]">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full"></div>
            <div className="w-[3px] h-12 bg-primary"></div>
          </div>
          <div className='space-y-4 flex flex-col w-full'>
              {data?.map((item, index) => (
            <HistoryCard key={index} data={item} index={index}  />
          ))}
          </div>
        
          
          <div className="hidden md:flex flex-col items-center pl-[3px] mt-[9px]">
            <div className="w-[3px] h-12 bg-primary"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full"></div>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-[300px] md:h-[400px] opacity-50 pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(/images/arabic-pattern.svg)`,
          backgroundSize: 'cover', 
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </section>
  );
};

export default HistorySection;