import { AuthorData } from "../../types/home";

export function AuthorImage({ data }: { data: AuthorData | undefined }) {
  return (
    <aside
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="1000"
      className="relative w-[200px] h-[250px] sm:w-[200px] sm:h-[250px] md:w-[250px] md:h-[320px] lg:w-[35%] lg:max-w-[400px] lg:h-[480px] xl:h-[550px] bg-cover bg-no-repeat rounded-t-full shrink-0"
      style={{
        backgroundImage: "url(/images/author-bg.png)",
      }}
    >
      <img
        src={data?.user_image_cover || "/images/author.png"}
        alt={data?.user_full_name}
        className="w-[90%] absolute bottom-0 left-0"
      />
    </aside>
  );
}