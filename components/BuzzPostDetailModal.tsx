import React from 'react';
import { Article } from '../types';
import { BuzzPostDetail } from './BuzzPostDetail';

interface BuzzPostDetailModalProps {
    article: Article;
    onClose: () => void;
}

export const BuzzPostDetailModal: React.FC<BuzzPostDetailModalProps> = ({ article, onClose }) => {
    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-3xl text-white max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
            >
                <div className="sticky top-0 flex justify-end p-2 bg-gray-900/80 backdrop-blur-sm">
                    <button onClick={onClose} className="text-2xl hover:text-gray-400 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">&times;</button>
                </div>
                <BuzzPostDetail article={article} />
            </div>
        </div>
    );
};
