import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
}

const LoadMoreButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-12 py-2.5 bg-primary text-white rounded-lg text-sm font-bold font-expo hover:bg-[#2d4a62] transition-colors shadow-md"
    >
      {label}
    </button>
  );
};

export default LoadMoreButton;