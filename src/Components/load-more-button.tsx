import React from 'react';
import {Button} from '../Components/Common/button'

interface LoadMoreProps {
  onClick: () => void;
  text: string;
}

export default function LoadMore({ onClick,text}: LoadMoreProps) {
  return (
    <div className="flex justify-center mt-12 pb-10">
      <Button
        type="primary"
        className="!bg-[#43617E] hover:!bg-[#344d63] px-12 !h-[50px] !text-[18px] shadow-md transition-all"
        onClick={onClick}
      >
      {text}
      </Button>
    </div>
  );
}