import React from 'react';

interface MainContentProps {
    children: React.ReactNode;
}

export const MainContent: React.FC<MainContentProps> = ({ children }) => {
    return (
        <main className="w-full max-w-screen-xl mx-auto px-4 md:px-10 flex-grow">
            {children}
        </main>
    );
};
