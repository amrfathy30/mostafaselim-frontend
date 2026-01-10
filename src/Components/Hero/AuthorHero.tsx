import * as React from "react";
import { AuthorImage } from "./AuthorImage";
import { AuthorContent } from "./AuthorContent";

export default function AuthorHero({
  data
}) {

  return (
    <section className="flex overflow-hidden relative flex-col items-center w-full h-[calc(100vh-100px)] xxl:h-[calc(100vh-138px)] max-md:px-5 max-md:max-w-full pt-[60px] bg-cover bg-no-repeat "
    style={{
      backgroundImage:'url(/images/hero-bg.png)'
    }}>
      <div className="w-full h-full">
      <div className="relative w-full h-full px-[100px] xxl:px-[154px]">
        <div className="flex gap-5 w-full h-full justify-center">
          <AuthorContent />
          <AuthorImage data={data}/>
        </div>
      </div>
      </div>

    </section>
  );
}
