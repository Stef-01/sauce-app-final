import React, { useState } from 'react';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { Internship, ForumPost, Page } from './types';
import { mockInternships, mockPosts, mockBuzz } from './mockData';
import { Header } from './components/Header';
import { CommunityPage } from './pages/CommunityPage';
import { InternshipsPage } from './pages/InternshipsPage';
import { BuzzPage } from './pages/BuzzPage';
import { ProfilePage } from './pages/ProfilePage';

const App: React.FC = () => {
  const [internships, setInternships] = useState<Internship[]>(mockInternships);
  const [posts, setPosts] = useState<ForumPost[]>(mockPosts);
  const [currentPage, setCurrentPage] = useState<Page>('Community');

  const addInternship = (newInternship: Omit<Internship, 'id' | 'postedAt' | 'logo'>) => {
    const newEntry: Internship = {
      id: `internship-${Date.now()}`,
      postedAt: 'Just now',
      logo: `https://logo.clearbit.com/${newInternship.company.toLowerCase().replace(/\s/g, '')}.com`,
      ...newInternship,
    };
    setInternships([newEntry, ...internships]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'Community':
        return <CommunityPage internships={internships} posts={posts} />;
      case 'Internships':
        return <InternshipsPage internships={internships} onAddInternship={addInternship} />;
      case 'Buzz':
        return <BuzzPage posts={mockBuzz} />;
      case 'Profile':
        return <ProfilePage />;
      default:
        return <CommunityPage internships={internships} posts={posts} />;
    }
  };

  return (
    <div className="bg-gray-900 text-white box-border caret-transparent min-h-screen flex flex-col font-sans">
      <Background />
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow w-full max-w-screen-xl mx-auto px-4 md:px-10">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
