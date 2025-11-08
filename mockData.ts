import { Project, ForumPost, Article, Wisdom, Event } from './types';

export const mockProjects: Project[] = [
    {
        id: 1,
        title: 'AI-Powered Career Path Advisor',
        company: 'InnovateTech',
        logo: 'https://i.pravatar.cc/100?u=innovate',
        location: 'New York, NY',
        isRemote: true,
        postedAt: '2 days ago',
        description: 'Develop an intelligent system that recommends personalized career paths to students based on their skills, interests, and industry trends. The project involves natural language processing, machine learning, and data visualization.',
        technicalRequirements: 'Experience with Python, TensorFlow or PyTorch, and a frontend framework like React or Vue. Familiarity with data scraping and API integration is a plus.',
        skillsRequired: ['Python', 'Machine Learning', 'React', 'Data Visualization', 'NLP'],
        estimatedDuration: '3-4 months',
        projectScope: 'The core functionality will include a user profile, a recommendation engine, and a visualization dashboard. The project will not include user authentication in the first phase.',
    },
    {
        id: 2,
        title: 'Decentralized Social Media Platform',
        company: 'BlockChain Solutions',
        logo: 'https://i.pravatar.cc/100?u=blockchain',
        location: 'San Francisco, CA',
        isRemote: true,
        postedAt: '5 days ago',
        description: 'Build a proof-of-concept social media platform on a blockchain. The goal is to explore decentralized identity, content ownership, and censorship resistance. Users should be able to create posts and interact with others in a peer-to-peer network.',
        technicalRequirements: 'Solid understanding of blockchain concepts, smart contracts (Solidity), and experience with web3 libraries like Ethers.js or Web3.js. Frontend will be built with Next.js.',
        skillsRequired: ['Blockchain', 'Solidity', 'Next.js', 'Ethers.js', 'IPFS'],
        estimatedDuration: '4-6 months',
        projectScope: 'Focus on core features: creating a profile, posting text-based content, and viewing a public feed. Will not include direct messaging or complex media uploads.',
    },
];

export const mockForumPosts: ForumPost[] = [
    {
        id: 1,
        author: 'Jane Doe',
        avatar: 'https://i.pravatar.cc/52?u=jane',
        postedAt: '1h ago',
        title: 'How to prepare for a technical interview at a FAANG company?',
        content: "I've got an interview coming up and I'm super nervous. Any tips on what to focus on? I've been doing LeetCode but what else should I do?",
        upvotes: 42,
        comments: 12,
    },
    {
        id: 2,
        author: 'John Smith',
        avatar: 'https://i.pravatar.cc/52?u=john',
        postedAt: '3h ago',
        title: 'Best side projects to showcase on a resume for a frontend role?',
        content: "I'm looking to build some projects to make my resume stand out for frontend developer positions. What kind of projects are impressive to recruiters? I was thinking of a real-time chat app or maybe a data visualization dashboard. Any thoughts?",
        upvotes: 78,
        comments: 23,
    },
];

export const mockArticles: Article[] = [
    {
        id: 1,
        title: "The Rise of AI in Software Development: What's Next?",
        summary: "Artificial intelligence is no longer a futuristic concept but a present-day reality transforming the software development lifecycle. From AI-powered code assistants to automated testing and deployment, we explore the current landscape and future trends.",
        imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=500&q=80",
        link: "#",
        source: "TechCrunch",
        publishedAt: "Oct 26, 2023"
    },
    {
        id: 2,
        title: "Mastering Remote Collaboration: Tools and Techniques",
        summary: "With remote work becoming the new norm for many tech companies, mastering asynchronous communication and collaboration is key. This article covers the best tools and strategies to stay productive and connected with your team.",
        imageUrl: "https://images.unsplash.com/photo-1588196749597-9ff075a6b54a?w=500&q=80",
        link: "#",
        source: "Harvard Business Review",
        publishedAt: "Oct 24, 2023"
    }
];

export const mockWisdom: Wisdom[] = [
    {
        id: 1,
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        id: 2,
        quote: "Code is like humor. When you have to explain it, it’s bad.",
        author: "Cory House"
    }
];

export const mockEvents: Event[] = [
    {
        id: 1,
        title: 'Tech Career Fair',
        description: 'Meet recruiters from top tech companies and discover your next opportunity.',
        date: 'Nov 15, 2023',
        time: '10:00 AM - 3:00 PM',
        location: 'University Grand Hall',
        organizer: 'Career Services',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80',
    },
    {
        id: 2,
        title: 'AI & Machine Learning Summit',
        description: 'A full day of talks and workshops from industry leaders in AI.',
        date: 'Nov 22, 2023',
        time: '9:00 AM - 5:00 PM',
        location: 'Engineering Building, Auditorium',
        organizer: 'CS Department',
        imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=500&q=80',
    }
];
