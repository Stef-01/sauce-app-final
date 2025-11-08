import React, { useState } from 'react';
import { refineProjectBrief } from '../services/geminiService';
import { ProjectBriefPreview } from '../components/ProjectBriefPreview';

export const ProjectRefinerPage: React.FC = () => {
    const [projectIdea, setProjectIdea] = useState('');
    const [refinedBrief, setRefinedBrief] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!projectIdea.trim()) return;

        setIsLoading(true);
        setRefinedBrief('');
        const result = await refineProjectBrief(projectIdea);
        setRefinedBrief(result);
        setIsLoading(false);
    };

    return (
        <div className="animate-fade-in my-8">
            <h1 className="text-3xl font-bold mb-4">Project Idea Refiner</h1>
            <p className="text-gray-400 mb-6">Have a project idea? Describe it below and let AI help you structure it into a formal project brief.</p>
            
            <form onSubmit={handleSubmit}>
                <textarea
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                    placeholder="e.g., A mobile app to connect local gardeners and share produce..."
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 h-40 focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                <button
                    type="submit"
                    className="mt-4 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:bg-blue-800 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? 'Refining...' : 'Refine Idea'}
                </button>
            </form>

            {isLoading && (
                <div className="text-center mt-6">
                    <p>AI is thinking... this might take a moment.</p>
                </div>
            )}
            
            {refinedBrief && <ProjectBriefPreview brief={refinedBrief} />}
        </div>
    );
};
