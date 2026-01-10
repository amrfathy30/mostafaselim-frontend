import React, { useEffect, useState } from 'react';
import AuthorHero from '../Components/Hero/AuthorHero';
import AboutSection from '../Components/About/AboutSection';
import HistorySection from '../Components/History/HistorySection';
import WorksSection from '../Components/works/WorksSection';
import BooksSection from "../Components/books/books-section";
import PodcastSection from '../Components/podcast-section';

import { getHomeData } from '../services/homeService';
import { HistoryItem } from '../Types/history';



export default function Home() {
  const [homeData, setHomeData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await getHomeData();
        const _homeData = response.data || [];
        setHomeData(_homeData)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);
  return (
    <>
      <AuthorHero data={homeData?.user_info}/>
      <AboutSection data={homeData}/>
      <HistorySection data={homeData?.business} />
      <WorksSection data={homeData}/>
    </>
  )

}