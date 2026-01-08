import * as React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from '../Common/button'

export function AuthorContent() {
  const navigate = useNavigate();
  return (
    <main className="flex items-center w-3/5 max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col self-stretch my-auto w-full font-bold max-md:mt-10 max-md:max-w-full space-y-[70px]">
        <div className="w-full text-right text-white max-md:max-w-full">
          <h1 className="text-[58px] leading-[61px] font-bold max-md:max-w-full max-md:text-4xl max-sm:text-center">
            دكتور مصطفي سليم
          </h1>
          <p className="text-[28px] leading-[61px] mt-2">
          صحفي وروائي وباحث في الأدب العربي، أكثر من عشر سنوات
          <br/>
          من الإنتاج الأدبي والصحفي
          </p>
        </div>

        <div className="flex gap-3.5 items-center self-end  text-xl text-center w-full">
        
          <Button 
            type="primary" 
            onClick={() => navigate('/about')} 
            className="w-[232px] font-expo"
          >
            السيرة الذاتية
          </Button>
          <Button type="secondary"  onClick={undefined} className="w-[232px]">
            الأعمال السابقة
          </Button>
        </div>
      </div>
    </main>
  );
}
