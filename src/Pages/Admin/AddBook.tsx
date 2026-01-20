import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {  adminGetBook , adminAddBook, adminUpdateBook } from '../../services/bookService';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);
  const [existingCover, setExistingCover] = useState<string | null>(null);
  const [existingSecondImage, setExistingSecondImage] = useState<string | null>(null);

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
    pages: '',
  });

useEffect(() => {
  if (isEdit && id) {
    setLoading(true);
    adminGetBook(id)
      .then((res) => {
        const book = res.data;
        setBookInfo({
          bookName: book.book_name || '',
          publishDate: book.book_date || '',
          publisher: book.publishing_house || '',
          language: book.book_lang || '',
          editionNumber: book.book_edition_number || '',
          category: book.book_classfiction || '',
          goals: book.book_goals || '',
          description: book.book_summary || '',
          pages: book.book_pages?.toString() || '',
          link: book.book_link || '',
        });
        
        if (book.image) setExistingCover(book.image);
        if (book.images && book.images[1]) setExistingSecondImage(book.images[1]); 
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }
}, [id, isEdit]);



  const handlePublish = async () => {
    if (!bookInfo.bookName.trim()) {
      alert('يجب إدخال اسم الكتاب');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('book_name', bookInfo.bookName);
      formData.append('book_date', bookInfo.publishDate);
      formData.append('publishing_house', bookInfo.publisher);
      formData.append('book_lang', bookInfo.language);
      formData.append('book_pages', bookInfo.pages);
      formData.append('book_edition_number', bookInfo.editionNumber);
      formData.append('book_classfiction', bookInfo.category);
      formData.append('book_summary', bookInfo.description);
      formData.append('book_goals', bookInfo.goals);
      formData.append('book_link', bookInfo.link);

      if (coverImage) formData.append('image[]', coverImage);
      if (secondImage) formData.append('image[]', secondImage);

      if (isEdit) {
        await adminUpdateBook(id!, formData);
      } else {
        await adminAddBook(formData);
      }

     navigate('/admin/books');
    } catch (error: any) {
      console.error("Error saving book:", error);
      const errorMsg = error.response?.data?.message || 'حدث خطأ أثناء الحفظ';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <div className="mb-8 flex items-center justify-between p-6">
        <h1 className="text-[24px] font-bold text-textPrimary">
          {isEdit ? 'تعديل كتاب' : 'أضف كتاب'}
        </h1>
        <button
          onClick={() => navigate('/admin/books')}
          className="text-[#2B2B2B] hover:text-primary transition-colors"
        >
          عودة
        </button>
      </div>

      <div className="space-y-6 px-6 pb-10">
        <div className="bg-[#F3F4F6] rounded-[12px] p-6">
          <h2 className="text-[18px] font-bold text-[#2B2B2B] text-center mb-6">معلومات الكتاب</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="اسم الكتاب"
              value={bookInfo.bookName}
              onChange={(e) => setBookInfo({ ...bookInfo, bookName: e.target.value })}
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
              placeholder="عدد الصفحات"
              value={bookInfo.pages}
              onChange={(e) => setBookInfo({ ...bookInfo, pages: e.target.value })}
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
              placeholder="رابط الكتاب"
              value={bookInfo.link}
              onChange={(e) => setBookInfo({ ...bookInfo, link: e.target.value })}
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
          

<div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
  
  <div className="space-y-2">
    {(coverImage || existingCover) && (
      <div className="mb-2 relative w-full h-40 bg-white rounded-lg border overflow-hidden">
        <img 
          src={coverImage ? URL.createObjectURL(coverImage) : existingCover!} 
          alt="Cover" 
          className="w-full h-full object-contain"
        />
      </div>
    )}
    <div className="relative">
      <input type="file" id="cover-upload" accept="image/*" className="hidden" 
        onChange={(e) => setCoverImage(e.target.files?.[0] || null)} />
      <label htmlFor="cover-upload" className="flex items-center justify-center px-6 py-3 bg-[#3A5F7D] text-white rounded-md cursor-pointer hover:bg-[#3A5F7D]/90 transition-all text-center">
        {coverImage ? 'تغيير صورة الغلاف' : (existingCover ? 'تحديث صورة الغلاف' : 'ارفع صورة الغلاف')}
      </label>
    </div>
  </div>

  <div className="space-y-2">
    {(secondImage || existingSecondImage) && (
      <div className="mb-2 relative w-full h-40 bg-white rounded-lg border overflow-hidden">
        <img 
          src={secondImage ? URL.createObjectURL(secondImage) : existingSecondImage!} 
          alt="Second" 
          className="w-full h-full object-contain"
        />
      </div>
    )}
    <div className="relative">
      <input type="file" id="second-upload" accept="image/*" className="hidden" 
        onChange={(e) => setSecondImage(e.target.files?.[0] || null)} />
      <label htmlFor="second-upload" className="flex items-center justify-center px-6 py-3 bg-[#3A5F7D] text-white rounded-md cursor-pointer hover:bg-[#3A5F7D]/90 transition-all text-center">
        {secondImage ? 'تغيير الصورة الثانية' : (existingSecondImage ? 'تحديث الصورة الثانية' : 'ارفع الصورة الثانية')}
      </label>
    </div>
  </div>

</div>

        </div>

        <div className="flex justify-center">
         <button
            onClick={handlePublish}
            disabled={loading}
            className="bg-[#007FFF] text-white px-20 py-4 rounded-xl font-bold hover:bg-[#2d4a62] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري التحميل...' : (isEdit ? 'تعديل الكتاب' : 'نشر الكتاب')}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBook;