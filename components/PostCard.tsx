import React, { useState } from 'react';
import { Post } from '../types';
import { formatPostedAt } from '../services/apiService';
import { VoteButton } from './VoteButton';
import { CommentSection } from './CommentSection';

interface PostCardProps {
    post: Post;
    onVote?: (postId: number, direction: number) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onVote }) => {
    const [showComments, setShowComments] = useState(false);

    const handleVote = (direction: number) => {
        if (onVote) {
            onVote(post.id, direction);
        }
    };

    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors">
            {/* Post Header */}
            <div className="flex items-start space-x-3 mb-4">
                <img
                    src={post.author_avatar || `https://i.pravatar.cc/100?u=${post.id}`}
                    alt={post.author_name}
                    className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white">{post.author_name || 'Anonymous'}</span>
                        {post.category_name && (
                            <span className="text-xs px-2 py-1 bg-blue-900/50 text-blue-300 rounded-full">
                                {post.category_name}
                            </span>
                        )}
                        <span className="text-gray-400 text-sm">
                            {formatPostedAt(post.created_at)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Post Body */}
            <div className="mb-4">
                <p className="text-white/90 leading-relaxed whitespace-pre-wrap">{post.body}</p>
                {post.media_url && (
                    <div className="mt-4">
                        <img
                            src={post.media_url}
                            alt="Post media"
                            className="rounded-lg max-w-full h-auto"
                        />
                    </div>
                )}
            </div>

            {/* Post Actions */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-700">
                <VoteButton
                    score={post.score}
                    userVote={post.user_vote || 0}
                    onVote={handleVote}
                />
                <button
                    onClick={() => setShowComments(!showComments)}
                    className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                    </svg>
                    <span>{post.comment_count || 0}</span>
                </button>
            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                    <CommentSection postId={post.id} />
                </div>
            )}
        </div>
    );
};

