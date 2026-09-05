import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';

// Module-level variable to store the client-side singleton instance
let clientSingleton: SupabaseClient | null = null;

/**
 * Creates or returns the cached Supabase client instance in browser runtime.
 * Using a client-side singleton avoids recreating client instances and
 * redundant auth state initialization on every function call or component render.
 */
export const createClient = (): SupabaseClient => {
  // Reuse client instance if running in browser runtime
  if (typeof window !== 'undefined' && clientSingleton) {
    return clientSingleton;
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
      clientSingleton = mockClient;
    }
    return mockClient;
  }

  const client = createBrowserClient(url, key);
  if (typeof window !== 'undefined') {
    clientSingleton = client;
  }
  return client;
};
