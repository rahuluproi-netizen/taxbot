import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn('Supabase URL or Anon Key missing in frontend. Using mock client.');
    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signUp: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: 'Supabase not configured' } }) }) }),
      })
    } as any;
  }

  return createBrowserClient(url, key);
};
