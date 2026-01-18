import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBookById, adminAddBook, adminUpdateBook} from '../../services/bookService';

const AddBook: React.FC = () => {
  const navigate = useNavigate();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);

  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
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
      getBookById(id).then((res) => {
        const book = res.data;
        setBookInfo({
          bookName: book.book_name,
          publishDate: book.book_date,
          publisher: book.publishing_house,
          language: book.book_lang,
          editionNumber: book.book_edition_number,
          category: book.book_classfiction,
          goals: book.book_goals,
          description: book.book_summary,
          pages: book.book_pages?.toString() || '',
          link: '', 
        });
      });
    }
  }, [id, isEdit]);

  const handlePublish = async () => {
  setLoading(true);
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
  if (coverImage) {
  formData.append('image', coverImage);
}

if (secondImage) {
  formData.append('images[]', secondImage);
}


  try {
    if (isEdit) {
      await adminUpdateBook(id!, formData); 
    } else {
      await adminAddBook(formData);
    }
    navigate('/admin/books');
  } catch (error) {
    console.error("Error saving book:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    
    <>
    <div className="p-6">
        <button onClick={() => navigate('/admin/books')}>عودة</button>
        <button onClick={handlePublish} disabled={loading}>
            {loading ? 'جاري التحميل...' : (isEdit ? 'تعديل الكتاب' : 'نشر الكتاب')}
        </button>
    </div>
      <div className="mb-8 flex items-center justify-between">
        <button
          onClick={() => navigate('/admin/books')}
          className="text-[#2B2B2B] hover:text-primary transition-colors"
        >
          عودة
        </button>
        <h1 className="text-[24px] font-bold text-textPrimary">
          {isEdit ? 'تعديل كتاب' : 'أضف كتاب'}
        </h1>
      </div>

      <div className="space-y-6">
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

  <div className="relative">
    <input
      type="file"
      id="cover-upload"
      accept="image/*"
      className="hidden" 
      onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
    />
    <label
      htmlFor="cover-upload"
      className="flex items-center justify-center px-6 py-3 bg-[#3A5F7D] text-white rounded-sm cursor-pointer hover:bg-[#3A5F7D]/90 transition-all text-center"
    >
      {coverImage ? `تم اختيار: ${coverImage.name.substring(0, 15)}...` : 'ارفع صورة الدولي للكتاب'}
    </label>
  </div>
  
  <div className="relative">
    <input
      type="file"
      id="second-upload"
      accept="image/*"
      className="hidden"
      onChange={(e) => setSecondImage(e.target.files?.[0] || null)}
    />
    <label
      htmlFor="second-upload"
      className="flex items-center justify-center px-6 py-3 bg-[#3A5F7D] text-white rounded-sm cursor-pointer hover:bg-[#3A5F7D]/90 transition-all text-center"
    >
      {secondImage ? `تم اختيار: ${secondImage.name.substring(0, 15)}...` : 'ارفع صورة الثانية للكتاب'}
    </label>
  </div>
</div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePublish}
            disabled={loading}
            className="bg-[#007bff] text-white px-18 py-3 rounded-sm text-[16px] hover:bg-[#0056b3] transition-colors"
          >
            {loading ? 'جاري التحميل...' : isEdit ? 'تعديل الكتاب' : 'نشر الكتاب'}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBook;