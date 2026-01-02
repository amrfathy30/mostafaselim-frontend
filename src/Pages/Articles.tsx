import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/articleService';
import { WorkItem } from '../Types/works';
import ArticleCard from '../Components/works/ArticleCard';
import quoteIcon from '../assets/historyAssets/quote.svg';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<WorkItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchArticlesData = async (pageNum: number, isNewSearch: boolean = false) => {
    try {
      setLoading(true);
      
      if (isNewSearch) setArticles([]);

      const response = await getArticles(pageNum, 9, keyword);
      const apiArticles = response.data?.articles || [];
      
      const mappedData: WorkItem[] = apiArticles.map((item: any) => ({
        id: item.article_id,
        title: item.article_title,
        time: item.article_time,
        date: item.article_date,
        category: 'articles'
      }));

      setArticles(mappedData);
      setLastPage(response.data?.pagination?.last_page || 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setArticles([]);
      setLastPage(1);
      console.error("Search Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticlesData(currentPage);
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchArticlesData(1, true); 
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-12 font-expo" dir="rtl">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex justify-center items-center mb-10">
          <div className="flex items-center gap-3 relative">
            <img src={quoteIcon} alt="quote" className="w-6 md:w-8 h-auto -translate-y-3" />
            <h1 className="text-2xl md:text-4xl font-bold text-[#3A5F7D]">المقالات</h1>
            <img src={quoteIcon} alt="quote" className="w-6 md:w-8 h-auto translate-y-3 transform scale-[-1]" />
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-[22px] mb-16 px-2">
          <input 
            type="text"
            placeholder="ابحث عن المقاله التي تريدها"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-white h-[56px] w-full md:w-[567px] rounded-[5px] pr-4 pl-[10px] py-[10px] shadow-sm outline-none border-none text-right text-gray-600 placeholder:text-gray-300"
          />
          <button 
            type="submit"
            className="bg-[#007FFF] text-white h-[56px] w-full md:w-[186px] rounded-[5px] font-bold flex items-center justify-center gap-2 hover:bg-[#0066CC] transition-all shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span>بحث</span>
          </button>
        </form>

        {loading ? (
          <div className="text-center py-20 text-[#3A5F7D] font-bold">جاري التحميل...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <ArticleCard key={`${article.id}-${index}`} item={article} />
                ))
              ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                   <p className="text-gray-500 font-bold text-lg">لا توجد نتائج تطابق بحثك</p>
                </div>
              )}
            </div>

            {articles.length > 0 && lastPage > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
                {Array.from({ length: lastPage }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-xl font-bold transition-all border ${
                      currentPage === i + 1
                        ? 'bg-[#3A5F7D] text-white border-[#3A5F7D]'
                        : 'bg-white text-gray-500 border-gray-200 hover:border-[#007FFF] hover:text-[#007FFF]'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Articles;