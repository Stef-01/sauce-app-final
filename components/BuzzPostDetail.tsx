import React from 'react';
import { Article } from '../types';

interface BuzzPostDetailProps {
    article: Article;
}

export const BuzzPostDetail: React.FC<BuzzPostDetailProps> = ({ article }) => {
    return (
        <div>
            <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover rounded-t-lg" />
            <div className="p-8">
                <p className="text-md text-gray-400 mb-2">{article.source} - {article.publishedAt}</p>
                <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>
                <p className="text-lg text-white/80 leading-relaxed mb-6">{article.summary}</p>
                <a 
                    href={article.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                    Read Full Article
                </a>
            </div>
        </div>
    );
};
