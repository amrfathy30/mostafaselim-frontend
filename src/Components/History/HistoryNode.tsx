import React from 'react';


const HistoryNode = ({ startYear, endYear }: { startYear: string, endYear: string }) => {


  return (
    <div className="flex items-center justify-center w-20 h-20 md:w-[120px] md:h-[120px] bg-white rounded-full shadow-lg shrink-0 z-10 border-2 md:border-4 border-white">
      <span className="text-[12px] md:text-[16px] font-bold text-primary text-center leading-[1.2] md:leading-[1.3] whitespace-pre-line font-expo">
        {startYear.trim()}<br />:<br />{endYear.trim()}
      </span>
    </div>
  );
};

export default HistoryNode;