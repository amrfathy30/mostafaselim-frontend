import React from 'react';
import { HistoryItem } from '../../Types/history';
import HistoryNode from './HistoryNode';
import TimelineLine from './TimelineLine';

interface Props {
  data: HistoryItem;
  index: number;
}

const HistoryCard: React.FC<Props> = ({ data, index }) => {
  const isEven = index % 2 === 0;
  const contentLines = data.content.split('. ').filter(line => line); 

  return (
    <div className="relative w-full h-auto md:h-[220px] mb-12 md:mb-0">
      <TimelineLine isEven={isEven} isFirst={index === 0} />

      <div className="md:hidden flex flex-col items-center px-4">
        <HistoryNode years={data.years} />
        
        <div className="bg-white p-6 pt-12 rounded-lg shadow-md border border-gray-100 w-full max-w-sm -mt-10">
          <div className="text-[#3A5F7D] text-right text-sm leading-relaxed font-expo space-y-2">
            {contentLines.map((line, idx) => (
              <p key={idx}>• {line.trim()}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center justify-center h-full relative max-w-6xl mx-auto px-8">
        {isEven ? (
          <>
            <div className="flex items-center justify-end w-1/2 pr-20">
              <div className="bg-white p-6 pl-20 rounded-lg shadow-md border border-gray-100 max-w-[500px] w-full">
                <div className="text-[#3A5F7D] text-right text-sm lg:text-base leading-relaxed font-expo space-y-1">
                  {contentLines.map((line, idx) => (
                    <p key={idx}>• {line.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <HistoryNode years={data.years} />
            </div>
            <div className="w-1/2"></div>
          </>
        ) : (
          <>
            <div className="w-1/2"></div>
            <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <HistoryNode years={data.years} />
            </div>
            <div className="flex items-center justify-start w-1/2 pl-20">
              <div className="bg-white p-6 pr-20 rounded-lg shadow-md border border-gray-100 max-w-[500px] w-full">
                <div className="text-[#3A5F7D] text-right text-sm lg:text-base leading-relaxed font-expo space-y-1">
                  {contentLines.map((line, idx) => (
                    <p key={idx}>• {line.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryCard;