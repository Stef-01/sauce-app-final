import React from 'react';
import { Internship, ForumPost } from '../types';
import { EventDetails } from '../components/EventDetails';
import { EventMedia } from '../components/EventMedia';
import { ActivityFeed } from '../components/ActivityFeed';

interface CommunityPageProps {
    internships: Internship[];
    posts: ForumPost[];
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ internships, posts }) => {
    
    const handleSelectInternship = (internship: Internship) => {
        // In a real app, you would navigate to a detail page
        // or open a modal with internship details.
        alert(`You selected the internship: "${internship.title}" at ${internship.company}`);
    };

    const handleSelectPost = (post: ForumPost) => {
        // In a real app, you would navigate to a detail page
        // or open a modal with post details.
        alert(`You selected the post: "${post.title}" by ${post.author.name}`);
    };
    
    // Take only the first 2 internships for the featured section
    const featuredInternships = internships.slice(0, 2);

    return (
        <div className="animate-fade-in my-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="flex flex-col w-full md:w-3/5">
                    <EventDetails />
                    <ActivityFeed posts={posts} onSelectPost={handleSelectPost} />
                </div>
                <div className="w-full md:w-2/5">
                    <EventMedia internships={featuredInternships} onSelectInternship={handleSelectInternship} />
                </div>
            </div>
        </div>
    );
};
