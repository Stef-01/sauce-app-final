import { supabase, DBProject, DBPostTemplate } from './supabaseClient';
import { Project, Article, Wisdom } from '../types';

export async function fetchProjects(): Promise<Project[]> {
    try {
        if (!supabase) {
            console.warn('Supabase not initialized');
            return [];
        }

        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('posted_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            return [];
        }

        if (!data) {
            return [];
        }

        return (data as DBProject[]).map(dbProject => ({
            id: dbProject.project_id,
            title: dbProject.project_title,
            company: dbProject.company_name,
            logo: dbProject.logo || `https://i.pravatar.cc/100?u=${dbProject.project_id}`,
            location: dbProject.location || 'Location TBD',
            isRemote: dbProject.is_remote,
            postedAt: formatPostedAt(dbProject.posted_at),
            description: dbProject.brief || '',
            technicalRequirements: dbProject.required_skills?.join(', '),
            skillsRequired: dbProject.required_skills || [],
            estimatedDuration: dbProject.duration_weeks ? `${dbProject.duration_weeks} weeks` : undefined,
            projectScope: dbProject.objectives?.join(' ') || undefined,
        }));
    } catch (err) {
        console.error('Exception fetching projects:', err);
        return [];
    }
}

export async function createProject(project: Omit<Project, 'id' | 'postedAt'>): Promise<Project> {
    if (!supabase) {
        throw new Error('Supabase not initialized');
    }

    const dbProject = {
        company_name: project.company,
        project_title: project.title,
        brief: project.description,
        location: project.location,
        is_remote: project.isRemote,
        logo: project.logo,
        required_skills: project.skillsRequired || [],
        objectives: project.projectScope ? [project.projectScope] : [],
    };

    const { data, error } = await supabase
        .from('projects')
        .insert([dbProject])
        .select()
        .single();

    if (error) {
        console.error('Error creating project:', error);
        throw new Error('Failed to create project');
    }

    const created = data as DBProject;
    return {
        id: created.project_id,
        title: created.project_title,
        company: created.company_name,
        logo: created.logo || `https://i.pravatar.cc/100?u=${created.project_id}`,
        location: created.location || 'Location TBD',
        isRemote: created.is_remote,
        postedAt: formatPostedAt(created.posted_at),
        description: created.brief || '',
        skillsRequired: created.required_skills || [],
    };
}

export async function fetchPostTemplatesByCategory(categoryName: string): Promise<DBPostTemplate[]> {
    if (!supabase) {
        console.warn('Supabase not initialized');
        return [];
    }

    const { data: categories, error: catError } = await supabase
        .from('post_categories')
        .select('id')
        .eq('name', categoryName)
        .single();

    if (catError || !categories) {
        console.error('Error fetching category:', catError);
        return [];
    }

    const { data, error } = await supabase
        .from('post_templates')
        .select('*')
        .eq('category_id', categories.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching post templates:', error);
        return [];
    }

    return data as DBPostTemplate[];
}

export async function fetchAllPostTemplates(): Promise<DBPostTemplate[]> {
    try {
        if (!supabase) {
            console.warn('Supabase not initialized');
            return [];
        }

        const { data, error } = await supabase
            .from('post_templates')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching post templates:', error);
            return [];
        }

        return data as DBPostTemplate[];
    } catch (err) {
        console.error('Exception fetching post templates:', err);
        return [];
    }
}

export function convertTemplateToArticle(template: DBPostTemplate): Article {
    return {
        id: template.id,
        title: template.title,
        summary: template.body_template,
        imageUrl: `https://images.unsplash.com/photo-${1500000000000 + template.id}?q=80&w=870&auto=format&fit=crop`,
        link: '#',
        source: getCategoryDisplayName(template.category_id),
        publishedAt: new Date(template.created_at).toISOString().split('T')[0],
    };
}

export function convertTemplateToWisdom(template: DBPostTemplate): Wisdom {
    return {
        id: template.id,
        quote: template.body_template,
        author: template.tone || 'Community',
    };
}

function formatPostedAt(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
        return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
        return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 7) {
        return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

function getCategoryDisplayName(categoryId: number): string {
    const categories: Record<number, string> = {
        1: 'Community Posts',
        2: 'Industry Insights',
        3: 'Deep Dives',
    };
    return categories[categoryId] || 'Community';
}
