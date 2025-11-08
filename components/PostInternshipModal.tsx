import React, { useState } from 'react';
import { Internship } from '../types';

interface PostInternshipModalProps {
    onClose: () => void;
    onAddInternship: (internship: Omit<Internship, 'id' | 'logo' | 'postedAt'>) => void;
}

export const PostInternshipModal: React.FC<PostInternshipModalProps> = ({ onClose, onAddInternship }) => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [isRemote, setIsRemote] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddInternship({ title, company, location, description, isRemote });
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-gray-900 border border-gray-700 p-8 rounded-lg w-full max-w-lg text-white">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Post an Internship</h2>
                    <button onClick={onClose} className="text-2xl">&times;</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Internship Title</label>
                        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-1">Company</label>
                        <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">Location</label>
                        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full bg-gray-800 border border-gray-600 rounded-md p-2 h-32" required />
                    </div>
                    <div className="mb-4 flex items-center">
                        <input type="checkbox" id="isRemote" checked={isRemote} onChange={(e) => setIsRemote(e.target.checked)} className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500" />
                        <label htmlFor="isRemote" className="ml-2 block text-sm text-gray-300">Remote</label>
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 px-4 py-2 rounded-full bg-gray-600">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700">Post</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
