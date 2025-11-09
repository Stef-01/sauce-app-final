import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        loadComments();
    }, [postId]);

    const loadComments = async () => {
        setLoading(true);
        try {
            const fetchedComments = await fetchCommentsForPost(postId);
            setComments(fetchedComments);
        } catch (error) {
            console.error('Error loading comments:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const comment = await createComment(postId, newComment.trim());
            if (comment) {
                setComments([comment, ...comments]);
                setNewComment('');
            }
        } catch (error) {
            console.error('Error creating comment:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="text-gray-400 text-center py-4">
                Loading comments...
            </div>
        );
    }

    return (
        <div>
            {/* Comment Form */}
            <form onSubmit={handleSubmitComment} className="mb-6">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={3}
                />
                <div className="flex justify-end mt-2">
                    <button
                        type="submit"
                        disabled={!newComment.trim() || isSubmitting}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
                    >
                        {isSubmitting ? 'Posting...' : 'Post Comment'}
                    </button>
                </div>
            </form>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length === 0 ? (
                    <div className="text-gray-400 text-center py-4">
                        No comments yet. Be the first to comment!
                    </div>
                ) : (
                    comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                )}
            </div>
        </div>
    );
};

interface CommentItemProps {
    comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    return (
        <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
                <img
                    src={comment.author_avatar || `https://i.pravatar.cc/100?u=${comment.id}`}
                    alt={comment.author_name}
                    className="w-8 h-8 rounded-full"
                />
                <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="font-semibold text-white text-sm">
                            {comment.author_name || 'Anonymous'}
                        </span>
                        <span className="text-gray-400 text-xs">
                            {formatPostedAt(comment.created_at)}
                        </span>
                        {comment.score !== 0 && (
                            <span className="text-xs text-gray-500">
                                • {comment.score > 0 ? '+' : ''}{comment.score} points
                            </span>
                        )}
                    </div>
                    <p className="text-white/90 text-sm whitespace-pre-wrap">{comment.body}</p>
                </div>
            </div>
        </div>
    );
};

