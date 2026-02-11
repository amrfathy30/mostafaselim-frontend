import React from "react";
import SectionTitle from "../Common/SectionTitle";
import NumbersCard from "./NumbersCard";
import { ArticleIcon, AwardIcon, BooksIcon } from "../../icons/numbers-icons";
import AboutCard from "./AboutCardPersonal";
import { HomeData } from "../../types/home";
interface SectionProps {
  data: HomeData | null;
}
const AboutSection: React.FC<SectionProps> = ({ data }) => {
  const numbersData = [
    {
      title: "المقالات المنشورة",
      number: `${data?.articals_count} مقالة`,
      icon: <ArticleIcon />,
    },
    {
      title: `الكتب المطبوعة`,
      number: `${data?.books_count} كتاب`,
      icon: <BooksIcon />,
    },
    {
      title: "عدد الجوائز",
      number: `${data?.awords_count} جائزه`,
      icon: <AwardIcon />,
    },
    {
      title: "المسموعات",
      number: `${data?.audios_count} ملف صوتي`,
      icon: <ArticleIcon />,
    },
  ];
  return (
    <section className="relative py-8 md:py-12 lg:py-16 overflow-hidden w-full px-4 sm:px-6 md:px-12 lg:px-[100px] xxl:px-[154px]">
      <div className="relative z-10">
        <SectionTitle title="عن الدكتور" />
        <div className="mx-auto container space-y-10">
          <AboutCard data={data?.user_info} personal={true} />
          <AboutCard data={data?.user_info} personal={false} />
        </div>
        <div className="flex justify-center items-center my-10 px-4">
          <SectionTitle title="الأرقام تتحدث" />
        </div>
        <div className="mx-auto container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {numbersData.map((item, index) => {
            return <NumbersCard key={index} item={item} />;
          })}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 w-full h-[300px] md:h-[400px] opacity-50 pointer-events-none z-0"
        style={{
          backgroundImage: `url(/images/arabic-pattern-faded.svg)`,
          backgroundSize: "cover",
          backgroundPosition: "bottom center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </section>
  );
};

export default AboutSection;
