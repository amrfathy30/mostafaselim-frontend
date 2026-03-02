import React, { useEffect } from "react";
import AOS from "aos";
import { Button } from "../Common/button";
import { useNavigate } from "react-router-dom";
import { openExternalLink } from "../../helper";
import { EyeIcon } from "../../icons/work-icons";

import { Book } from "../../types/home";

interface Props {
  book: Book;
  variant?: "simple" | "detailed";
  index?: number;
}

export default function BookCard({ book, variant = "detailed", index = 0 }: Props) {
  const navigate = useNavigate();
  const fallbackImage = "/default-book-image.png";

  useEffect(() => {
    AOS.refresh();
  }, [book]);

  const handleImageError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    e.currentTarget.src = fallbackImage;
  };

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 120}
      data-aos-duration="900"
      data-aos-easing="ease-out-cubic"
      className="bg-white flex flex-col text-center border border-gray-100 h-fit p-4 md:p-6 rounded-[24px] md:rounded-[33px] transition-all hover:shadow-md hover:-translate-y-1"
    >
      {/* الصورة */}
      <img
        data-aos="zoom-in"
        data-aos-delay={index * 120 + 120}
        src={book.image || fallbackImage}
        alt={book.book_name}
        onError={handleImageError}
        className="w-full md:h-[200px] object-cover rounded-r-[33px] mb-4 border-l-0 border-t-0 border-2 border-black"
      />

      {/* العنوان + المشاهدات */}
      <div
        data-aos="fade-up"
        data-aos-delay={index * 120 + 240}
        className="flex justify-center items-center gap-2 mb-4 h-[40px] flex-wrap"
      >
        <h3
          className="text-[14px] font-bold text-primary cursor-pointer line-clamp-1"
          title={book.book_name}
        >
          {book.book_name}
        </h3>

        <div className="flex flex-row-reverse items-center gap-[6px]">
          <EyeIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
          <span className="text-[#4D4D4D] text-[14px] leading-none">
            {book.book_views > 999
              ? (book.book_views / 1000).toFixed(1) + "K"
              : book.book_views || "0"}
          </span>
        </div>
      </div>

      {/* التاريخ + دار النشر */}
      <p
        data-aos="fade-up"
        data-aos-delay={index * 120 + 360}
        className="text-sm md:text-[14px] font-semibold text-primary mb-1"
      >
        {`${book.book_date} - الطبعة ${book?.book_edition_number}`}
      </p>

      <p
        data-aos="fade-up"
        data-aos-delay={index * 120 + 420}
        className="text-xs md:md:text-[14px] text-primary mb-4"
      >
        {book.publishing_house}
      </p>

      {/* الأزرار */}
      <div
        data-aos="zoom-in"
        data-aos-delay={index * 120 + 540}
        className="mt-2 flex items-center flex-wrap justify-center w-full gap-4 px-2 pb-2"
        dir="rtl"
      >
        {variant === "simple" ? (
          <Button
            type="primary"
            className="!h-[45px] w-[145px] !text-[14px] cursor-pointer"
            onClick={() => openExternalLink(book?.book_link)}
          >
            قراءة الكتاب
          </Button>
        ) : (
          <>
            <Button
              type="primary"
              className="!h-[44px] !text-[14px] !md:text-[16px] font-expo rounded-md !border-none !text-white flex-1 min-w-[150px] shadow-sm rounded-sm cursor-pointer"
              onClick={() => openExternalLink(book?.book_link)}
            >
              قراءة الكتاب
            </Button>

            <button
              className="text-[#007bff] text-[14px] font-bold font-expo bg-transparent border-none hover:underline whitespace-nowrap flex-1 cursor-pointer"
              onClick={() => navigate(`/book/${book.book_id}`)}
            >
              معلومات الكتاب
            </button>
          </>
        )}
      </div>
    </div>
  );
}