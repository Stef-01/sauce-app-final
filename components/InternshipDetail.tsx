import React from 'react';
import { Project } from '../types';

interface InternshipDetailProps {
    project: Project;
}

export const InternshipDetail: React.FC<InternshipDetailProps> = ({ project }) => {
    return (
        <div>
            <div className="flex items-center mb-4">
                <img src={project.logo} alt={`${project.company} logo`} className="w-16 h-16 rounded-lg mr-4 bg-white p-1" />
                <div>
                    <h1 className="text-3xl font-bold">{project.title}</h1>
                    <p className="text-xl text-white/80">{project.company}</p>
                    <p className="text-sm text-white/60">{project.location} {project.isRemote && '(Remote Available)'}</p>
                </div>
            </div>
            <div className="space-y-6 mt-6">
                <div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-2">Project Description</h3>
                    <p className="text-white/90">{project.description}</p>
                </div>
                {project.technicalRequirements && (
                    <div>
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">Technical Requirements</h3>
                        <p className="text-white/90 bg-gray-800/50 p-3 rounded">{project.technicalRequirements}</p>
                    </div>
                )}
                {project.skillsRequired && project.skillsRequired.length > 0 && (
                     <div>
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">Skills Required</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.skillsRequired.map((skill, index) => (
                                <span key={index} className="bg-blue-600/50 text-blue-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{skill}</span>
                            ))}
                        </div>
                    </div>
                )}
                {project.estimatedDuration && (
                     <div>
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">Estimated Duration</h3>
                         <span className="bg-green-600/50 text-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">{project.estimatedDuration}</span>
                    </div>
                )}
                {project.projectScope && (
                    <div>
                        <h3 className="text-lg font-semibold text-blue-300 mb-2">Project Scope</h3>
                        <p className="text-white/90 bg-gray-800/50 p-3 rounded">{project.projectScope}</p>
                    </div>
                )}
            </div>
             <div className="mt-8 flex justify-end">
                <button className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                    Apply Now
                </button>
            </div>
        </div>
    );
};
