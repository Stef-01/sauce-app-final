import { Internship, ForumPost } from './types';

export const mockInternships: Internship[] = [
    {
        id: 1,
        title: 'Software Engineer Intern',
        company: 'Innovate Inc.',
        logo: 'https://i.pravatar.cc/48?u=innovate',
        location: 'San Francisco, CA',
        isRemote: true,
        postedAt: '2 days ago',
        description: 'Work on exciting new projects and gain hands-on experience with our engineering team. This is a great opportunity to learn about software development in a fast-paced environment.'
    },
    {
        id: 2,
        title: 'Product Manager Intern',
        company: 'FutureTech',
        logo: 'https://i.pravatar.cc/48?u=futuretech',
        location: 'New York, NY',
        isRemote: false,
        postedAt: '1 week ago',
        description: 'Help define and launch new products. You will work closely with engineering, design, and marketing to bring ideas to life.'
    },
    {
        id: 3,
        title: 'Data Science Intern',
        company: 'DataDriven Co.',
        logo: 'https://i.pravatar.cc/48?u=datadriven',
        location: 'Remote',
        isRemote: true,
        postedAt: '3 days ago',
        description: 'Analyze large datasets to extract meaningful insights. Experience with Python and SQL is a plus.'
    },
];

export const mockForumPosts: ForumPost[] = [
    {
        id: 1,
        author: { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/52?u=jane', title: 'CS Student @ State University' },
        timestamp: '1h ago',
        title: 'How to prepare for technical interviews?',
        content: 'I have a few technical interviews coming up for SWE internships. Any advice on how to best prepare? What are some common topics I should focus on?',
        likes: 15,
        comments: [],
        views: 128
    },
    {
        id: 2,
        author: { name: 'John Smith', avatar: 'https://i.pravatar.cc/52?u=john', title: 'Product Manager @ StartupX' },
        timestamp: '3h ago',
        title: 'My experience as a PM intern',
        content: 'Just finished my summer internship as a Product Manager. It was an amazing experience! Happy to answer any questions about the role or the application process.',
        likes: 22,
        comments: [],
        views: 256
    },
    {
        id: 3,
        author: { name: 'Emily White', avatar: 'https://i.pravatar.cc/52?u=emily', title: 'UX Designer @ Creative Co.' },
        timestamp: '1d ago',
        title: 'Portfolio tips for UX design internships',
        content: 'For all aspiring UX designers out there, having a strong portfolio is key. I wanted to share some tips on what recruiters look for and how to make your portfolio stand out.',
        likes: 45,
        comments: [],
        views: 849
    },
];
