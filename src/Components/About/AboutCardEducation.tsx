import React from 'react';
const AboutCardEducation: React.FC = ({}) => {
  return (
    <div className="relative flex w-full h-auto rounded-[20px] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.15)] p-6 space-x-6">

      <div className=' relative bg-white w-fit h-fit p-6 my-auto rounded-[11px]'>
      <div className={`absolute flex items-center justify-center top-[-45px] right-6 h-[60px] w-[251px] text-[27px] font-bold text-white rounded-[5px] bg-primary`}>
      <span>الناحية التعليمية</span>
      </div>
        <p className='text-[24px] text-[#153957] font-normal leading-[49px] '>
        فقد نال الدكتور مصطفى سليم الماجستير في الأدب العربي القديم من كلية
     
        <br/>
        دار العلوم عام 2011، ثم الدكتوراه في النقد الأدبي الحديث من كلية الآداب 
        <br/>
        بجامعة عين شمس عام 2018 بتقدير امتياز مع مرتبة الشرف الأولى، تحت 
        <br/>
        إشراف الدكتور صلاح فضل. تجمع مسيرته بين الدقة البحثية والحس الإبداعي، 
        <br/>
        مؤسسًا مشروعه النقدي حول العلاقة بين الحرية والسلطة والإنسان.
        </p>

      </div>
      <div className='h-[405px] w-[392px]'>
        <img className='w-full h-full' src='/images/author-about.png'/>
      </div>
    
    </div>
  );
};

export default AboutCardEducation;