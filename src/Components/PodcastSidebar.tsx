import React from 'react';
import dateIcon from '../assets/worksAssets/date-fill.svg';
import timeIcon from '../assets/worksAssets/time.svg';
import typeIcon from '../assets/worksAssets/type.svg';
import micIcon from '../assets/worksAssets/mic.svg';
import filterIcon from '../assets/worksAssets/filter.svg';
import podcastDefault from '../assets/img/podcast-image.png';

interface Props {
  podcast: any;
  isMobile?: boolean;
}

const PodcastSidebar: React.FC<Props> = ({ podcast, isMobile = false }) => {
  if (!podcast) return null;

  const details = [
    { label: 'تاريخ النشر', value: podcast.date, icon: dateIcon },
    { label: 'المدة', value: podcast.duration, icon: timeIcon },
    { label: 'النوع', value: 'نقد أدبي / روايات', icon: typeIcon },
    { label: 'المتحدث', value: 'د/ مصطفى سليم', icon: micIcon },
    { label: 'التصنيف', value: 'النقد', icon: filterIcon },
  ];

  return (
    <div
      className={`
        ${isMobile ? 'w-full' : 'w-full lg:w-[389px]'}
        bg-[#3A5F7D] text-white overflow-hidden shadow-lg font-expo flex flex-col shrink-0
      `}
    >
      <div className={`${isMobile ? 'h-[180px] sm:h-[200px] md:h-[250px]' : 'h-[250px] lg:h-[300px]'} flex justify-center items-center`}>
        <img
          src={podcast.image || podcastDefault}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = podcastDefault;
          }}
          alt={podcast.title}
          className={`${isMobile ? 'w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px]' : 'w-[150px] h-[150px] lg:w-[195.5px] lg:h-[195.5px]'} rounded-[18px] object-cover shadow-2xl`}
        />
      </div>

      <div className="flex flex-col">
        {details.map((item, idx) => (
          <div
            key={idx}
            className={`${isMobile ? 'h-[70px] sm:h-[80px] md:h-[90px] px-3 sm:px-4 md:px-6' : 'h-[90px] lg:h-[115px] px-4 lg:px-8'} py-2 lg:py-3 flex flex-row border-t border-[#DCD1D1]`}
          >
            <div className={`${isMobile ? 'w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] md:w-[40px] md:h-[40px]' : 'w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]'} flex justify-center items-center shrink-0`}>
              <img
                src={item.icon}
                className={`${isMobile ? 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8' : 'w-8 h-8 lg:w-10 lg:h-10'} object-contain`}
                alt="icon"
              />
            </div>

            <div className="flex-1 flex flex-col pr-2 md:pr-3 text-right justify-center">
              <span className={`${isMobile ? 'text-[16px] sm:text-[18px] md:text-[22px] leading-[20px] sm:leading-[24px] md:leading-[30px]' : 'text-[20px] lg:text-[26px] leading-[28px] lg:leading-[35px]'} font-extrabold whitespace-nowrap`}>
                {item.label}
              </span>
              <span className={`${isMobile ? 'text-[14px] sm:text-[16px] md:text-[20px] leading-[18px] sm:leading-[22px] md:leading-[26px]' : 'text-[18px] lg:text-[26px] leading-[24px] lg:leading-[30px]'} font-normal opacity-90 whitespace-nowrap`}>
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