import { Internship, ForumPost } from './types';

export const mockInternships: Internship[] = [
  {
    id: 'internship-1',
    title: 'Software Engineer Intern',
    company: 'Innovate Inc.',
    location: 'San Francisco, CA',
    description: 'Work on cutting-edge projects in AI and machine learning.',
    isRemote: true,
    postedAt: '2 days ago',
    logo: 'https://logo.clearbit.com/innovateinc.com',
  },
  {
    id: 'internship-2',
    title: 'Product Manager Intern',
    company: 'Solutions Co.',
    location: 'New York, NY',
    description: 'Define product strategy and roadmap for our flagship product.',
    isRemote: false,
    postedAt: '1 week ago',
    logo: 'https://logo.clearbit.com/solutionsco.com',
  },
    {
    id: 'internship-3',
    title: 'Data Science Intern',
    company: 'Data Insights',
    location: 'Austin, TX',
    description: 'Analyze large datasets to extract meaningful insights.',
    isRemote: true,
    postedAt: '3 days ago',
    logo: 'https://logo.clearbit.com/datainsights.com',
  },
];

const mockAuthor1 = { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/52?u=jane', title: 'Computer Science Student' };
const mockAuthor2 = { name: 'John Smith', avatar: 'https://i.pravatar.cc/52?u=john', title: 'Recent Graduate' };

export const mockPosts: ForumPost[] = [
  {
    id: 'post-1',
    author: mockAuthor1,
    timestamp: '1h ago',
    title: 'How to prepare for technical interviews?',
    content: 'I have a few technical interviews coming up for SWE internships. Any advice on how to best prepare? What are the key topics I should focus on? Thanks in advance!',
    likes: 42,
    comments: [
        { author: mockAuthor2, content: 'Definitely practice on LeetCode! And make sure you understand the fundamentals of data structures and algorithms.', timestamp: '30m ago' }
    ],
    views: 128,
  },
  {
    id: 'post-2',
    author: mockAuthor2,
    timestamp: '5h ago',
    title: 'Best resources for learning React?',
    content: 'I\'m looking to build a few portfolio projects using React. What are some of the best tutorials, courses, or documentation you would recommend for a beginner?',
    likes: 78,
    comments: [],
    views: 256,
  },
];

export const mockBuzz: ForumPost[] = [
    {
        id: 'buzz-1',
        author: { name: 'Campus News', avatar: 'https://i.pravatar.cc/52?u=news', title: 'University Feed' },
        timestamp: 'Just now',
        title: 'Fall Career Fair Announced!',
        content: 'The annual Fall Career Fair is happening next month! Get your resumes ready. Over 100 companies will be attending. Don\'t miss this opportunity!',
        likes: 150,
        comments: [],
        views: 1024,
    },
    {
        id: 'buzz-2',
        author: { name: 'Tech Club', avatar: 'https://i.pravatar.cc/52?u=tech', title: 'Student Organization' },
        timestamp: '1d ago',
        title: 'Hackathon Registration is Open',
        content: 'Join us for our 24-hour hackathon! Build amazing projects, win prizes, and network with sponsors. All skill levels are welcome. Sign up now!',
        likes: 95,
        comments: [],
        views: 840,
    },
    {
        id: 'buzz-3',
        author: { name: 'Alumni Network', avatar: 'https://i.pravatar.cc/52?u=alumni', title: 'Career Services' },
        timestamp: '3d ago',
        title: 'Alumni Mentorship Program',
        content: 'Connect with experienced professionals in your field. Our new alumni mentorship program is now accepting applications. Get valuable career advice and expand your network.',
        likes: 210,
        comments: [],
        views: 1500,
    }
];
