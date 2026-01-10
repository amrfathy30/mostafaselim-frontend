import React, { useRef, useState } from 'react';
import ArticleCard from '../ArticleCard';
import LoadMoreButton from '../../load-more-button';

const ArticlesSection =({data}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
        {isLoading ? (
          <div className="py-20 text-center text-primary font-bold">جاري تحميل البيانات...</div>
        ) : (
          <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data?.articles?.length > 0 ? (
              data?.articles?.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-gray-400">لا توجد بيانات متاحة حالياً</div>
            )}
          </div>
        )}
          <div className="flex justify-center mt-12">
          {/* <LoadMoreButton label="قراءة المزيد" /> */}
        </div>
      </>
  );
};

export default ArticlesSection;