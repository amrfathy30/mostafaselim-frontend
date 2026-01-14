import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../components/page-header';
import { getAdminBooks } from '../../services/bookService';
import { CalendarIcon, ClockIcon, ViewsIcon } from '../../icons/admin';
import { Button } from '../../Components/Common/button';
import Pagination from '../../Components/Pagination';
import AdminPageLoading from '../components/loading';

interface PaginationData {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}
interface books {
  book_id: number;
  book_name: string;
  image: string,
  book_classification: string,
  publishing_house: number;
  book_date: string;
  book_time: string;

}
const Books: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  const [books, setBooks] = useState<books[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async (page: number, keyword: string = '') => {
    try {
      setLoading(true);
      const response = await getAdminBooks(currentPage, 12, keyword || undefined);
      const data = response.data;
      const paginationData = response.data.pagination
      setBooks(data.data || []);
      setPagination({
        total: paginationData.total,
        current_page: paginationData.current_page,
        last_page: paginationData.last_page,
        per_page: paginationData.per_page,

      });
      setError(null);
      setStartSearch(false)
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('فشل في تحميل الكتب');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (startSearch) {
      setCurrentPage(1); // Reset to first page on search
      fetchBooks(1, searchQuery);
    }
  }, [startSearch]);

  useEffect(() => {
    if (currentPage !== 1 || searchQuery === '') {
      fetchBooks(currentPage, searchQuery);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };


  return (
    <>

      <AdminPageHeader
        total={pagination?.total || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStartSearch={setStartSearch}
        btnLoading={loading && startSearch}
        title={'الكتب'}
        titleSingle={'كتاب'}
        type='books' />
      <div className="space-y-6">

        {/* Books Grid */}
        {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {books.map((book) => (
            <div
              key={book.book_id}
              className="relative bg-white rounded-[12px] overflow-hidden border border-gray-200 p-3"
            >
              <img
                className='w-full aspect-[1/1.3] rounded-r-[33px] mb-4 border-l-0 border-t-0 border-2 border-black'
                src={book?.image}
                alt={book?.book_name} />
              {/* book Image */}


              {/* book Content */}
              <div className="p-6">
                <h3 className="text-primary text-center text-[18px] font-bold mb-4">
                  {book.book_name}
                </h3>
                

                <div className="flex items-center justify-center  mb-4 text-primary text-[16px]">
                  <span>{book?.book_date}</span> 
                  <span>-</span>
                <p>{book.publishing_house}</p>
                </div>


                <div className="flex flex-col items-center justify-center space-y-3">
                  <Button
                    className='h-[52px] w-[186px]'
                    onClick={() => navigate(`/admin/book/edit/${book.book_id}`)}
                    type="primary"
                  >
                    تعديل الكتاب
                  </Button>
                  <Button
                    className='h-[52px] w-[186px]'
                    onClick={() => console.log('')}
                    type="danger"
                  >
                    حذف الكتاب
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
            {/* Loading State */}
            {loading && (
          <AdminPageLoading />
        )}
             {/* Empty State */}
             {!loading && !error && books.length === 0 && (
          <div className="text-center text-[#6B7280] py-8">لا توجد كتب</div>
        )}

         {/* Pagination */}
         {!loading && pagination && pagination.last_page > 1 && (
         <Pagination 
              currentPage={currentPage} 
              totalPages={pagination?.last_page ||0} 
              onPageChange={(page: number) => handlePageChange(page)} 
            />
        )}
      </div>
    </>
  );
};

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
    <path d="M14 14l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default Books;
