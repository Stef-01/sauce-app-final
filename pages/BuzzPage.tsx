import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { PostCard } from '../components/PostCard';
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
            essay: 'Essays',
            alumni_ceo: 'Alumni Insights',
        };
        return names[category];
    };

    return (
        <div className="animate-fade-in my-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Buzz Feed</h1>

            {/* Category Tabs */}
            <div className="flex space-x-4 mb-6 border-b border-gray-700">
                {(['general', 'essay', 'alumni_ceo'] as CategoryTab[]).map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
                            activeTab === category
                                ? 'border-blue-500 text-blue-400'
                                : 'border-transparent text-gray-400 hover:text-white'
                        }`}
                    >
                        {getCategoryDisplayName(category)}
                    </button>
                ))}
            </div>

            {/* Posts Feed */}
            <div className="space-y-4">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                        <p className="text-gray-400">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-gray-900 rounded-lg border border-gray-700">
                        <p className="text-gray-400">No posts in this category yet.</p>
                        <p className="text-gray-500 text-sm mt-2">Check back later for new content!</p>
                    </div>
                ) : (
                    posts.map((post) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            onVote={handleVote}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
