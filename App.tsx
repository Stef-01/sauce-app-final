import React, { useState } from 'react';
import { Background } from './components/Background';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CommunityPage } from './pages/CommunityPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { BuzzPage } from './pages/BuzzPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProjectRefinerPage } from './pages/ProjectRefinerPage';
import { Page, Internship } from './types';
import { mockInternships, mockForumPosts } from './mockData';

function App() {
    const [currentPage, setCurrentPage] = useState<Page>('Community');
    const [internships, setInternships] = useState<Internship[]>(mockInternships);

    const addInternship = (internship: Omit<Internship, 'id' | 'logo' | 'postedAt'>) => {
        const newInternship: Internship = {
            ...internship,
            id: internships.length + 1,
            logo: `https://i.pravatar.cc/48?u=${internship.company.replace(/\s/g, '')}`,
            postedAt: 'Just now',
            description: internship.description,
        };
        setInternships([newInternship, ...internships]);
    };

    const renderPage = () => {
        switch (currentPage) {
            case 'Community':
                return <CommunityPage internships={internships} posts={mockForumPosts} />;
            case 'Internships':
                return <InternshipsPage internships={internships} addInternship={addInternship} />;
            case 'Buzz':
                return <BuzzPage posts={mockForumPosts} />;
            case 'Project Refiner':
                return <ProjectRefinerPage />;
            case 'Profile':
                return <ProfilePage />;
            default:
                return <CommunityPage internships={internships} posts={mockForumPosts} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#111827] text-white">
            <Background />
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 md:px-10">
                {renderPage()}
            </main>
            <Footer />
        </div>
    );
}

export default App;
