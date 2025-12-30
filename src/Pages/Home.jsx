import React from 'react';
import HistorySection from '../Components/History/HistorySection';
import WorksSection from '../Components/works/WorksSection';



export default function Home() {
  return (
  <>
  <h1 className="text-2xl text-center">الصفحة الرئيسية</h1>

    <div>
      <HistorySection />
      <WorksSection />
    </div>
    </>
    );
    
}