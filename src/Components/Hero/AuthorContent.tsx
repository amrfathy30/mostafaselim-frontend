import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../Common/button";



export function AuthorContent() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center w-full lg:w-[62%]">
      <div className="flex relative flex-col self-stretch my-auto w-full font-bold space-y-6 md:space-y-10 lg:space-y-[70px]">
        <div className="w-full text-center lg:text-right text-white">
          <h1 className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] xxl:text-[58px] leading-[1.3] lg:leading-[61px] font-bold">
          دكتور مصطفي سليم
          </h1>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[24px] xxl:text-[28px] leading-[1.6] md:leading-[1.8] lg:leading-[43px] xxl:leading-[61px] mt-2 px-2 lg:px-0">
          صحفي وروائي وباحث في الأدب العربي، أكثر من عشر سنوات
          <br className="hidden sm:block"/>
           من الإنتاج الأدبي والصحفي
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-3.5 items-center justify-center lg:justify-end text-base sm:text-lg lg:text-xl text-center w-full px-4 sm:px-0">
        
          <Button 
            type="primary" 
            onClick={() => navigate('/about')} 
            className="w-full sm:w-[180px] md:w-[200px] lg:w-[232px] font-expo"
          >
            السيرة الذاتية
          </Button>
          <Button type="secondary"  onClick={undefined} className="w-full sm:w-[180px] md:w-[200px] lg:w-[232px]">
            الأعمال السابقة
          </Button>
        </div>
      </div>
    </div>
  );
}
