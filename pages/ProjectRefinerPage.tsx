import React, { useState } from 'react';
import { refineProjectBrief } from '../services/geminiService';
import { ProjectBriefPreview } from '../components/ProjectBriefPreview';

export const ProjectRefinerPage: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [brief, setBrief] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) {
            alert('Please enter a project idea.');
            return;
        }
        setIsLoading(true);
        setBrief('');
        try {
            const result = await refineProjectBrief(prompt);
            setBrief(result);
        } catch (error) {
            console.error(error);
            setBrief('An error occurred while refining the brief.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="animate-fade-in my-8">
            <h1 className="text-3xl font-bold mb-2">Project Idea Refiner</h1>
            <p className="text-gray-400 mb-6">Use AI to transform your raw idea into a structured project brief.</p>

            <form onSubmit={handleSubmit}>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your project idea here. For example: 'An app that helps students find study groups on campus using their location and courses.'"
                    className="w-full h-40 p-4 bg-gray-800 border border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="mt-4 px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:bg-blue-800 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Refining...
                        </>
                    ) : (
                        'Refine Idea'
                    )}
                </button>
            </form>

            {brief && <ProjectBriefPreview brief={brief} />}
        </div>
    );
};
