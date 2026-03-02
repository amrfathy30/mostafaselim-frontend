import { Button } from "../Components/Common/button";

interface TabsProps {
  items: string[];
  activeItem: number;
  setActiveItem: (index: number) => void;
}

export default function TabsSection({
  items,
  activeItem,
  setActiveItem,
}: TabsProps) {
  return (
    <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
      {items.map((item, index) => (
        <Button
          key={item}
          onClick={() => setActiveItem(index)}
          type={activeItem === index ? "primary" : "secondary"}
          className={`cursor-pointer px-4 md:px-8 h-[45px]! text-[16px]! rounded-sm! transition-all ${
            activeItem !== index
              ? "bg-white! text-primary! hover:bg-primary! hover:text-white! border-none font-normal"
              : "bg-primary! text-white"
          }`}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
