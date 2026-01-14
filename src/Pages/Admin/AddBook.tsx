import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [bookInfo, setBookInfo] = useState({
    publisher: '',
    publishDate: '',
    editionNumber: '',
    language: '',
    category: '',
    bookName: '',
    description: '',
    goals: '',
    link: '',
  });

  const handlePublish = () => {
    console.log('Publishing book:', bookInfo);
    navigate('/admin/books');
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/books')}
          className="text-[#2B2B2B] hover:text-primary transition-colors"
        >
          عودة
        </button>
        <h1 className="text-[24px] font-bold text-textPrimary">أضف كتاب</h1>
      </div>

      <div className="space-y-6">
        {/* Book Info Section */}
        <div className="bg-[#F3F4F6] rounded-[12px] p-6">
          <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">معلومات الكتاب</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="دار النشر"
              value={bookInfo.publisher}
              onChange={(e) => setBookInfo({ ...bookInfo, publisher: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="تاريخ النشر"
              value={bookInfo.publishDate}
              onChange={(e) => setBookInfo({ ...bookInfo, publishDate: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="رقم الطبعه"
              value={bookInfo.editionNumber}
              onChange={(e) => setBookInfo({ ...bookInfo, editionNumber: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="اللغة"
              value={bookInfo.language}
              onChange={(e) => setBookInfo({ ...bookInfo, language: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="التصنيف"
              value={bookInfo.category}
              onChange={(e) => setBookInfo({ ...bookInfo, category: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="اسم الكتاب"
              value={bookInfo.bookName}
              onChange={(e) => setBookInfo({ ...bookInfo, bookName: e.target.value })}
              className="px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
          </div>

          <div className="mt-4">
            <textarea
              placeholder="نبذه عن الكتاب"
              value={bookInfo.description}
              onChange={(e) => setBookInfo({ ...bookInfo, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="mt-4">
            <textarea
              placeholder="اهداف الكتاب"
              value={bookInfo.goals}
              onChange={(e) => setBookInfo({ ...bookInfo, goals: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary resize-none"
            />
          </div>

          <div className="mt-4">
            <input
              type="text"
              placeholder="رابط الكتاب"
              value={bookInfo.link}
              onChange={(e) => setBookInfo({ ...bookInfo, link: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="px-6 py-3 bg-[#3A5F7D] text-white rounded-lg hover:bg-[#3A5F7D]/90 transition-colors">
              ارفع صورة الدولي للكتاب
            </button>
            <button className="px-6 py-3 bg-[#3A5F7D] text-white rounded-lg hover:bg-[#3A5F7D]/90 transition-colors">
              ارفع صورة الثانية للكتاب
            </button>
          </div>
        </div>

        {/* Publish Button */}
        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            className="bg-primary text-white px-12 py-3 rounded-lg text-[16px] hover:bg-primary/90 transition-colors"
          >
            نشر الكتاب
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBook;
