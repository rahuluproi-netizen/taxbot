## 2025-05-14 - Supabase Client Singleton in Next.js
**Learning:** Instantiating the Supabase client inside React component bodies or frequently called utility functions causes redundant initialization overhead and can lead to excessive memory usage or event listener leaks. Maintaining a singleton instance, guarded by a `typeof window !== 'undefined'` check, ensures efficiency and prevents server-side session leakage.
**Action:** Always implement a singleton pattern for client-side SDKs (like Supabase, Firebase, or analytics) in Next.js to optimize performance and resource utilization.
