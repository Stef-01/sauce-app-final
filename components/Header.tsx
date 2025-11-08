import React from 'react';

interface HeaderProps {
    onNavigate: (page: string) => void;
    activePage: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activePage }) => {
    const navItems = ['Community', 'Projects', 'Buzz', 'Events', 'Profile'];

    const getLinkClass = (page: string) => {
        return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            activePage === page.toLowerCase()
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`;
    };

    return (
        <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-40 w-full">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 text-white font-bold text-xl">
                           CareerConnect
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => onNavigate(item.toLowerCase())}
                                    className={getLinkClass(item.toLowerCase())}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};
