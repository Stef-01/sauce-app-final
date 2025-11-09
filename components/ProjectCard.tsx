import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div 
            onClick={onClick} 
            className="group relative backdrop-blur-xl bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/8 hover:to-white/[0.03] border border-white/10 rounded-2xl p-5 w-full transition-all duration-200 cursor-pointer"
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-white/90 to-white overflow-hidden rounded-xl shadow-lg">
                    <img 
                        src={project.logo || `https://logo.clearbit.com/${project.company.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')}.com`} 
                        alt={`${project.company} logo`} 
                        className="w-full h-full object-contain p-2" 
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://ui-avatars.com/api/?name=${project.company}&background=fff&color=000&bold=true`;
                        }}
                    />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1 truncate group-hover:text-blue-400 transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-2">
                        {project.company}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-white/40">
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {project.location} {project.isRemote && '(Remote)'}
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {project.postedAt}
                        </span>
                    </div>
                </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
};
