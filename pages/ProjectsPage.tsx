import React, { useState } from 'react';
import { Project } from '../types';
// FIX: Corrected import path for ProjectCard
import { ProjectCard } from '../components/ProjectCard';
// FIX: Corrected import to point to the file that exports PostProjectModal
import { PostProjectModal } from '../components/PostProjectModal';
import { ProjectDetailModal } from '../components/ProjectDetailModal';

interface ProjectsPageProps {
    projects: Project[];
    // FIX: Updated addProject to be async
    addProject: (project: Omit<Project, 'id' | 'logo' | 'postedAt'>) => Promise<void>;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, addProject }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // FIX: Updated handleAddProject to be async
    const handleAddProject = async (project: Omit<Project, 'id' | 'logo' | 'postedAt'>) => {
        await addProject(project);
        setIsModalOpen(false);
    }

    return (
        <div className="animate-fade-in my-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                    Post Project
                </button>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search projects..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map(project => (
                    <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
                ))}
            </div>

            {isModalOpen && <PostProjectModal onClose={() => setIsModalOpen(false)} onAddProject={handleAddProject} />}
            {selectedProject && <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
};
