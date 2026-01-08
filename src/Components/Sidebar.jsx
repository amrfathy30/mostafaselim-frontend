import React from 'react';

const Sidebar = ({ title,titleIcon, items }) => {
  return (
    <div className="w-full md:w-80 bg-[#3a5f7d] text-white p-6 h-full min-h-screen font-sans" dir="rtl">
      <div className="flex items-center justify-start gap-3 mb-8 border-b border-white/20 pb-4 ">
      <div className="w-[2px] h-8 bg-white opacity-60 rounded-full ml-1"></div>
        <span className="text-2xl font-light opacity-80">{titleIcon}</span> 
        <h2 className="text-xl font-bold">{title}</h2>
      </div>

      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0 hover:bg-white/5 transition-all px-2 rounded-lg cursor-pointer group"
          >
            <div className="shrink-0 scale-90 transition-transform group-hover:scale-100">
               {item.icon}
            </div>

            <div className="flex flex-col text-right">
              <span className="text-[20px] font-bold mb-1 group-hover:text-blue-100">
                {item.label}
              </span>
              <span className="text-[18px] text-white/70">
                {item.subLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;