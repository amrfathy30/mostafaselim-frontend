import React, { useEffect, useState } from 'react';
import HistoryCard from './HistoryCard';
import { getHomeData } from '../../services/homeService';
import { HistoryItem } from '../../Types/history';
import SectionTitle from '../Common/SectionTitle';

const HistorySection: React.FC = () => {
  const [historyList, setHistoryList] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const response = await getHomeData();
        const businessData = response.data?.business || [];

        const mappedHistory: HistoryItem[] = businessData.map((item: any, index: number) => {
          const rawContent = Array.isArray(item.content) ? item.content : [];
          const uniqueContent = Array.from(new Set(rawContent));
          
          return {
            id: index,
            years: `${item.start_date || ''} : ${item.end_date || ''}`,
            content: uniqueContent.join('. ')
          };
        });

        setHistoryList(mappedHistory);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="py-20 text-center font-expo text-[#3A5F7D]">جاري تحميل البيانات...</div>;
  }

  return (
    <section className="relative py-12 md:py-16 bg-[#F5F5F5] overflow-hidden font-expo">
      <div className="relative z-10">
        
        <SectionTitle title={'تاريخ الأعمال والجوائز'}/>

        <div className="w-full flex flex-col items-center gap-y-8 md:gap-y-0">
          <div className="hidden md:flex flex-col items-center">
            <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded-full"></div>
            <div className="w-[3px] h-8 md:h-10 bg-primary"></div>
          </div>
          
          {historyList.map((item, index) => (
            <HistoryCard key={item.id} data={item} index={index} />
          ))}
          
          <div className="hidden md:flex flex-col items-center">
            <div className="w-[3px] h-8 md:h-10 bg-primary"></div>
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