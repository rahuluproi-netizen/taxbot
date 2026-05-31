import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

// Module-level variable to store the Supabase client instance (singleton)
let supabaseInstance: SupabaseClient | null = null;

/**
 * Returns a singleton instance of the Supabase client in the browser.
 * This avoids redundant instantiation overhead, especially in components
 * that re-render frequently (e.g., ChatWidget).
 */
export const createClient = () => {
  // Return existing instance if available (singleton pattern)
  if (typeof window !== 'undefined' && supabaseInstance) {
    return supabaseInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('Supabase URL or Anon Key missing in frontend. Using mock client.');
    const mockClient = {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signUp: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      })
    } as unknown as SupabaseClient;

    if (typeof window !== 'undefined') {
      supabaseInstance = mockClient;
    }
    return mockClient;
  }

  const client = createBrowserClient(url, key);

  // Cache the instance in the browser to prevent redundant re-instantiation
  if (typeof window !== 'undefined') {
    supabaseInstance = client;
  }

  return client;
};
