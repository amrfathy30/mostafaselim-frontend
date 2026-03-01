import React, { useEffect, useState } from "react";
import { getBlogs } from "../services/blogService";
import BlogCard, { BlogItem } from "../Components/BlogCard";
import Pagination from "../Components/Pagination";
import quoteIcon from "../assets/historyAssets/quote.svg";

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await getBlogs(currentPage, 9, search);

      const apiData = response.data?.blogs || [];

      const mappedData: BlogItem[] = apiData.map((item: any) => ({
        id: item.blog_id,
        title: item.blog_title,
        date: item.blog_date,
        time: item.blog_time,
        blog_date: item.blog_date,
        blog_time: item.blog_time,
        views: item.blog_views,
        image: item.blog_image_cover,
        category: item.blog_classification,
      }));

      setBlogs(mappedData);
      setTotalPages(response.data?.pagination?.last_page || 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (search) {
      const delay = setTimeout(() => {
        fetchBlogs();
      }, 500);
      return () => clearTimeout(delay);
    } else {
      fetchBlogs();
    }
  }, [currentPage, search]);


  return (
    <main
      className="min-h-screen bg-[#F5F5F5] py-8 xl:py-16 font-expo"
      dir="rtl"
    >
      <div className="container mx-auto px-6 lg:px-20 max-w-[1423px]">
        <div className="flex flex-col items-center mb-8 md:mb-12 xxl:mb-16">
          <div className="flex items-center gap-2 relative mb-8 xxl:mb-[50px]">
            <img
              src={quoteIcon}
              alt="quote"
              className="w-5 xl:w-8 xxl:w-[35px] h-auto -translate-y-2"
            />
            <h1 className="text-xl md:text-2xl xl:text-3xl xxl:text-[40px] font-bold text-[#3A5F7D]">
              المدونة
            </h1>
            <img
              src={quoteIcon}
              alt="quote"
              className="w-5 xl:w-8 xxl:w-[35px] h-auto translate-y-2 transform scale-[-1]"
            />
          </div>

          <div className="w-full max-w-2xl flex flex-col md:flex-row  items-center gap-2 md:gap-0">
            <input
              type="text"
              placeholder="ابحث عن المدونة التي تريدها"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-[52px] px-6 text-right outline-none text-gray-600 font-expo bg-white 
  rounded-md md:rounded-l-none md:rounded-r-md border border-gray-200 shadow-sm"
            />
            <button
              className="w-full md:w-auto bg-[#007bff] hover:bg-blue-600 text-white h-[52px] px-10 
                       flex items-center justify-center gap-2 transition-colors font-expo 
                       rounded-md md:rounded-r-none md:rounded-l-md shadow-md shrink-0 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <span className="text-base font-bold">بحث</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-40 bg-white rounded-[10px] shadow-sm">
            <div className="text-[#3A5F7D] font-bold text-xl animate-pulse">
              جاري تحميل المدونات...
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-4">
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
