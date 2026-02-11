import { HomeData } from "../types/home";
import PodcastCard from "./podcast-card";
import { Link } from "react-router-dom";

interface PodcastSectionProps {
  data: HomeData | null;
}

export default function PodcastSection({ data }: PodcastSectionProps) {
  const allAudios =
    data?.audios?.flatMap((project) =>
      project.project_audio.map((audio) => ({
        ...audio,
        project_title: project.project_title,
        project_image_cover: project.project_image_cover,
      })),
    ) || [];
  return (
    <section dir="rtl" className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto px-4 mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {allAudios.length > 0 ? (
            allAudios.map((podcast) => (
              <PodcastCard
                key={podcast.audio_id}
                title={podcast.audio_title}
                description={podcast.audio_details}
                date={podcast.audio_date}
                duration={podcast.duration}
                image={podcast.project_image_cover}
                audioUrl={podcast.audio_content}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-400">
              لا توجد صوتيات متاحة حالياً
            </div>
          )}
        </div>
        <div className="flex justify-center mt-12 pb-10">
          <Link
            to="/podcasts"
            className="flex justify-center items-center rounded text-white bg-[#43617E]! hover:bg-[#344d63]! px-12 h-10! text-[18px]! shadow-md transition-all"
          >
            سماع المزيد
          </Link>
        </div>
      </div>
    </section>
  );
}
