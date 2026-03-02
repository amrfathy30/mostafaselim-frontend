import { Button } from "../Common/button";
import { handleNavigateToSection, openExternalLink } from "../../helper";
import { AuthorData } from "../../types/home";

export function AuthorContent({ data }: { data: AuthorData | undefined }) {
  return (
    <div
      className="flex items-center w-full lg:w-[62%]"
      data-aos="fade-up"
    >
      <div className="flex relative flex-col self-stretch my-auto w-full space-y-6 md:space-y-10 lg:space-y-[40px]">

        <div
          className="w-full text-center lg:text-right text-white"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h1 className="text-[16px] sm:text-[20px] md:text-[25px] lg:text-[30px] xxl:text-[40px] leading-[1.3] lg:leading-[61px] font-bold">
            {data?.user_full_name}
          </h1>
          <p className="text-base lg:text-[18px] xxl:text-[20px] leading-[1.6] md:leading-[1.8] lg:leading-[43px] xxl:leading-[61px] mt-2 px-2 lg:px-0">
            {data?.bio}
          </p>
        </div>

        <div
          className="flex sm:flex-row gap-3 sm:gap-3.5 items-center justify-center lg:justify-start text-base sm:text-lg lg:text-xl text-center w-full px-4 sm:px-0"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Button
            type="primary"
            onClick={() => openExternalLink(data?.user_cv)}
            className="w-full sm:w-[180px] md:w-[200px] lg:w-[232px] hover:bg-primary font-expo py-[13px] cursor-pointer border border-[#007FFF]"
          >
            السيرة الذاتية
          </Button>

          <Button
            type="secondary"
            onClick={() => handleNavigateToSection("work_history")}
            className="w-full hover:bg-primary sm:w-[180px] md:w-[200px] lg:w-[232px] cursor-pointer py-3"
          >
            الأعمال السابقة
          </Button>
        </div>

      </div>
    </div>
  );
}