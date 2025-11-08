import React from 'react';

export const RestrictedAccess: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full">
            <div className="text-center p-8 bg-gray-800 rounded-lg">
                <h2 className="text-2xl font-bold text-red-500 mb-2">Access Denied</h2>
                <p className="text-white/80">You do not have permission to view this content.</p>
            </div>
        </div>
    );
};
