import React from 'react';
import { Internship } from '../types';
import { InternshipCard } from './InternshipCard';

interface InternshipSectionProps {
    internships: Internship[];
    onSelectInternship: (internship: Internship) => void;
}

export const EventMedia: React.FC<InternshipSectionProps> = ({ internships, onSelectInternship }) => {
    return (
        <div className="box-border caret-transparent w-full md:w-2/5 md:sticky top-24 self-start">
             <h2 className="text-2xl font-bold text-white mb-4">Featured Internships</h2>
             <div className="flex flex-col gap-4">
                {internships.map(internship => (
                    <InternshipCard key={internship.id} internship={internship} onClick={() => onSelectInternship(internship)} />
                ))}
            </div>
        </div>
    );
};
