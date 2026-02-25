import React, { useEffect, useState } from "react";
import { getArticles } from "../services/articleService";
import { WorkItem } from "../types/works";
import ArticleCard from "../Components/works/ArticleCard";
import quoteIcon from "../assets/historyAssets/quote.svg";
import Pagination from "../Components/Pagination";

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<WorkItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchArticlesData = async () => {
    try {
      setLoading(true);

      const response = await getArticles(currentPage, 9, search);

      const apiArticles = response.data?.articles || [];

      const mappedData: WorkItem[] = apiArticles.map((item: any) => ({
        id: item.article_id,
        title: item.article_title,
        time: item.article_time,
        date: item.article_date,
        views: item.article_views,
        category: "articles",
      }));

      setArticles(mappedData);
      setLastPage(response.data?.pagination?.last_page || 1);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesData();
  }, [currentPage]);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchArticlesData();
    }, 500);

    return () => clearTimeout(delay);
  }, [currentPage, search]);

  return (
    <main
      className="min-h-screen bg-[#F5F5F5] py-8 xl:py-16 font-expo"
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:max-w-[768px] lg:max-w-[1280px] xl:max-w-[1440px] xxl:max-w-[1600px]">
        <div className="flex flex-col items-center mb-8 md:mb-12 xxl:mb-16">
          <div className="flex justify-center items-center mb-8 xxl:mb-[50px]">
            <div className="flex items-center gap-2 relative">
              <img
                src={quoteIcon}
                alt="quote"
                className="w-5 xl:w-8 xxl:w-[35px] h-auto -translate-y-2"
              />
              <h1 className="text-xl md:text-2xl xl:text-3xl xxl:text-[40px] font-bold text-[#3A5F7D]">
                المقالات
              </h1>
              <img
                src={quoteIcon}
                alt="quote"
                className="w-5 xl:w-8 xxl:w-[35px] h-auto translate-y-2 transform scale-[-1]"
              />
            </div>
          </div>

          <div className="w-full max-w-2xl flex flex-col md:flex-row  items-center gap-2 md:gap-0">
            <input
              type="text"
              placeholder="ابحث عن المقاله التي تريدها"
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
          <div className="text-center py-20 text-[#3A5F7D] font-bold">
            جاري التحميل...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">
            لا يوجد مقالات متاحة
          </div>
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6 xxl:gap-[31px] lg:px-20 md:px-5">
              {articles.map((article, index) => (
                <ArticleCard key={`${article.id}-${index}`} item={article} />
              ))}
            </div>

            {articles.length > 0 && lastPage > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={lastPage}
                onPageChange={(page: number) => setCurrentPage(page)}
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Articles;
