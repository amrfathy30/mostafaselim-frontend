import React from 'react';

interface Props {
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<Props> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full md:w-auto px-10 py-2 bg-[#007BFF] text-white rounded-lg text-sm font-bold font-expo hover:bg-blue-600 transition-colors shadow-sm"
    >
      {label}
    </button>
  );
};

export default ActionButton;