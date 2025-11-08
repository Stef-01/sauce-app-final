export interface Project {
    id: number;
    title: string;
    company: string;
    logo: string;
    location: string;
    isRemote: boolean;
    postedAt: string;
    description: string;
    technicalRequirements?: string;
    skillsRequired?: string[];
    estimatedDuration?: string;
    projectScope?: string;
}

export interface ForumPost {
    id: number;
    author: string;
    avatar: string;
    postedAt: string;
    title: string;
    content: string;
    upvotes: number;
    comments: number;
}

export interface Article {
    id: number;
    title: string;
    summary: string;
    imageUrl: string;
    link: string;
    source: string;
    publishedAt: string;
}

export interface Wisdom {
    id: number;
    quote: string;
    author: string;
}

export interface Event {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    organizer: string;
    imageUrl?: string;
}
