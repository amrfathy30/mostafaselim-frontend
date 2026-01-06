import React from 'react';
import {Button} from '../Components/Common/button'
interface TabsProps {
    items: string[];
    activeItem: string;
    onSelect: (item: string) => void;
}
export default function TabsSection({ items, activeItem, onSelect }: TabsProps) {
  return (
    <div className="flex justify-center items-center gap-4 mb-10">
      {items.map((item) => (
        <Button
          key={item}
          onClick={() => onSelect(item)}
          type={activeItem === item ? 'primary' : 'secondary'}
          className={`px-8 !h-[45px] !text-[18px] !rounded-md transition-all ${
            activeItem !== item 
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