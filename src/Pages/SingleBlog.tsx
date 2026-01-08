import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../services/blogService';
import { CalenderIcon, EyeIcon } from '../icons/work-icons';
import { QuoteIcon} from '../icons/quote';

export interface SingleBlog {
  id: number;
  title: string;
  content: string;
  date: string;
  time: string;
  views: string;
  image: string;
  publisher: string;
  classification: string;
  year: string;
}

const SingleBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<SingleBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (!id) return;
        const response = await getBlogDetails(id);
        const data = response.data;
        
        setBlog({
          id: data.blog_id,
          title: data.blog_title,
          content: data.blog_content,
          date: data.blog_date,
          time: data.blog_time,
          views: data.blog_views,
          image: data.blog_image_cover,
          publisher: "د. مصطفى سليم",
          classification: data.blog_classification,
          year: data.blog_date.split('/')[2] || "2025"
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="py-40 text-center font-expo text-[#3A5F7D]">جاري تحميل المحتوى...</div>;
  if (!blog) return <div className="py-40 text-center font-expo">المنشور غير موجود</div>;

  return (
    <main className="min-h-screen bg-white font-expo overflow-hidden" dir="rtl">
      
      <section className="relative w-full py-12 md:py-40 flex flex-col items-center">
        
        <div className="absolute top-0 left-0 w-full h-[400px] md:h-[500px] z-0 overflow-hidden">
          <img src="/images/blog-bg.png" className="w-full h-full object-cover" alt="" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          
          <div className="relative group">
            <div className="absolute -top-14 right-8 w-40 md:w-220 h-30 z-0 hidden md:block">
              <img src="/images/light-shape.png" className="w-full h-auto" alt="" />
            </div>
            <div className="absolute -top-7 right-8 w-40 md:w-220 h-30 z-0 hidden md:block">
              <img src="/images/dark-shape.png" className="w-full h-auto" alt="" />
            </div>

            <div className="relative bg-white rounded-[20px] md:rounded-[30px] shadow-2xl p-6 md:p-16 border border-gray-50 z-10">
              
              <div className="flex justify-center items-center gap-4 mb-8 md:mb-12">
                <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#3A5F7D] text-center leading-tight">
                  "{blog.title}"
                </h1>
              </div>

              <div className="flex justify-start mt-10 md:mt-16">
                 <QuoteIcon className="w-8 md:w-12 h-auto -mt-20" />
              </div>

              <div className="w-full rounded-xl md:rounded-2xl overflow-hidden mb-8 md:mb-12 shadow-md">
                <img src={blog.image} className="w-full h-auto object-cover max-h-[550px]" alt={blog.title} />
              </div>

              <div className="text-[#4D4D4D] text-right leading-[1.8] md:leading-[2] text-sm md:text-lg space-y-6">
                {blog.content.split('\n').map((para, i) => (
                  <p key={i}>{para.trim()}</p>
                ))}
              </div>

              <div className="flex justify-end mt-10 md:mt-16">
                 <QuoteIcon className="w-8 md:w-12 h-auto  transform scale-[-1]" />
              </div>


              
            </div>
            <div className="absolute bottom-11 left-6 w-40 md:w-220 h-30 z-1 ">
              <img src="/images/light-shape.png" className="w-full h-auto" alt="" />
            </div>
            
            <div className="absolute -bottom-13 left-6 w-40 md:w-220 h-30 z-1">
              <img src="/images/dark-shape.png" className="w-full h-auto" alt="" />
            </div>

          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="bg-[#3A5F7D] rounded-[15px] md:rounded-[20px] p-6 md:p-12 text-white shadow-lg">
          <div className="flex items-center gap-3 mb-8 md:mb-10 border-b border-white/10 pb-4">
             <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             <h3 className="text-lg md:text-2xl font-bold">معلومات المنشور</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60 text-sm md:text-base">الناشر</span>
                <div className="bg-white/10 p-2 rounded-md"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></div>
              </div>
              <span className="text-base md:text-xl font-bold">{blog.publisher}</span>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60 text-sm md:text-base">العام</span>
                <div className="bg-white/10 p-2 rounded-md"><CalenderIcon className="w-5 h-5 text-white" /></div>
              </div>
              <span className="text-base md:text-xl font-bold">{blog.year}</span>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60 text-sm md:text-base">المشاهدين</span>
                <div className="bg-white/10 p-2 rounded-md"><EyeIcon className="w-5 h-5 text-white" /></div>
              </div>
              <span className="text-base md:text-xl font-bold">{blog.views}</span>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white/60 text-sm md:text-base">نوع المنشور</span>
                <div className="bg-white/10 p-2 rounded-md"><svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg></div>
              </div>
              <span className="text-base md:text-xl font-bold">{blog.classification}</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default SingleBlogPage;