import React from "react";
import { Button } from "../Common/button";
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
    const fallbackImage = "/default-book-image.png";
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = fallbackImage;
    };
    return(
        <div className="bg-white rounded-2xl shadow-sm p-4 flex flex-col text-center border border-gray-50 font-expo ">
       <img
                src={book.image || fallbackImage}
                alt={book.book_name}
                onError={handleImageError}
                className="w-full h-80 rounded-lg mb-4"
            />

        <h3 className="text-[20px] font-expo font-bold text-[#43617E] mb-1">
            {book.book_name}
        </h3>
       
        <p className="text-xl text-[#43617E] mb-1">
            {`${book.book_date} - الطبعة الثانية`}
        </p>

         <p className="text-xl text-[#43617E] mb-2">
            {book.publishing_house} 
        </p>

<div className="mt-auto flex items-center justify-center w-full gap-4 px-2 pb-2" dir="rtl">
    {variant === 'simple' ? (
        <Button 
            type="primary" 
            className="!h-[40px] !w-full !max-w-[160px] !text-[14px] font-expo rounded-lg !bg-[#007bff] !border-none !text-white shadow-sm"
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
                onClick={() => console.log("تفاصيل")}
            >
                معلومات الكتاب
            </button>
        </>
    )}
</div>
        </div>
    )
}