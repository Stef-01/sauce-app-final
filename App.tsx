import React, { useState } from 'react';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { CommunityPage } from './pages/CommunityPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BuzzPage } from './pages/BuzzPage';
import { ProjectRefinerPage } from './pages/ProjectRefinerPage';
import { ProfilePage } from './pages/ProfilePage';
import { EventsPage } from './pages/EventsPage'; // Import EventsPage
import { Project, ForumPost, Event } from './types'; // Import Event type
import { mockProjects, mockForumPosts, mockArticles, mockWisdom, mockEvents } from './mockData'; // Import mockEvents

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('community');

    const [projects, setProjects] = useState<Project[]>(mockProjects);
    const [forumPosts] = useState<ForumPost[]>(mockForumPosts);
    const [events] = useState<Event[]>(mockEvents); // Add events state

    const addProject = async (project: Omit<Project, 'id' | 'logo' | 'postedAt'>): Promise<void> => {
        const newProject: Project = {
            ...project,
            id: projects.length + 1,
            logo: `https://i.pravatar.cc/100?u=new${projects.length + 1}`,
            postedAt: 'Just now',
        };
        setProjects([newProject, ...projects]);
    };


    const renderPage = () => {
        switch (activePage) {
            case 'community':
                return <CommunityPage projects={projects} posts={forumPosts} />;
            case 'projects':
                return <ProjectsPage projects={projects} addProject={addProject} />;
            case 'buzz':
                return <BuzzPage articles={mockArticles} wisdoms={mockWisdom} />;
            case 'refiner':
                return <ProjectRefinerPage />;
            case 'profile':
                return <ProfilePage />;
            case 'events': // Add case for events
                return <EventsPage events={events} />;
            default:
                return <CommunityPage projects={projects} posts={forumPosts} />;
        }
    };

    return (
        <div className="bg-black text-white min-h-screen flex flex-col font-sans">
            <Background />
            <Header onNavigate={setActivePage} activePage={activePage} />
            <MainContent>
                {renderPage()}
            </MainContent>
            <Footer />
        </div>
    );
};

export default App;
