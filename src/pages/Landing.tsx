import { useEffect, useRef } from 'react';
import { initDNA } from '@/lib/three-dna';

interface Props { go: (p: string) => void; }

export default function Landing({ go }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dnaRef = useRef<{ dispose: () => void } | null>(null);

  useEffect(() => {
    if (canvasRef.current && window.innerWidth > 768) {
      try { dnaRef.current = initDNA(canvasRef.current); } catch (_) { /* WebGL unavailable */ }
    }
    return () => { dnaRef.current?.dispose(); };
  }, []);

  const stats = [['500M+','Unbanked Indians'],['50+','UPI Signals Analysed'],['300–900','Score Range'],['<200ms','Score Generation']];

  const features = [
    ['🔒','Privacy by Architecture','Raw UPI data never leaves your device. Architecturally impossible — not just a privacy policy.','#d4500f'],
    ['⚡','200ms Scoring','Lightweight on-device ML model. No round-trip to servers. Score generated before you blink.','#0f7e5a'],
    ['🧬','50+ Behavioural Signals','Transaction frequency, regularity, income consistency, merchant diversity and 46 more.','#1d5fa8'],
    ['📖','Plain-English Explanations','Every score comes with a human-readable breakdown. You know exactly why you got your score.','#b45309'],
    ['🏦','Bank-Ready REST API','POST /api/score — lenders receive score + tier + factors. Zero raw data ever transmitted.','#0f7e5a'],
    ['🌏','UPI-First Design','Works for every Indian with a UPI account. No salary slip, no bank account, no problem.','#d4500f'],
  ];

  const howSteps = [
    ['01','Share Your UPI Statement','Export your UPI SMS history or transaction data from your banking app. One-time action, full consent from you.'],
    ['02','On-Device Processing','Our ML model runs entirely in your browser. 50+ signals extracted — income, spending patterns, bill payments and more.'],
    ['03','Score Generated','A compressed machine learning model converts your behavioural signals into a score between 300 and 900 — on your device, in under 200ms.'],
    ['04','Bank API Integration','When you apply for a loan, the lender calls our REST API with your consent token. They receive your score, tier, and top factors only.'],
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ padding: 'clamp(72px,10vw,110px) 0 80px', minHeight: '88vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle,rgba(212,80,15,.10) 0%,transparent 70%)', top: -80, right: -60, borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: 300, height: 300, background: 'radial-gradient(circle,rgba(34,197,94,.07) 0%,transparent 70%)', bottom: 40, left: -40, borderRadius: '50%', pointerEvents: 'none' }} />
        <canvas ref={canvasRef} id="dna-canvas" />
        <div className="wrap w-full">
          <div style={{ maxWidth: 580 }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="badge badge-accent">🇮🇳 Built for Unbanked India</span>
              <span className="badge badge-green">500M+ addressable users</span>
            </div>
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 800, fontSize: 'clamp(38px,6vw,72px)', lineHeight: 1.08, letterSpacing: '-0.02em', color: '#1a1208', marginBottom: 24 }}>
              Credit for<br />
              <span style={{ color: '#d4500f' }}>everyone</span><br />
              who uses UPI
            </h1>
            <p style={{ color: '#4a3f30', fontSize: 'clamp(15px,2vw,19px)', lineHeight: 1.7, marginBottom: 40, maxWidth: 480 }}>
              Your UPI transaction history is rich financial data. We turn it into a 300–900 score —
              processed <strong>on your device</strong>, never shared raw.
            </p>
            <div className="flex flex-wrap gap-4" style={{ marginBottom: 32 }}>
              <button onClick={() => go('register')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 14, padding: '14px 28px', border: 'none', cursor: 'pointer', fontSize: 16, display: 'flex', alignItems: 'center', gap: 6, transition: 'all .18s' }}
                onMouseOver={e => (e.currentTarget.style.background = '#b83d0a')}
                onMouseOut={e => (e.currentTarget.style.background = '#d4500f')}>
                Get Your Score Free →
              </button>
              <button onClick={() => go('how')} style={{ background: 'transparent', color: '#4a3f30', border: '1.5px solid #e8e0d0', borderRadius: 14, padding: '13px 26px', cursor: 'pointer', fontSize: 16, fontWeight: 600, transition: 'all .18s' }}
                onMouseOver={e => { e.currentTarget.style.background = '#faf8f3'; e.currentTarget.style.borderColor = '#d4c9b5'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#e8e0d0'; }}>
                How It Works
              </button>
            </div>
            <div className="flex flex-wrap items-center gap-6" style={{ fontSize: 14, color: '#8c7d6a' }}>
              {['No bank account needed','100% on-device','Free for individuals'].map(t => (
                <span key={t} className="flex items-center gap-2"><span style={{ color: '#0f7e5a', fontWeight: 700 }}>✓</span> {t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS RIBBON */}
      <section style={{ background: '#1a1208', padding: '40px 0' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', textAlign: 'center', gap: 24 }}>
            {stats.map(([n, l]) => (
              <div key={l}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,4vw,40px)', color: '#22c55e' }}>{n}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,246,236,.5)', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="section" style={{ background: '#fffef9' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', alignItems: 'center', gap: 56 }}>
            <div>
              <span className="badge badge-accent" style={{ marginBottom: 16 }}>The Problem</span>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', lineHeight: 1.1, color: '#1a1208', marginBottom: 24 }}>
                500 million Indians are <span style={{ color: '#d4500f' }}>invisible</span> to banks
              </h2>
              <p style={{ color: '#4a3f30', lineHeight: 1.7, fontSize: 15, marginBottom: 20 }}>
                Not because they're poor — but because banks have <em>no data</em> on them.
                Gig workers, farmers, daily wage earners, and small traders transact entirely
                through UPI. They have <strong>financial lives</strong>, just not credit histories.
              </p>
              <p style={{ color: '#4a3f30', lineHeight: 1.7, fontSize: 15 }}>
                Traditional credit bureaus rely on loan repayment history. If you've never taken a
                loan — which is true for 500M+ Indians — you simply <em>don't exist</em> to the
                credit system.
              </p>
            </div>
            <div className="cdna-card" style={{ padding: 28, background: '#fff0e8', borderColor: 'rgba(212,80,15,.2)' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🙅</div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, color: '#1a1208', marginBottom: 8 }}>Meet Ravi</div>
              <p style={{ fontSize: 14, color: '#4a3f30', lineHeight: 1.65, marginBottom: 16 }}>
                Ravi is a gig delivery worker in Bangalore. He earns ₹28,000/month through UPI,
                pays all his bills on time, and has ₹40,000 in savings. When he applied for a
                ₹50,000 personal loan to buy a motorcycle:
              </p>
              <div style={{ background: '#fdecea', borderRadius: 10, padding: '12px 16px', color: '#c0392b', fontWeight: 700, fontSize: 14, textAlign: 'center' }}>
                ❌ Rejected — No credit history
              </div>
              <p style={{ fontSize: 13, color: '#8c7d6a', marginTop: 12, lineHeight: 1.5 }}>
                With CreditDNA: his 6 months of consistent UPI activity would generate a score of 724 — qualifying him for prime lending rates.
              </p>
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 12, color: '#8c7d6a', marginBottom: 6 }}>CreditDNA Score: 724 / 900</div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '70.6%', background: '#22c55e' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS PREVIEW */}
      <section className="section" style={{ background: '#faf8f3' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>How It Works</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', color: '#1a1208', lineHeight: 1.1 }}>
              Four steps to your credit score
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {howSteps.map(([num, title, desc]) => (
              <div key={num} className="cdna-card" style={{ padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                <div className="step-dot">{num}</div>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#1a1208', marginBottom: 6 }}>{title}</div>
                  <p style={{ fontSize: 14, color: '#4a3f30', lineHeight: 1.65 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 36 }}>
            <button onClick={() => go('how')} style={{ background: 'transparent', color: '#d4500f', border: '1.5px solid rgba(212,80,15,.3)', borderRadius: 12, padding: '11px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>
              Learn More →
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES — dark bg */}
      <section className="section" style={{ background: '#1a1208' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>Why CreditDNA</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(26px,4vw,42px)', color: '#faf6ec', lineHeight: 1.1 }}>
              Built different, by design
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {features.map(([ico, title, desc, c]) => (
              <div key={title} className="cdna-card-lift" style={{ background: 'rgba(255,255,255,.05)', border: '1.5px solid rgba(255,250,235,.08)', borderRadius: 16, padding: 24, transition: 'all .2s' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${c}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, marginBottom: 16 }}>{ico}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, color: '#faf6ec', fontSize: 17, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,246,236,.5)', lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#faf8f3', textAlign: 'center' }}>
        <div className="wrap" style={{ maxWidth: 620 }}>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(28px,5vw,52px)', color: '#1a1208', lineHeight: 1.05, marginBottom: 16 }}>
            Ready to build your credit story?
          </h2>
          <p style={{ color: '#4a3f30', fontSize: 16, maxWidth: 460, margin: '0 auto 40px', lineHeight: 1.65 }}>
            Join thousands of Indians who are already building their CreditDNA score. Free forever for individuals.
          </p>
          <button onClick={() => go('register')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 14, padding: '15px 32px', border: 'none', cursor: 'pointer', fontSize: 16 }}
            onMouseOver={e => (e.currentTarget.style.background = '#b83d0a')}
            onMouseOut={e => (e.currentTarget.style.background = '#d4500f')}>
            Get Your Score Free →
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #e8e0d0', padding: '28px clamp(16px,4vw,32px)', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#8c7d6a' }}>CreditDNA © 2025 · BOTSQUAD · SRM IST · Chennai</p>
      </footer>
    </div>
  );
}
