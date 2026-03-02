
const NumbersCard = ({ item, index = 0 }: { item: any, index: number }) => {
  const { icon, title, number } = item;

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 120}
      data-aos-duration="700"
      data-aos-easing="ease-out-cubic"
      className="relative flex w-full h-[100px] sm:h-[115px] md:h-[132px] rounded-[17px] bg-white px-3 md:px-4 shadow-[0px_1px_7px_0px_rgba(0,0,0,0.12)]"
    >
      <div className="w-[60px] sm:w-[75px] md:w-[92px] h-full flex items-center justify-center">
        {icon}
      </div>

      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-primary text-[16px] font-bold">{title}</p>
        <p className="text-primary text-[16px] font-normal">{number}</p>
      </div>
    </div>
  );
};

export default NumbersCard;