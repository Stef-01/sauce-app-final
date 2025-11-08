import React from 'react';
import { Article } from '../types';

interface ArticleCardProps {
    article: Article;
    onClick?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group"
        >
            <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover" />
            <div className="p-5">
                <p className="text-sm text-gray-400 mb-1">{article.source} - {article.publishedAt}</p>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400">{article.title}</h3>
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{article.summary}</p>
                <span className="font-semibold text-blue-500 group-hover:underline">Read More &rarr;</span>
            </div>
        </div>
    );
};
