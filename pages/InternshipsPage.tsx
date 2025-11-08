import React, { useState } from 'react';
import { Internship } from '../types';
import { InternshipCard } from '../components/InternshipCard';
import { PostInternshipModal } from '../components/PostInternshipModal';

interface InternshipsPageProps {
    internships: Internship[];
    addInternship: (internship: Omit<Internship, 'id' | 'logo' | 'postedAt'>) => void;
}

export const InternshipsPage: React.FC<InternshipsPageProps> = ({ internships, addInternship }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredInternships = internships.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        internship.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddInternship = (internship: Omit<Internship, 'id' | 'logo' | 'postedAt'>) => {
        addInternship(internship);
        setIsModalOpen(false);
    }

    return (
        <div className="animate-fade-in my-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Internships</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                >
                    Post Internship
                </button>
            </div>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search internships..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInternships.map(internship => (
                    <InternshipCard key={internship.id} internship={internship} />
                ))}
            </div>

            {isModalOpen && <PostInternshipModal onClose={() => setIsModalOpen(false)} onAddInternship={handleAddInternship} />}
        </div>
    );
};
