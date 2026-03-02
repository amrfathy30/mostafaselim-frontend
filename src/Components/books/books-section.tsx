import { HomeData } from "../../types/home";
import BookCard from "./book-card";
import { Link } from "react-router-dom";

interface BooksSectionProps {
  data: HomeData | null;
}

export default function BooksSection({ data }: BooksSectionProps) {

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.books?.map((book, index) => (
            <BookCard key={book.book_id} book={book} variant="simple" index={index} />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12 pb-10">
        <Link
          to="/books"
          className="flex justify-center items-center rounded text-white bg-[#43617E]! hover:bg-[#344d63]! px-12 h-10! text-[18px]! shadow-md transition-all"
        >
          قراءة المزيد
        </Link>
      </div>
    </>
  );
}
