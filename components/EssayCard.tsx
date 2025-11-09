import React, { useState } from 'react';
import { Post } from '../types';
import { formatPostedAt } from '../services/apiService';
import { VoteButton } from './VoteButton';
import { CommentSection } from './CommentSection';

interface EssayCardProps {
    post: Post;
    onVote?: (postId: number, direction: number) => void;
}

export const EssayCard: React.FC<EssayCardProps> = ({ post, onVote }) => {
    const [showComments, setShowComments] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const PREVIEW_LENGTH = 300; // Characters to show in preview
    const shouldTruncate = post.body.length > PREVIEW_LENGTH;

    const handleVote = (direction: number) => {
        if (onVote) {
            onVote(post.id, direction);
        }
    };

    const displayText = isExpanded || !shouldTruncate
        ? post.body
        : post.body.slice(0, PREVIEW_LENGTH) + '...';

    return (
        <article className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl">
            {/* Essay Header */}
            <div className="p-6 border-b border-white/10">
                <div className="flex items-start space-x-4">
                    <img
                        src={post.author_avatar || `https://i.pravatar.cc/100?u=${post.id}`}
                        alt={post.author_name}
                        className="w-14 h-14 rounded-full ring-2 ring-blue-500/20"
                    />
                    <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-1">
                            <span className="font-semibold text-white text-lg">{post.author_name || 'Anonymous'}</span>
                            {post.category_name && (
                                <span className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full border border-purple-500/30">
                                    Essay
                                </span>
                            )}
                        </div>
                        <span className="text-gray-400 text-sm">
                            {formatPostedAt(post.created_at)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Essay Body */}
            <div className="p-6">
                <div className="prose prose-invert max-w-none">
                    <p className="text-white/90 text-base leading-relaxed whitespace-pre-wrap">
                        {displayText}
                    </p>
                </div>

                {/* See More Button */}
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors group"
                    >
                        <span>{isExpanded ? 'See Less' : 'See More'}</span>
                        <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                )}

                {post.media_url && (
                    <div className="mt-6">
                        <img
                            src={post.media_url}
                            alt="Essay media"
                            className="rounded-xl w-full h-auto shadow-lg"
                        />
                    </div>
                )}
            </div>

            {/* Essay Actions */}
            <div className="px-6 pb-6">
                <div className="flex items-center space-x-6 pt-4 border-t border-white/10">
                    <VoteButton
                        score={post.score}
                        userVote={post.user_vote || 0}
                        onVote={handleVote}
                    />
                    <button
                        onClick={() => setShowComments(!showComments)}
                        className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors group"
                    >
                        <svg
                            className="w-5 h-5 group-hover:scale-110 transition-transform"
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
                        <span className="font-medium">{post.comment_count || 0} {(post.comment_count || 0) === 1 ? 'Comment' : 'Comments'}</span>
                    </button>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <CommentSection postId={post.id} />
                    </div>
                )}
            </div>
        </article>
    );
};
