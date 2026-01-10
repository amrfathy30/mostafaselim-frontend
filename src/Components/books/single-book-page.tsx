import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/bookService';
import { Button } from "../Common/button";
import {QuotesIcon,InfoIcon, BookInfoIcon,DateIcon,EditionIcon,LanguageIcon,PagesCountIcon,CategoryIcon} from '../../icons/single-book-page-icons'
import Sidebar from '../Sidebar';

const SingleBookPage = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const res = await getBookById(id);
                setBook(res.data); 
            } catch (err) {
                console.error("خطأ في جلب البيانات:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <div className="p-20 text-center font-expo">جاري التحميل...</div>;
    if (!book) return <div className="p-20 text-center font-expo">الكتاب غير موجود</div>;
    const sidebarData = [
     { label: 'دار النشر', subLabel: book.publishing_house, icon: <BookInfoIcon /> },
     { label: 'تاريخ النشر', subLabel: book.book_date, icon: <DateIcon /> },
     { label: 'رقم الطبعة', subLabel: book.book_edition_number, icon: <EditionIcon /> },
     { label: 'اللغة', subLabel: book.book_lang, icon: <LanguageIcon /> },
     { label: 'عدد الصفحات', subLabel: book.book_pages, icon: <PagesCountIcon /> },
     { label: 'التصنيف', subLabel: book.book_classfiction, icon: <CategoryIcon/> },
      ];
  return (
    <div className="max-w-6xl mx-auto p-6 font-expo text-right" dir="rtl">
        <nav className="flex items-center gap-2 text-[#3d5a7a] mb-10 text-xl">
            <Link to="/books" className="hover:opacity-100 hover:text-blue-600 transition-all cursor-pointer">الكتب</Link><span className="text-gray-400">›</span>
            <span className="font-bold pb-1">{book.book_name}</span>
        </nav>

        <div className="flex flex-col items-center gap-6 mb-12">
      <div className="flex flex-row flex-wrap lg:flex-nowrap justify-center gap-4 md:gap-6 lg:gap-10 w-full max-w-7xl px-2">
    {book.image?.map((img: string, i: number) => (
        <img 
            key={i} 
            src={img} 
            className="w-[46%] md:w-[42%] lg:w-[450px] h-auto aspect-[3/4] object-cover shadow-2xl rounded-md border border-gray-100" 
            alt="Book Page" 
        />
    ))}
</div>
            <Button 
  type="primary" 
  className="!h-[48px] px-20 !text-[16px] font-bold font-expo rounded-md !bg-[#007bff] !border-none !text-white shadow-md hover:!bg-blue-600 active:scale-95 transition-all"
  onClick={() => console.log("قراءة")}
>
  قراءة الكتاب
</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start gap-18">
<div className="lg:col-span-8 relative mt-20 font-expo" dir="rtl">
    <div className="absolute inset-x-4 -top-6 -bottom-6 bg-[#007bff] rounded-[48px] z-0 transform rotate-[4deg] opacity-90 shadow-lg" />
    <div className="absolute inset-x-2 -top-3 -bottom-3 bg-[#3d5a7a] rounded-[48px] z-10 transform rotate-[2deg] shadow-md" />

<div className="relative z-20 bg-white pt-10 pb-14 px-8 md:px-20 rounded-[48px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-50 overflow-hidden w-full min-h-[500px]">
        <div className="absolute top-0 right-0 md:top-2 md:left-2 text-[#4fa3ff] opacity-90 z-40 transform -translate-x-1 -translate-y-1"><QuotesIcon/></div>
        <h3 className="text-center text-[#3d5a7a] font-bold text-xl md:text-3xl mt-8 md:mt-12 mb-12 relative z-30">
        معلومات وصفية
    </h3>

        <div className="space-y-16 relative z-30 pt-4">
    <div className="relative group">
        <div className="absolute -top-5 right-6 md:right-10 z-40">
            <span className="bg-[#3d5a7a] text-white px-8 py-2.5 rounded-sm text-sm font-bold shadow-md inline-block">
                نبذة عن الكتاب
            </span>
        </div>
        <div className="bg-[#fcfdfe] p-8 md:p-10 pt-10 rounded-[15px] border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-gray-600 leading-[2] text-sm md:text-base text-right">
                {book.book_summary}
            </p>
        </div>
    </div>
    <div className="relative group">
        <div className="absolute -top-5 right-6 md:right-10 z-40">
            <span className="bg-[#3d5a7a] text-white px-8 py-2.5 rounded-sm text-sm font-bold shadow-md inline-block">
                أهداف الكتاب
            </span>
        </div>
        <div className="bg-[#fcfdfe] p-8 md:p-10 pt-10 rounded-[15px] border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
            <p className="text-gray-600 leading-[2] text-sm md:text-base text-right">
                {book.book_goals}
            </p>
        </div>
    </div>
</div>
    </div>
</div>

              <div className="lg:col-span-4 mt-20 sticky top-10">
      <Sidebar title="معلومات الكتاب" titleIcon= {<InfoIcon />} items={sidebarData} showShareButton={true} book={book}/>
      
    </div>
        </div>
    </div>
);
};

export default SingleBookPage;
