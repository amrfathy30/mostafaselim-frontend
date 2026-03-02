import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CalenderIcon, ClockIcon, EyeIcon } from "../icons/work-icons";
import AOS from "aos";
import "aos/dist/aos.css";

export interface BlogItem {
  blog_time: string;
  blog_date: string;
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
  index?: number;
}

const BlogCard: React.FC<Props> = ({ item, index = 0 }) => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.refresh();
  }, [item]);

  const formatDateToArabic = (dateString?: string) => {
    if (!dateString) return "-";
    const parts = dateString.split("/");
    if (parts.length !== 3) return dateString;
    const [day, monthStr, year] = parts;
    const months: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
    };
    const month = months[monthStr];
    if (month === undefined) return dateString;
    const date = new Date(Number(year), month, Number(day));
    return new Intl.DateTimeFormat("ar-EG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const formatTimeToArabic = (timeString?: string) => {
    if (!timeString) return "-";
    const [hourMin, period] = timeString.split(" ");
    if (!hourMin || !period) return timeString;
    let [hour, minute] = hourMin.split(":").map(Number);
    if (period.toUpperCase() === "PM" && hour < 12) hour += 12;
    if (period.toUpperCase() === "AM" && hour === 12) hour = 0;
    const date = new Date();
    date.setHours(hour, minute);
    return new Intl.DateTimeFormat("ar-EG", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      className="bg-white rounded-[10px] flex flex-col w-full max-w-[453px] p-[13px] font-expo group transition-all duration-300 mx-auto h-full hover:shadow-md hover:-translate-y-1"
    >
      <div className="w-full h-[200px] overflow-hidden rounded-[7px] mb-[11px]" data-aos="fade-up">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="w-full flex flex-col items-center text-right px-[3px]" data-aos="fade-up">
        <h3 className="w-full text-right text-[#3A5F7D] font-bold line-clamp-2 my-2 h-[50px]">
          {item.title}
        </h3>

        <div className="w-full text-right flex items-center justify-left flex-wrap gap-[11px] mb-4">
          <div className="flex flex-row-reverse items-center gap-[6px]" data-aos="fade-up">
            <CalenderIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
            <span className="text-[#4D4D4D] text-[14px] leading-none">
              {formatDateToArabic(item.blog_date)}
            </span>
          </div>
          <div className="flex flex-row-reverse items-center gap-[6px]" data-aos="fade-up">
            <ClockIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
            <span className="text-[#4D4D4D] text-[14px] leading-none">
              {formatTimeToArabic(item.blog_time)}
            </span>
          </div>
          <div className="flex flex-row-reverse items-center gap-[6px]" data-aos="fade-up">
            <EyeIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
            <span className="text-[#4D4D4D] text-[14px] leading-none">
              {item.views > 999
                ? (item.views / 1000).toFixed(1) + "K"
                : item.views}
            </span>
          </div>
        </div>

        <div className="w-full flex justify-start mt-2" data-aos="fade-up">
          <button
            onClick={() => navigate(`/blogs/${item.id}`)}
            className="w-full h-[45px] bg-[#007BFF] text-white text-center rounded-[5px] text-[14px] font-bold hover:bg-[#0069D9] transition-colors shadow-sm cursor-pointer"
          >
            قراءة المنشور
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;