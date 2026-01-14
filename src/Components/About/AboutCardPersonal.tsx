import React from 'react';

const AboutCard = ({data,personal}) => {
  return (
    <div className={`relative flex flex-col lg:flex-row w-full h-auto rounded-[20px] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.15)] p-4 md:p-6 gap-4 md:gap-6 ${personal?'':'lg:flex-row-reverse'}`}>
      <div className='hidden lg:block h-[405px] w-[392px] min-w-[300px] xl:min-w-[392px] flex-shrink-0'>
        <img className='w-full h-full object-cover rounded-lg' src='/images/author-about.png'/>
      </div>
      <div className='relative bg-white w-full h-full min-h-[200px] md:min-h-[250px] lg:min-h-[311px] p-4 md:p-6 my-auto rounded-[11px] pt-12 lg:pt-6 lg:mt-0'>
      <div className={`absolute flex items-center justify-center top-[-20px] right-4 md:right-6 h-[40px] md:h-[50px] lg:h-[60px] w-[180px] sm:w-[200px] md:w-[220px] lg:w-[251px] text-[16px] sm:text-[18px] md:text-[22px] lg:text-[27px] font-bold text-white rounded-[5px] bg-primary`}>
     {personal?
     <span>الناحية الشخصية</span>:
     <span>الناحية التعليمية</span>
    }
      </div>
        <p className='text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] text-[#153957] font-normal leading-[1.8] md:leading-[2] lg:leading-[49px] text-right'>
        {personal?data?.user_personal:data?.user_educational}
        </p>

      </div>
    
    </div>
  );
};

export default AboutCard;