import React from 'react';
import HistorySection from '../Components/History/HistorySection';
import WorksSection from '../Components/works/WorksSection';
import BooksSection from '../Components/books-section';
import PodcastSection from '../Components/podcast-section';

export default function Home() {
  return (
    <>
      <HistorySection />
      <WorksSection />
      <PodcastSection />
      <BooksSection />
    </>
    )
    
}