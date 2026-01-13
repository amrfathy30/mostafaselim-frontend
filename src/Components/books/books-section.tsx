import { useState, useEffect } from 'react';
import BookCard from "./book-card";
import TabsSection from '../tabs-section';
import { useNavigate } from 'react-router-dom';
import { getBooks } from '../../services/bookService';
import { Link } from "react-router-dom";
import React from 'react';

export default function BooksSection() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(2);
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
  return (
    <>
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="bg-[#43617E] text-white px-13 py-2 rounded-sm font-expo "
        >
          قراءة المزيد
        </Link>
      </div>

    </>
  );
}