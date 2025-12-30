import React from 'react';
import HistoryCard from './HistoryCard';
import { historyData } from '../../data/historyData';
import arabicPattern from '../../assets/historyAssets/arabic-pattern.svg';
import quoteIcon from '../../assets/historyAssets/quote.svg';

const HistorySection: React.FC = () => {
  return (
    <section className="relative py-12 md:py-16 bg-[#F5F5F5] overflow-hidden font-Expo">
      <div className="relative z-10">
        
        <div className="flex justify-center items-center mb-8 md:mb-10 px-4">
          <div className="flex items-center gap-2 md:gap-3">
          <img 
      src={quoteIcon} 
      alt="quote" 
      className="w-6 md:w-9 h-auto object-contain -translate-y-4" 
    />
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#3A5F7D] whitespace-nowrap">
              تاريخ الأعمال والجوائز
            </h2>
            <img 
      src={quoteIcon} 
      alt="quote" 
      className="w-6 md:w-9 h-auto object-contain translate-y-4 transform scale-[-1]" 
    />
          </div>
        </div>

        <div className="w-full">
          <div className="flex flex-col items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3A5F7D] rounded-full"></div>
            <div className="w-[3px] h-8 md:h-10 bg-[#3A5F7D]"></div>
          </div>
          
          {historyData.map((item, index) => (
            <HistoryCard key={item.id} data={item} index={index} />
          ))}
          
          <div className="flex flex-col items-center">
            <div className="w-[3px] h-8 md:h-10 bg-[#3A5F7D]"></div>
            <div className="w-3 h-3 md:w-4 md:h-4 bg-[#3A5F7D] rounded-full"></div>
          </div>
        </div>
      </div>

      <div 
        className="absolute bottom-0 left-0 w-full h-[300px] md:h-[400px] opacity-50 pointer-events-none z-0"
        style={{ 
          backgroundImage: `url(${arabicPattern})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>
    </section>
  );
};

export default HistorySection;