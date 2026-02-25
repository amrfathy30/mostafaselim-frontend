import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminPageHeader from "../components/page-header";
import { getAdminBooks, adminDeleteBook } from "../../services/bookService";
import { Button } from "../../Components/Common/button";
import Pagination from "../../Components/Pagination";
import AdminPageLoading from "../components/loading";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import { EyeIcon } from "../../icons/work-icons";

interface PaginationData {
  total: number;
  current_page: number;
  last_page: number;
  per_page: number;
}

interface Book {
  book_views: number;
  book_id: number;
  book_name: string;
  image: string;
  publishing_house: string;
  book_date: string;
}

const Books: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [startSearch, setStartSearch] = useState(false);
  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<{
    id: number;
    title: string;
  } | null>(null);

  const fetchBooks = async (page: number, keyword: string = "") => {
    try {
      setLoading(true);
      const response = await getAdminBooks(page, 12, keyword);
      const data = response.data;
      setBooks(data.data || []);
      setPagination(data.pagination || null);
      setError(null);
      setStartSearch(false);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setBooks([]);
        setPagination(null);
        setError("لا توجد كتب");
      } else {
        setError("فشل في تحميل الكتب");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage, searchQuery);
  }, [currentPage, startSearch]);

  useEffect(() => {
    if (searchQuery === "") {
      setCurrentPage(1);
      fetchBooks(1);
    }
  }, [searchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const openDeleteModal = (id: number, title: string) => {
    setSelectedBook({ id, title });
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedBook) return;
    try {
      await adminDeleteBook(selectedBook.id);
      setIsModalOpen(false);
      fetchBooks(currentPage, searchQuery);
    } catch (err) {
      toast.error("حدث خطأ أثناء الحذف");
    }
  };

  return (
    <>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
        itemTitle={selectedBook?.title || ""}
        itemType="حذف الكتاب"
      />

      <AdminPageHeader
        total={pagination?.total || 0}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setStartSearch={setStartSearch}
        btnLoading={loading && startSearch}
        title={"الكتب"}
        titleSingle={"كتاب"}
        type="books"
        onSearchClick={() => fetchBooks(1, searchQuery)}
      />

      <div className="space-y-6">
        {!loading && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {books.map((book) => (
              <div
                key={book.book_id}
                className="relative bg-white rounded-[12px] overflow-hidden border border-gray-200 p-3"
              >
                <img
                  className="w-full aspect-[1/1.3] rounded-r-[33px] mb-4 border-l-0 border-t-0 border-2 border-black object-cover"
                  src={book?.image}
                  alt={book?.book_name}
                />
                <div className="p-4 text-center">
                  <h3 className="text-primary text-[18px] font-bold mb-2">
                    {book.book_name}
                  </h3>
                  <div className="text-gray-500 text-sm">
                    {book.book_date} - {book.publishing_house}
                  </div>
                  <div className="flex items-center justify-center gap-[6px] mb-3">
                    <EyeIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
                    <span className="text-[#4D4D4D] text-[14px] leading-none">
                      {book.book_views > 999
                        ? (book.book_views / 1000).toFixed(1) + "K"
                        : book.book_views || "0"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 items-center">
                    <Button
                      className="w-full max-w-[180px] hover:bg-[#2d4a62]"
                      onClick={() =>
                        navigate(`/admin/book/edit/${book.book_id}`)
                      }
                      type="primary"
                    >
                      تعديل الكتاب
                    </Button>
                    <Button
                      className="w-full max-w-[180px] hover:bg-red-500"
                      onClick={() =>
                        openDeleteModal(book.book_id, book.book_name)
                      }
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

        {!loading && (books.length === 0 || error) && (
          <div className="text-center text-[#6B7280] py-8">
            {error || "لا توجد كتب"}
          </div>
        )}

        {loading && <AdminPageLoading />}
        {!loading &&
          books.length > 0 &&
          pagination?.last_page &&
          pagination.last_page > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={pagination.last_page}
              onPageChange={handlePageChange}
            />
          )}
      </div>
    </>
  );
};

export default Books;
