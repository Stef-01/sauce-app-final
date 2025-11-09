import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Fallback values (for development - these match your Supabase project)
const DEFAULT_SUPABASE_URL = 'https://wgegjkrshihackpaydcz.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndnZWdqa3JzaGloYWNrcGF5ZGN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2Mzc4MDAsImV4cCI6MjA3ODIxMzgwMH0.4P6lgXT3ZT_dyA84nw8YGnfqJiXBzhAmSCq2qFcjG1g';

// Get values from environment or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

// Initialize Supabase client
const supabaseInstance: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: false,
    },
});

console.log('✅ Supabase client initialized');
console.log('📡 Supabase URL:', supabaseUrl);
console.log('🔑 Using anon key:', supabaseAnonKey.substring(0, 20) + '...');

// Export the client
export const supabase = supabaseInstance;

// Helper to check if Supabase is ready (always true since we always initialize)
export const isSupabaseReady = (): boolean => {
    return true;
};

// Test connection function
export const testSupabaseConnection = async (): Promise<boolean> => {
    try {
        const { data, error } = await supabase.from('projects').select('count').limit(1);
        if (error) {
            console.error('❌ Supabase connection test failed:', error);
            return false;
        }
        console.log('✅ Supabase connection test successful');
        return true;
    } catch (err) {
        console.error('❌ Supabase connection test error:', err);
        return false;
    }
};

export interface DBProject {
    project_id: number;
    company_name: string;
    project_title: string;
    duration_weeks: number | null;
    time_commitment_min_hours: number | null;
    time_commitment_max_hours: number | null;
    team_size_min: number | null;
    team_size_max: number | null;
    brief: string | null;
    objectives: string[] | null;
    key_deliverables: string[] | null;
    required_skills: string[] | null;
    selection_signals: string[] | null;
    primary_skill_tags: string[] | null;
    logo: string | null;
    location: string | null;
    is_remote: boolean;
    posted_at: string;
    created_at: string;
}

export interface DBPostTemplate {
    id: number;
    category_id: number;
    title: string;
    body_template: string;
    min_words: number | null;
    max_words: number | null;
    target_audience: string | null;
    tone: string | null;
    is_active: boolean;
    created_at: string;
}

export interface DBPostCategory {
    id: number;
    name: string;
    description: string | null;
}

export interface DBTag {
    id: number;
    name: string;
}

export interface DBPost {
    id: number;
    university_id: number | null;
    author_id: number | null;
    body: string;
    media_url: string | null;
    score: number;
    category_id: number | null;
    template_id: number | null;
    created_at: string;
    updated_at: string;
}

export interface DBVote {
    id: number;
    user_id: number;
    post_id: number;
    direction: number;
    created_at: string;
}

export interface DBComment {
    id: number;
    post_id: number;
    author_id: number | null;
    body: string;
    media_url: string | null;
    score: number;
    parent_comment_id: number | null;
    created_at: string;
    updated_at: string;
}
