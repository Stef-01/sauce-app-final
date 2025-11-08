import React from 'react';
import { Page } from '../types';

interface HeaderProps {
    currentPage: Page;
    setCurrentPage: (page: Page) => void;
}

const navItems: Page[] = ['Community', 'Internships', 'Buzz', 'Profile'];

export const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
    return (
        <header className="sticky top-0 z-20 bg-[#111827] bg-opacity-80 backdrop-blur-lg border-b border-gray-700/50">
            <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto px-4 md:px-10 py-3">
                <h1 className="text-2xl font-bold text-white">
                    University Hub
                </h1>
                <nav className="flex items-center space-x-2">
                    {navItems.map((item) => (
                        <button
                            key={item}
                            onClick={() => setCurrentPage(item)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-200 ${
                                currentPage === item
                                    ? 'bg-white text-black'
                                    : 'bg-gray-700/50 text-white hover:bg-gray-600/50 border border-gray-600'
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
            </div>
        </header>
    );
};
