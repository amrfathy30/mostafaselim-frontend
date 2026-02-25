import React from 'react';
import { DateFillIcon, FilterIcon, MicIcon, TimeIcon, TypeIcon } from '../icons/work-icons';

interface Props {
  podcast: any;
  isMobile?: boolean;
}

const PodcastSidebar: React.FC<Props> = ({ podcast, isMobile = false }) => {
  if (!podcast) return null;
  console.log("podcast",podcast);
  

  const details = [
    { label: 'تاريخ النشر', value: podcast.date, icon: <DateFillIcon/> },
    { label: 'المدة', value: podcast.duration, icon: <TimeIcon/> },
    { label: 'المشاهدات', value: podcast?.views, icon: <TypeIcon/> },
    { label: 'المتحدث', value: 'د/ مصطفى سليم', icon: <MicIcon/> },
    { label: 'التصنيف', value: podcast.image.project_classfication, icon: <FilterIcon/> },
  ];

  return (
    <div className={`bg-[#3A5F7D] text-white shadow-lg font-expo flex flex-col shrink-0 transition-all duration-500 overflow-hidden
        ${isMobile ? 'w-full rounded-b-[10px]' : 'w-full lg:w-[320px] xl:w-[350px] xxl:w-[389px] lg:rounded-[10px] sticky top-24'}
      `}>
      <div className={`flex justify-center items-center ${isMobile ? 'py-8' : 'py-10 xxl:py-14'}`}>
        <img
          src={podcast.image || '/images/podcast-image.png'}
          alt={podcast.title}
          className={`rounded-[18px] object-cover shadow-2xl transition-all
            ${isMobile ? 'w-[140px] h-[140px]' : 'w-[150px] h-[150px] xl:w-[170px] xl:h-[170px] xxl:w-[195px] xxl:h-[195px]'}
          `}
        />
      </div>

      <div className="flex flex-col">
        {details.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-row border-t border-[#DCD1D1]/30 transition-all gap-10
              ${isMobile ? 'px-5 py-4' : 'px-6 py-5 xxl:px-8 xxl:py-7'}
            `}
          >
            <div className="w-8 h-8 xxl:w-10 xxl:h-10 flex justify-center items- shrink-0">
               <div className="w-6 h-6 xxl:w-8 xxl:h-8 text-white">{item.icon}</div>
            </div>

            <div className="flex-1 flex flex-col pr-3 text-right justify-center">
              <span className={`font-bold whitespace-nowrap text-white
                ${isMobile ? 'text-[16px]' : 'text-[18px] xl:text-[20px] xxl:text-[26px]'}
              `}>
                {item.label}
              </span>
              <span className={`font-normal opacity-80 whitespace-nowrap
                ${isMobile ? 'text-[14px]' : 'text-[16px] xl:text-[18px] xxl:text-[26px]'}
              `}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PodcastSidebar;