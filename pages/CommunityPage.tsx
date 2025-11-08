import React, { useState } from 'react';
import { Project, ForumPost } from '../types';
import { EventDetails } from '../components/EventDetails';
import { FeaturedProjects } from '../components/FeaturedProjects';
import { ActivityFeed } from '../components/ActivityFeed';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ForumPostDetailModal } from '../components/ForumPostDetailPage';

interface CommunityPageProps {
    projects: Project[];
    posts: ForumPost[];
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ projects, posts }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

    const featuredProjects = projects.slice(0, 3); // Show first 3 as featured

    return (
        <div className="animate-fade-in my-8">
            <div className="flex flex-col md:flex-row gap-8">
                <EventDetails />
                <FeaturedProjects projects={featuredProjects} onSelectProject={setSelectedProject} />
            </div>
            <ActivityFeed posts={posts} onSelectPost={setSelectedPost} />

            {selectedProject && (
                <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            
            {selectedPost && (
                <ForumPostDetailModal post={selectedPost} onClose={() => setSelectedPost(null)} />
            )}
        </div>
    );
};
