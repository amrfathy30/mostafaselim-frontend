import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TabsSection from './tabs-section';
import LoadMore from './load-more-button';
import PodcastCard from './podcast-card';
import { getAudios } from '../services/audioService';
import React from 'react';

export default function PodcastSection() {
    const navigate = useNavigate();
    const [podcasts, setPodcasts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('البودكاست');
    const tabs = ['المقالات', 'البودكاست', 'الكتب'];

    useEffect(() => {
        const fetchPodcasts = async () => {
            try {
                setIsLoading(true);
                const response = await getAudios(1, 4);
                const audioItems = response.data?.audios || [];

                const formattedPodcasts = audioItems.map((item: any) => ({
                    id: item.audio_id,
                    title: item.audio_title,
                    description: item.audio_details,
                    date: item.audio_date,
                    duration: item.duration,
                    image: item.audio_project,
                    audioUrl: item.audio_content
                }));

                setPodcasts(formattedPodcasts);
            } catch (error) {
                console.error("Error fetching podcasts:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (activeTab === 'البودكاست') {
            fetchPodcasts();
        }
    }, [activeTab]);

    return (
        <section dir="rtl" className="py-10 bg-gray-50 font-expo">
            <div className="max-w-6xl mx-auto px-4 mt-10">
                <TabsSection 
                    items={tabs} 
                    activeItem={activeTab} 
                    onSelect={setActiveTab} 
                />

                {isLoading ? (
                    <div className="text-center py-20 text-[#43617E]">جاري تحميل البودكاست...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        {activeTab === 'البودكاست' && podcasts.length > 0 ? (
                            podcasts.map((podcast) => (
                                <PodcastCard 
                                    key={podcast.id} 
                                    {...podcast} 
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-400">لا توجد صوتيات متاحة حالياً</div>
                        )}
                    </div>
                )}

                <div className="mt-12 flex justify-center pb-10">
                    <LoadMore 
                        text="سماع المزيد" 
                        onClick={() => navigate('/podcasts')} 
                    />
                </div>
            </div>
        </section>
    );
}
