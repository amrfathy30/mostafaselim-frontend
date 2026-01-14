import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../Components/Common/button';

interface Paragraph {
  id: number;
  title: string;
  details: string;
}

const AddArticle: React.FC = () => {
  const navigate = useNavigate();
  const [articleInfo, setArticleInfo] = useState({
    title: '',
    type: '',
    author: '',
    published: '',
    category: '',
    year: '',
  });

  const [paragraphs, setParagraphs] = useState<Paragraph[]>([
    { id: 1, title: '', details: '' },
    { id: 2, title: '', details: '' },
  ]);

  const totalWords = paragraphs.reduce((acc, p) => {
    const words = (p.title + ' ' + p.details).trim().split(/\s+/).filter(w => w).length;
    return acc + words;
  }, 0);

  const addParagraph = () => {
    setParagraphs([...paragraphs, { id: Date.now(), title: '', details: '' }]);
  };

  const updateParagraph = (id: number, field: 'title' | 'details', value: string) => {
    setParagraphs(paragraphs.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ));
  };

  const handlePublish = () => {
    // Add carate Article logic here 

    
    console.log('Publishing article:', { articleInfo, paragraphs });
    navigate('/admin/articles');
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
       
        <h1 className="text-[32px] font-bold text-primary">أضف مقالة</h1>
        <button
          onClick={() => navigate('/admin/articles')}
          className="text-lg text-primary hover:text-[#DB3D3D] transition-colors cursor-pointer"
        >
          عودة
        </button>
      </div>

      <div className="space-y-6">
        {/* Article Info Section */}
        <div className="bg-[#E8E8E8] rounded-[12px] p-6">
          <h2 className="text-[22px] font-[400] text-primary text-right mb-6">معلومات المقالة</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="عنوان المقالة"
              value={articleInfo.title}
              onChange={(e) => setArticleInfo({ ...articleInfo, title: e.target.value })}
              className="h-[68px] px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="نوع المقالة"
              value={articleInfo.type}
              onChange={(e) => setArticleInfo({ ...articleInfo, type: e.target.value })}
              className="h-[68px]  px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="الكاتب"
              value={articleInfo.author}
              onChange={(e) => setArticleInfo({ ...articleInfo, author: e.target.value })}
              className="h-[68px]  px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="المنشور"
              value={articleInfo.published}
              onChange={(e) => setArticleInfo({ ...articleInfo, published: e.target.value })}
              className="h-[68px]  px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="التصنيف"
              value={articleInfo.category}
              onChange={(e) => setArticleInfo({ ...articleInfo, category: e.target.value })}
              className="h-[68px]  px-4 py-3 bg-white border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="العام"
              value={articleInfo.year}
              onChange={(e) => setArticleInfo({ ...articleInfo, year: e.target.value })}
              className="h-[68px]  px-4 py-3 bg-white  rounded-lg text-right outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Article Content Section */}
        <div className="bg-[#E8E8E8] rounded-[12px] p-6">
          <div className="flex items-center justify-between mb-6">
          <h2 className="text-[22px] font-[400] text-primary text-right mb-6">محتوي المقالة</h2>
          
            <div className="flex items-center gap-6 text-[22px] font-[400] text-primary">
              <span>الكلمات الحالية {totalWords}</span>
              <span>الفقرات الحالية {paragraphs.length}</span>
            </div>

          </div>

          {/* Paragraphs */}
          <div className="space-y-6">
            {paragraphs.map((paragraph, index) => (
              <div key={paragraph.id} className="bg-[#D9D9D9] rounded-[12px] p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                <h3 className="text-[18px] font-[400] text-primary">
                    {index === 0 ? 'الفقرة الأولي' : index === 1 ? 'الفقرة الثانية' : `الفقرة ${index + 1}`}
                  </h3>
                  <div className="flex items-center gap-2">
                    
                    <Button className='w-[169px]' type='primary' onClick={()=>console.log('')}>
                    أضف فيديو
                    </Button>
                    <Button className='w-[169px]' type='primary' onClick={()=>console.log('')}>
                    أضف صورة
                    </Button>
                    
                  </div>
              
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="عنوان الفقرة"
                    value={paragraph.title}
                    onChange={(e) => updateParagraph(paragraph.id, 'title', e.target.value)}
                    className="bg-white w-full px-4 py-3 bg-[#F3F4F6] border border-gray-200 rounded-lg text-right outline-none focus:border-primary"
                  />
                  <textarea
                    placeholder="تفاصيل الفقرة"
                    value={paragraph.details}
                    onChange={(e) => updateParagraph(paragraph.id, 'details', e.target.value)}
                    rows={4}
                    className="bg-white w-full px-4 py-3 bg-[#F3F4F6] border border-gray-200 rounded-lg text-right outline-none focus:border-primary min-h-[289px]"
                  />
                </div>

                {/* Add Quote/Source Buttons */}
                <div className="flex items-center justify-center gap-2 mt-4">
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-[14px] hover:bg-primary/90 transition-colors">
                    أضف اقتباس
                  </button>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-[14px] hover:bg-primary/90 transition-colors">
                    أضف مصدر
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-center gap-4">
        
          <Button className='w-[273px] ' type='primary' onClick={()=>addParagraph()}> أضف فقرة</Button>
          <Button className='w-[273px] ' type='primary' onClick={()=>handlePublish()}>   نشر المقالة</Button>
         
        </div>
      </div>
    </>
  );
};

export default AddArticle;
