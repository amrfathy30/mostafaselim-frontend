import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../Components/Common/button';
import { adminAddArticle, adminUpdateArticle, adminGetArticle } from '../../services/articleService';
import { adminGetCategories } from '../../services/categoryService';
import toast, { Toaster } from 'react-hot-toast';

interface Paragraph {
  id: number;
  title: string;
  details: string;
}

const AddArticle: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [articleInfo, setArticleInfo] = useState({
    title: '',
    type: '',
    author: '',
    published: '',
    categoryId: '',
    year: '',
  });

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { id: 1, title: '', details: '' },
  ]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const catRes = await adminGetCategories();
        const cats = catRes.data?.data || catRes.data || [];
        setCategories(cats);

        if (isEditMode) {
          const res = await adminGetArticle(id!);
          const data = res.data;
          
          const matchedCat = cats.find((c: any) => (c.title || c.category_title) === data.article_classification);

          setArticleInfo({
            title: data.article_title || '',
            type: data.article_type || '',
            author: data.article_author || '',
            published: data.article_publisher || '',
            categoryId: matchedCat ? String(matchedCat.id || matchedCat.category_id) : String(data.category_id || ''),
            year: data.article_date ? data.article_date.split('/')[2] || data.article_date : '',
          });
          
          if (data.article_sections) {
            const mappedParagraphs = data.article_sections.map((sec: any, index: number) => {
              let textContent = "";
              const content = sec.section_content;
              if (Array.isArray(content)) {
                const textObj = content.find((c: any) => c.type === 'text');
                textContent = textObj ? textObj.content : "";
              } else if (content && typeof content === 'object') {
                textContent = content.type === 'text' ? content.content : "";
              }
              return { id: index + 1, title: sec.section_title || '', details: textContent };
            });
            setParagraphs(mappedParagraphs);
          }
        }
      } catch (error) { console.error(error); }
    };
    loadInitialData();
  }, [id, isEditMode]);

  const addParagraph = () => {
    setParagraphs([...paragraphs, { id: Date.now(), title: '', details: '' }]);
  };

  const updateParagraph = (pid: number, field: 'title' | 'details', value: string) => {
    setParagraphs(paragraphs.map(p => p.id === pid ? { ...p, [field]: value } : p));
  };

  const handlePublish = async () => {
    if (!articleInfo.title.trim() || !articleInfo.categoryId) return toast.error('يرجى ملء الحقول المطلوبة');

    setLoading(true);
    const formData = new FormData();
    
    formData.append('title', articleInfo.title);
    formData.append('type', articleInfo.type || 'مقالة');
    formData.append('year', articleInfo.year); 
    formData.append('category_id', articleInfo.categoryId);
    formData.append('writer', articleInfo.author || 'دكتور مصطفى سليم');
    formData.append('post_by', articleInfo.published || 'دكتور مصطفى سليم');
    
    paragraphs.forEach((p, index) => {
      formData.append(`sections[${index}][title]`, p.title || `الفقرة ${index + 1}`);
      formData.append(`sections[${index}][order]`, (index + 1).toString());
      formData.append(`sections[${index}][content][0][type]`, 'text');
      formData.append(`sections[${index}][content][0][content]`, p.details);
    });

    if (isEditMode) {
      formData.append('_method', 'PUT');
    }

    try {
      if (isEditMode) await adminUpdateArticle(id!, formData);
      else await adminAddArticle(formData);
      toast.success('تم الحفظ بنجاح');
      navigate('/admin/articles');
    } catch (error: any) {
      const serverErrors = error.response?.data?.errors as Record<string, string[]>;
      if (serverErrors) {
        const firstErrorArray = Object.values(serverErrors)[0];
        toast.error(firstErrorArray[0]);
      } else {
        toast.error('حدث خطأ في الحفظ');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-expo pb-10 px-6" dir="rtl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[32px] font-bold text-[#3A5F7D]">{isEditMode ? 'تعديل مقالة' : 'أضف مقالة'}</h1>
        <button onClick={() => navigate('/admin/articles')} className="text-lg text-[#3A5F7D] font-bold">عودة</button>
      </div>

      <div className="space-y-6">
        <div className="bg-[#E8E8E8] rounded-[12px] p-6 shadow-sm border border-gray-100">
          <h2 className="text-[22px] text-primary text-right mb-6 font-bold">معلومات المقالة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="عنوان المقالة" value={articleInfo.title} onChange={(e) => setArticleInfo({ ...articleInfo, title: e.target.value })} className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black" />
            <input type="text" placeholder="نوع المقالة" value={articleInfo.type} onChange={(e) => setArticleInfo({ ...articleInfo, type: e.target.value })} className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black" />
            <input type="text" placeholder="الكاتب" value={articleInfo.author} onChange={(e) => setArticleInfo({ ...articleInfo, author: e.target.value })} className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black" />
            <input type="text" placeholder="المنشور" value={articleInfo.published} onChange={(e) => setArticleInfo({ ...articleInfo, published: e.target.value })} className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black" />
            <select value={articleInfo.categoryId} onChange={(e) => setArticleInfo({ ...articleInfo, categoryId: e.target.value })} className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-bold text-black">
              <option value="">اختر التصنيف</option>
              {categories.map(cat => (
                <option key={cat.id || cat.category_id} value={cat.id || cat.category_id}>{cat.title || cat.category_title}</option>
              ))}
            </select>
            <input type="text" placeholder="العام" value={articleInfo.year} onChange={(e) => setArticleInfo({ ...articleInfo, year: e.target.value })} className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-[#3A5F7D] font-semibold text-black" />
          </div>
        </div>

        <div className="bg-[#E8E8E8] rounded-[12px] p-6 shadow-sm border border-gray-100">
          <h2 className="text-[22px] text-primary text-right mb-6 font-bold">محتوي المقالة</h2>
          <div className="space-y-6">
            {paragraphs.map((p, index) => (
              <div key={p.id} className="bg-[#D9D9D9] rounded-[12px] p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-[18px] text-primary font-bold">الفقرة {index + 1}</h3>
                  <div className="flex gap-2">
                    <Button className='w-[140px] h-10' type='primary' onClick={()=>console.log('add video')}>أضف فيديو</Button>
                    <Button className='w-[140px] h-10' type='primary' onClick={()=>console.log('add img')}>أضف صورة</Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <input type="text" placeholder="عنوان الفقرة" value={p.title} onChange={(e) => updateParagraph(p.id, 'title', e.target.value)} className="bg-white w-full px-4 py-3 rounded-lg text-right outline-none font-bold text-black" />
                  <textarea placeholder="تفاصيل الفقرة" value={p.details} onChange={(e) => updateParagraph(p.id, 'details', e.target.value)} rows={6} className="bg-white w-full px-4 py-3 rounded-lg text-right outline-none resize-none font-semibold min-h-[250px] text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 py-4">
          <Button className='w-[273px] h-[52px]' type='primary' onClick={addParagraph}>أضف فقرة</Button>
          <Button className='w-[273px] h-[52px]' type='primary' onClick={handlePublish} loading={loading}>
            {isEditMode ? 'تحديث المقالة' : 'نشر المقالة'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddArticle;