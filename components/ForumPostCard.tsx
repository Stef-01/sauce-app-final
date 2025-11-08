import React from 'react';
import { ForumPost } from '../types';

interface ForumPostCardProps {
    post: ForumPost;
    onClick?: () => void;
}

export const ForumPostCard: React.FC<ForumPostCardProps> = ({ post, onClick }) => {
    return (
        <div onClick={onClick} className="items-start backdrop-blur-2xl bg-white/5 box-border caret-transparent flex p-5 rounded-2xl w-full hover:bg-white/10 transition-colors duration-200 cursor-pointer">
            <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full mr-4" />
            <div className="flex-grow">
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-semibold text-white">{post.author}</span>
                        <span className="text-sm text-white/60 ml-2">{post.postedAt}</span>
                    </div>
                </div>
                <h4 className="text-lg font-bold text-white mt-1">{post.title}</h4>
                <p className="text-white/80 text-sm mt-1 line-clamp-2">{post.content}</p>
                <div className="flex items-center text-sm text-white/60 mt-3 space-x-4">
                    <span>{post.upvotes} Upvotes</span>
                    <span>{post.comments} Comments</span>
                </div>
            </div>
        </div>
    );
};
