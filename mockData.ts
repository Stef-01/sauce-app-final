import { Project, ForumPost, Article, Wisdom, Event } from './types';

export const mockProjects: Project[] = [
    {
        id: 1,
        title: 'AI-Powered Personal Finance Advisor',
        company: 'FinTech Innovations',
        logo: 'https://i.pravatar.cc/100?u=1',
        location: 'New York, NY',
        isRemote: true,
        postedAt: '2 days ago',
        description: 'Develop a smart personal finance application that uses AI to provide personalized savings advice and investment recommendations. The project involves building a secure backend, an intuitive frontend, and integrating with financial data APIs.',
        technicalRequirements: 'Backend API using Node.js/Express, user authentication with JWT, PostgreSQL database. Frontend with React and TypeScript. Plaid API integration for financial data. Deployment on AWS.',
        skillsRequired: ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'REST APIs'],
        estimatedDuration: '3-4 months',
        projectScope: 'The initial scope includes user registration, bank account linking, a dashboard for financial overview, and a basic recommendation engine. Future phases may include portfolio tracking and budgeting tools.'
    },
    {
        id: 2,
        title: 'Campus Event Discovery Platform',
        company: 'UniConnect',
        logo: 'https://i.pravatar.cc/100?u=2',
        location: 'Boston, MA',
        isRemote: false,
        postedAt: '5 days ago',
        description: 'Create a web platform for students to discover and RSVP to campus events. Features include event categorization, an interactive map, and user reviews.',
        skillsRequired: ['Vue.js', 'Firebase', 'Google Maps API'],
        estimatedDuration: '2-3 months',
    },
    {
        id: 3,
        title: 'E-commerce Site for Sustainable Products',
        company: 'GreenCart',
        logo: 'https://i.pravatar.cc/100?u=3',
        location: 'San Francisco, CA',
        isRemote: true,
        postedAt: '1 week ago',
        description: 'Build a full-featured e-commerce website focused on environmentally friendly products. The site should include product listings, a shopping cart, and a secure checkout process.',
        skillsRequired: ['React', 'Next.js', 'Stripe API', 'GraphQL'],
        estimatedDuration: '4-5 months',
    }
];

export const mockForumPosts: ForumPost[] = [
    {
        id: 1,
        author: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/40?u=jane',
        postedAt: '3 hours ago',
        title: 'How do you prepare for technical interviews?',
        content: 'I have a few technical interviews coming up for software engineering internships. Any tips on how to best prepare? What are some common topics or questions I should focus on? Any resources would be greatly appreciated!',
        upvotes: 42,
        comments: 15,
    },
    {
        id: 2,
        author: 'John Smith',
        avatar: 'https://i.pravatar.cc/40?u=john',
        postedAt: '1 day ago',
        title: 'Portfolio Project Feedback - Personal Website',
        content: 'Hey everyone, I just finished the first version of my personal portfolio website and would love to get some feedback. The goal is to showcase my skills in React and UI/UX design. Here is the link: [link]. Let me know what you think!',
        upvotes: 28,
        comments: 9,
    },
];

export const mockArticles: Article[] = [
    {
        id: 1,
        title: 'The Rise of AI in Software Development',
        summary: 'Artificial intelligence is no longer just a buzzword; it\'s actively reshaping the software development landscape. From AI-powered code assistants to automated testing, learn how these tools are boosting productivity and changing how we build software.',
        imageUrl: 'https://images.unsplash.com/photo-1620712943543-2858200f745a?q=80&w=870&auto=format&fit=crop',
        link: '#',
        source: 'Tech Insights',
        publishedAt: '2024-07-20',
    },
    {
        id: 2,
        title: 'Mastering Remote Collaboration: A Guide for Student Teams',
        summary: 'Working on group projects from different locations can be challenging. This guide provides practical tips and tools for effective remote collaboration, ensuring your team stays on track and delivers great results.',
        imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=870&auto=format&fit=crop',
        link: '#',
        source: 'Student Success Hub',
        publishedAt: '2024-07-19',
    },
];

export const mockWisdom: Wisdom[] = [
    {
        id: 1,
        quote: 'The best way to predict the future is to invent it.',
        author: 'Alan Kay',
    },
    {
        id: 2,
        quote: 'Talk is cheap. Show me the code.',
        author: 'Linus Torvalds',
    },
];

export const mockEvents: Event[] = [
    {
        id: 1,
        title: 'Virtual Tech Career Fair',
        description: 'Connect with top tech companies looking to hire interns and recent graduates. Network with recruiters and learn about exciting opportunities.',
        date: 'August 15, 2024',
        time: '10:00 AM - 4:00 PM EST',
        location: 'Online',
        organizer: 'University Career Services',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=870&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Introduction to Web3 Workshop',
        description: 'Dive into the world of decentralized applications and blockchain technology. This hands-on workshop will guide you through building your first DApp.',
        date: 'September 5, 2024',
        time: '6:00 PM - 8:00 PM EST',
        location: 'Computer Science Building, Room 101',
        organizer: 'Blockchain Club',
        imageUrl: 'https://images.unsplash.com/photo-1642104704074-af0f4871ad75?q=80&w=870&auto=format&fit=crop',
    },
];
