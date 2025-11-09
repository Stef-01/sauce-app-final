import React from 'react';

interface VoteButtonProps {
    score: number;
    userVote: number; // -1, 0, or 1
    onVote: (direction: number) => void;
}

export const VoteButton: React.FC<VoteButtonProps> = ({ score, userVote, onVote }) => {
    const handleUpvote = () => {
        const newDirection = userVote === 1 ? 0 : 1;
        onVote(newDirection);
    };

    const handleDownvote = () => {
        const newDirection = userVote === -1 ? 0 : -1;
        onVote(newDirection);
    };

    return (
        <div className="flex items-center space-x-2">
            <button
                onClick={handleUpvote}
                className={`p-1 rounded transition-colors ${
                    userVote === 1
                        ? 'text-blue-500 hover:text-blue-400'
                        : 'text-gray-400 hover:text-blue-400'
                }`}
                aria-label="Upvote"
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
            <span className={`text-sm font-medium min-w-[2rem] text-center ${
                score > 0 ? 'text-blue-400' : score < 0 ? 'text-red-400' : 'text-gray-400'
            }`}>
                {score}
            </span>
            <button
                onClick={handleDownvote}
                className={`p-1 rounded transition-colors ${
                    userVote === -1
                        ? 'text-red-500 hover:text-red-400'
                        : 'text-gray-400 hover:text-red-400'
                }`}
                aria-label="Downvote"
            >
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </div>
    );
};

