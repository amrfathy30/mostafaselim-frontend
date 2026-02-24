
export function AuthorImage({ data }) {
  return (
    <aside
      className="relative w-[200px] h-[280px] sm:w-[250px] sm:h-[350px] md:w-[300px] md:h-[420px] lg:w-[38%] lg:max-w-[483px] lg:h-full bg-cover bg-no-repeat rounded-t-full flex-shrink-0"
      style={{
        backgroundImage: "url(/images/author-bg.png)",
      }}
    >
      <img
        src={data?.user_image_cover || "/images/author.png"}
        alt={data?.user_full_name}
        className="w-[95%] absolute bottom-0 left-0"
      />
    </aside>
  );
}
