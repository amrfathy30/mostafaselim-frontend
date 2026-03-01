import React from "react";
import {
  TopQuotesIcon,
  BottomQuotesIcon,
} from "../../icons/single-book-page-icons";

interface InfoSection {
  title: string;
  content: string;
}

interface Props {
  mainTitle: string;
  sections: InfoSection[];
  showTopQuote?: boolean;
  showBottomQuote?: boolean;
}

const DescriptiveInfoSection: React.FC<Props> = ({
  mainTitle,
  sections,
  showTopQuote = false,
  showBottomQuote = false,
}) => {
  return (
    <div className="lg:col-span-8 relative mt-20 font-expo mx-5" dir="rtl">
      <div className="absolute inset-x-4 -top-6 -bottom-6 bg-[#007bff] rounded-[48px] z-0 transform rotate-[4deg] opacity-90 shadow-lg" />
      <div className="absolute inset-x-2 -top-3 -bottom-3 bg-[#3d5a7a] rounded-[48px] z-10 transform rotate-[2deg] shadow-md" />
      <div className="relative z-20 bg-white pt-4 px-5 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 w-full h-full">
        {showTopQuote && (
          <div className="absolute top-0 right-0 md:top-2 md:left-2 text-[#4fa3ff] opacity-90 z-40 transform -translate-x-1 -translate-y-1">
            <TopQuotesIcon />
          </div>
        )}

        <h3 className="text-center text-[#3d5a7a] font-bold text-xl md:text-3xl mt-8 mb-5 relative z-30">
          {mainTitle}
        </h3>

        <div className="space-y-10 relative z-30 pt-4 pb-20">
          {sections.map((section, index) => (
            <div key={index} className="relative group">
              <div className="absolute -top-5 right-6 md:right-10 z-40">
                <span className="bg-[#3d5a7a]  text-white px-8 py-2.5 rounded-sm text-sm font-bold shadow-md inline-block">
                  {section.title}
                </span>
              </div>
              <div className="bg-[#fcfdfe] p-8 md:p-10 pt-10 rounded-[15px] border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
                <p className="font-expo font-semibold leading-loose text-base md:text-lg text-right">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
        {showBottomQuote && (
          <div className="absolute bottom-0 left-0 z-40 text-[#4fa3ff] opacity-90 z-40 transform -translate-x-1 -translate-y-1">
            <BottomQuotesIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default DescriptiveInfoSection;
