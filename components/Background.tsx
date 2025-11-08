import React from 'react';

export const Background: React.FC = () => {
    return (
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-blue-900/40 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-purple-900/40 rounded-full filter blur-3xl opacity-50 animate-pulse delay-1000"></div>
        </div>
    );
};
