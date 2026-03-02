import { AuthorData } from "../../types/home";

const AboutCard = ({
  data,
  personal,
}: {
  data: AuthorData | undefined;
  personal: boolean;
}) => {

  return (
    <div
      data-aos={personal ? "fade-right" : "fade-left"}
      data-aos-duration="900"
      data-aos-easing="ease-out-cubic"
      className={`relative flex flex-col lg:flex-row w-full h-auto rounded-[20px] shadow-[0px_1px_7px_0px_rgba(0,0,0,0.15)] p-4 md:p-8 gap-4 md:gap-6 ${personal ? "" : "lg:flex-row-reverse"
        }`}
    >
      <div
        data-aos="zoom-in"
        data-aos-delay="200"
        className="hidden lg:block h-[405px] w-[392px] min-w-[300px] xl:min-w-[392px] flex-shrink-0"
      >
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data?.user_images?.[0] || "/images/author-about.png"}
          alt="author-about-img"
        />
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="350"
        className="relative bg-white w-full h-full min-h-[200px] md:min-h-[250px] lg:min-h-fit p-4 md:p-6 my-auto rounded-[11px] pt-12 lg:pt-6"
      >
        <div
          data-aos="zoom-in"
          data-aos-delay="500"
          className="absolute flex items-center justify-center top-[-20px] right-4 md:right-6 h-[40px] md:h-[50px] lg:h-[60px] w-[180px] sm:w-[200px] md:w-[220px] lg:w-[251px] text-[16px] sm:text-[16px] lg:text-[20px] font-bold text-white rounded-[5px] bg-primary mb-3"
        >
          {personal ? <span>الناحية الشخصية</span> : <span>الناحية التعليمية</span>}
        </div>

        <p
          data-aos="fade-up"
          data-aos-delay="650"
          className="text-base text-[#153957] font-normal leading-[1.8] md:leading-loose lg:leading-[35px] text-right mt-8"
        >
          {personal ? data?.user_personal : data?.user_educational}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;