import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import TabsSection from "../tabs-section";
import PodcastSection from "../podcast-section";
import BooksSection from "../books/books-section";
import ArticlesSection from "./components/articals-section";
import { HomeData } from "../../types/home";

interface WorksSectionProps {
  data: HomeData | null;
}

const WorksSection: React.FC<WorksSectionProps> = ({ data }) => {
  const tabs = ["المقالات", "المسموعات", "الكتب"];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 bg-[#F5F5F5] font-expo">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitle title={"الأعمال"} />

        <TabsSection
          items={tabs}
          activeItem={activeTab}
          setActiveItem={setActiveTab}
        />

        <div className="mt-8">
          {activeTab === 0 && <ArticlesSection data={data} />}
          {activeTab === 1 && <PodcastSection data={data} />}
          {activeTab === 2 && <BooksSection data={data} />}
        </div>
      </div>
    </section>
  );
};

export default WorksSection;
