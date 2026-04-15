'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Head>
        <title>TaxBot AI - The Complete Platform for Chartered Accountants</title>
        <meta name="description" content="AI-powered chatbot platform for CAs and Tax Consultants." />
      </Head>

      <header style={{ padding: '1.5rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}>
        <h1 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>TaxBot AI</h1>
        <nav style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/login" style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>Login</Link>
          <Link href="/signup">
            <button className="btn-primary">Get Started</button>
          </Link>
        </nav>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem', textAlign: 'center', background: 'linear-gradient(135deg, var(--background) 0%, #e0e7ff 100%)' }}>
        <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '1rem', maxWidth: '800px' }}>
          Automate Your Tax Practice with AI
        </h2>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Empower your CA firm with an AI chatbot trained on your documents. Automate ITR, GST, and TDS queries instantly while escalating complex issues seamlessly.
        </p>

        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '1000px' }}>
          <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Smart RAG Pipeline</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Upload your tax notices and FAQs. The AI learns your firm's specific knowledge base instantly.</p>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Automatic Escalations</h3>
            <p style={{ color: 'var(--text-secondary)' }}>High-risk or complex queries are automatically flagged for human CA review in your dashboard.</p>
          </div>
          <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
            <h3 style={{ color: 'var(--secondary)', marginBottom: '0.5rem', fontSize: '1.2rem' }}>Role-Based Access</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Secure portals for Admin, CA, Staff, and Clients. Complete control over your practice.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
