import React from 'react';
import { SourcesVerifiedIcon } from '../../icons/single-article-page-icons';

interface SourceItem {
  text: string;
}

interface Props {
  sources: SourceItem[];
}

const SourcesSection: React.FC<Props> = ({ sources }) => {
  return (
    <div className="lg:col-span-8 relative mt-20 font-expo" dir="rtl">
      <div className="absolute inset-x-4 -top-6 -bottom-6 bg-[#007bff] rounded-[40px] rotate-[4deg] z-0 opacity-90" />
      <div className="absolute inset-x-2 -top-3 -bottom-3 bg-[#3d5a7a] rounded-[36px] rotate-[2deg] z-10" />
      <div className="relative z-20 bg-white rounded-[32px] px-8 py-10 md:px-14 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
        <div className="flex items-center justify-between mb-8">
          <div className="relative mb-6 md:mb-8 flex items-center justify-between">
            <span className="absolute top-10 right-4 sm:right-6 md:right-10 bg-[#3d5a7a] text-white px-4 sm:px-6 md:px-8 py-1.5 sm:py-2.5 rounded-sm text-xs sm:text-sm font-bold shadow-md">
              المصادر
            </span>
          </div>

          <div className="absolute top-2 left-4 sm:left-6 md:left-10 z-40">
            <SourcesVerifiedIcon />
          </div>

        </div>
        <div className="bg-[#fcfdfe] p-4 sm:p-6 md:p-8 lg:p-10 pt-10  rounded-[12px] md:rounded-[15px] border border-gray-100 shadow-sm">
          <ol className="list-decimal pr-4 sm:pr-6 space-y-3 md:space-y-4 text-primary leading-[2] text-sm md:text-base">
            {sources.map((source, index) => (
              <li key={index}>{source.text}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default SourcesSection;
