export interface Author {
    name: string;
    avatar: string;
    title: string;
}

export interface Comment {
    author: Author;
    content: string;
    timestamp: string;
}

export interface ForumPost {
    id: string;
    author: Author;
    timestamp: string;
    title: string;
    content: string;
    likes: number;
    comments: Comment[];
    views: number;
}

export interface Internship {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    isRemote: boolean;
    postedAt: string;
    logo: string;
}

export type Page = 'Community' | 'Internships' | 'Buzz' | 'Profile';
