import React from "react";
import { useNavigate } from "react-router-dom";
import { CalenderIcon, ClockIcon, EyeIcon } from "../icons/work-icons";

export interface BlogItem {
  id: number;
  title: string;
  date: string;
  time: string;
  views: number;
  image: string;
  category: string;
}

interface Props {
  item: BlogItem;
}

const BlogCard: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-[10px] flex flex-col w-full max-w-[453px] p-[13px] font-expo group transition-all duration-300  mx-auto h-full">
      <div className="w-full h-[309.69px] overflow-hidden rounded-[7px] mb-[11px]">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="w-full flex flex-col items-center text-right px-[3px]">
        <h3 className="w-full text-right text-[#3A5F7D] font-bold text-[18px] md:text-[20px] leading-[1.4] h-[56px] line-clamp-2 mb-[5px] mt-[25px]">
          {item.title}
        </h3>

        <div className="w-full text-right flex items-center justify-left gap-[11px] mb-[25px]">
          <div className="flex flex-row-reverse items-center gap-[6px]">
            <CalenderIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
            <span className="text-[#4D4D4D] text-[14px] leading-none">
              {item.date}
            </span>
          </div>
          <div className="flex flex-row-reverse items-center gap-[6px]">
            <ClockIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
            <span className="text-[#4D4D4D] text-[14px] leading-none">
              {item.time}
            </span>
          </div>
          <div className="flex flex-row-reverse items-center gap-[6px]">
            <EyeIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
            <span className="text-[#4D4D4D] text-[14px] leading-none">
              {item.views > 999
                ? (item.views / 1000).toFixed(1) + "K"
                : item.views}
            </span>
          </div>
        </div>

        <div className="w-full flex justify-start mt-auto">
          <button
            onClick={() => navigate(`/blogs/${item.id}`)}
            className="w-[186px] h-[52px] bg-[#007BFF] text-white text-center rounded-[5px] text-[16px] font-bold hover:bg-[#0069D9] transition-colors shadow-sm cursor-pointer"
          >
            قراءة المنشور
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
