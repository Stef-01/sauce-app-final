import React from 'react';
import { ForumPost } from '../types';
import { ForumPostCard } from './ForumPostCard';

interface ActivityFeedProps {
    posts: ForumPost[];
    onSelectPost: (post: ForumPost) => void;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ posts, onSelectPost }) => {
    return (
        <div className="box-border caret-transparent w-full mt-12">
            <h3 className="text-lg font-bold box-border caret-transparent leading-[25.2px] break-words text-ellipsis md:text-[22px] md:leading-[30.8px] mb-4">
                Community Activity
            </h3>
            <div className="flex flex-col gap-4">
                {posts.map(post => (
                    <ForumPostCard key={post.id} post={post} onClick={() => onSelectPost(post)} />
                ))}
            </div>
        </div>
    );
};
