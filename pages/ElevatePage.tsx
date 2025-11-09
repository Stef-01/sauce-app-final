import React, { useState, useEffect, useRef } from 'react';
import { CommunityCard } from '../types';
import { fetchCommunityCards, recordSwipe, getSuggestedConnections } from '../services/apiService';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

interface ElevatePageProps {
    onNavigate?: (page: string) => void;
}

export const ElevatePage: React.FC<ElevatePageProps> = ({ onNavigate }) => {
    const [cards, setCards] = useState<CommunityCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [exitX, setExitX] = useState(0);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Transform values
    const rotate = useTransform(x, [-300, 0, 300], [-45, 0, 45]);
    const scale = useTransform(x, [-300, 0, 300], [0.9, 1, 0.9]);
    
    // Indicator opacities
    const likeOpacity = useTransform(x, [0, 125], [0, 1]);
    const nopeOpacity = useTransform(x, [-125, 0], [1, 0]);

    // Card background
    const background = useTransform(
        x,
        [-300, -100, 0, 100, 300],
        [
            'rgba(239, 68, 68, 0.1)',  // Red for nope
            'rgba(239, 68, 68, 0.05)',
            'rgba(255, 255, 255, 0)',  // Neutral
            'rgba(34, 197, 94, 0.05)',
            'rgba(34, 197, 94, 0.1)'   // Green for like
        ]
    );

    useEffect(() => {
        loadCards();
    }, []);

    const loadCards = async () => {
        setLoading(true);
        try {
            // For now, fetch all cards. In production, use getSuggestedConnections with user ID
            const fetchedCards = await fetchCommunityCards();
            setCards(fetchedCards);
            setCurrentIndex(0);
        } catch (error) {
            console.error('Error loading cards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSwipe = async (direction: 'like' | 'pass') => {
        if (currentIndex >= cards.length) return;

        const currentCard = cards[currentIndex];
        const userId = 1; // TODO: Get from auth

        await recordSwipe(userId, currentCard.user_id, direction);

        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            x.set(0);
            y.set(0);
        } else {
            await loadCards();
        }
    };

        const handleDragEnd = (event: any, info: any) => {
        const swipe = info.offset.x;
        const velocity = info.velocity.x;
        const swipeThreshold = 100;
        
        // Check if the card was swiped fast enough or far enough
        if (Math.abs(swipe) > swipeThreshold || Math.abs(velocity) > 800) {
            const direction = swipe > 0 ? 'like' : 'pass';
            setExitX(direction === 'like' ? 300 : -300);
            handleSwipe(direction);
        } else {
            // Reset position if not swiped enough
            x.set(0);
            y.set(0);
        }
    };

    const currentCard = cards[currentIndex];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-400">Loading profiles...</p>
                </div>
            </div>
        );
    }

    if (!currentCard) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="text-center">
                    <p className="text-gray-400 text-xl mb-4">No more profiles to show</p>
                    <button
                        onClick={loadCards}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                    >
                        Reload Cards
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in my-8 max-w-2xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <button
                        onClick={() => onNavigate?.('community')}
                        className="text-gray-400 hover:text-white mb-2 flex items-center space-x-2"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span>Back to Community</span>
                    </button>
                    <h1 className="text-3xl font-bold mb-2">Elevate</h1>
                    <p className="text-gray-400">Swipe to connect with students and alumni</p>
                </div>
            </div>

            {/* Card Stack */}
            <div className="relative h-[600px] mb-6">
                <AnimatePresence>
                    {/* Next card (background) */}
                    {cards[currentIndex + 1] && (
                        <motion.div
                            className="absolute inset-0"
                            initial={{ scale: 0.95, opacity: 0.5 }}
                            animate={{ scale: 0.95, opacity: 0.5 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <ProfileCard card={cards[currentIndex + 1]} />
                        </motion.div>
                    )}

                    {/* Current card */}
                    <motion.div
                        key={currentIndex}
                        className="absolute inset-0 cursor-grab active:cursor-grabbing"
                        style={{
                            x,
                            y,
                            rotate,
                            scale,
                            background
                        }}
                        drag="x"
                        dragConstraints={{ left: -1000, right: 1000, top: 0, bottom: 0 }}
                        dragElastic={0.7}
                        onDragEnd={handleDragEnd}
                        whileDrag={{ cursor: "grabbing" }}
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ 
                            x: exitX,
                            opacity: 0,
                            scale: 0.9,
                            transition: { duration: 0.2 }
                        }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 300
                        }}
                    >
                        <ProfileCard card={currentCard} />
                    </motion.div>

                    {/* Like Indicator */}
                    <motion.div
                        className="absolute top-1/2 left-8 transform -translate-y-1/2 z-10"
                        style={{ opacity: likeOpacity }}
                    >
                        <div className="flex items-center justify-center w-16 h-16 bg-emerald-500/20 rounded-full">
                            <span className="text-2xl text-emerald-500">✓</span>
                        </div>
                    </motion.div>

                    {/* Nope Indicator */}
                    <motion.div
                        className="absolute top-1/2 right-8 transform -translate-y-1/2 z-10"
                        style={{ opacity: nopeOpacity }}
                    >
                        <div className="flex items-center justify-center w-16 h-16 bg-rose-500/20 rounded-full">
                            <span className="text-2xl text-rose-500">✕</span>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center items-center gap-6">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setExitX(-300);
                        handleSwipe('pass');
                    }}
                    className="w-14 h-14 rounded-full bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-xl flex items-center justify-center text-rose-500 transition-colors"
                    aria-label="Pass"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setExitX(300);
                        handleSwipe('like');
                    }}
                    className="w-14 h-14 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-xl flex items-center justify-center text-emerald-500 transition-colors"
                    aria-label="Like"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
            </div>

            {/* Progress indicator */}
            <div className="mt-4 text-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 backdrop-blur-xl">
                    <span className="text-sm text-white/60">
                        {currentIndex + 1} of {cards.length}
                    </span>
                </div>
            </div>
        </div>
    );
};

