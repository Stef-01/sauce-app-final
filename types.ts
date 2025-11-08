export interface User {
    name: string;
    avatar: string;
    title: string;
}

export interface Internship {
    id: number;
    title:string;
    company: string;
    logo: string;
    location: string;
    isRemote: boolean;
    postedAt: string;
    description: string;
}

export interface Comment {
    author: User;
    text: string;
    timestamp: string;
}

export interface ForumPost {
    id: number;
    author: User;
    timestamp: string;
    title: string;
    content: string;
    likes: number;
    comments: Comment[];
    views: number;
}

export type Page = 'Community' | 'Internships' | 'Buzz' | 'Profile' | 'Project Refiner' | 'Projects';
