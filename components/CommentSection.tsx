import React, { useState, useEffect, useRef } from 'react';
import { Comment } from '../types';
import { fetchCommentsForPost, createComment, formatPostedAt } from '../services/apiService';

interface CommentSectionProps {
    postId: number;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ postId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [newComment, setNewComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const commentInputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedComments = await fetchCommentsForPost(postId);
            setComments(fetchedComments);
        } catch (error) {
            setError('Unable to load comments. Please try again later.');
            console.error('Error loading comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedComment = newComment.trim();
        
        if (!trimmedComment || isSubmitting) return;
        if (trimmedComment.length < 2) {
            setError('Comment must be at least 2 characters long');
            return;
        }

        setIsSubmitting(true);
        setError(null);
        
        try {
            const comment = await createComment(postId, trimmedComment);
            if (comment) {
                setComments(prev => [comment, ...prev]);
                setNewComment('');
                setError(null);
                
                // Smoothly scroll to the new comment
                setTimeout(() => {
                    document.getElementById(`comment-${comment.id}`)?.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 100);
            }
        } catch (error) {
            setError('Unable to post comment. Please try again.');
            console.error('Error creating comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmitComment(e);
        }
    };

    // Auto-resize textarea as user types
    const adjustTextareaHeight = () => {
        if (commentInputRef.current) {
            commentInputRef.current.style.height = 'auto';
            commentInputRef.current.style.height = commentInputRef.current.scrollHeight + 'px';
        }
    };

    const formatCommentTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) return 'just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    if (loading) {
        return (
            <div className="min-h-[200px] flex items-center justify-center">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-white/20 border-t-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 space-y-6">
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="space-y-3">
                <div className="relative">
                    <textarea
                        ref={commentInputRef}
                        value={newComment}
                        onChange={(e) => {
                            setNewComment(e.target.value);
                            adjustTextareaHeight();
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder="Share your thoughts..."
                        className="w-full bg-white/10 backdrop-blur-xl text-white placeholder-white/40 border border-white/10 rounded-lg px-4 py-3 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-shadow"
                        style={{ height: 'auto' }}
                    />
                    {error && (
                        <p className="absolute -bottom-6 left-0 text-sm text-rose-500">
                            {error}
                        </p>
                    )}
                </div>
                <div className="flex items-center justify-between">
                    <p className="text-xs text-white/40">
                        Press Enter to post • Shift + Enter for new line
                    </p>
                    <button
                        type="submit"
                        disabled={isSubmitting || !newComment.trim()}
                        className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-xl"
                    >
                        {isSubmitting ? 'Posting...' : 'Post'}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <p className="text-center text-white/40 py-8">
                        Be the first to share your thoughts
                    </p>
                ) : (
                    comments.map((comment) => (
                        <CommentItem 
                            key={comment.id} 
                            comment={comment} 
                            formatTime={formatCommentTime} 
                        />
                    ))
                )}
            </div>
        </div>
    );
};

interface CommentItemProps {
    comment: Comment;
    formatTime: (timestamp: string) => string;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, formatTime }) => {
    return (
        <div
            id={`comment-${comment.id}`}
            className="group animate-fadeIn border-b border-white/10 pb-4 transition-opacity"
        >
            <div className="flex items-start gap-3">
                <img
                    src={comment.user.avatar || `https://ui-avatars.com/api/?name=${comment.user.name}&background=random`}
                    alt={comment.user.name}
                    className="w-8 h-8 rounded-full bg-white/10"
                />
                <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                        <h4 className="font-medium text-white truncate">
                            {comment.user.name}
                        </h4>
                        <span className="text-xs text-white/40">
                            {formatTime(comment.created_at)}
                        </span>
                    </div>
                    <div className="text-white/80 text-sm whitespace-pre-wrap break-words">
                        {comment.content}
                    </div>
                </div>
            </div>
        </div>
    );
};

