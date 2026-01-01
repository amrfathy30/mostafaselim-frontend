import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React from 'react';

interface PodcastProps {
  title: string;
  description: string;
  date: string;
  duration: string;
  image: string;
  audioUrl: string;
}

export default function PodcastCard({
  title,
  description,
  date,
  duration,
  image,
  audioUrl,
}: PodcastProps) {
  return (
    <div className="flex gap-4 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition">
      
      
      <img
        src={image}
        alt={title}
        className="h-24 w-24 rounded-lg object-cover shrink-0"
      />

      
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-[14px] font-expo font-bold text-[#43617E]" >
            {title}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>
    <div className="flex flex-row items-center gap-3 mt-2 text-gray-400">
        <div className="flex items-center gap-1">
    <FaCalendarAlt className="text-gray-400 size-3" /> 
    <span className="text-[10px] leading-none">{date}</span> 
  </div>

  <span className="text-gray-300 text-[10px]">•</span>

  <div className="flex items-center gap-1 ">
    <FaClock className="text-gray-400 size-3" /> 
    <span className="text-[10px] leading-none">{duration}</span> 
  </div>
</div>
<div className="mt-3 w-full" dir="ltr">
          <AudioPlayer
  src={audioUrl}
  showJumpControls={false}
  customAdditionalControls={[]}
  customVolumeControls={[]}
  layout="horizontal-reverse"
/>
        </div>
      </div>
    </div>
  );
}
