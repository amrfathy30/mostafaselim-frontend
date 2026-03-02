import { useEffect, useState } from "react";
import { getBooks } from "../../services/bookService";
import BookCard from "./book-card";
import quoteIcon from "../../assets/historyAssets/quote.svg";
import Pagination from "../../Components/Pagination";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await getBooks(currentPage, 9, search);
        setBooks(res.data.data);
        setTotalPages(res.data.pagination.last_page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Error fetching books", error);
      }
      setLoading(false);
    };
    fetchBooks();
  }, [currentPage, search]);

  return (
    <div className="max-w-7xl mx-auto py-8 xl:py-16 bg-[#F5F5F5] overflow-hidden" dir="rtl">
      <div
        data-aos="fade-up"
        data-aos-duration="800"
        className="flex justify-center items-center mb-8 xxl:mb-[50px]">
        <div className="flex items-center gap-2 relative">
          <img
            data-aos="fade-right"
            src={quoteIcon}
            alt="quote"
            className="w-5 xl:w-8 xxl:w-[35px] h-auto -translate-y-2"
          />
          <h1
            data-aos="zoom-in"
            data-aos-delay="150"
            className="text-xl md:text-2xl xl:text-3xl xxl:text-[40px] font-bold text-[#3A5F7D]">
            الكتب
          </h1>
          <img
            data-aos="fade-left"
            data-aos-delay="300"
            src={quoteIcon}
            alt="quote"
            className="w-5 xl:w-8 xxl:w-[35px] h-auto translate-y-2 transform scale-[-1]"
          />
        </div>
      </div>
      <div className="flex justify-center mb-12 px-4" dir="rtl">
        <div
          data-aos="fade-up"
          data-aos-delay="350"
          className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-2 md:gap-0">
          <input
            type="text"
            placeholder="ابحث عن الكتب التي تريدها"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-[52px] px-6 text-right outline-none text-gray-400 font-expo bg-white 
                 rounded-md md:rounded-l-none md:rounded-r-md border border-gray-200 shadow-sm"
          />
          <button
            className="w-full md:w-auto bg-[#007bff] hover:bg-blue-600 text-white h-[52px] px-10 
                       flex items-center justify-center gap-2 transition-colors font-expo 
                       rounded-md md:rounded-r-none md:rounded-l-md shadow-md shrink-0 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <span className="text-base font-bold">بحث</span>
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-20 text-gray-500">جاري تحميل الكتب...</p>
      ) : books.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">
          لا توجد كتب متاحة
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {books.map((book: any) => (
              <BookCard key={book.book_id} book={book} variant="detailed" />
            ))}
          </div>
          {!loading && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => {
                if (page >= 1 && page <= totalPages) {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            />
          )}
        </>
      )}
    </div>
  );
}
