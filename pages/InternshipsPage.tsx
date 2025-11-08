import React, { useState } from 'react';
import { Internship } from '../types';
import { InternshipCard } from '../components/InternshipCard';
import { PostInternshipModal } from '../components/PostInternshipModal';

interface InternshipsPageProps {
    internships: Internship[];
    onAddInternship: (internship: Omit<Internship, 'id' | 'logo' | 'postedAt'>) => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({ internships, onAddInternship }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const handleAddInternship = (newInternship: Omit<Internship, 'id' | 'postedAt' | 'logo'>) => {
        onAddInternship(newInternship);
        setIsModalOpen(false);
    };

    return (
        <div className="animate-fade-in my-8">
             <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">All Internships</h1>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 rounded-full text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors"
                >
                    Post an Internship
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {internships.map(internship => (
                    <InternshipCard key={internship.id} internship={internship} />
                ))}
            </div>
            {isModalOpen && <PostInternshipModal onClose={() => setIsModalOpen(false)} onAddInternship={handleAddInternship} />}
        </div>
    );
};
