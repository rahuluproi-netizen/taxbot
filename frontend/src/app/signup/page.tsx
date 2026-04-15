'use client';

import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { createClient } from '@/utils/supabase';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Client' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Sign up user
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            role: formData.role
          }
        }
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        // 2. Create profile entries
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([{
            id: data.user.id,
            name: formData.name,
            role: formData.role
          }]);

        if (profileError) {
          setError(profileError.message);
          setLoading(false);
          return;
        }

        // Store credentials
        localStorage.setItem('token', data.session?.access_token || '');
        localStorage.setItem('role', formData.role);

        window.location.href = formData.role === 'Admin' ? '/admin' : formData.role === 'CA' ? '/ca-panel' : '/dashboard';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
      <Head>
        <title>Sign Up - TaxBot AI</title>
      </Head>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', borderRadius: '12px' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '1.5rem', textAlign: 'center' }}>Create Account</h2>
        {error && <div style={{ color: 'var(--error)', marginBottom: '1rem', textAlign: 'center', background: '#fee2e2', padding: '0.5rem', borderRadius: '4px' }}>{error}</div>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
            <input 
              type="text" 
              name="name"
              value={formData.name} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password} 
              onChange={handleChange} 
              required 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Account Type</label>
            <select 
              name="role" 
              value={formData.role} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text-primary)' }}
            >
              <option value="Client">Client</option>
              <option value="CA">Chartered Accountant (CA)</option>
              <option value="Staff">Firm Staff</option>
            </select>
          </div>
          <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem' }}>
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Login</Link>
        </p>
      </div>
    </div>
  );
}
