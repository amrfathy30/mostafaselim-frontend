import { useState } from 'react';
import BookCard from "./book-card";
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/image2.png";
import image3 from "../assets/images/image3.png";
import TabsSection from './tabs-section';
import LoadMore from './load-more-button';


export default function BooksSection(){
    const books =[
        {
            id: 1,
            title: "في نظرية الادب عند العرب",
            type:"الطباعه الثانيه",
            year: "2024",
            publisher: "دار الشرق",
            image: image1,
        },
        {
            id: 2,
            title: "وجهة الغرب",
            type:"الطباعه الثانيه",
            year: "2024",
            publisher: "دار الشرق",
            image: image2,
        },
        {
            id: 3,
            title: "السيرة النبوية للأطفال",
            type:"الطباعه الثانيه",
            year: "2024",
            publisher: "دار الشرق",
            image: image3,
        },
    ]
    const [activeTab, setActiveTab] = useState('الكتب');
    const tabs = ['المقالات', 'المسموعات', 'الكتب'];
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
            <BookCard key={book.id} book={book} />
          ))}
        </div>

      </div>

      <div className="flex justify-center mt-12 pb-10">

        <LoadMore 
  text="قراءة المزيد" 
  onClick={() => console.log("تحميل المزيد من الكتب...")}

/>
      </div>

        </section>
    )
}