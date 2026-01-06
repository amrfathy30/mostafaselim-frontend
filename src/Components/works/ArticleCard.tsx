import React from 'react';
import { WorkItem } from '../../Types/works';
import ActionButton from '../Common/ActionButton';
import { CalenderIcon, ClockIcon } from '../../icons/work-icons';

interface Props {
  item: WorkItem;
}

const ArticleCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center font-expo h-full">
      <h3 className="text-primary font-bold text-base md:text-lg mb-6 leading-relaxed line-clamp-2 h-14">
        {item.title}
      </h3>
      
      <div className="flex items-center justify-center gap-6 text-gray-600 text-[16px] md:text-sm mb-6">
        <div className="flex items-center gap-1">
          <span>{item.time}</span>
          <ClockIcon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1">
          <span>{item.date}</span>
        
          <CalenderIcon className="w-4 h-4"/>
        </div>
      </div>

      <div className="mt-auto w-full flex justify-center">
        <ActionButton label="قراءة المقالة" />
      </div>
    </div>
  );
};

export default ArticleCard;