interface ProfileCardProps {
    card: CommunityCard;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ card }) => {
    return (
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-full flex flex-col shadow-2xl overflow-hidden">
            {/* Header with Photo */}
            <div className="mb-6">
                {card.avatar ? (
                    <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4">
                        <img
                            src={card.avatar}
                            alt={card.full_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-full h-48 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                        <span className="text-4xl font-bold text-white/80">
                            {(card.full_name || card.title || '?').charAt(0).toUpperCase()}
                        </span>
                    </div>
                )}
                
                <h2 className="text-xl font-bold text-white mb-1">{card.full_name || card.title}</h2>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                    {card.current_title && <span>{card.current_title}</span>}
                    {card.current_company && (
                        <>
                            <span className="opacity-40">•</span>
                            <span className="font-medium text-blue-400">{card.current_company}</span>
                        </>
                    )}
                </div>
                {card.grad_year && (
                    <p className="text-sm text-white/40 mt-1">Class of {card.grad_year}</p>
                )}
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
                {card.is_alumni && (
                    <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-medium">
                        Alumni
                    </span>
                )}
                {card.is_student && (
                    <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-medium">
                        Student
                    </span>
                )}
                {card.willing_to_mentor && (
                    <span className="px-2.5 py-1 bg-purple-500/10 text-purple-400 rounded-full text-xs font-medium">
                        Mentor
                    </span>
                )}
            </div>

            {/* Bio/Headline */}
            {card.headline && (
                <p className="text-white/80 text-sm mb-6 leading-relaxed">{card.headline}</p>
            )}

            {/* Skills */}
            {card.skill_tags && card.skill_tags.length > 0 && (
                <div className="mt-auto">
                    <h3 className="text-xs font-medium text-white/40 mb-2">Skills & Interests</h3>
                    <div className="flex flex-wrap gap-1.5">
                        {card.skill_tags.slice(0, 6).map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-0.5 bg-white/5 text-white/60 rounded-md text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Footer Info */}
            {card.location && (
                <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/40 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {card.location}
                    </p>
                </div>
            )}
        </div>
    );
};

