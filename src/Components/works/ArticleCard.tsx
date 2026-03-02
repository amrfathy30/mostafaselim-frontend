import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CalenderIcon, ClockIcon, EyeIcon } from "../../icons/work-icons";
import { ArticleItem } from "../../types/home";

interface Props {
  item: ArticleItem;
  index?: number;
}

const ArticleCard: React.FC<Props> = ({ item, index = 0 }) => {
  const articleId = item?.id || item?.article_id;
  const articleTitle = item?.title || item?.article_title;
  const articleTime = item?.time || item?.article_time;
  const articleDate = item?.date || item?.article_date;

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
    if (isNaN(hour) || isNaN(minute)) return timeString;
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
      data-aos-delay={index * 120}
      data-aos-duration="800"
      data-aos-easing="ease-out-cubic"
      className="bg-white border border-gray-100 flex flex-col items-start text-start w-full p-4 xl:p6 h-auto xxl:h-[251px] gap-4 xxl:gap-[23px] transition-all hover:shadow-md font-expo"
    >
      <h3
        data-aos="fade-up"
        data-aos-delay={index * 120 + 120}
        className="text-[#3A5F7D] font-normal line-clamp-2 text-lg xl:text-xl xxl:text-[26px] leading-relaxed xxl:leading-[39px]"
      >
        {articleTitle}
      </h3>

      <div
        data-aos="fade-up"
        data-aos-delay={index * 120 + 240}
        className="flex items-center gap-3 xxl:gap-[11px] text-[#4D4D4D] text-sm xl:text-sm xxl:text-[16px]"
      >
        <div className="flex items-center gap-2" dir="ltr">
          <ClockIcon className="w-3.5 h-3.5 xxl:w-[18px] xxl:h-[18px]" />
          <span className="whitespace-nowrap">
            {formatTimeToArabic(articleTime)}
          </span>
        </div>

        <div className="flex items-center gap-2" dir="ltr">
          <CalenderIcon className="w-3.5 h-3.5 xxl:w-[18px] xxl:h-[18px]" />
          <span className="whitespace-nowrap">
            {formatDateToArabic(articleDate)}
          </span>
        </div>

        <div className="flex flex-row-reverse items-center gap-[6px]">
          <EyeIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
          <span className="text-[#4D4D4D] text-[14px] leading-none">
            {item.article_views > 999
              ? (item.article_views / 1000).toFixed(1) + "K"
              : item.article_views || "0"}
          </span>
        </div>
      </div>

      <div
        data-aos="zoom-in"
        data-aos-delay={index * 120 + 360}
        className="mt-auto w-full flex justify-start"
      >
        <Link to={`/articles/${articleId}`}>
          <button className="bg-[#007FFF] text-white rounded-[5px] font-bold transition-all hover:bg-blue-600 w-[186px] h-[45px] xxl:h-[52px] text-[14px] xxl:text-[16px] cursor-pointer">
            قراءة المقالة
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ArticleCard;