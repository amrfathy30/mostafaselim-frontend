import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/articleService';
import { WorkItem } from '../Types/works';
import ArticleCard from '../Components/works/ArticleCard';
import quoteIcon from '../assets/historyAssets/quote.svg';
import Pagination from '../Components/Pagination'; 

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
      console.error(error);
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
    <main className="min-h-screen bg-[#F5F5F5] py-8 xl:py-16 font-expo" dir="rtl">
      <div className="container mx-auto px-4 md:max-w-[768px] lg:max-w-[1280px] xl:max-w-[1440px] xxl:max-w-[1600px]">
        
        <div className="flex justify-center items-center mb-8 xxl:mb-[50px]">
          <div className="flex items-center gap-2 relative">
            <img src={quoteIcon} alt="quote" className="w-5 xl:w-8 xxl:w-[35px] h-auto -translate-y-2" />
            <h1 className="text-xl md:text-2xl xl:text-3xl xxl:text-[40px] font-bold text-[#3A5F7D]">المقالات</h1>
            <img src={quoteIcon} alt="quote" className="w-5 xl:w-8 xxl:w-[35px] h-auto translate-y-2 transform scale-[-1]" />
          </div>
        </div>

        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 xxl:mb-[60px] max-w-[700px] mx-auto">
          <input 
            type="text"
            placeholder="ابحث عن المقاله التي تريدها"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="bg-white w-full md:flex-1 h-[48px] xxl:h-[56px] rounded-[5px] pr-4 shadow-sm outline-none border-none text-right"
          />
          <button 
            type="submit"
            className="bg-[#007FFF] text-white w-full md:w-[150px] xxl:w-[186px] h-[48px] xxl:h-[56px] rounded-[5px] font-bold flex items-center justify-center gap-2 hover:bg-[#0066CC] transition-all cursor-pointer"
          >
            <span>بحث</span>
          </button>
        </form>

        {loading ? (
          <div className="text-center py-20 text-[#3A5F7D] font-bold">جاري التحميل...</div>
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