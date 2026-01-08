import React, { useEffect, useState } from 'react';
import { getBlogs } from '../services/blogService';
import BlogCard, { BlogItem } from '../Components/BlogCard';
import Pagination from '../Components/Pagination';
import Title from '../Components/Title';

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async (page: number) => {
    try {
      setLoading(true);
      const response = await getBlogs(page, 9);
      const apiData = response.data?.blogs || [];

      const mappedData: BlogItem[] = apiData.map((item: any) => ({
        id: item.blog_id,
        title: item.blog_title,
        date: item.blog_date,
        time: item.blog_time,
        views: item.blog_views,
        image: item.blog_image_cover,
        category: item.blog_classification
      }));

      setBlogs(mappedData);
      setTotalPages(response.data?.pagination?.last_page || 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-12 md:py-16 lg:py-20 font-expo" dir="rtl">
      <div className="container mx-auto px-6 lg:px-20 max-w-[1423px]">
        
        <Title text="المدونة" />

        {loading ? (
          <div className="flex justify-center items-center py-40 bg-white rounded-[10px] shadow-sm">
            <div className="text-[#3A5F7D] font-bold text-xl animate-pulse">جاري تحميل المدونات...</div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-[31px]">
              {blogs.map((blog, index) => (
                <BlogCard key={`${blog.id}-${index}`} item={blog} />
              ))}
            </div>

            {blogs.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[10px] shadow-sm text-gray-500">
                لا توجد منشورات حالياً
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 md:mt-16 lg:mt-20">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Blogs;