import React from 'react';
import HistoryNode from './HistoryNode';


const HistoryCard = ({ data, index }) => {
  const isEven = index % 2 === 0;
  return (
    <div className="relative w-full h-auto ">
      <div className="md:hidden flex flex-col items-center px-4">

        <HistoryNode startYear={data?.start_date} endYear={data?.end_date} />

        <div className="bg-white p-6 pt-12 rounded-lg shadow-md border border-gray-100 w-full max-w-sm -mt-10">
          <div className="text-primary text-right text-sm leading-relaxed font-expo space-y-2">
            {data?.content?.map((line, idx) => (
              <p key={idx}>• {line.trim()}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="relative hidden md:flex items-center justify-center h-full relative container mx-auto">
        {isEven ? (
          <>

            <div className="flex items-center justify-end w-1/2  ">
              <div className="bg-white p-8 w-full overflow-hidden">
                <div className="text-primary text-right text-sm lg:text-base leading-relaxed font-expo space-y-1">
                  {data?.content?.map((line, idx) => (
                    <p key={idx}>• {line.trim()}</p>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:flex absolute left-1/2 -translate-x-[calc(100%-3px)] flex w-[85px] h-[170px] bg-transparent rounded-l-full shrink-0  border-r-0 border-3  border-primary "></div>
            <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <HistoryNode  startYear={data?.start_date} endYear={data?.end_date}  />
            </div>
            <div className="w-1/2"></div>
          </>
        ) : (
          <>
            <div className="w-1/2"></div>
            <div className="hidden md:flex absolute left-1/2 -translate-x-[calc(-3px)] flex w-[85px] h-[168px] bg-transparent rounded-r-full shrink-0  border-l-0 border-3  border-primary "></div>
            <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2">
              <HistoryNode startYear={data?.start_date} endYear={data?.end_date}  />
            </div>
            <div className="flex items-center justify-start w-1/2 ">
              <div className="bg-white p-8 w-full pr-[80px] overflow-hidden">
                <div className="text-primary text-right text-sm lg:text-base leading-relaxed font-expo space-y-1">
                  {data?.content?.map((line, idx) => (
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