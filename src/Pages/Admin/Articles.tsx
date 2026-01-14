import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { Button } from '../../Components/Common/button';
import { CalendarIcon, ClockIcon, SearchIcon } from '../../icons/admin';
import Pagination from '../../Components/Pagination';
import AdminPageHeader from '../components/page-header';
import { getAdminArticles } from '../../services/articleService';
import AdminPageLoading from '../components/loading';
// import Button from '../../Components/Common/button';


interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
  page: number | null;
}

interface PaginationData {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
  links: PaginationLink[];
}

interface Article {
  article_id: number;
  article_title: string;
  article_date: string;
  article_time: string;
}

const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = async (page: number, keyword: string = '') => {
    try {
      setLoading(true);

      const response = await getAdminArticles(currentPage, 12, keyword || undefined);
      console.log(response.data, 'response.data.data')
      const data = response.data;
      const paginationData = response.data.pagination
      setArticles(data.articles || []);
      setPagination({
        total: paginationData.total,
        current_page: paginationData.current_page,
        last_page: paginationData.last_page,
        per_page: paginationData.per_page,
        links: paginationData.pagination_links || []
      });
      setError(null);
      setStartSearch(false)
    } catch (err) {
      console.error('Error fetching articles:', err);
      setError('فشل في تحميل المقالات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startSearch) {
      setCurrentPage(1); // Reset to first page on search
      fetchArticles(1, searchQuery);
    }
  }, [startSearch]);

  useEffect(() => {
    if (currentPage !== 1 || searchQuery === '') {
      fetchArticles(currentPage, searchQuery);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('هل أنت متأكد من حذف هذه المقالة؟')) return;
    try {
      await axiosInstance.delete(`/admin/articles/${id}`);
      setArticles(articles.filter(a => a.article_id !== id));
    } catch (err) {
      console.error('Error deleting article:', err);
    }
  };

  return (
    <>
      {/* Header Section */}
      <AdminPageHeader 
      total={pagination?.total || 0}
       searchQuery={searchQuery} 
       setSearchQuery={setSearchQuery} 
       setStartSearch={setStartSearch}
        btnLoading={loading && startSearch} 
        title={'المقالات'} 
        titleSingle={'مقالة'} 
        type='articles'/>


      <div className="space-y-6">

        {/* Loading State */}
        {loading && (
          <AdminPageLoading />
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center text-red-500 py-8">{error}</div>
        )}

        {/* Articles Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {articles.map((article) => (
              <div
                key={article.article_id}
                className="bg-white rounded-[5px] p-6 h-[251px] flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-primary text-[22px] font-normal mb-4 text-right">
                    {article.article_title}
                  </h3>

                  <div className="flex items-center justify-start gap-4 mb-4 text-[#4D4D4D] text-[14px]">
                    <div className="flex items-bottom justify-center gap-1">
                      <span>{article.article_time}</span>
                      <ClockIcon />
                    </div>
                    <div className="flex items-bottom justify-center gap-1">

                      <span>{article.article_date}</span>
                      <CalendarIcon />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-3">
                  <Button
                    className='h-[52px] w-1/2'
                    onClick={() => navigate(`/admin/articles/edit/${article.article_id}`)}
                    type="primary"
                  >
                    تعديل المقالة
                  </Button>
                  <Button
                    className='h-[52px] w-1/2'
                    onClick={() => handleDelete(article.article_id)}
                    type="danger"
                  >
                    حذف المقالة
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && articles.length === 0 && (
          <div className="text-center text-[#6B7280] py-8">لا توجد مقالات</div>
        )}

        {/* Pagination */}
        {!loading && pagination && pagination.last_page > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={pagination?.last_page || 0}
            onPageChange={(page: number) => handlePageChange(page)}
          />
        )}

      </div>
    </>
  );
};


export default Articles;
