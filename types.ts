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

export interface Post {
    id: number;
    university_id?: number;
    author_id?: number;
    author_name?: string;
    author_avatar?: string;
    body: string;
    media_url?: string;
    score: number;
    category_id?: number;
    category_name?: string;
    template_id?: number;
    created_at: string;
    updated_at: string;
    user_vote?: number; // -1, 0, or 1
    comment_count?: number;
}

export interface Vote {
    id: number;
    user_id: number;
    post_id: number;
    direction: number; // -1, 0, or 1
    created_at: string;
}

export interface Comment {
    id: number;
    post_id: number;
    author_id?: number;
    author_name?: string;
    author_avatar?: string;
    body: string;
    media_url?: string;
    score: number;
    parent_comment_id?: number;
    created_at: string;
    updated_at: string;
    user_vote?: number;
    replies?: Comment[];
}

export interface UserProfile {
    user_id: number;
    university_id?: number;
    full_name?: string;
    grad_year?: number;
    current_title?: string;
    current_company?: string;
    location?: string;
    headline?: string;
    seeking_roles?: string[];
    skill_tags?: string[];
    open_to_connect: boolean;
    last_active_at?: string;
    created_at: string;
}

export interface CommunityCard {
    id: number;
    user_id: number;
    title: string;
    subtitle?: string;
    company?: string;
    role_label?: string;
    tags?: string[];
    is_alumni: boolean;
    is_student: boolean;
    visible_in_swipe: boolean;
    created_at: string;
    // Extended fields from user_profiles
    full_name?: string;
    headline?: string;
    current_title?: string;
    current_company?: string;
    seeking_roles?: string[];
    skill_tags?: string[];
    grad_year?: number;
    location?: string;
    willing_to_mentor?: boolean;
    open_to_projects?: boolean;
    years_experience?: number;
    industries?: string[];
}

export interface NetworkNode {
    id: string;
    label: string;
    type: 'company' | 'alumni';
    company?: string;
    alumni_count?: number;
    alumni_names?: string[];
}

export interface NetworkEdge {
    source: string;
    target: string;
    value: number;
}
