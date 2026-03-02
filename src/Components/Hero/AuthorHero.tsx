import { AuthorImage } from "./AuthorImage";
import { AuthorContent } from "./AuthorContent";
import { AuthorData } from "../../types/home";

export default function AuthorHero({ data }: { data: AuthorData | undefined }) {
  return (
    <section
      className="flex overflow-hidden relative flex-col items-center w-full min-h-[450px] md:min-h-[480px] lg:h-[calc(100vh-120px)] xxl:h-[calc(100vh-160px)] pt-8 md:pt-[40px] lg:pt-[30px] pb-0 bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url(/images/hero-bg.png)",
      }}
    >
      <div className="w-full h-full">
        <div className="relative w-full h-full px-4 sm:px-6 md:px-12 lg:px-[100px] xxl:px-[154px]">
          <div className="flex flex-col lg:flex-row gap-5 w-full h-full justify-center items-center">
            <AuthorContent data={data} />
            <AuthorImage data={data} />
          </div>
        </div>
      </div>
    </section>
  );
}
