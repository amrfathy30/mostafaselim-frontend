import { useState, useEffect } from 'react';
import BookCard from "./book-card";
import TabsSection from '../tabs-section';
import LoadMore from '../load-more-button';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../services/bookService';
import { Link } from "react-router-dom";

export default function BooksSection(){
  const navigate = useNavigate();
    const [books, setBooks] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('الكتب');
    const tabs = ['المقالات', 'المسموعات', 'الكتب'];
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const response = await getBooks(1, 3); 
                setBooks(response.data.data); 
            } catch (error) {
                console.error("Error loading books:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);
    return(
        <section dir="rtl" className="py-10 bg-gray-50">
        
            <div className="flex justify-center rounded-lg p-1 mb-10">
                
       <TabsSection 
                items={tabs} 
                activeItem={activeTab} 
                onSelect={setActiveTab} 
            />

      </div>

            <div className="max-w-6xl mx-auto px-4">
              {loading ? (
                    <p className="text-center">جاري التحميل...</p>
                ) : (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            gap-6
          "
        >
          {books.map(book => (
            <BookCard key={book.book_id}
             book={book}
             variant="simple"
              />
          ))}
        </div>
        )}
      </div>
      <div className="flex justify-center mt-12 pb-10">

       <Link 
  to="/books" 
  className="bg-[#43617E] text-white px-8 py-2 rounded-lg font-expo"
>
  قراءة المزيد
</Link>
      </div>

        </section>
                );
}