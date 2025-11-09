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
import { EventsPage } from './pages/EventsPage'; // Import EventsPage
import { Project, ForumPost, Event, Article, Wisdom } from './types';
import { mockForumPosts, mockEvents } from './mockData';
import { fetchProjects, createProject, fetchAllPostTemplates, convertTemplateToArticle, convertTemplateToWisdom } from './services/apiService';

const App: React.FC = () => {
    const [activePage, setActivePage] = useState('community');

    const [projects, setProjects] = useState<Project[]>([]);
    const [forumPosts] = useState<ForumPost[]>(mockForumPosts);
    const [events] = useState<Event[]>(mockEvents);
    const [articles, setArticles] = useState<Article[]>([]);
    const [wisdoms, setWisdoms] = useState<Wisdom[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [projectsData, templatesData] = await Promise.all([
                fetchProjects(),
                fetchAllPostTemplates()
            ]);

            setProjects(projectsData);

            const articlesData = templatesData
                .filter(t => t.category_id === 1 || t.category_id === 2)
                .slice(0, 6)
                .map(convertTemplateToArticle);
            setArticles(articlesData);

            const wisdomsData = templatesData
                .filter(t => t.category_id === 3)
                .slice(0, 4)
                .map(convertTemplateToWisdom);
            setWisdoms(wisdomsData);
        } catch (error) {
            console.error('Error loading data:', error);
        } finally {
            setLoading(false);
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
                return <CommunityPage projects={projects} posts={forumPosts} />;
            case 'projects':
                return <ProjectsPage projects={projects} addProject={addProject} />;
            case 'buzz':
                return <BuzzPage articles={articles} wisdoms={wisdoms} />;
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
