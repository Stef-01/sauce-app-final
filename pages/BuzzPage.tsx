import React from 'react';
import { ForumPost } from '../types';

interface BuzzPageProps {
    posts: ForumPost[];
}

const BuzzCard: React.FC<{ post: ForumPost }> = ({ post }) => (
    <div className="bg-gray-800/50 border border-gray-700 p-5 rounded-lg">
        <div className="flex items-center mb-3">
            <img src={post.author.avatar} alt={post.author.name} className="w-10 h-10 rounded-full mr-3" />
            <div>
                <p className="font-semibold text-white">{post.author.name}</p>
                <p className="text-xs text-gray-400">{post.timestamp}</p>
            </div>
        </div>
        <p className="text-gray-300">{post.content}</p>
    </div>
);


export const BuzzPage: React.FC<BuzzPageProps> = ({ posts }) => {
    return (
        <div className="animate-fade-in my-8">
            <h1 className="text-3xl font-bold mb-6">Buzz</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(post => (
                    <BuzzCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};
