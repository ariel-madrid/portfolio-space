import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
    id: string;
    title: string;
    title_en: string; // New
    summary: string;
    summary_en: string; // New
    content: string;
    content_en: string; // New
    main_image: string;
    tags: string[];
    author: string;
    created_at: string;
};
