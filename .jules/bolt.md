## 2025-05-18 - Concurrent Supabase Data Fetching
**Learning:** Sequential `await` calls on independent Supabase queries during dashboard page initialization create an avoidable network request waterfall.
**Action:** Always wrap independent data fetches in `Promise.all` to load queries concurrently.
