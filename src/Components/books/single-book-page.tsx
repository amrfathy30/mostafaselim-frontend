import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/bookService';
import { Button } from "../Common/button";
import { InfoIcon, BookInfoIcon, DateIcon, EditionIcon, LanguageIcon, PagesCountIcon, CategoryIcon } from '../../icons/single-book-page-icons'
import Sidebar from '../Sidebar';
import Breadcrumbs from '../Common/Breadcrumbs';
import DescriptiveInfoSection from '../Common/DescriptiveInfoSection';
import { openExternalLink } from '../../helper';
import AOS from 'aos';
import 'aos/dist/aos.css';

const SingleBookPage = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, easing: "ease-in-out", once: true, offset: 100 });
    }, []);

    useEffect(() => {
        const fetchDetails = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const res = await getBookById(id);
                setBook(res.data);
                AOS.refresh();
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
        { label: 'التصنيف', subLabel: book.book_classfiction, icon: <CategoryIcon /> },
    ];

    return (
        <div className="max-w-6xl mx-auto p-6 font-expo text-right" dir="rtl">
            <Breadcrumbs
                items={[
                    { label: 'الكتب', path: '/books' },
                    { label: book.book_name }
                ]}
            />

            <div className="flex flex-col items-center gap-6 mb-4">
                <div
                    className="flex flex-row flex-wrap lg:flex-nowrap justify-center gap-4 md:gap-6 lg:gap-10 w-full max-w-7xl px-2"
                    data-aos="fade-up"
                >
                    {book.image?.map((img: string, i: number) => (
                        <img
                            key={i}
                            src={img}
                            className="w-[46%] md:w-[42%] lg:w-[450px] h-auto aspect-square object-cover shadow-2xl rounded-md border border-gray-100 hover:scale-105 transition-transform duration-500"
                            alt="Book Page"
                            data-aos="zoom-in"
                            data-aos-delay={i * 100}
                        />
                    ))}
                </div>

                <Button
                    type="primary"
                    className="!h-[48px] px-20 !text-[16px] font-bold rounded-md !bg-[#007bff] !border-none !text-white shadow-md hover:!bg-blue-600 active:scale-95 transition-all cursor-pointer"
                    onClick={() => openExternalLink(book?.book_link)}
                    data-aos="fade-up"
                    data-aos-delay={book.image?.length * 100 || 200}
                >
                    قراءة الكتاب
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-expo">
                <DescriptiveInfoSection
                    mainTitle="معلومات وصفية"
                    showTopQuote={true}
                    sections={[
                        { title: "نبذة عن الكتاب", content: book.book_summary },
                        { title: "أهداف الكتاب", content: book.book_goals }
                    ]}
                    data-aos="fade-up"
                    data-aos-delay={100}
                />

                <div className="lg:col-span-4 mt-20 sticky top-10" data-aos="fade-left">
                    <Sidebar title="معلومات الكتاب" titleIcon={<InfoIcon />} items={sidebarData} showShareButton={true} book={book} />
                </div>
            </div>
        </div>
    );
};

export default SingleBookPage;