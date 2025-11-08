import React from 'react';
import { ForumPost } from '../types';

interface ForumPostCardProps {
    post: ForumPost;
    // Fix: Add onClick prop to make the card interactive.
    onClick?: () => void;
}

export const ForumPostCard: React.FC<ForumPostCardProps> = ({ post, onClick }) => {
    return (
        // Fix: Apply onClick handler and add cursor-pointer class for better UX.
        <div onClick={onClick} className="items-start backdrop-blur-2xl bg-white/5 box-border caret-transparent flex flex-col p-5 rounded-2xl w-full hover:bg-white/10 transition-colors duration-200 cursor-pointer">
            <div className="items-center box-border caret-transparent flex w-full">
                <img src={post.author.avatar} alt={post.author.name} className="box-border caret-transparent h-12 w-12 object-cover rounded-full mr-4" />
                <div className="flex flex-col grow">
                    <span className="font-bold text-white">{post.author.name}</span>
                    <span className="text-sm text-white/60">{post.author.title}</span>
                </div>
                <div className="flex items-center text-sm text-white/60">
                    <span>{post.timestamp}</span>
                </div>
            </div>
            <div className="mt-4">
                <h4 className="text-lg font-bold text-white mb-2">{post.title}</h4>
                <p className="text-white/80 line-clamp-2">{post.content}</p>
            </div>
            <div className="flex items-center text-sm text-white/60 mt-4 w-full">
                <div className="flex items-center mr-6">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.562 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"></path></svg>
                    {post.likes}
                </div>
                <div className="flex items-center mr-6">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 1v6h12V6H4zm0 2h12v2H4V8z" clipRule="evenodd"></path></svg>
                    {post.comments.length}
                </div>
                <span className="flex items-center ml-auto">
                    <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path></svg>
                    {post.views}
                </span>
            </div>
        </div>
    );
};
