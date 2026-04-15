'use client';

import { useState, useRef, useEffect } from 'react';
import Head from 'next/head';
import { createClient } from '@/utils/supabase';

export default function ChatPage() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Welcome to the Tax Assistant portal. I can help with ITR, GST, TDS, and more. What is on your mind?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const supabase = createClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      const res = await fetch('http://localhost:5000/api/ai/query', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({ 
          query: input,
          clientId: session?.user?.id // Using user ID as client ID for this context
        }),
      });
      const data = await res.json();
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'An error occurred. Please try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--background)' }}>
      <Head>
        <title>AI Tax Assistant - Full Portal</title>
      </Head>

      <header style={{ padding: '1rem 3rem', background: 'var(--surface)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.25rem' }}>AI Tax Assistant</h1>
        <button onClick={() => window.history.back()} style={{ background: 'none', border: '1px solid var(--border)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Back to Dashboard</button>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', padding: '2rem 10%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '70%',
            background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
            color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            lineHeight: 1.6
          }}>
            <p style={{ margin: 0 }}>{msg.content}</p>
          </div>
        ))}
        {loading && <div style={{ alignSelf: 'flex-start', padding: '1rem', color: 'var(--text-secondary)' }}>Typing...</div>}
        <div ref={messagesEndRef} />
      </main>

      <footer style={{ padding: '2rem 10%', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '1rem', maxWidth: '1000px', margin: '0 auto' }}>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your tax query here..." 
            style={{ flex: 1, padding: '1rem 1.5rem', borderRadius: '30px', border: '1px solid var(--border)', fontSize: '1rem', background: 'var(--background)' }}
          />
          <button onClick={handleSend} className="btn-primary" style={{ padding: '0 2rem', borderRadius: '30px' }}>Send</button>
        </div>
      </footer>
    </div>
  );
}
