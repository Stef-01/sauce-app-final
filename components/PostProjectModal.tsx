import React, { useState } from 'react';
import { Project } from '../types';
import { refineTechnicalRequirements } from '../services/geminiService';

interface PostProjectModalProps {
    onClose: () => void;
    onAddProject: (project: Omit<Project, 'id' | 'logo' | 'postedAt'>) => Promise<void>;
}

export const PostProjectModal: React.FC<PostProjectModalProps> = ({ onClose, onAddProject }) => {
    // Basic form state
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [isRemote, setIsRemote] = useState(false);

    // AI refinement state
    const [isRefining, setIsRefining] = useState(false);
    const [showAISection, setShowAISection] = useState(false);
    const [refinedRequirements, setRefinedRequirements] = useState<{
        technicalRequirements: string;
        skillsRequired: string[];
        estimatedDuration: string;
        projectScope: string;
    } | null>(null);

    const handleRefineWithAI = async () => {
        if (!title.trim() || !description.trim()) {
            alert('Please provide a project title and description before refining with AI.');
            return;
        }

        setIsRefining(true);
        try {
            const refined = await refineTechnicalRequirements(title, description);
            setRefinedRequirements(refined);
            setShowAISection(true);
        } catch (error) {
            alert('AI refinement failed. Please try again.');
            console.error(error);
        } finally {
            setIsRefining(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const newProject: Omit<Project, 'id' | 'logo' | 'postedAt'> = {
            title,
            company,
            location,
            description,
            isRemote,
            ...(refinedRequirements && {
                technicalRequirements: refinedRequirements.technicalRequirements,
                skillsRequired: refinedRequirements.skillsRequired,
                estimatedDuration: refinedRequirements.estimatedDuration,
                projectScope: refinedRequirements.projectScope,
            }),
        };

        await onAddProject(newProject);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg w-full max-w-2xl text-white max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Post a Project</h2>
                    <button onClick={onClose} className="text-2xl hover:text-gray-400">&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Basic Info Section */}
                    <div className="space-y-4 mb-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                                Project Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., Build a Social Media Analytics Dashboard"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">
                                Company/Organization *
                            </label>
                            <input
                                type="text"
                                id="company"
                                value={company}
                                onChange={(e) => setCompany(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., TechStart Inc."
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                                Location *
                            </label>
                            <input
                                type="text"
                                id="location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="e.g., San Francisco, CA"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                                Project Description *
                            </label>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 h-32 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Describe what the project is about, what problem it solves, and what you're looking for..."
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="isRemote"
                                checked={isRemote}
                                onChange={(e) => setIsRemote(e.target.checked)}
                                className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="isRemote" className="ml-2 block text-sm text-gray-300">
                                Remote work available
                            </label>
                        </div>
                    </div>

                    {/* AI Refinement Section */}
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={handleRefineWithAI}
                            disabled={isRefining || !title.trim() || !description.trim()}
                            className="w-full px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isRefining ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Refining with AI...
                                </>
                            ) : (
                                <>✨ Refine Technical Requirements with AI</>
                            )}
                        </button>

                        {showAISection && refinedRequirements && (
                            <div className="mt-4 bg-blue-900/20 border border-blue-700/50 rounded-lg p-4 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-blue-300">AI-Generated Requirements</h3>
                                    <button
                                        type="button"
                                        onClick={() => setShowAISection(false)}
                                        className="text-sm text-gray-400 hover:text-white"
                                    >
                                        Hide
                                    </button>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Technical Requirements
                                    </label>
                                    <p className="text-sm text-white/80 bg-gray-800/50 p-3 rounded">
                                        {refinedRequirements.technicalRequirements}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Skills Required
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {refinedRequirements.skillsRequired.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="inline-block bg-blue-600/50 text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Estimated Duration
                                    </label>
                                    <span className="inline-block bg-green-600/50 text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                        {refinedRequirements.estimatedDuration}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Project Scope
                                    </label>
                                    <p className="text-sm text-white/80 bg-gray-800/50 p-3 rounded">
                                        {refinedRequirements.projectScope}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-full bg-gray-600 hover:bg-gray-700 text-white font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                        >
                            Post Project
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
