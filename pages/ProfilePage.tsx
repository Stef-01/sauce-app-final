import React from 'react';

export const ProfilePage: React.FC = () => {
    const user = {
        name: 'Alex Doe',
        avatar: 'https://i.pravatar.cc/150?u=alex',
        email: 'alex.doe@university.edu',
        major: 'Computer Science',
        year: 'Junior',
    };

    return (
        <div className="animate-fade-in my-8 text-white">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-lg flex flex-col sm:flex-row items-center text-center sm:text-left">
                <img src={user.avatar} alt={user.name} className="w-32 h-32 rounded-full mb-4 sm:mb-0 sm:mr-8 border-4 border-gray-600" />
                <div>
                    <h2 className="text-2xl font-bold">{user.name}</h2>
                    <p className="text-gray-400">{user.email}</p>
                    <div className="mt-4">
                        <span className="inline-block bg-blue-600/50 text-blue-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{user.major}</span>
                        <span className="inline-block bg-green-600/50 text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{user.year}</span>
                    </div>
                </div>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">My Activity</h3>
                <div className="bg-gray-800/50 border border-gray-700 p-8 rounded-lg text-center text-gray-400">
                    <p>Your activity will be displayed here.</p>
                    <p className="text-sm mt-2">(Feature coming soon)</p>
                </div>
            </div>
        </div>
    );
};
