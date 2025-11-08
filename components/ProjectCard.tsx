import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
    return (
        <div onClick={onClick} className="items-start backdrop-blur-2xl bg-white/5 box-border caret-transparent flex flex-col p-5 rounded-2xl w-full hover:bg-white/10 transition-colors duration-200 cursor-pointer">
            <div className="items-center box-border caret-transparent flex w-full mb-2">
                <img src={project.logo} alt={`${project.company} logo`} className="box-border caret-transparent h-12 w-12 object-contain rounded-md mr-4 bg-white/90 p-1" />
                <div className="flex flex-col grow">
                    <h4 className="text-lg font-bold text-white">{project.title}</h4>
                    <span className="text-md text-white/80">{project.company}</span>
                </div>
            </div>
            <div className="flex items-center text-sm text-white/60 w-full mt-2">
                 <span>{project.location} {project.isRemote && '(Remote)'}</span>
                 <span className="ml-auto">{project.postedAt}</span>
            </div>
        </div>
    );
};
