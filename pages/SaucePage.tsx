import React from 'react';

interface Article {
    id: number;
    title: string;
    author: string;
    company: string;
    readTime: string;
    imageUrl: string;
    excerpt: string;
    category: string;
}

const curatedArticles: Article[] = [
    {
        id: 1,
        title: "My Experience Getting into MBB: A Stanford Journey",
        author: "Sarah Chen",
        company: "McKinsey & Company",
        readTime: "8 min read",
        imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop",
        excerpt: "From case prep to final rounds, here's everything I learned breaking into management consulting at a top-tier firm.",
        category: "Consulting"
    },
    {
        id: 2,
        title: "What Google DeepMind is Actually Looking For",
        author: "Marcus Rodriguez",
        company: "Google DeepMind",
        readTime: "10 min read",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
        excerpt: "Behind the scenes of DeepMind's hiring process and the skills that matter most for AI research roles.",
        category: "AI & ML"
    },
    {
        id: 3,
        title: "Stanford CS Courses I Wish I Took as a Google Engineer",
        author: "Alex Kim",
        company: "Google",
        readTime: "6 min read",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop",
        excerpt: "Looking back at my CS degree, these are the courses that would have made the biggest impact on my career.",
        category: "Tech"
    },
    {
        id: 4,
        title: "How to Sell Yourself in an Investment Banking Interview",
        author: "Jordan Williams",
        company: "Goldman Sachs",
        readTime: "7 min read",
        imageUrl: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop",
        excerpt: "Master the art of storytelling and technical prep to stand out in competitive banking interviews.",
        category: "Finance"
    },
    {
        id: 5,
        title: "Navigating Values: Finding an Ethical Private Equity Career",
        author: "Emma Thompson",
        company: "Bain Capital",
        readTime: "9 min read",
        imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
        excerpt: "How to align your personal values with a career in private equity while making a positive impact.",
        category: "Finance"
    }
];

export const SaucePage: React.FC = () => {
    return (
        <div className="animate-fade-in my-8 max-w-6xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Sauce
                </h1>
                <p className="text-white/60 text-lg">
                    Exclusive insights and career wisdom from industry leaders
                </p>
            </div>

            {/* Featured Article */}
            {curatedArticles.length > 0 && (
                <div className="mb-12">
                    <div className="relative group cursor-pointer rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300">
                        <div className="grid md:grid-cols-2 gap-0">
                            {/* Image */}
                            <div className="relative h-64 md:h-auto overflow-hidden">
                                <img
                                    src={curatedArticles[0].imageUrl}
                                    alt={curatedArticles[0].title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent md:bg-gradient-to-r md:from-gray-900/20 md:to-gray-900" />
                            </div>

                            {/* Content */}
                            <div className="p-8 flex flex-col justify-center">
                                <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium mb-4 w-fit">
                                    Featured
                                </span>
                                <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                    {curatedArticles[0].title}
                                </h2>
                                <p className="text-white/70 mb-6 leading-relaxed">
                                    {curatedArticles[0].excerpt}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-white/50">
                                    <span className="font-medium text-white/80">{curatedArticles[0].author}</span>
                                    <span>•</span>
                                    <span>{curatedArticles[0].company}</span>
                                    <span>•</span>
                                    <span>{curatedArticles[0].readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Article Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {curatedArticles.slice(1).map((article) => (
                    <div
                        key={article.id}
                        className="group cursor-pointer rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-1"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                            <img
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />

                            {/* Category badge */}
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 bg-white/10 backdrop-blur-xl text-white rounded-full text-xs font-medium border border-white/20">
                                    {article.category}
                                </span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                                {article.title}
                            </h3>
                            <p className="text-white/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                                {article.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-white/50">
                                <span className="font-medium text-white/70">{article.author}</span>
                                <span>•</span>
                                <span>{article.company}</span>
                                <span>•</span>
                                <span>{article.readTime}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Coming Soon Section */}
            <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                <h3 className="text-xl font-bold text-white mb-2">More stories coming soon</h3>
                <p className="text-white/60">
                    We're curating more exclusive content from top professionals. Check back regularly for new insights.
                </p>
            </div>
        </div>
    );
};
