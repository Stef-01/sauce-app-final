import React from 'react';
import { Project } from '../types';
import { InternshipDetail } from './InternshipDetail';

interface ProjectDetailModalProps {
    project: Project;
    onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div
                className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-3xl text-white max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sticky top-0 flex justify-end p-2 bg-gray-900/80 backdrop-blur-sm">
                    <button onClick={onClose} className="text-2xl hover:text-gray-400 w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">&times;</button>
                </div>
                <div className="p-8">
                    <InternshipDetail project={project} />
                </div>
            </div>
        </div>
    );
};
