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
  isActive?: boolean;
  isEvenRow?: boolean;
  isFullPage?: boolean;
  isPlaying?: boolean;
  onToggle?: () => void;
}

export default function PodcastCard({
  title, description, date, duration, image, audioUrl,
  isActive = false, isEvenRow = false, isFullPage = false, isPlaying = false, onToggle
}: PodcastProps) {

  if (isFullPage) {
    const bgColor = isActive ? 'bg-[#3A5F7D]' : (isEvenRow ? 'bg-[#EBEBEB]' : 'bg-white');
    const textColor = isActive ? 'text-white' : 'text-[#3A5F7D]';

    return (
      <div
        onClick={onToggle}
        className={`
          transition-all cursor-pointer flex flex-col relative
          p-4 md:p-6 lg:p-8
          ${bgColor} ${textColor}
        `}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full gap-4 md:gap-0">

          {/* Play Button & Timer - Left on Desktop, Top on Mobile */}
          <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto order-1 md:order-1">
            <button
              className={`
                w-[50px] h-[50px] md:w-[60px] md:h-[60px] 
                rounded-full flex items-center justify-center 
                text-2xl md:text-3xl shadow-sm
                ${isActive ? 'bg-white text-[#3A5F7D]' : 'bg-[#43617E1a] text-[#43617E]'}
              `}
            >
              {isActive && isPlaying ? '⏸' : '▶'}
            </button>

            <div className="text-[16px] md:text-[20px] font-bold min-w-[100px] md:min-w-[120px] text-left">
              {isActive ? '0:00' : '0:00'} / {duration}
            </div>
          </div>

          {/* Title & Description - Right on Desktop, Bottom on Mobile */}
          <div className="flex-1 text-right w-full md:px-6 lg:px-10 order-2 md:order-2">
            <h3 className="font-bold text-[18px] md:text-[22px] lg:text-[24px] mb-1 md:mb-2 leading-tight">
              {title}
            </h3>
            <p
              className={`
                text-[14px] md:text-[15px] lg:text-[16px] 
                leading-relaxed line-clamp-2
                ${isActive ? 'text-white/80' : 'text-[#555]'}
              `}
            >
              {description}
            </p>
          </div>
        </div>

        {/* Audio Waveform - Only on Active */}
        {isActive && (
          <div className="mt-6 md:mt-8 lg:mt-10 flex items-end justify-center gap-1 md:gap-1.5 h-12 md:h-14 lg:h-16 w-full">
            {[...Array(60)].map((_, i) => (
              <div
                key={i}
                className="w-1 md:w-1.5 rounded-full bg-white animate-pulse"
                style={{
                  height: `${20 + Math.random() * 80}%`,
                  animationDelay: `${i * 0.02}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Compact Card (for the Home page)
  return (
    <div className="flex flex-col gap-4 rounded-[22px] bg-white p-4 transition h-[373px]">
      <div className='h-[207px] flex space-x-3'>
        <img
          src={image}
          alt={title}
          className="aspect-[1/1] rounded-[18px] w-[195px] object-cover border border-gray-100 "
        />
        <div>
          <div className=''>
            <h3 className="text-[28px] font-normal text-primary h-[78px] line-clamp-2">
              {title}
            </h3>
            <p className="mt-1 text-[22px] text-[#4D4D4D] line-clamp-2">
              {description}
            </p>
          </div>
          <div className="flex flex-row items-center gap-3 mt-2 text-[#4D4D4D]">


            <div className="flex items-center gap-1">
              <span className="text-[20px]">{duration}</span>
              <FaClock className="size-4" />

            </div>
            <span className="text-[#D9D9D9] text-[10px]">•</span>
            <div className="flex items-center gap-1">
              <span className="text-[20px]">{date}</span>
              <FaCalendarAlt className="size-4" />

            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between">

        <div className="flex mt-3 w-full items-center justify-center" dir="ltr">
          <AudioPlayer
            src={audioUrl}
            layout="horizontal"
            showJumpControls={false}
            customAdditionalControls={[]}
            customVolumeControls={[]}
            showDownloadProgress={false}
            className="custom-audio-player"
            customIcons={{
              play: (
                <svg width="27" height="28" viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.9391 10.1115C24.5996 10.4627 25.152 10.987 25.5373 11.6282C25.9225 12.2694 26.126 13.0034 26.126 13.7514C26.126 14.4995 25.9225 15.2334 25.5373 15.8746C25.152 16.5158 24.5996 17.0401 23.9391 17.3913L6.32133 26.9716C3.4845 28.5159 0 26.5082 0 23.3331V4.1711C0 0.99462 3.4845 -1.01165 6.32133 0.529836L23.9391 10.1115Z" fill="#3A5F7D" />
                </svg>
              ),
              pause: (
                <svg width="23" height="27" viewBox="0 0 23 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.63571 0H1.87857C0.841064 0 0 0.841064 0 1.87857V24.4214C0 25.4589 0.841064 26.3 1.87857 26.3H5.63571C6.67321 26.3 7.51428 25.4589 7.51428 24.4214V1.87857C7.51428 0.841064 6.67321 0 5.63571 0Z" fill="#3A5F7D" />
                  <path d="M20.664 0H16.9069C15.8694 0 15.0283 0.841064 15.0283 1.87857V24.4214C15.0283 25.4589 15.8694 26.3 16.9069 26.3H20.664C21.7015 26.3 22.5426 25.4589 22.5426 24.4214V1.87857C22.5426 0.841064 21.7015 0 20.664 0Z" fill="#3A5F7D" />
                </svg>

              )

            }}
          />
          <div className='flex text-sm font-normal'>/{duration}</div>
        </div>
      </div>
    </div>
  );
}