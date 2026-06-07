import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null;

export const createClient = () => {
  // If we are in a browser context and already have an instance, return it
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

  if (typeof window !== 'undefined') {
    supabaseInstance = client;
  }

  return client;
};
