import React from 'react';
const AboutCardEducation= ({data}) => {
  return (
    <div className="relative flex w-full h-auto rounded-[20px] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.15)] p-6 space-x-6">

      <div className=' relative bg-white w-fit h-fit p-6 my-auto rounded-[11px]'>
      <div className={`absolute flex items-center justify-center top-[-45px] right-6 h-[60px] w-[251px] text-[27px] font-bold text-white rounded-[5px] bg-primary`}>
      <span>الناحية التعليمية</span>
      </div>
        <p className='text-[24px] text-[#153957] font-normal leading-[49px] '>
        {data?.user_educational}
        </p>

      </div>
      <div className='h-[405px] w-[392px]'>
        <img className='w-full h-full' src='/images/author-about.png'/>
      </div>
    
    </div>
  );
};

export default AboutCardEducation;