import React from 'react';
import { Wisdom } from '../types';

interface WisdomCardProps {
    wisdom: Wisdom;
}

export const WisdomCard: React.FC<WisdomCardProps> = ({ wisdom }) => {
    return (
        <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
            <blockquote className="text-lg italic text-white/90">
                "{wisdom.quote}"
            </blockquote>
            <cite className="block text-right mt-2 text-blue-300/80 not-italic">
                &mdash; {wisdom.author}
            </cite>
        </div>
    );
};
