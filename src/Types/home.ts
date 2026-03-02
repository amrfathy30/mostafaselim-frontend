import { HistoryItem } from "./history";

export interface AuthorData {
  user_full_name: string;
  bio: string;
  user_cv: string;
  user_image_cover: string;
  user_images: string[];
  user_personal: string;
  user_educational: string;
}

export interface AudioItem {
  audio_views: any;
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
  audio_views: number;
}

export interface Book {
  book_id: number;
  book_name: string;
  image: string;
  book_date: string;
  publishing_house: string;
  book_link?: string;
  book_views: number;
  book_edition_number?: string;
}

export interface ArticleItem {
  article_views: number;
  id: number;
  article_id?: number;
  title: string;
  article_title?: string;
  time: string;
  article_time?: string;
  date: string;
  article_date?: string;
  views?: number;
}

export interface HomeData {
  user_info: AuthorData;
  business: HistoryItem[];
  articles?: ArticleItem[];
  books?: Book[];
  audios?: AudioProject[];
  articles_count?: number;
  books_count?: number;
  audios_count?: number;
  articals_count?: number;
  awords_count?: number;
}
