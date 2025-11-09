import React, { useState, useEffect } from 'react';
import { Background } from './components/Background';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { MainContent } from './components/MainContent';
import { CommunityPage } from './pages/CommunityPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { BuzzPage } from './pages/BuzzPage';
import { ProjectRefinerPage } from './pages/ProjectRefinerPage';
import { ProfilePage } from './pages/ProfilePage';
import { EventsPage } from './pages/EventsPage';
import { ElevatePage } from './pages/ElevatePage';
import { Project, ForumPost, Event } from './types';
import { mockForumPosts, mockEvents } from './mockData';
import { fetchProjects, createProject } from './services/apiService';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('community');

    const [projects, setProjects] = useState<Project[]>([]);
    const [forumPosts] = useState<ForumPost[]>(mockForumPosts);
    const [events] = useState<Event[]>(mockEvents);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();

        const timeout = setTimeout(() => {
            if (loading) {
                console.warn('Data loading timeout - proceeding with empty state');
                setLoading(false);
            }
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    const loadData = async () => {
        try {
            console.log('🚀 Starting to load data from Supabase...');
            const projectsData = await fetchProjects();

            console.log('📊 Projects loaded:', projectsData?.length || 0);

            setProjects(projectsData || []);

            if (!projectsData || projectsData.length === 0) {
                console.warn('⚠️ No projects loaded - check Supabase connection and RLS policies');
            }
        } catch (error) {
            console.error('❌ Error loading data:', error);
            console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        } finally {
            setLoading(false);
            console.log('✅ Data loading completed');
        }
    };

    const addProject = async (project: Omit<Project, 'id' | 'logo' | 'postedAt'>): Promise<void> => {
        try {
            const newProject = await createProject(project);
            setProjects([newProject, ...projects]);
        } catch (error) {
            console.error('Error adding project:', error);
            throw error;
        }
    };


    const renderPage = () => {
        switch (activePage) {
            case 'community':
                return <CommunityPage projects={projects} posts={forumPosts} onNavigate={setActivePage} />;
            case 'projects':
                return <ProjectsPage projects={projects} addProject={addProject} />;
            case 'buzz':
                return <BuzzPage />;
            case 'refiner':
                return <ProjectRefinerPage />;
            case 'profile':
                return <ProfilePage />;
            case 'events':
                return <EventsPage events={events} />;
            case 'elevate':
                return <ElevatePage onNavigate={setActivePage} />;
            default:
                return <CommunityPage projects={projects} posts={forumPosts} onNavigate={setActivePage} />;
        }
    };

    if (loading) {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-gray-400">Loading CareerConnect...</p>
                </div>
            </div>
        );
    }

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
