import React from 'react';
import quoteIcon from '../assets/historyAssets/quote.svg';

interface TitleProps {
  text: string;
}

const Title: React.FC<TitleProps> = ({ text }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-[40px]">
      <img 
        src={quoteIcon} 
        alt="quote" 
        className="w-8 md:w-10 h-auto -translate-y-4" 
      />
      <h1 className="text-[32px] md:text-[40px] font-bold text-[#3A5F7D]">
        {text}
      </h1>
      <img 
        src={quoteIcon} 
        alt="quote" 
        className="w-8 md:w-10 h-auto translate-y-4 transform scale-[-1]" 
      />
    </div>
  );
};

export default Title;