import React from 'react';
import { Link } from 'react-router-dom';
import { CalenderIcon, ClockIcon } from '../../icons/work-icons';

interface Props {
  item: any;
}

const ArticleCard: React.FC<Props> = ({ item }) => {
  const articleId = item?.id || item?.article_id;
  const articleTitle = item?.title || item?.article_title;
  const articleTime = item?.time || item?.article_time;
  const articleDate = item?.date || item?.article_date;

  return (
    <div className="bg-white shadow-sm border border-gray-100 flex flex-col items-start text-start w-full p-4 xl:p-10 h-auto xxl:h-[251px] gap-4 xxl:gap-[23px] transition-all hover:shadow-md font-expo">
      
      <h3 className="text-[#3A5F7D] font-normal line-clamp-2 text-lg xl:text-xl xxl:text-[26px] leading-relaxed xxl:leading-[39px]">
        {articleTitle}
      </h3>
      
      <div className="flex items-center gap-3 xxl:gap-[11px] text-[#4D4D4D] text-sm xl:text-sm xxl:text-[16px]">
        <div className="flex items-center gap-2" dir="ltr">
          <ClockIcon className="w-3.5 h-3.5 xxl:w-[18px] xxl:h-[18px]" />
          <span className="whitespace-nowrap">{articleTime}</span>
        </div>
        <div className="flex items-center gap-2" dir="ltr">
          <CalenderIcon className="w-3.5 h-3.5 xxl:w-[18px] xxl:h-[18px]"/>
          <span className="whitespace-nowrap">{articleDate}</span>
        </div>
      </div>

      <div className="mt-auto w-full flex justify-start">
        <Link to={`/articles/${articleId}`}>
          <button className="bg-[#007FFF] text-white rounded-[5px] font-bold transition-all hover:bg-blue-600 w-[186px] h-[45px] xxl:h-[52px] text-[14px] xxl:text-[16px]">
            قراءة المقالة
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;