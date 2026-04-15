const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || '';

let supabase;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.error('\n⚠️  SUPABASE CREDENTIALS MISSING IN .env');
  console.error('Please add SUPABASE_URL and SUPABASE_ANON_KEY to your .env file.\n');
  // Mock client or null to avoid crash
  supabase = {
    from: () => ({
      select: () => ({ eq: () => ({ single: () => ({ data: null, error: { message: 'Supabase URL not configured' } }) }) }),
      insert: () => ({ select: () => ({ single: () => ({ data: null, error: { message: 'Supabase URL not configured' } }) }) }),
    }),
    auth: {
      signUp: () => ({ data: { user: null }, error: { message: 'Supabase URL not configured' } }),
      signInWithPassword: () => ({ data: { user: null }, error: { message: 'Supabase URL not configured' } }),
      getUser: () => ({ data: { user: null }, error: { message: 'Supabase URL not configured' } }),
      getSession: () => ({ data: { session: null }, error: { message: 'Supabase URL not configured' } }),
    }
  };
}

module.exports = supabase;
