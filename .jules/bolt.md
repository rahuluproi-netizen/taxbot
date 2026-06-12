## 2025-05-14 - Lockfile Consistency in pnpm Environments
**Learning:** In a repository where `package-lock.json` is the established lockfile, running `pnpm install` or other pnpm commands may inadvertently generate a `pnpm-lock.yaml`. Committing this new lockfile can cause significant issues in CI/CD and dependency resolution, especially if it contains hallucinated or conflicting versions.
**Action:** Always check for and remove any generated `pnpm-lock.yaml` files before submission if the project uses `package-lock.json`.

## 2025-05-14 - Supabase Client Singleton in Next.js
**Learning:** Re-initializing the Supabase client on every render in components (or every call to a utility) causes redundant object creation and potential connection overhead. A singleton pattern in the browser is essential.
**Action:** Implement a module-level singleton for the Supabase client, gated by a `typeof window !== 'undefined'` check to prevent state leakage during SSR.
