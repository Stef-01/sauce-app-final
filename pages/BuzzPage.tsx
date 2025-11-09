import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
import { EssayCard } from '../components/EssayCard';
import { fetchPostsByCategory, voteOnPost } from '../services/apiService';

type CategoryTab = 'general' | 'essay' | 'alumni_ceo';

export const BuzzPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<CategoryTab>('general');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPosts(activeTab);
    }, [activeTab]);

    const loadPosts = async (category: CategoryTab) => {
        setLoading(true);
        try {
            const categoryName = category === 'alumni_ceo' ? 'alumni_ceo' : category;
            const fetchedPosts = await fetchPostsByCategory(categoryName);
            setPosts(fetchedPosts);
        } catch (error) {
            console.error('Error loading posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleVote = async (postId: number, direction: number) => {
        // For now, we'll update optimistically
        // TODO: Add user authentication and pass userId
        const success = await voteOnPost(postId, direction);
        if (success) {
            // Reload posts to get updated scores
            loadPosts(activeTab);
        }
    };

    const getCategoryDisplayName = (category: CategoryTab): string => {
        const names: Record<CategoryTab, string> = {
            general: 'General',
            essay: 'Student Essays',
            alumni_ceo: 'Alumni Insights',
        };
        return names[category];
    };

    const getCategoryDescription = (category: CategoryTab): string => {
        const descriptions: Record<CategoryTab, string> = {
            general: 'Quick takes, questions, and discussions from the community',
            essay: 'Deep reflections on student life, ethics, and navigating tough decisions',
            alumni_ceo: 'Career insights and advice from alumni and industry leaders',
        };
        return descriptions[category];
    };

    return (
        <div className="animate-fade-in my-8 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Buzz Feed</h1>
                <p className="text-gray-400">{getCategoryDescription(activeTab)}</p>
            </div>

            {/* Category Tabs */}
            <div className="flex space-x-2 mb-8 border-b border-white/10">
                {(['general', 'essay', 'alumni_ceo'] as CategoryTab[]).map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-6 py-3 font-semibold transition-all border-b-2 rounded-t-lg ${
                            activeTab === category
                                ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {getCategoryDisplayName(category)}
                    </button>
                ))}
            </div>

            {/* Posts Feed */}
            <div className={activeTab === 'essay' ? 'space-y-6' : 'space-y-4'}>
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-400">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-gradient-to-br from-gray-900/50 to-gray-800/50 rounded-2xl border border-white/10">
                        <div className="mb-4">
                            <svg className="w-16 h-16 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                            </svg>
                        </div>
                        <p className="text-gray-400 text-lg font-medium">No posts in this category yet.</p>
                        <p className="text-gray-500 text-sm mt-2">Check back later for new content!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        activeTab === 'essay' ? (
                            <EssayCard
                                key={post.id}
                                post={post}
                                onVote={handleVote}
                            />
                        ) : (
                            <PostCard
                                key={post.id}
                                post={post}
                                onVote={handleVote}
                            />
                        )
                    ))
                )}
            </div>
        </div>
    );
};
