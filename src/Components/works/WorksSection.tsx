import React, { useState } from 'react';
import { WorkCategory } from '../../Types/works';
import { worksData } from '../../data/worksData';
import TabButton from '../Common/TabButton';
import LoadMoreButton from '../Common/LoadMoreButton';
import ArticleCard from './ArticleCard';
import quoteIcon from '../../assets/historyAssets/quote.svg';

const WorksSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<WorkCategory>('articles');

  const filteredData = worksData.filter(item => item.category === activeTab);

  const tabs: { id: WorkCategory; label: string }[] = [
    { id: 'articles', label: 'المقالات' },
    { id: 'podcasts', label: 'البودكاست' },
    { id: 'books', label: 'الكتب' }
  ];

  return (
    <section className="py-16 bg-[#F5F5F5] font-expo">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="flex justify-center items-center mb-10">
          <div className="flex items-center gap-3 md:gap-5 relative">
            <img 
              src={quoteIcon} 
              alt="quote" 
              className="w-6 md:w-8 h-auto object-contain -translate-y-3" 
            />
            <h2 className="text-2xl md:text-3xl font-bold text-[#3A5F7D] font-expo">الأعمال</h2>
            <img 
              src={quoteIcon} 
              alt="quote" 
              className="w-6 md:w-8 h-auto object-contain translate-y-3 transform scale-[-1]" 
            />
          </div>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-sm gap-2">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                label={tab.label}
                isActive={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredData.map((item) => (
            <ArticleCard key={item.id} item={item} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <LoadMoreButton label="قراءة المزيد" />
        </div>
      </div>
    </section>
  );
};

export default WorksSection;