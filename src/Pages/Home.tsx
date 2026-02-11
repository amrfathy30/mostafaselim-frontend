import { useEffect, useState } from "react";
import AuthorHero from "../Components/Hero/AuthorHero";
import AboutSection from "../Components/About/AboutSection";
import HistorySection from "../Components/History/HistorySection";
import WorksSection from "../Components/works/WorksSection";
import { getHomeData } from "../services/homeService";
import { HomeData } from "../types/home";

export default function Home() {
  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true);
        const response = await getHomeData();
        const _homeData = response.data || [];
        setHomeData(_homeData);
        window.scrollTo({ top: 0, behavior: "smooth" });
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
      <AuthorHero data={homeData?.user_info} />
      <AboutSection data={homeData} />
      <HistorySection data={homeData} />
      <WorksSection data={homeData} />
    </>
  );
}
