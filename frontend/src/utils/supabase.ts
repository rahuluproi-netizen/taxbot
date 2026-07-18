import { createBrowserClient } from "@supabase/ssr";
import { SupabaseClient } from "@supabase/supabase-js";

// Cached instance of the Supabase client (Singleton Pattern) for client-side only
let clientInstance: SupabaseClient | null = null;

const createMockClient = (): SupabaseClient => {
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      signInWithPassword: async () => ({
        data: { user: null },
        error: { message: "Supabase not configured" },
      }),
      signUp: async () => ({
        data: { user: null },
        error: { message: "Supabase not configured" },
      }),
      signOut: async () => ({ error: null }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: () => ({
            data: null,
            error: { message: "Supabase not configured" },
          }),
        }),
      }),
    }),
  } as unknown as SupabaseClient;
};

export const createClient = (): SupabaseClient => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isBrowser = typeof window !== "undefined";

  // If environment variables are missing, warn and return a mock client.
  if (!url || !key) {
    console.warn(
      "Supabase URL or Anon Key missing in frontend. Using mock client.",
    );
    const mockClient = createMockClient();
    if (isBrowser) {
      clientInstance = mockClient;
    }
    return mockClient;
  }

  // Server-side: Always return a fresh instance to avoid cross-request state pollution
  if (!isBrowser) {
    return createBrowserClient(url, key);
  }

  // Client-side: Use the cached singleton instance
  if (!clientInstance) {
    clientInstance = createBrowserClient(url, key);
  }

  return clientInstance;
};
