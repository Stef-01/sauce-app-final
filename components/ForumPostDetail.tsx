import React from 'react';
import { ForumPost } from '../types';

interface ForumPostDetailProps {
    post: ForumPost;
}

export const ForumPostDetail: React.FC<ForumPostDetailProps> = ({ post }) => {
    return (
        <div>
            <div className="flex items-center mb-4">
                <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full mr-4" />
                <div>
                    <h1 className="text-2xl font-bold">{post.author}</h1>
                    <p className="text-sm text-white/60">{post.postedAt}</p>
                </div>
            </div>
            <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
            <p className="text-white/90 whitespace-pre-wrap">{post.content}</p>
            <div className="mt-6 border-t border-gray-700 pt-4">
                <h3 className="text-xl font-bold mb-4">Comments ({post.comments})</h3>
                <div className="text-center text-gray-400">
                    <p>Comments section coming soon.</p>
                </div>
            </div>
        </div>
    );
};
