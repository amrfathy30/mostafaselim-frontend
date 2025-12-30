import { useState } from 'react';
import TabsSection from './tabs-section';
import LoadMore from './load-more-button';
import PodcastImage from '../assets/img/podcast-image.png'
import PodcastCard from './podcast-card';

export default function PodcastSection(){
    const podcasts = [
        {
            id: 1,
            title: "الأسد والبهبيتي.. المسكوت عنه بين أطروحتين",
            description: "تقدم الحلقة مراجعة نقدية لمزاعم المؤرخ الأدبي نجيب البهبيتي انتحال العلامة ناصر الدين الأسد.",
            date: "12/2/2025",
            duration: "12:30 AM",
            image: PodcastImage,
        },
    ];

    // توليد 4 عناصر مع رابط الصوت
    const podcastsList = Array.from({ length: 4 }, (_, index) => ({
        ...podcasts[0],
        id: index + 1,
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    }));

    const [activeTab, setActiveTab] = useState('البودكاست');
    const tabs = ['المقالات', 'البودكاست', 'الكتب'];
    
    return(
        <section dir="rtl" className="py-10 bg-gray-50 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 mt-10">
                <TabsSection 
                    items={tabs} 
                    activeItem={activeTab} 
                    onSelect={setActiveTab} 
                />

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    {activeTab === 'البودكاست' && podcastsList.map((podcast) => (
                        <PodcastCard 
                            key={podcast.id} 
                            {...podcast} 
                        />
                    ))}
                </div> 

                <LoadMore 
                    text="سماع المزيد" 
                    onClick={() => console.log("تحميل المزيد...")}
                />
            </div>
        </section>
    );
}