'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { createClient } from '@/utils/supabase';

export default function CaPanel() {
  const [user, setUser] = useState<{id: string, name: string, role: string} | null>(null);
  const [tickets, setTickets] = useState<any[]>([]);
  const [stats, setStats] = useState({ clients: 0, tickets: 0, solved: 0 });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/login';
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      if (!profile || profile.role !== 'CA') {
        window.location.href = '/login';
      } else {
        setUser({ id: session.user.id, name: profile.name, role: profile.role });
        fetchDashboardData(session.user.id);
      }
    };
    checkUser();
  }, []);

  const fetchDashboardData = async (userId: string) => {
    const { data: ticketData } = await supabase
      .from('tickets')
      .select('*, clients(name, email)')
      .eq('ca_id', userId);
    
    setTickets(ticketData || []);

    const { count: clientCount } = await supabase.from('clients').select('*', { count: 'exact', head: true }).eq('ca_id', userId);
    setStats({
      clients: clientCount || 0,
      tickets: ticketData?.filter(t => t.status === 'Open').length || 0,
      solved: ticketData?.filter(t => t.status === 'Resolved').length || 0
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadLoading(true);
    setUploadMessage('Extracting text and generating vectors...');

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch('http://localhost:5000/api/ai/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        setUploadMessage(`Success! Indexed ${result.chunks} text segments from the document.`);
      } else {
        setUploadMessage(`Error: ${result.message}`);
      }
    } catch (err) {
      setUploadMessage('An error occurred during upload.');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    window.location.href = '/login';
  };

  if (!user) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--background)' }}>
      <Head>
        <title>CA Dashboard - TaxBot AI</title>
      </Head>
      
      <aside style={{ width: '250px', background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold' }}>TaxBot AI</h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '0.75rem', background: 'var(--primary-light)', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Overview</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Client Management</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>My Knowledge Base</div>
          <div style={{ padding: '0.75rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>Escalated Queries</div>
          <div style={{ padding: '0.75rem', color: 'var(--error)', cursor: 'pointer', marginTop: 'auto' }} onClick={handleLogout}>Logout</div>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '3rem' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)' }}>CA Dashboard</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="btn-primary" style={{ padding: '0.5rem 1rem' }}>+ Invite Client</button>
          </div>
        </header>

        {/* Knowledge Base Section */}
        <section className="glass-panel" style={{ padding: '2rem', borderRadius: '12px', marginBottom: '3rem', border: '1px solid var(--primary-light)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '1rem' }}>Manage Knowledge Base (RAG)</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Upload tax guides, FAQs, or compliance PDFs. Our AI will use these to answer your clients accurately.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <label className="btn-primary" style={{ cursor: 'pointer', display: 'inline-block' }}>
              {uploadLoading ? 'Uploading...' : 'Upload PDF Document'}
              <input type="file" onChange={handleFileUpload} accept=".pdf" style={{ display: 'none' }} disabled={uploadLoading} />
            </label>
            {uploadMessage && <span style={{ color: uploadMessage.startsWith('Error') ? 'var(--error)' : 'var(--success)', fontWeight: 500 }}>{uploadMessage}</span>}
          </div>
        </section>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Active Clients</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.clients}</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--error)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Open Tickets</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.tickets}</p>
          </div>
          <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', borderLeft: '4px solid var(--success)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Resolved Queries</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{stats.solved}</p>
          </div>
        </div>

        {/* Recent Escalations */}
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '12px' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>Needs Attention (Escalations)</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)', textAlign: 'left' }}>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Client</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Query Subject</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
                <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{ticket.clients?.name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{ticket.subject}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{ 
                      background: ticket.status === 'Open' ? '#fee2e2' : '#dcfce7', 
                      color: ticket.status === 'Open' ? '#991b1b' : '#166534', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '20px', 
                      fontSize: '0.875rem' 
                    }}>
                      {ticket.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem' }}><button style={{ color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Review</button></td>
                </tr>
              ))}
              {tickets.length === 0 && (
                <tr>
                   <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No escalated tickets at the moment.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
