import React, { useEffect, useState, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { getAudios } from "../services/audioService";
import PodcastSidebar from "../Components/PodcastSidebar";
import PodcastCard from "../Components/podcast-card";
import Pagination from "../Components/Pagination";
import quoteIcon from "../assets/historyAssets/quote.svg";

const PodcastsPage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [activePodcast, setActivePodcast] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const playerRef = useRef<any>(null);

  const fetchPodcasts = async (page: number, search: string) => {
    try {
      setLoading(true);
      const { data } = await getAudios(page, 6, search);
      const formatted = (data?.audios || []).map((item: any) => ({
        id: item.audio_id,
        title: item.audio_title,
        description: item.audio_details,
        date: item.audio_date,
        duration: item.duration,
        image: item.audio_project,
        audioUrl: item.audio_content,
      }));
      setPodcasts(formatted);
      if (formatted.length && !activePodcast) setActivePodcast(formatted[0]);
      setTotalPages(data?.pagination?.last_page || 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPodcasts(currentPage, keyword);
  }, [currentPage]);

  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      fetchPodcasts(1, keyword);
    }, 500);

    return () => clearTimeout(delay);
  }, [keyword]);

  const togglePlay = (item: any) => {
    if (activePodcast?.id === item.id) {
      const audio = playerRef.current?.audio.current;
      if (isPlaying) {
        audio?.pause();
      } else {
        audio?.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(item);
      setIsPlaying(true);
    }
  };

  return (
    <main
      className="min-h-screen bg-[#F5F5F5] py-8 xl:py-16 font-expo"
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-8 xxl:max-w-[1423px]">
        <div className="hidden">
          <AudioPlayer
            key={activePodcast?.id}
            ref={playerRef}
            src={activePodcast?.audioUrl}
            autoPlay={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />
        </div>

        <div className="flex flex-col items-center mb-8 md:mb-12 xxl:mb-16">
          <div className="flex justify-center items-center mb-8 xxl:mb-[50px]">
            <div className="flex items-center gap-2 relative">
              <img
                src={quoteIcon}
                alt="quote"
                className="w-5 xl:w-8 xxl:w-[35px] h-auto -translate-y-2"
              />
              <h1 className="text-xl md:text-2xl xl:text-3xl xxl:text-[40px] font-bold text-[#3A5F7D]">
                البودكاست
              </h1>
              <img
                src={quoteIcon}
                alt="quote"
                className="w-5 xl:w-8 xxl:w-[35px] h-auto translate-y-2 transform scale-[-1]"
              />
            </div>
          </div>

          <div className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-2 md:gap-0">
            <input
              type="text"
              placeholder="ابحث عن البودكاست التي تريدها"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full h-[52px] px-6 text-right outline-none text-gray-600 font-expo bg-white 
  rounded-md md:rounded-l-none md:rounded-r-md border border-gray-200 shadow-sm"
            />
            <button
              className="w-full md:w-auto bg-[#007bff] hover:bg-blue-600 text-white h-[52px] px-10 
                       flex items-center justify-center gap-2 transition-colors font-expo 
                       rounded-md md:rounded-r-none md:rounded-l-md shadow-md shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
              <span className="text-base font-bold">بحث</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 xxl:gap-[31px] items-start justify-center">
          <div className="w-full lg:flex-1 xl:max-w-[800px] order-2 lg:order-1">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">
                جاري تحميل البودكاست...
              </div>
            ) : podcasts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">
                لا يوجد بودكاست متاح
              </div>
            ) : (
              <div className="flex flex-col gap-0 overflow-hidden rounded-[10px] shadow-sm border border-gray-100">
                {podcasts.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <PodcastCard
                      {...item}
                      isFullPage
                      isActive={activePodcast?.id === item.id}
                      isPlaying={isPlaying}
                      isEvenRow={index % 2 !== 0}
                      onToggle={() => togglePlay(item)}
                    />
                    {activePodcast?.id === item.id && (
                      <div className="lg:hidden">
                        <PodcastSidebar podcast={activePodcast} isMobile />
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          {!loading && podcasts.length > 0 && (
            <aside className="hidden lg:block lg:w-[320px] xl:w-[350px] xxl:w-[389px] order-1 lg:order-2 shrink-0">
              <PodcastSidebar podcast={activePodcast} />
            </aside>
          )}{" "}
        </div>
        {!loading && podcasts.length > 0 && (
          <div className="mt-10 md:mt-16">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default PodcastsPage;
