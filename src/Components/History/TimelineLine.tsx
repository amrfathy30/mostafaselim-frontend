import React from 'react';

interface Props {
  isEven: boolean;
  isFirst: boolean;
}

const TimelineLine: React.FC<Props> = ({ isEven, isFirst }) => {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[500px] h-full pointer-events-none hidden md:block">
      <svg 
        className="w-full h-full" 
        viewBox="0 0 500 100" 
        preserveAspectRatio="none"
      >
        <path 
          d={isEven 
  ? "M 250 0 C 100 0, 100 100, 250 100 C 400 100, 400 200, 250 200"
  : "M 250 0 C 400 0, 400 100, 250 100 C 100 100, 100 200, 250 200"
}

          stroke="#3A5F7D" 
          strokeWidth="5" 
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default TimelineLine;