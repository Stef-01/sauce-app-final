import React from 'react';

interface ProjectBriefPreviewProps {
    brief: string;
}

export const ProjectBriefPreview: React.FC<ProjectBriefPreviewProps> = ({ brief }) => {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">AI-Generated Brief</h2>
            <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg whitespace-pre-wrap text-white/90">
                {brief}
            </div>
        </div>
    );
};
