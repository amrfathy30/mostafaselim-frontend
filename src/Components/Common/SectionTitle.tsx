

import React from 'react';
import { QuoteIcon } from '../../icons/quote';

interface Props {
  title: string;
}

const SectionTitle: React.FC<Props> = ({ title }) => {
  return (
    <div className="flex items-center gap-2 md:gap-3 h-[82px] space-x-6">
      <div className='flex items-start h-full'>
        <QuoteIcon />
      </div>

      <h2 className="text-xl md:text-2xl lg:text-[32px] font-bold text-primary whitespace-nowrap">
        {title}
      </h2>
      <div className='flex items-end h-full'>
        <QuoteIcon className="rotate-180 " />
      </div>

    </div>
  );
};

export default SectionTitle;