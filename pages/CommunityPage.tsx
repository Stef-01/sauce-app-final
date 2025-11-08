import React, { useState } from 'react';
import { EventDetails } from '../components/EventDetails';
import { FeaturedProjects } from '../components/EventMedia';
import { ActivityFeed } from '../components/ActivityFeed';
import { Project, ForumPost } from '../types';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { ForumPostDetail } from '../components/ForumPostDetail';

interface CommunityPageProps {
    projects: Project[];
    posts: ForumPost[];
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ projects, posts }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

    const featuredProjects = projects.slice(0, 3);

    return (
        <div className="animate-fade-in my-8">
            <div className="flex flex-col md:flex-row md:justify-between w-full box-border caret-transparent gap-8">
                <FeaturedProjects projects={featuredProjects} onSelectProject={setSelectedProject} />
                <EventDetails />
            </div>
            <ActivityFeed posts={posts} onSelectPost={setSelectedPost} />

            {selectedProject && (
                <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
            )}
            
            {/* Using a similar modal structure for post details */}
            {selectedPost && (
                 <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
                    onClick={() => setSelectedPost(null)}
                >
                    <div
                        className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-3xl text-white max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="sticky top-0 flex justify-end p-2 bg-gray-900/80 backdrop-blur-sm">
                            <button onClick={() => setSelectedPost(null)} className="text-2xl hover:text-gray-400 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">&times;</button>
                        </div>
                        <div className="p-8">
                           <ForumPostDetail post={selectedPost} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
