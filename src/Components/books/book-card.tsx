import React from "react";
import { Button } from "../Common/button";
import { useNavigate } from 'react-router-dom';
import { openExternalLink } from "../../helper";
interface Props{
    book:{
        book_id?: number;
        book_name: string;
        book_date: string;
        publishing_house: string;
        image: string;
        book_link:string
    }
    variant?: 'simple' | 'detailed'
}

export default function BookCard({book, variant = 'detailed'}: Props){
    const navigate = useNavigate();
    const fallbackImage = "/default-book-image.png";
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = fallbackImage;
    };
    return(
       <div className="bg-white flex flex-col text-center border border-gray-100 h-full p-4 md:p-6 rounded-[24px] md:rounded-[33px] transition-all hover:shadow-md">
       <img
                src={book.image || fallbackImage}
                alt={book.book_name}
                onError={handleImageError}
                className="w-full aspect-[1/1.3] rounded-r-[33px] mb-4 border-l-0 border-t-0 border-2 border-black"
            />

        <h3 className="text-lg md:text-[20px] font-expo font-bold text-primary mb-1 cursor-pointer" title={book.book_name}>
            {book.book_name}
        </h3>
       
        <p className="text-sm md:text-lg font-semibold text-primary mb-1">
            {`${book.book_date} - الطبعة الثانية`}
        </p>

         <p className="text-xs md:text-xl text-primary mb-4">
            {book.publishing_house} 
        </p>

<div className="mt-auto flex items-center justify-center w-full gap-4 px-2 pb-2" dir="rtl">
    {variant === 'simple' ? (
        <Button 
            type="primary" 
            className="!h-[45px] w-[145px] !text-[14px]"
            onClick={() =>openExternalLink(book?.book_link)}   
        >
            قراءة الكتاب
        </Button>
    ) : (
        <>
            <Button 
                type="primary" 
                className="!h-[44px] !text-[14px] !md:text-[16px] font-expo rounded-md !border-none !text-white flex-1 min-w-[150px] shadow-sm rounded-sm"
                onClick={() =>openExternalLink(book?.book_link)}
            >
                قراءة الكتاب
            </Button>
            <button 
                className="text-[#007bff] text-[14px] font-bold font-expo bg-transparent border-none hover:underline whitespace-nowrap flex-1"
               onClick={() => navigate(`/book/${book.book_id}`)}
            >
                معلومات الكتاب
            </button>
        </>
    )}
</div>
        </div>
    )
}