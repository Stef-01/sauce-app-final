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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Elevate Card */}
                <div
                    onClick={() => handleNavigate('elevate')}
                    className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border border-blue-700 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition-all hover:scale-105"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Elevate</h2>
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
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
                    </div>
                    <p className="text-gray-300 mb-4">
                        Swipe through profiles of students and alumni. Connect with people who share your interests, skills, and goals.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                            Tinder-style
                        </span>
                        <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                            AI Matched
                        </span>
                        <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                            Networking
                        </span>
                    </div>
                </div>

                {/* Network Map Card */}
                <div
                    onClick={() => handleNavigate('network-map')}
                    className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 border border-purple-700 rounded-xl p-8 cursor-pointer hover:border-purple-500 transition-all hover:scale-105"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Network Map</h2>
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                            <svg
                                className="w-6 h-6 text-white"
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
                    </div>
                    <p className="text-gray-300 mb-4">
                        Explore the Stanford alumni network. See which alumni work at which companies and discover connections.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                            Visual Graph
                        </span>
                        <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                            Alumni Network
                        </span>
                        <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                            Companies
                        </span>
                    </div>
                </div>
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
