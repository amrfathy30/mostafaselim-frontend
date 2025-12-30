import React from 'react';

interface Props {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<Props> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 font-expo whitespace-nowrap ${
        isActive 
        ? 'bg-[#3A5F7D] text-white shadow-md' 
        : 'bg-white text-gray-500 hover:text-[#3A5F7D]'
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;