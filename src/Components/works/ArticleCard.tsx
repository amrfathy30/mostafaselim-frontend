import React from 'react';
import ActionButton from '../Common/ActionButton';
import { CalenderIcon, ClockIcon } from '../../icons/work-icons';
import { Link } from 'react-router-dom';


const ArticleCard = ({ item }) => {
  return (
    <div className="bg-white p-6 flex flex-col items-start text-start h-[251px]">
      <h3 className="text-primary font-normal text-base md:text-[26px] mb-6 leading-[39px] line-clamp-2">
        {item?.title||item?.article_title}
      </h3>
      
      <div className="flex items-center justify-center gap-6 text-gray-600 text-[16px] md:text-sm mb-6">
        <div className="flex items-center gap-1">
          <span>{item?.time||item?.article_time}</span>
          <ClockIcon className="w-4 h-4" />
        </div>
        <div className="flex items-center gap-1">
          <span>{item?.date||item?.article_date}</span>
        
          <CalenderIcon className="w-4 h-4"/>
        </div>
      </div>

      <div className="mt-auto w-full flex justify-center">
       <Link to={`/articles/${item.id}`} className="w-full flex justify-center">
          <ActionButton label="قراءة المقالة" />
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;