import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../services/blogService';
import { QuoteIcon } from '../icons/quote';
import { PublisherIcon, YearIcon, ViewsIcon, CategoryIcon, InfoIcon } from '../icons/blog-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (!id) return;
        const { data } = await getBlogDetails(id);
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
          year: data.blog_date || "2026"
        });
        AOS.refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div className="py-40 text-center font-expo text-[#3A5F7D]">جاري تحميل المحتوى...</div>;
  if (!blog) return <div className="py-40 text-center font-expo">المنشور غير موجود</div>;

  const infoItems = [
    { label: 'الناشر', value: blog.publisher, Icon: PublisherIcon, size: "w-10 h-10" },
    { label: 'العام', value: blog.year, Icon: YearIcon, size: "w-10 h-10" },
    { label: 'المشاهدين', value: `${blog.views} مشاهد`, Icon: ViewsIcon, size: "w-7 h-7" },
    { label: 'نوع المنشور', value: blog.classification, Icon: CategoryIcon, size: "w-10 h-10" },
  ];

  const Shape = ({ className, src }: { className: string, src: string }) => (
    <div className={`absolute z-0 hidden lg:block lg:w-220 h-30 ${className}`}>
      <img src={src} className="w-full h-auto" alt="" />
    </div>
  );

  return (
    <main className="min-h-screen bg-white font-expo overflow-hidden" dir="rtl">
      {/* Hero Section */}
      <section className="relative w-full py-12 md:py-32 flex flex-col items-center" data-aos="fade-up">
        <div className="absolute top-0 left-0 w-full h-[350px] md:h-[450px] z-0 overflow-hidden">
          <img src="/images/blog-bg.png" className="w-full h-full object-cover" alt="" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-5xl">
          <div className="relative group">
            <Shape className="-top-14 right-8" src="/images/light-shape.png" />
            <Shape className="-top-7 right-8" src="/images/dark-shape.png" />

            <div className="relative bg-white rounded-[20px] md:rounded-[30px] shadow-2xl p-6 md:px-16 md:py-4 border border-gray-50 z-10">
              <h1 className="text-base lg:text-xl font-bold text-[#3A5F7D] text-center leading-tight mb-8 md:mb-12" data-aos="zoom-in">
                "{blog.title}"
              </h1>

              <QuoteIcon className="w-6 md:w-8 h-auto -mt-10 mb-4 text-[#3A5F7D]" data-aos="fade-left" />

              <img src={blog.image} className="w-full h-auto object-cover max-h-[300px] rounded-xl md:rounded-2xl mb-4 shadow-md" alt="" data-aos="fade-up" data-aos-delay={100} />

              <div className="text-[#4D4D4D] text-right leading-[1.8] md:leading-[2] text-sm md:text-lg space-y-6">
                {blog.content.split('\n').map((para, i) => (
                  <p key={i} data-aos="fade-right" data-aos-delay={i * 100}>{para.trim()}</p>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <QuoteIcon className="w-6 md:w-8 h-auto transform scale-[-1] text-[#3A5F7D]" data-aos="fade-right" />
              </div>
            </div>

            <Shape className="bottom-11 left-6" src="/images/light-shape.png" />
            <Shape className="-bottom-13 left-6" src="/images/dark-shape.png" />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="container mx-auto px-4 max-w-5xl mb-20">
        <div className="bg-[#3A5F7D] rounded-[15px] md:rounded-[20px] px-6 py-8 md:p-12 text-white shadow-lg" data-aos="fade-up">
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
            <InfoIcon className="w-8 h-8" />
            <h3 className="text-base md:text-lg">معلومات المنشور</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {infoItems.map((item, idx) => (
              <div key={idx} className="flex flex-row items-start gap-3" data-aos="flip-left" data-aos-delay={idx * 150}>
                <div className="bg-white w-10 h-10 rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  <item.Icon className={`${item.size} text-[#3A5F7D]`} />
                </div>
                <div className="flex flex-col gap-1 items-start text-white text-right">
                  <span className="text-[14px] font-bold">{item.label}</span>
                  <span className="text-sm opacity-90">{item.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleBlogPage;