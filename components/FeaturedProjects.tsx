import React from 'react';
import { Project } from '../types';
import { ProjectCard } from './ProjectCard';

interface FeaturedProjectsProps {
    projects: Project[];
    onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects, onSelectProject }) => {
    return (
        <div className="box-border caret-transparent w-full md:w-2/5 md:sticky top-24 self-start">
             <h2 className="text-2xl font-bold text-white mb-4">Featured Projects</h2>
             <div className="flex flex-col gap-4">
                {projects.map(project => (
                    <ProjectCard key={project.id} project={project} onClick={() => onSelectProject(project)} />
                ))}
            </div>
        </div>
    );
};
