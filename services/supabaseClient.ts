import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
