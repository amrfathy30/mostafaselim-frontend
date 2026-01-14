import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPageHeader from '../components/page-header';
import { getAdminBlogs } from '../../services/blogService';
import Pagination from '../../Components/Pagination';
import { CalendarIcon, ClockIcon, ViewsIcon } from '../../icons/admin';
import { Button } from '../../Components/Common/button';
import AdminPageLoading from '../components/loading';


interface PaginationData {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

interface Blogs {
  blog_id: number;
  blog_title: string;
  blog_image_cover:string,
  blog_classification:string,
  blog_views: number;
  blog_date: string;
  blog_time: string;

}
const Blog: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [startSearch, setStartSearch] = useState(false);
  const [blogs, setBlogs] = useState<Blogs[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogs = async (page: number, keyword: string = '') => {
    try {
      setLoading(true);
      const response = await getAdminBlogs(currentPage, 12, keyword || undefined);
      console.log(response.data.blogs,'response.data.data')
      const data = response.data;
      const paginationData = response.data.pagination
      setBlogs(data.blogs || []);
      setPagination({
        total: paginationData.total,
        current_page: paginationData.current_page,
        last_page: paginationData.last_page,
        per_page: paginationData.per_page,
       
      });
      setError(null);
      setStartSearch(false)
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('فشل في تحميل المدونات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(startSearch){
      setCurrentPage(1); // Reset to first page on search
      fetchBlogs(1, searchQuery);
  }
  }, [startSearch]);

  useEffect(() => {
    if (currentPage !== 1 || searchQuery === '') {
      fetchBlogs(currentPage, searchQuery);
    }
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <>
    <AdminPageHeader 
    total={pagination?.total||0} 
    searchQuery={searchQuery} 
    setSearchQuery={setSearchQuery} 
    setStartSearch={setStartSearch} 
    btnLoading={loading&&startSearch} 
    title={'المدونات'} 
    titleSingle={'مدونه'}
    type='blog'/>

      <div className="space-y-6">
        {/* Blogs Grid */}
        {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.blog_id}
              className="relative bg-white rounded-[12px] overflow-hidden border border-gray-200 p-3"
            >
              <div className='absolute top-6 w-fit p-3 h-[60px] bg-gradient-to-r to-[#007FFF] from-[#3A5F7D] text-white text-lg font-bold rounded-tr-[20px] rounded-bl-[30px] flex items-center justify-center '>{blog?.blog_classification}</div>
              <img
              className='w-full  h-[310px] rounded-[12px]'
              src={blog?.blog_image_cover}
              alt={blog?.blog_title}/>
              {/* Blog Image */}
           

              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-primary  text-[18px] font-[400] mb-4 text-right">
                  {blog.blog_title}
                </h3>

               
                  <div className="flex items-center justify-start gap-4 mb-4 text-[#4D4D4D] text-[14px]">
                    <div className="flex items-bottom justify-center gap-1">
                    <span>{blog.blog_time}</span>
                      <ClockIcon />
                    </div>
                    <div className="flex items-bottom justify-center gap-1">

                    <span>{blog.blog_date}</span>
                      <CalendarIcon />
                    </div>
                    <div className="flex items-center gap-1">
                    <span>{blog.blog_views}</span>
                    <ViewsIcon />
                  </div>
                  </div>


                  <div className="flex items-center justify-center gap-3">
                  <Button
                    className='h-[52px] w-1/2'
                    onClick={() => navigate(`/admin/blog/edit/${blog.blog_id}`)}
                    type="primary"
                  >
                    تعديل المنشور
                  </Button>
                  <Button
                    className='h-[52px] w-1/2'
                    onClick={() => console.log('')}
                    type="danger"
                  >
                    حذف المنشور
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
             {!loading && !error && blogs.length === 0 && (
          <div className="text-center text-[#6B7280] py-8">لا توجد مدونات</div>
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





export default Blog;
