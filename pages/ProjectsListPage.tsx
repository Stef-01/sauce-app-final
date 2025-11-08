import React from 'react';

export const ProjectsListPage: React.FC = () => {
    return (
        <div className="animate-fade-in my-8 text-white">
            <h1 className="text-3xl font-bold mb-6">My Projects</h1>
            <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-lg text-center text-gray-400">
                <p>Your saved projects will be displayed here.</p>
                <p className="text-sm mt-2">(Feature coming soon)</p>
            </div>
        </div>
    );
};
