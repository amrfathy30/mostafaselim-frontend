import * as React from "react";
import { AuthorImage } from "./AuthorImage";
import { AuthorContent } from "./AuthorContent";

export default function AuthorHero() {
  return (
    <section className="flex overflow-hidden relative flex-col items-center w-full h-[calc(100vh-138px)] max-md:px-5 max-md:max-w-full pt-[60px] bg-cover bg-no-repeat "
    style={{
      backgroundImage:'url(/images/hero-bg.png)'
    }}>
      <div className="container h-full">
      <div className="relative w-full h-full">
        <div className="flex gap-5 max-md:flex-col h-full">
          <AuthorContent />
          <AuthorImage />
        </div>
      </div>
      </div>

    </section>
  );
}
