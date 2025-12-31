import * as React from "react";
import { AuthorButton } from "./AuthorButton";

export function AuthorContent() {
  return (
    <main className="ml-5 w-3/5 max-md:ml-0 max-md:w-full">
      <div className="flex relative flex-col self-stretch my-auto w-full font-bold max-md:mt-10 max-md:max-w-full">
        <header className="w-full text-right text-white max-md:max-w-full">
          <h1 className="text-6xl leading-none max-md:max-w-full max-md:text-4xl max-sm:text-center">
            دكتور مصطفي سليم
          </h1>
          <p className="mt-4 text-3xl leading-[61px] max-md:max-w-full">
            صحفي وروائي وباحث في الأدب العربي، أكثر من عشر سنوات من
            الإنتاج الأدبي والصحفي
          </p>
        </header>

        <nav className="flex gap-3.5 items-center self-end mt-16 text-xl text-center max-md:mt-10 max-md:max-w-full">
          <AuthorButton variant="secondary">
            الأعمال السابقة
          </AuthorButton>
          <AuthorButton variant="primary">
            السيرة الذاتية
          </AuthorButton>
        </nav>
      </div>
    </main>
  );
}
