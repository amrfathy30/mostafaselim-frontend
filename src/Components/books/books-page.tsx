import { useEffect, useState } from 'react';
import { getBooks } from '../../services/bookService';
import BookCard from "./book-card";
import quoteIcon from "../../assets/historyAssets/quote.svg";

export default function BooksPage() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
                const res = await getBooks(currentPage, 9, search);
                setBooks(res.data.data); 
            } catch (error) {
                console.error("Error fetching books", error);
            }
            setLoading(false);
        };
        fetchBooks();
    }, [currentPage, search]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12" dir="rtl">
            <div className="flex justify-center items-center mb-10">
                      <div className="flex items-center gap-3 md:gap-5 relative">
                        <img 
                          src={quoteIcon} 
                          alt="quote" 
                          className="w-6 md:w-8 h-auto object-contain -translate-y-3" 
                        />
                        <h2 className="text-2xl md:text-3xl font-bold text-[#3A5F7D] font-expo">الكتب</h2>
                        <img 
                          src={quoteIcon} 
                          alt="quote" 
                          className="w-6 md:w-8 h-auto object-contain translate-y-3 transform scale-[-1]" 
                        />
                      </div>
                    </div>
<div className="flex justify-center mb-12 px-4" dir="rtl">
  <div className="relative w-full max-w-2xl flex items-center bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[52px]">
    <input
      type="text"
      placeholder="ابحث في الكتب التي تريدها"
      value={search}
      onChange={(e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      }}
      className="w-full h-full px-6 text-right outline-none text-gray-600 font-expo border-none"
    />
    <button className="bg-[#007bff] hover:bg-blue-600 text-white h-full px-8 flex items-center gap-2 transition-colors font-expo shrink-0">
        <span className="text-sm">بحث</span>
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
    </button>
  </div>
</div>

            {loading ? (
                <p className="text-center">جاري التحميل...</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {books.map((book: any) => (
                            <BookCard key={book.book_id} book={book} variant="detailed" />
                        ))}
                    </div>

<div className="flex justify-center items-center mt-16 gap-3" dir="ltr">
    <button 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="w-[40px] h-[40px] flex items-center justify-center bg-[#43617E] text-white rounded-lg hover:bg-opacity-90 disabled:opacity-40 transition-all shadow-sm"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    </button>
    <div className="flex items-center gap-2">
        {[1, 2, 3, 20].map((page) => (
            <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-[40px] h-[40px] flex items-center justify-center rounded-lg border text-[14px] font-bold transition-all
                    ${currentPage === page 
                        ? 'border-[#43617E] text-[#43617E] bg-white shadow-inner' 
                        : 'border-gray-100 text-gray-400 bg-white hover:border-gray-300'
                    }`}
            >
                {page}
            </button>
        ))}
    </div>
    <button 
        onClick={() => setCurrentPage(prev => prev + 1)}
        className="w-[40px] h-[40px] flex items-center justify-center bg-[#43617E] text-white rounded-lg hover:bg-opacity-90 transition-all shadow-sm"
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </button>
</div>
                </>
            )}
        </div>
    );
}