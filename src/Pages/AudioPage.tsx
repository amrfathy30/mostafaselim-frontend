import { useEffect, useState } from "react";
import { getProjectAudio, getProjects } from "../services/audioService";
import quoteIcon from "../assets/historyAssets/quote.svg";
import "react-h5-audio-player/lib/styles.css";
import { useNavigate } from "react-router-dom";
import { CalenderIcon, InfoIcon, MiceIcon } from "../icons/work-icons";
import Pagination from "../Components/Pagination";
import toast from "react-hot-toast";

const AudioPage: React.FC = () => {

  const [podcasts, setPodcasts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPodcasts = async (page: number, search: string) => {
    try {
      setLoading(true);
      const res = await getProjects(page, 6, search);
      const formatted = (res?.data || []).map((item: any) => ({
        id: item.id,
        projectTitle: item.title,
        projectClassification: item.category_name,
        date: item.created_at,
        audiosCount: item.audios_count,
        projectImage: item.image_cover,
        speaker: item.speaker,
      }));

      setPodcasts(formatted);
      setTotalPages(res?.data?.meta?.last_page || 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("API Error:", error);
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

  return (
    <main
      className="min-h-screen bg-[#F5F5F5] py-8 xl:py-16 font-expo overflow-hidden"
      dir="rtl"
    >
      <div className="container mx-auto px-4 md:px-8 xxl:max-w-[1423px]">

        <div
          data-aos="fade-up"
          data-aos-duration="800"
          className="flex flex-col items-center mb-8 md:mb-12 xxl:mb-16">
          <div className="flex justify-center items-center mb-8 xxl:mb-[50px]">
            <div className="flex items-center gap-2 relative">
              <img
                data-aos="fade-right"
                src={quoteIcon}
                alt="quote"
                className="w-5 xl:w-8 xxl:w-[35px] h-auto -translate-y-2"
              />
              <h1
                data-aos="zoom-in"
                data-aos-delay="150"
                className="text-xl md:text-2xl xl:text-3xl xxl:text-[40px] font-bold text-[#3A5F7D]">
                البودكاست
              </h1>
              <img
                data-aos="fade-left"
                data-aos-delay="300"
                src={quoteIcon}
                alt="quote"
                className="w-5 xl:w-8 xxl:w-[35px] h-auto translate-y-2 transform scale-[-1]"
              />
            </div>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="350"
            className="w-full max-w-2xl flex flex-col md:flex-row items-center gap-2 md:gap-0">
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
                       rounded-md md:rounded-r-none md:rounded-l-md shadow-md shrink-0 cursor-pointer"
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

        {loading ? (
          <div
            data-aos="fade-up"
            className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">
            جاري تحميل البودكاست...
          </div>
        ) : podcasts.length === 0 ? (
          <div
            data-aos="fade-up"
            className="text-center py-20 bg-white rounded-[10px] text-[#3A5F7D] font-bold text-xl shadow-sm">
            لا يوجد بودكاست متاح
          </div>
        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {podcasts.map((item, index) => (
              <div
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 120}
                data-aos-duration="800"
                onClick={() => navigate(`/audio/${item.id}`)}
                className="bg-[#F3F4F6] rounded-2xl cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-5 grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-4">
                  <div
                    data-aos="zoom-in"
                    data-aos-delay={index * 120 + 150}
                    className="w-full md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={item.image_cover || "/images/podcast-image.png"}
                      alt={item.projectTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 120 + 300}
                    className="text-right">

                    <div className="flex justify-between flex-col md:flex-row gap-3 mb-3">
                      <div>
                        <h3 className="text-lg font-medium text-[#3A5F7D]">
                          {item.projectTitle}
                        </h3>
                      </div>
                      <div className="bg-[#3A5F7D] text-white w-fit h-fit px-3 py-2 rounded-lg text-sm font-semibold whitespace-nowrap">
                        {item.audiosCount || 0} مقطع
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-4">
                      <div className="flex flex-row-reverse items-center gap-[6px]">
                        <MiceIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
                        <span className="text-[#4D4D4D] text-[12px] leading-none">
                          د/  مصطفي سليم
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <InfoIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
                        <span className="text-[12px]">{item.projectClassification}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalenderIcon className="w-[18px] h-[18px] text-[#4D4D4D]" />
                        <span className="text-[12px]">{item.date}</span>
                      </div>
                    </div>

                    <button
                      // onClick={(e) => {
                      //   e.stopPropagation();
                      //   navigate(`/audio/${item.id}`);
                      // }}
                      onClick={(e) => {
                        if (item.audiosCount && item.audiosCount > 0) {
                          navigate(`/audio/${item.id}`);
                        } else {
                          e.stopPropagation();
                          toast.error("لا يوجد مقاطع لهذا المشروع");
                        }
                      }}
                      className="bg-[#007FFF] cursor-pointer hover:bg-[#3A5F7D] text-white px-4 py-1.5 rounded-md text-sm transition"
                    >
                      مقاطع المشروع
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && podcasts.length > 0 && (
          <div
            className="mt-10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </div>
        )}

      </div>
    </main >
  )
}

export default AudioPage;
