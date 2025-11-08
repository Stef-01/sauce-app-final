import React from 'react';
import { Project } from '../types';
import { InternshipDetail } from './InternshipDetail';

// This is a sample project data. In a real app, you'd fetch this based on an ID.
const sampleProject: Project = {
    id: 1,
    title: 'Sample Project: AI-Powered Personal Finance Advisor',
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
};


export const InternshipDetailPage: React.FC = () => {
    // In a real application, you would fetch project data based on a URL parameter (e.g., project ID).
    // For this example, we'll use a hardcoded sample project.
    const project = sampleProject;

    return (
        <div className="animate-fade-in my-8 p-8 bg-gray-800/50 rounded-lg">
            <InternshipDetail project={project} />
        </div>
    );
};
