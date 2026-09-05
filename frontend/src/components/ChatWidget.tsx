'use client';

import { useState, useRef, useEffect } from 'react';
import { createClient } from '@/utils/supabase';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Hi! Need quick help with taxes or documentation? Ask me anything.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const supabase = createClient();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    const userMsg = { role: 'user', content: userQuery };
    setMessages(prev => [...prev, userMsg]);
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
          query: userQuery,
          clientId: session?.user?.id 
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, I am having trouble connecting.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside aria-label="AI Support Chat" style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, fontFamily: 'inherit' }}>
      {/* Toggle Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          aria-label="Open AI tax assistant chat"
          title="Open Chat"
          style={{
            width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary)', 
            color: '#fff', border: 'none', cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem'
          }}
        >
          <span role="img" aria-label="Chat speech bubble icon">💬</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="TaxBot AI Assistant"
          className="glass-panel"
          style={{
            width: '350px', height: '500px', display: 'flex', flexDirection: 'column',
            borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
          }}
        >
          {/* Header */}
          <div style={{ 
            background: 'var(--primary)', color: '#fff', padding: '1rem 1.5rem', 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
          }}>
            <h2 style={{ fontWeight: 600, fontSize: '1rem', margin: 0 }}>TaxBot AI Assistant</h2>
            <button 
              onClick={() => setIsOpen(false)}
              aria-label="Close AI tax assistant chat"
              title="Close Chat"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem', padding: '4px' }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div
            aria-live="polite"
            aria-atomic="false"
            style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--background)' }}
          >
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                background: msg.role === 'user' ? 'var(--primary)' : 'var(--surface)',
                color: msg.role === 'user' ? '#fff' : 'var(--text-primary)',
                padding: '0.75rem 1rem', borderRadius: '12px', maxWidth: '85%', fontSize: '0.9rem',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                {msg.content}
              </div>
            ))}
            {loading && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Assistant is typing...</div>}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSend}
            style={{ padding: '1rem', background: 'var(--surface)', borderTop: '1px solid var(--border)', display: 'flex', gap: '0.5rem' }}
          >
            <input 
              ref={inputRef}
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your query..."
              aria-label="Type your message"
              style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '20px', border: '1px solid var(--border)', background: 'var(--background)', color: 'var(--text-primary)' }}
            />
            <button 
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send message"
              title="Send message"
              style={{
                background: 'var(--primary)',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                cursor: (!input.trim() || loading) ? 'not-allowed' : 'pointer',
                opacity: (!input.trim() || loading) ? 0.6 : 1,
                transition: 'opacity 0.2s'
              }}
            >
              <span role="img" aria-label="Send arrow">➤</span>
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
