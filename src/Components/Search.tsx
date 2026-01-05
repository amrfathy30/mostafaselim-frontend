import React from 'react';
import searchIcon from '../assets/search-icon.svg';

interface SearchProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: (e: React.FormEvent) => void;
}

const Search: React.FC<SearchProps> = ({ placeholder, value, onChange, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="w-full max-w-[775px] flex flex-col md:flex-row gap-3 md:gap-[22px] px-4 md:px-0">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full md:w-[567px] h-[50px] md:h-[56px] bg-white rounded-[5px] px-4 md:px-[16px] py-2 md:py-[10px] outline-none text-right text-[16px] md:text-[20px] leading-[40px] md:leading-[46px] placeholder-[#B8B2B2] border border-gray-200 md:border-0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      <button
        type="submit"
        className="w-full md:w-[186px] h-[50px] md:h-[56px] bg-[#007FFF] text-white rounded-[5px] font-bold text-[18px] md:text-[20px] flex items-center justify-center gap-2 hover:bg-blue-600 active:bg-blue-700 transition-all"
      >
        <img src={searchIcon} alt="search" className="w-5 h-5 object-contain" />
        <span>بحث</span>
      </button>
    </form>
  );
};

export default Search;