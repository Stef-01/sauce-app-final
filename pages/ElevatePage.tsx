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
    const [isAnimating, setIsAnimating] = useState(false);
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
        if (currentIndex >= cards.length || isAnimating) return;

        setIsAnimating(true);
        const currentCard = cards[currentIndex];
        const userId = 1; // TODO: Get from auth

        // Record the swipe in the background
        recordSwipe(userId, currentCard.user_id, direction).catch(console.error);

        // Wait for exit animation to complete before showing next card
        setTimeout(() => {
            if (currentIndex < cards.length - 1) {
                setCurrentIndex(currentIndex + 1);
                x.set(0);
                y.set(0);
                setIsAnimating(false);
            } else {
                loadCards().finally(() => setIsAnimating(false));
            }
        }, 300); // Match the exit animation duration
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
                <AnimatePresence mode="wait">
                    {/* Next card (background) */}
                    {cards[currentIndex + 1] && !isAnimating && (
                        <motion.div
                            key={`bg-${currentIndex + 1}`}
                            className="absolute inset-0"
                            initial={{ scale: 0.9, opacity: 0.3 }}
                            animate={{ scale: 0.95, opacity: 0.5 }}
                            transition={{ duration: 0.3 }}
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
                        initial={{ scale: 1, opacity: 1, x: 0 }}
                        animate={{ scale: 1, opacity: 1, x: 0 }}
                        exit={{
                            x: exitX,
                            opacity: 0,
                            scale: 0.8,
                            rotate: exitX > 0 ? 20 : -20,
                            transition: { duration: 0.3, ease: "easeOut" }
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
                    whileHover={{ scale: isAnimating ? 1 : 1.1 }}
                    whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                    onClick={() => {
                        if (!isAnimating) {
                            setExitX(-300);
                            handleSwipe('pass');
                        }
                    }}
                    disabled={isAnimating}
                    className={`w-14 h-14 rounded-full bg-rose-500/20 hover:bg-rose-500/30 backdrop-blur-xl flex items-center justify-center text-rose-500 transition-colors ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    aria-label="Pass"
                >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </motion.button>
                <motion.button
                    whileHover={{ scale: isAnimating ? 1 : 1.1 }}
                    whileTap={{ scale: isAnimating ? 1 : 0.95 }}
                    onClick={() => {
                        if (!isAnimating) {
                            setExitX(300);
                            handleSwipe('like');
                        }
                    }}
                    disabled={isAnimating}
                    className={`w-14 h-14 rounded-full bg-emerald-500/20 hover:bg-emerald-500/30 backdrop-blur-xl flex items-center justify-center text-emerald-500 transition-colors ${isAnimating ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    // Use professional stock images from Unsplash as fallback
    const getPlaceholderImage = () => {
        // Generate consistent random image based on user data
        const images = [
            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=400&fit=crop',
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
        ];
        const index = (card.user_id || 0) % images.length;
        return images[index];
    };

    // Generate connection reason based on profile
    const getConnectionReason = (): string => {
        if (card.willing_to_mentor && card.current_company) {
            return `Great mentor opportunity - has experience at ${card.current_company}`;
        }
        if (card.is_alumni && card.current_company) {
            return `Alumni connection with valuable insights from ${card.current_company}`;
        }
        if (card.is_student && card.skill_tags && card.skill_tags.length > 0) {
            return `Shared interests in ${card.skill_tags[0]} - great collaboration potential`;
        }
        if (card.current_title && card.current_company) {
            return `Excellent networking opportunity in ${card.current_title} role`;
        }
        if (card.skill_tags && card.skill_tags.length > 0) {
            return `Common ground in ${card.skill_tags[0]} and related fields`;
        }
        return 'Great addition to your professional network';
    };

    const displayImage = card.avatar || getPlaceholderImage();

    return (
        <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden h-full flex flex-col shadow-2xl relative">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-500/10 to-transparent pointer-events-none z-10" />

            {/* Header with Photo */}
            <div className="relative">
                <div className="relative w-full h-72 overflow-hidden">
                    <img
                        src={displayImage}
                        alt={card.full_name}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(card.full_name || 'User')}&size=600&background=gradient&color=fff&bold=true`;
                        }}
                    />
                    {/* Gradient overlay at bottom of image for text readability */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />

                    {/* Name overlay on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{card.full_name || card.title}</h2>
                        <div className="flex items-center gap-2 text-white/80 text-sm drop-shadow-lg">
                            {card.current_title && <span>{card.current_title}</span>}
                            {card.current_company && (
                                <>
                                    <span className="opacity-60">•</span>
                                    <span className="font-medium text-blue-300">{card.current_company}</span>
                                </>
                            )}
                        </div>
                        {card.grad_year && (
                            <p className="text-sm text-white/60 mt-1 drop-shadow-lg">Class of {card.grad_year}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Content section with padding */}
            <div className="px-6 py-5 flex flex-col flex-1">
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
                <p className="text-white/80 text-sm mb-4 leading-relaxed">{card.headline}</p>
            )}

            {/* Connection Reason */}
            <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <p className="text-blue-300 text-xs font-medium leading-relaxed">
                        {getConnectionReason()}
                    </p>
                </div>
            </div>

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
        </div>
    );
};

