'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function AdminDashboard() {
  const [user, setUser] = useState<{name: string, role: string} | null>(null);

  useEffect(() => {
    // Check auth
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    if (!token || role !== 'Admin') {
      window.location.href = '/login';
    } else {
      // Mock user info for now, should fetch from /api/auth/me
      setUser({ name: 'Admin User', role: 'Admin' });
    }
  }, []);

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--background)' }}>
      <Head>
        <title>Admin Dashboard - TaxBot AI</title>
      </Head>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>TaxBot AI</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--primary-light)', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Dashboard</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Manage Firms</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>System Analytics</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Settings</div>
          <div style={{ padding: '0.75rem', color: 'var(--error)', cursor: 'pointer', marginTop: 'auto' }} onClick={() => { localStorage.clear(); window.location.href = '/login'; }}>Logout</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Welcome back, {user.name}</h1>
          <div style={{ padding: '0.5rem 1rem', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '20px' }}>
            System Status: <span style={{ color: 'var(--success)', fontWeight: 'bold' }}>Optimal</span>
          </div>
        </header>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Total Firms</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>42</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Active Users</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>1,284</p>
          </div>
          <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>AI Queries Answered</h3>
            <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>15.2k</p>
          </div>
        </div>
      </main>
    </div>
  );
}
