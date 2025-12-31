import * as React from "react";
import { AuthorImage } from "./AuthorImage";
import { AuthorContent } from "./AuthorContent";

export default function AuthorHero() {
  return (
    <section className="flex overflow-hidden relative flex-col items-center px-16 pt-24 w-full min-h-[699px] max-md:px-5 max-md:max-w-full">
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/cc70da934a15355a2d5873104b2029feff2caaba?placeholderIfAbsent=true&apiKey=1656fb26d9eb401bab18b87cf6a02d25"
        alt=""
        className="object-cover absolute inset-0 size-full"
      />

      <div className="relative w-full max-w-[1421px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <AuthorImage />
          <AuthorContent />
        </div>
      </div>
    </section>
  );
}
