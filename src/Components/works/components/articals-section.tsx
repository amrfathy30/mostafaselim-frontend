import { useState } from "react";
import ArticleCard from "../ArticleCard";
import { Link } from "react-router-dom";

const ArticlesSection = ({ data }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      {isLoading ? (
        <div className="py-20 text-center text-primary font-bold">
          جاري تحميل البيانات...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {data?.articles?.length > 0 ? (
            data?.articles?.map((item) => (
              <ArticleCard key={item.id} item={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              لا توجد بيانات متاحة حالياً
            </div>
          )}
        </div>
      )}
      <div className="flex justify-center mt-12">
        <Link
          to="/articles"
          className="flex justify-center items-center rounded text-white bg-[#43617E]! hover:bg-[#344d63]! px-12 h-10! text-[18px]! shadow-md transition-all"
        >
          قراءة المزيد
        </Link>
      </div>
    </>
  );
};

export default ArticlesSection;
