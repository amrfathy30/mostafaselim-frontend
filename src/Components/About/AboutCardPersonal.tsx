import React from 'react';

const AboutCardPersonal: React.FC = ({}) => {
  return (
    <div className="relative flex w-full h-auto rounded-[20px] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.15)] p-6 space-x-6">
      <div className='h-[405px] w-[392px]'>
        <img className='w-full h-full' src='/images/author-about.png'/>
      </div>
      <div className=' relative bg-white w-fit h-fit p-6 my-auto rounded-[11px]'>
      <div className={`absolute flex items-center justify-center top-[-45px] right-6 h-[60px] w-[251px] text-[27px] font-bold text-white rounded-[5px] bg-primary`}>
      <span>الناحية الشخصية</span>
      </div>
        <p className='text-[24px] text-[#153957] font-normal leading-[49px] '>
        وُلد الدكتور مصطفى سليم في
        <span className='font-bold text-[24px] mx-1'>
        20 نوفمبر 1983،
        </span>
        وهو صحفي وروائي
        <br/>
        وباحث مصري في النقد الأدبي الحديث. جمع في مسيرته بين الكتابة
        <br/>
        الإبداعية والبحث الأكاديمي، فمزج الحسّ الفني برؤية تحليلية تستكشف
        <br/>
        العلاقة بين السلطة والحرية والإنسان، متتبعًا أثرهما في الوعي والوجود
        <br/>
        من منظور نقدي ونفسي.
        </p>

      </div>
    
    </div>
  );
};

export default AboutCardPersonal;