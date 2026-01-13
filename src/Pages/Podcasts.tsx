import React, { useEffect, useState, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { getAudios } from '../services/audioService';
import PodcastSidebar from '../Components/PodcastSidebar';
import Search from '../Components/Search';
import Title from '../Components/Title';
import PodcastCard from '../Components/podcast-card';
import Pagination from '../Components/Pagination';

const PodcastsPage: React.FC = () => {
  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [activePodcast, setActivePodcast] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState('');
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
        audioUrl: item.audio_content
      }));
      setPodcasts(formatted);
      if (formatted.length && !activePodcast) setActivePodcast(formatted[0]);
      setTotalPages(data?.pagination?.last_page || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPodcasts(currentPage, keyword);
  }, [currentPage]);

  const togglePlay = (item: any) => {
    if (activePodcast?.id === item.id) {
      const audio = playerRef.current?.audio.current;
      if (isPlaying) { audio?.pause(); } else { audio?.play(); }
      setIsPlaying(!isPlaying);
    } else {
      setActivePodcast(item);
      setIsPlaying(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchPodcasts(1, keyword);
  };

  return (
    <main className="min-h-screen bg-[#F5F5F5] py-8 md:py-12 xxl:py-20 font-expo" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 xxl:max-w-[1423px]">
        <div className="hidden">
          <AudioPlayer key={activePodcast?.id} ref={playerRef} src={activePodcast?.audioUrl} autoPlay={isPlaying} 
          onPlay={() => setIsPlaying(true)} 
          onPause={() => setIsPlaying(false)} />
        </div>

        <div className="flex flex-col items-center mb-8 md:mb-12 xxl:mb-16">
          <Title text="البودكاست" />
          <Search placeholder="ابحث عن البودكاست التي تريدها" value={keyword} onChange={setKeyword} onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 xxl:gap-[31px] items-start justify-center">
          <div className="w-full lg:flex-1 xl:max-w-[800px] order-2 lg:order-1">
            {loading ? (
              <div className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">جاري تحميل البودكاست...</div>
            ) : (
              <div className="flex flex-col gap-0 overflow-hidden rounded-[10px] shadow-sm border border-gray-100">
                {podcasts.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <PodcastCard {...item} isFullPage isActive={activePodcast?.id === item.id} isPlaying={isPlaying} isEvenRow={index % 2 !== 0} onToggle={() => togglePlay(item)} />
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

          <aside className="hidden lg:block lg:w-[320px] xl:w-[350px] xxl:w-[389px] order-1 lg:order-2 shrink-0">
          <PodcastSidebar podcast={activePodcast} />
        </aside>
        </div>

        <div className="mt-10 md:mt-16">
           <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page: number) => setCurrentPage(page)} />
        </div>
      </div>
    </main>
  );
};

export default PodcastsPage;