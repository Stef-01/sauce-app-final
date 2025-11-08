import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ProjectBriefPreviewProps {
    brief: string;
}

export const ProjectBriefPreview: React.FC<ProjectBriefPreviewProps> = ({ brief }) => {
    return (
        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-lg mt-6">
            <h2 className="text-2xl font-bold mb-4">Refined Project Brief</h2>
            <div className="prose prose-invert max-w-none">
                 <ReactMarkdown>{brief}</ReactMarkdown>
            </div>
        </div>
    );
};
