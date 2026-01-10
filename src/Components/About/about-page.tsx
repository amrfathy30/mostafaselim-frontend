import React from 'react';
import Sidebar from '../Sidebar';
import {PersonalInformationIcon,EducationIcon,ExperienceIcon, ArticleIcon, NumbersIcon,BooksIcon,AwardsIcon,EarSoundIcon,EventsIcon,SearchIcon,TranslateIcon,MicIcon} from '../../icons/about-icons'
import quoteIcon from "../../assets/historyAssets/quote.svg";

export default function AboutPage() {
  const sidebarData = [
    { label: 'المقالات المنشورة', subLabel: '22 مقالة', icon: <ArticleIcon /> },
    { label: 'الكتب المطبوعة', subLabel: '22 كتاب', icon: <BooksIcon /> },
    { label: 'عدد الجوائز', subLabel: '22 جائزة', icon: <AwardsIcon /> },
    { label: 'المسموعات', subLabel: '22 ملف صوتي', icon: <EarSoundIcon  /> },
    { label: 'المؤتمرات', subLabel: '22 مؤتمر صحفي', icon: <EventsIcon /> },
    { label: 'المراجعات النقدية', subLabel: '22 مراجعة', icon: <SearchIcon/> },
    { label: 'أعمال تُرجمت', subLabel: '22 عمل', icon: <TranslateIcon /> },
    { label: 'حوارات صحفية', subLabel: '22 حوار', icon: <MicIcon /> },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 font-expo" dir="rtl">
      <div className="flex justify-center items-center mb-10">
                            <div className="flex items-center gap-3 md:gap-5 relative">
                              <img 
                                src={quoteIcon} 
                                alt="quote" 
                                className="w-6 md:w-8 h-auto object-contain -translate-y-3" 
                              />
                              <h2 className="text-2xl md:text-3xl font-bold text-[#3A5F7D] font-expo">عن الدكتور</h2>
                              <img 
                                src={quoteIcon} 
                                alt="quote" 
                                className="w-6 md:w-8 h-auto object-contain translate-y-3 transform scale-[-1]" 
                              />
                            </div>
                          </div>

      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden min-h-[800px]">
        
        <div className="flex-1 p-8 md:p-12 space-y-12">
          
          <section>
            <div className="flex items-center gap-3 mb-6 border-b pb-2">
              <div className="w-[2px] h-8 bg-[#3a5f7d] opacity-60 rounded-full ml-1"></div>
              <span className="text-[#43617E] text-2xl"><PersonalInformationIcon/></span>
              <h2 className="text-2xl font-semibold text-[#43617E]">المعلومات الشخصية</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[#43617E] text-lg ">
              <p><span className="font-bold">الاسم:</span> مصطفي سليم</p>
              <p><span className="font-bold">تاريخ الميلاد:</span> 20 نوفمبر 1983</p>
              <p><span className="font-bold">الجنسية:</span> مصري</p>
              <p><span className="font-bold">المهنة:</span> صحفي، روائي، وباحث</p>
              <p className="md:col-span-2 leading-relaxed">
                <span className="font-bold">نبذة قصيرة:</span> دكتور في النقد الأدبي الحديث، جمع بين البحث الأكاديمي والكتابة الإبداعية والصحفية.
              </p>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 border-b pb-2">
              <div className="w-[2px] h-8 bg-[#3a5f7d] opacity-60 rounded-full ml-1"></div>
              <span className="text-[#43617E] text-2xl"><EducationIcon/></span>
              <h2 className="text-2xl font-semibold text-[#43617E]">التعليم</h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-[#43617E] opacity-90 text-lg">
              <li>دكتوراه في النقد الأدبي الحديث - جامعة عين شمس (2018)</li>
              <li>ماجستير في الأدب العربي القديم - كلية دار العلوم (2011)</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6 border-b pb-2">
              <div className="w-[2px] h-8 bg-[#3a5f7d] opacity-60 rounded-full ml-1"></div>
              <span className="text-[#43617E] text-2xl"><ExperienceIcon/></span>
              <h2 className="text-2xl font-semibold text-[#43617E]">الخبرة المهنية</h2>
            </div>
            <ul className="list-disc list-inside space-y-3 text-[#43617E] opacity-90 text-lg">
              <li>مسؤول تحرير في اندبندنت عربية (6 سنوات)</li>
              <li>مدير نشر في الموقع الإلكتروني لقناة الغد (3 سنوات)</li>
              <li>صحفي بجريدة الشروق المصرية (8 سنوات)</li>
            </ul>
          </section>
        </div>

        <div className="flex">
      <Sidebar title="الأرقام" titleIcon= {<NumbersIcon />} items={sidebarData} />
    </div>
      </div>
    </div>
  );
};