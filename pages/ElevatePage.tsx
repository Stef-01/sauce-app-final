import React, { useState, useEffect, useRef } from 'react';
import { CommunityCard } from '../types';
import { fetchCommunityCards, recordSwipe, getSuggestedConnections } from '../services/apiService';

interface ElevatePageProps {
    onNavigate?: (page: string) => void;
}

export const ElevatePage: React.FC<ElevatePageProps> = ({ onNavigate }) => {
    const [cards, setCards] = useState<CommunityCard[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

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
        // TODO: Get actual user ID from auth
        const userId = 1; // Placeholder

        await recordSwipe(userId, currentCard.user_id, direction);

        // Move to next card
        if (currentIndex < cards.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setDragOffset({ x: 0, y: 0 });
        } else {
            // Reload cards if we've swiped through all
            loadCards();
        }
    };

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setDragStart({ x: clientX, y: clientY });
        setIsDragging(true);
    };

    const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDragging) return;
        
        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        
        const offsetX = clientX - dragStart.x;
        const offsetY = clientY - dragStart.y;
        
        setDragOffset({ x: offsetX, y: offsetY });
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        
        // Determine swipe direction
        const threshold = 100;
        if (Math.abs(dragOffset.x) > threshold) {
            if (dragOffset.x > 0) {
                handleSwipe('like');
            } else {
                handleSwipe('pass');
            }
        } else {
            // Snap back
            setDragOffset({ x: 0, y: 0 });
        }
    };

    const currentCard = cards[currentIndex];
    const rotation = dragOffset.x * 0.1;
    const opacity = 1 - Math.abs(dragOffset.x) / 300;

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
                {/* Next card (background) */}
                {cards[currentIndex + 1] && (
                    <div className="absolute inset-0 transform scale-95 opacity-50">
                        <ProfileCard card={cards[currentIndex + 1]} />
                    </div>
                )}

                {/* Current card */}
                <div
                    ref={cardRef}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                    style={{
                        transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y}px) rotate(${rotation}deg)`,
                        opacity: opacity,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
                    }}
                    onMouseDown={handleDragStart}
                    onMouseMove={handleDragMove}
                    onMouseUp={handleDragEnd}
                    onMouseLeave={handleDragEnd}
                    onTouchStart={handleDragStart}
                    onTouchMove={handleDragMove}
                    onTouchEnd={handleDragEnd}
                >
                    <ProfileCard card={currentCard} />
                </div>

                {/* Swipe indicators */}
                {Math.abs(dragOffset.x) > 50 && (
                    <div
                        className={`absolute top-1/2 transform -translate-y-1/2 z-10 text-4xl font-bold ${
                            dragOffset.x > 0 ? 'left-8 text-green-500' : 'right-8 text-red-500'
                        }`}
                    >
                        {dragOffset.x > 0 ? '✓' : '✕'}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-8">
                <button
                    onClick={() => handleSwipe('pass')}
                    className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center text-2xl font-bold transition-transform hover:scale-110"
                    aria-label="Pass"
                >
                    ✕
                </button>
                <button
                    onClick={() => handleSwipe('like')}
                    className="w-16 h-16 rounded-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center text-2xl font-bold transition-transform hover:scale-110"
                    aria-label="Like"
                >
                    ✓
                </button>
            </div>

            {/* Progress indicator */}
            <div className="mt-6 text-center text-gray-400 text-sm">
                {currentIndex + 1} of {cards.length} profiles
            </div>
        </div>
    );
};

interface ProfileCardProps {
    card: CommunityCard;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ card }) => {
    return (
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 h-full flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-2">{card.full_name || card.title}</h2>
                    <div className="flex items-center space-x-2 text-gray-400">
                        {card.current_title && (
                            <span className="text-sm">{card.current_title}</span>
                        )}
                        {card.current_company && (
                            <>
                                <span>@</span>
                                <span className="text-sm font-semibold text-blue-400">{card.current_company}</span>
                            </>
                        )}
                    </div>
                    {card.grad_year && (
                        <p className="text-sm text-gray-500 mt-1">Class of {card.grad_year}</p>
                    )}
                </div>
                <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-2xl font-bold">
                    {(card.full_name || card.title).charAt(0).toUpperCase()}
                </div>
            </div>

            {/* Headline */}
            {card.headline && (
                <p className="text-gray-300 mb-6 italic">"{card.headline}"</p>
            )}

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
                {card.is_alumni && (
                    <span className="px-3 py-1 bg-blue-900/50 text-blue-300 rounded-full text-sm">
                        Alumni
                    </span>
                )}
                {card.is_student && (
                    <span className="px-3 py-1 bg-green-900/50 text-green-300 rounded-full text-sm">
                        Student
                    </span>
                )}
                {card.willing_to_mentor && (
                    <span className="px-3 py-1 bg-purple-900/50 text-purple-300 rounded-full text-sm">
                        Mentor
                    </span>
                )}
                {card.open_to_projects && (
                    <span className="px-3 py-1 bg-orange-900/50 text-orange-300 rounded-full text-sm">
                        Open to Projects
                    </span>
                )}
            </div>

            {/* Skills */}
            {card.skill_tags && card.skill_tags.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                        {card.skill_tags.slice(0, 8).map((skill, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Seeking Roles */}
            {card.seeking_roles && card.seeking_roles.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Seeking</h3>
                    <div className="flex flex-wrap gap-2">
                        {card.seeking_roles.map((role, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 bg-blue-900/30 text-blue-300 rounded text-xs"
                            >
                                {role}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Location */}
            {card.location && (
                <div className="mt-auto pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400">📍 {card.location}</p>
                </div>
            )}
        </div>
    );
};

