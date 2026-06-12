import { createBrowserClient } from '@supabase/ssr'
import { SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | undefined;

/**
 * Creates or returns a singleton instance of the Supabase client.
 * In the browser, a single instance is reused to optimize performance and prevent redundant connections.
 * During SSR, a new instance is created for each request to prevent session leakage.
 */
export const createClient = () => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser && supabaseInstance) {
    return supabaseInstance;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let client: SupabaseClient;

  if (!url || !key) {
    if (!isBrowser) {
      console.warn('Supabase URL or Anon Key missing in frontend. Using mock client.');
    }

    client = {
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
  } else {
    client = createBrowserClient(url, key);
  }

  if (isBrowser) {
    supabaseInstance = client;
  }

  return client;
};
