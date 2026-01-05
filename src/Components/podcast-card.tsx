import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

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
    <div className="flex gap-4 rounded-xl bg-white p-4 shadow-sm hover:shadow-md transition">
      <img 
        src={image} 
        alt={title} 
        className="h-24 w-24 rounded-lg object-cover shrink-0" 
      />
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <h3 className="text-[14px] font-expo font-bold text-[#43617E]">
            {title}
          </h3>
          <p className="mt-1 text-xs text-gray-500 line-clamp-2">
            {description}
          </p>
        </div>
        <div className="flex flex-row items-center gap-3 mt-2 text-gray-400">
          <div className="flex items-center gap-1">
            <FaCalendarAlt className="size-3" /> 
            <span className="text-[10px]">{date}</span>
          </div>
          <span className="text-gray-300 text-[10px]">•</span>
          <div className="flex items-center gap-1">
            <FaClock className="size-3" /> 
            <span className="text-[10px]">{duration}</span>
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