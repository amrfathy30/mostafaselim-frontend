export type WorkCategory = 'articles' | 'podcasts' | 'books';

export interface WorkItem {
    id: number;
    title: string;
    date: string;
    time: string;
    category: WorkCategory;
}