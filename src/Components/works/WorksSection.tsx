import React, { useRef, useState } from 'react';
import LoadMoreButton from '../Common/LoadMoreButton';
import ArticleCard from './ArticleCard';
import SectionTitle from '../Common/SectionTitle';
import TabsSection from '../tabs-section';
import PodcastSection from '../podcast-section';
import BooksSection from '../books/books-section';
import ArticlesSection from './components/articals-section';

const WorksSection =({data}) => {
  const tabs = ['المقالات', 'المسموعات', 'الكتب'];
  const articlesRef = useRef(null);
  const booksRef = useRef(null);
  const podcastsRef = useRef(null);

  return (
    <section className="py-16 bg-[#F5F5F5] font-expo">
      <div className="container mx-auto px-4 max-w-6xl">
        <SectionTitle title={'الأعمال'}/>
        {/* Articles Section */}
        <div ref={articlesRef}>
        <TabsSection items={tabs} activeItem={0}  articlesRef={articlesRef} booksRef={booksRef} podcastsRef={podcastsRef}/>
        <ArticlesSection data={data}/>
        </div>
        {/* Podcast Section */}
        <div ref={podcastsRef}>
       <TabsSection items={tabs} activeItem={1}  articlesRef={articlesRef} booksRef={booksRef} podcastsRef={podcastsRef}/>
        <PodcastSection />
        </div>
        {/* Books Section */}
        <div ref={booksRef}>
        <TabsSection items={tabs} activeItem={2}  articlesRef={articlesRef} booksRef={booksRef} podcastsRef={podcastsRef}/>
        <BooksSection />
        </div>
      </div>
    </section>
  );
};

export default WorksSection;