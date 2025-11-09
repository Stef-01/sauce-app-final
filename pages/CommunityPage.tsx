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
    onNavigate?: (page: string) => void;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ projects, posts, onNavigate }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);

    const featuredProjects = projects.slice(0, 3); // Show first 3 as featured

    const handleNavigate = (page: string) => {
        if (onNavigate) {
            onNavigate(page);
        }
    };

    return (
        <div className="animate-fade-in my-8">
            <h1 className="text-3xl font-bold mb-6">Community</h1>

            {/* Navigation Cards */}
            <div className="flex gap-4 mb-8">
                {/* Elevate Card */}
                <button
                    onClick={() => handleNavigate('elevate')}
                    className="group relative flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white">Elevate</span>
                </button>

                {/* Network Map Card */}
                <button
                    onClick={() => handleNavigate('network-map')}
                    className="group relative flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-all"
                >
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                        </svg>
                    </div>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white">Network Map</span>
                </button>
            </div>

            {/* Existing Content */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
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
