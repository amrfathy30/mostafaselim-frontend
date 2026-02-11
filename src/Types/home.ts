import { HistoryItem } from "./history";

export interface AudioItem {
  audio_id: number;
  audio_title: string;
  audio_details: string;
  audio_date: string;
  duration: string;
  audio_content: string;
  audio_time: string;
  audio_project: string;
}

export interface AudioProject {
  project_id: number;
  project_title: string;
  project_image_cover: string;
  project_audio: AudioItem[];
}

export interface Book {
  book_id: number;
  book_name: string;
  image: string;
  book_date: string;
  publishing_house: string;
  book_link?: string;
}

export interface HomeData {
  user_info: any;
  business: HistoryItem[];
  articles?: any[];
  books?: Book[];
  audios?: AudioProject[];
  articles_count?: number;
  books_count?: number;
  audios_count?: number;
  articals_count?: number;
  awords_count?: number;
}
