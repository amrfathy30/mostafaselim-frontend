import React from 'react';
import AuthorHero from '../Components/Hero/AuthorHero';
import AboutSection from '../Components/About/AboutSection';
import HistorySection from '../Components/History/HistorySection';
import WorksSection from '../Components/works/WorksSection';
import BooksSection from "../Components/books/books-section";
import PodcastSection from '../Components/podcast-section';

export default function Home() {
  return (
    <>
      <AuthorHero />
      <AboutSection />
      <HistorySection />
      <WorksSection />
      <PodcastSection />
      <BooksSection />
    </>
  )

}