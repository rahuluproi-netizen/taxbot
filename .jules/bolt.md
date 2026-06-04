## 2025-05-15 - [Supabase Client Singleton]
**Learning:** Instantiating clients like Supabase at the module level in Next.js pages/components causes cross-request state leakage during SSR. Module-level variables persist across the server process lifetime.
**Action:** Always call the client initializer *inside* the component body. Use a singleton pattern within the utility that explicitly checks `typeof window !== 'undefined'` to safely return a shared instance in the browser while ensuring a fresh instance is created for each SSR request.
