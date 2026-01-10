import React from 'react';
import {Button} from '../Components/Common/button'
interface TabsProps {
    items: string[];
    activeItem: number;
    articlesRef:any,
    booksRef:any,
    podcastsRef:any,
}
export default function TabsSection({ items, activeItem,articlesRef,booksRef,podcastsRef }: TabsProps) {

  const scrollToSection=(index)=>{
  const targetRef= index ==0 ?articlesRef :index==1?podcastsRef:booksRef

  if (targetRef && targetRef.current) {
    // 1. Get the distance of the element from the top of the document
    const elementPosition = targetRef.current.getBoundingClientRect().top + window.pageYOffset;
    
    // 2. Define an offset (e.g., 100px) so the content isn't touching the very top
    // This is especially important if you have a sticky header.
    const offset = 150; 

    window.scrollTo({
      top: elementPosition - offset,
      behavior: 'smooth'
    });
  }
  }
  return (
    <div className="flex justify-center items-center gap-4 mb-10">
      {items.map((item,index) => (
        <Button
          key={item}
          onClick={() => scrollToSection(index)}
          type={activeItem === index ? 'primary' : 'secondary'}
          className={`cursor-pointer px-8 !h-[45px] !text-[18px] !rounded-md transition-all ${
            activeItem !== index 
              ? "!bg-white !text-[#43617E] border-none shadow-sm" 
              : "!bg-[#43617E] text-white"
          }`}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}