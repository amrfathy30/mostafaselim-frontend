import React from "react";
import { Button } from "../Common/button";
import { useNavigate } from 'react-router-dom';
interface Props{
    book:{
        book_id?: number;
        book_name: string;
        book_date: string;
        publishing_house: string;
        image: string;
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
        <div className="bg-white flex flex-col text-center border border-gray-50 h-[814px] p-6 rounded-[33px]">
       <img
                src={book.image || fallbackImage}
                alt={book.book_name}
                onError={handleImageError}
                className="w-full h-[490px] rounded-r-[33px] mb-4 border-l-0 border-t-0 border-2 border-black"
            />

        <h3 className="text-[28px] font-expo font-bold text-primary mb-1 line-clamp-1 cursor-pointer" title={book.book_name}>
            {book.book_name}
        </h3>
       
        <p className="text-[28px] font-normal text-primary mb-1">
            {`${book.book_date} - الطبعة الثانية`}
        </p>

         <p className="text-xl text-[#43617E] mb-2">
            {book.publishing_house} 
        </p>

<div className="mt-auto flex items-center justify-center w-full gap-4 px-2 pb-2" dir="rtl">
    {variant === 'simple' ? (
        <Button 
            type="primary" 
            className="h-[52px] w-[186px] text-[18px]"
            onClick={() => console.log("قراءة")}
        >
            قراءة الكتاب
        </Button>
    ) : (
        <>
            <Button 
                type="primary" 
                className="!h-[40px] !text-[14px] font-expo rounded-lg !bg-[#007bff] !border-none !text-white flex-1 min-w-[120px] shadow-sm"
                onClick={() => console.log("قراءة")}
            >
                قراءة الكتاب
            </Button>
            <button 
                className="text-[#007bff] text-[14px] font-bold font-expo bg-transparent border-none hover:underline whitespace-nowrap"
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