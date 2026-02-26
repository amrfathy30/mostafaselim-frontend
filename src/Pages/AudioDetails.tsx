import { useParams } from "react-router-dom";
import { getAudioDetails, getProjectAudio } from "../services/audioService";
import React, { useEffect, useState, useRef } from "react";
import PodcastCard from "../Components/podcast-card";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { DateFillIcon, DateIcon, FilterIcon, MicIcon, SpeakerIcon, TypeIcon } from "../icons/work-icons";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

const AudioDetails = () => {
    const { id } = useParams();
    const [audios, setAudios] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const playerRef = useRef<any>(null);
    const [activePodcast, setActivePodcast] = useState<any>(null);
    const [projectTitle, setProjectTitle] = useState("");

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const { data } = await getProjectAudio(id!);
                const project = data;

                if (!project.audios || project.audios.length === 0) {
                    setAudios([]);
                    return;
                }

                const formattedAudios = project.audios.map((a: any) => ({
                    id: a.audio_id,
                    title: a.audio_title,
                    views: a.audio_views,
                    description: a.audio_details,
                    date: a.audio_date,
                    duration: a.duration,
                    audioUrl: a.audio_content ?? a.audio_project?.audio_content,
                    speaker: a.speaker,
                    projectImage: project.image_cover,
                    category: project.category_name,
                }));

                setAudios(formattedAudios);
                setProjectTitle(project.title);
                if (formattedAudios.length && !activePodcast) setActivePodcast(formattedAudios[0]);
                window.scrollTo({ top: 0, behavior: "smooth" });

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    useEffect(() => {
        if (activePodcast) {
            getAudioDetails(activePodcast.id).catch(err =>
                console.error("Initial API call error:", err)
            );
        }
    }, [activePodcast]);

    const togglePlay = (item: any) => {
        const callApiOnPlay = async () => {
            try {
                await getAudioDetails(item.id);
            } catch (err) {
                console.error("API play error:", err);
            }
        };

        if (activePodcast?.id === item.id) {
            const audio = playerRef.current?.audio.current;
            if (isPlaying) {
                audio?.pause();
            } else {
                audio?.play();
                callApiOnPlay();
            }
            setIsPlaying(!isPlaying);
        } else {
            setActivePodcast(item);
            setIsPlaying(true);
            callApiOnPlay();
        }
    };

    if (loading)
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                جاري تحميل البودكاست...
            </div>
        );

    if (!audios.length)
        return (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm">
                لا يوجد بيانات حتي الان
            </div>
        );

    return (
        <main className="min-h-screen bg-[#F5F5F5] py-10" dir="rtl">
            <div className="hidden">
                <AudioPlayer
                    key={activePodcast?.id}
                    ref={playerRef}
                    src={activePodcast?.audioUrl}
                    autoPlay={isPlaying}
                    onPlay={() => {
                        setIsPlaying(true);
                        getAudioDetails(activePodcast.id).catch(err => console.error(err));
                    }}
                    onPause={() => setIsPlaying(false)}
                />
            </div>

            <div className="container mx-auto px-4">
                <div className="flex items-center gap-1 mb-4">
                    <h2 className="text-[22px] text-[#2B2B2B]">
                        البودكاست
                    </h2>
                    <MdOutlineKeyboardArrowLeft className="text-lg" />
                    <span className="text-[#3A5F7D] font-bold text-[22px]">
                        {projectTitle}
                    </span>
                </div>
                <div className="flex flex-col gap-">
                    {audios.map((item, index) => (
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
                                <div className="text-right p-8 bg-[#3A5F7D] text-white text-sm md:text-base flex justify-between flex-wrap gap-3">
                                    <div className="flex items-center gap-3">
                                        <TypeIcon />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold">
                                                التصنيف:
                                            </span>
                                            <span>
                                                {activePodcast.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <SpeakerIcon />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold">
                                                المتحدث:
                                            </span>
                                            <span>
                                                د/ مصطفي سليم
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <DateIcon />
                                        <div className="flex flex-col gap-1">
                                            <span className="font-bold">
                                                التاريخ:
                                            </span>
                                            <span>
                                                {activePodcast.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AudioDetails;