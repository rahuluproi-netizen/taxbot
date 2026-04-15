'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { createClient } from '@/utils/supabase';

export default function ClientDashboard() {
  const [user, setUser] = useState<{id: string, name: string, role: string} | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        window.location.href = '/login';
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!profile || profile.role !== 'Client') {
        // Redirect if not the right role
        window.location.href = '/login';
      } else {
        setUser({ id: session.user.id, name: profile.name, role: profile.role });
      }
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = '/login';
  };

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--background)' }}>
      <Head>
        <title>Client Portal - TaxBot AI</title>
      </Head>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>My Tax Portal</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--primary-light)', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Dashboard</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>My Documents</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Ask AI Assistant</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Appointments</div>
          <div style={{ padding: '0.75rem', color: 'var(--error)', cursor: 'pointer', marginTop: 'auto' }} onClick={handleLogout}>Logout</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>Welcome, {user.name}</h1>
          <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>Upload Document</button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Main Action Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1rem' }}>TaxBot Assistant</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Have a question about your taxes? Ask our AI assistant trained by your CA.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <input 
                  type="text" 
                  placeholder="e.g., What documents do I need for ITR?" 
                  style={{ flex: 1, padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)' }} 
                />
                <button 
                  className="btn-primary"
                  onClick={() => window.location.href = '/chat'}
                >
                  Ask
                </button>
              </div>
            </div>

            <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Recent Documents</h2>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ padding: '1rem 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-primary)' }}>ITR_Receipt_2025.pdf</span>
                  <span style={{ color: 'var(--success)', fontSize: '0.875rem' }}>Verified by CA</span>
                </li>
                <li style={{ padding: '1rem 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-primary)' }}>Q3_GST_Challan.pdf</span>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Pending</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Side Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px', background: 'var(--primary)', color: '#fff' }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Next Deadline</h3>
              <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>Oct 31</p>
              <p style={{ opacity: 0.8 }}>File Income Tax Return</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
