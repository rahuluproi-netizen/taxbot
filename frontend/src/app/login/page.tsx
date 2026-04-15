'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { createClient } from '@/utils/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // Fetch role from profiles table (or metadata)
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const role = profile?.role || 'Client';
        
        // Store in localStorage for backward compatibility with existing dashboard logic
        localStorage.setItem('token', data.session.access_token);
        localStorage.setItem('role', role);

        window.location.href = role === 'Admin' ? '/admin' : role === 'CA' ? '/ca-panel' : '/dashboard';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <Head>
        <title>Login - TaxBot AI</title>
      </Head>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>Welcome Back</h2>
        {error && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem' }}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Don't have an account? <Link href="/signup" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
