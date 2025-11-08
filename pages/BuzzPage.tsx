import React, { useState } from 'react';
import { Article, Wisdom } from '../types';
import { ArticleCard } from '../components/ArticleCard';
import { WisdomCard } from '../components/WisdomCard';
import { BuzzPostDetailModal } from '../components/BuzzPostDetailModal';

interface BuzzPageProps {
    articles: Article[];
    wisdoms: Wisdom[];
}

export const BuzzPage: React.FC<BuzzPageProps> = ({ articles, wisdoms }) => {
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

    return (
        <div className="animate-fade-in my-8">
            <h1 className="text-3xl font-bold mb-6">Buzz Feed</h1>

            <div className="mb-12">
                <h2 className="text-2xl font-bold text-blue-300 mb-4">Daily Wisdom</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wisdoms.map(wisdom => (
                        <WisdomCard key={wisdom.id} wisdom={wisdom} />
                    ))}
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold text-blue-300 mb-4">Latest Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                        <ArticleCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
                    ))}
                </div>
            </div>
            
            {selectedArticle && (
                <BuzzPostDetailModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
            )}
        </div>
    );
};
