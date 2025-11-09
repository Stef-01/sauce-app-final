import { Project, ForumPost, Article, Wisdom, Event } from './types';

export const mockProjects: Project[] = [
    {
        id: 1,
        title: "Personal Finance Dashboard",
        company: "Robinhood",
        logo: "https://logo.clearbit.com/robinhood.com",
        location: "San Francisco, CA",
        isRemote: true,
        tags: ["Finance", "Product Design", "User Experience"],
        description: "Join Robinhood's product team to create intuitive financial tools that help people manage their money better. Work directly with Vlad Tenev (CEO) and the core product team on our next-generation mobile experience.",
        technicalRequirements: "Looking for creative problem-solvers who can think about user needs and create elegant solutions. Prior experience building consumer products is a plus.",
        skillsRequired: ["Product Design", "User Research", "Prototyping", "Mobile Design"],
        timeline: "3 months",
        compensation: "$45/hour",
        postedAt: "2h ago",
        projectScope: 'The initial scope includes user registration, bank account linking, a dashboard for financial overview, and a basic recommendation engine. Future phases may include portfolio tracking and budgeting tools.'
    },
    {
        id: 2,
        title: 'Content Creator Success Dashboard',
        company: 'Patreon',
        logo: 'https://logo.clearbit.com/patreon.com',
        location: 'San Francisco, CA',
        isRemote: true,
        postedAt: '5 days ago',
        description: 'Work with Jack Conte (CEO) and the product team to design tools that help creators understand and grow their audience. Focus on making complex analytics simple and actionable.',
        skillsRequired: ['Data Visualization', 'User Research', 'Product Design'],
        estimatedDuration: '2-3 months',
        compensation: '$40/hour'
    },
    {
        id: 3,
        title: 'Sustainable Shopping Experience',
        company: 'Etsy',
        logo: 'https://logo.clearbit.com/etsy.com',
        location: 'Brooklyn, NY',
        isRemote: true,
        postedAt: '1 week ago',
        description: 'Join Josh Silverman (CEO) and the sustainability team to create features that highlight eco-friendly products and sellers. Help shoppers make environmentally conscious choices.',
        skillsRequired: ['User Experience', 'Product Strategy', 'Market Research'],
        estimatedDuration: '3 months',
        compensation: '$42/hour'
    },
];

export const mockForumPosts: ForumPost[] = [
    {
        id: 1,
        author: 'Sam Altman',
        avatar: 'https://logo.clearbit.com/openai.com',
        postedAt: '3 hours ago',
        title: 'Insights on Building Impactful Products',
        content: 'From my experience at OpenAI and Y Combinator, I\'ve found that the best products come from solving real problems you deeply understand. Focus on building something people want, move fast, and don\'t be afraid to release early versions to get feedback.',
        upvotes: 142,
        comments: 35,
    },
    {
        id: 2,
        author: 'Tobi Lütke',
        avatar: 'https://logo.clearbit.com/shopify.com',
        postedAt: '1 day ago',
        title: 'The Future of E-commerce',
        content: 'The next wave of e-commerce will be about empowering entrepreneurs to create unique shopping experiences. At Shopify, we\'re seeing incredible innovation in how people sell and connect with customers. The key is to focus on the merchant\'s success first.',
        upvotes: 98,
        comments: 24,
    },
];

export const mockArticles: Article[] = [
    {
        id: 1,
        title: 'Building Products That Matter',
        summary: 'Patrick Collison, CEO of Stripe, shares his insights on creating technology that empowers businesses. Learn about Stripe\'s journey from a simple payments API to a global financial infrastructure platform.',
        imageUrl: 'https://logo.clearbit.com/stripe.com',
        link: '#',
        source: 'Stripe Blog',
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
