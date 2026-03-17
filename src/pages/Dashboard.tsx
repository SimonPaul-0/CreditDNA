import { useEffect, useState } from 'react';
import { DB, MOCK_TXN, scoreColor, scoreTier, scorePct, fmtAmt, OCC_LABELS } from '@/lib/store';

interface Props { go: (p: string) => void; }

export default function Dashboard({ go }: Props) {
  const [user, setUser] = useState(DB.me());
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const u = DB.me();
    if (!u) { go('login'); return; }
    setUser(u);
    setTimeout(() => setPct(u.score ? scorePct(u.score) : 0), 100);
  }, []);

  if (!user) return null;

  const s = user.score;
  const c = scoreColor(s);
  const tier = scoreTier(s);
  const sp = scorePct(s);
  const circumference = Math.PI * 2 * 66;
  const dashOffset = circumference * (1 - (s ? sp / 100 : 0));

  const subMetrics = [
    ['Payment Regularity','94','Excellent'],
    ['Income Stability','81','Good'],
    ['Merchant Diversity','88','Very Good'],
    ['UPI Tenure','76','Good'],
  ];

  const recentTxns = MOCK_TXN.slice(0, 5);

  return (
    <div className="page-enter" style={{ padding: '28px clamp(16px,4vw,28px) 60px', maxWidth: 1100, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 26, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,30px)', color: '#1a1208', marginBottom: 4 }}>
            Hi, {user.name.split(' ')[0]} {user.isAdmin ? '👑' : '👋'}
          </h1>
          <p style={{ fontSize: 14, color: '#8c7d6a' }}>{user.email}{user.isAdmin ? ' · Admin' : ''}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button onClick={() => go('check')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 10, padding: '8px 18px', border: 'none', cursor: 'pointer', fontSize: 13 }}>
            {s ? 'Refresh Score' : 'Get My Score'}
          </button>
        </div>
      </div>

      {/* Score card */}
      <div className="cdna-card" style={{ padding: 28, marginBottom: 20, borderTop: `3px solid ${c}` }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Arc */}
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: 160, height: 160, margin: '0 auto' }}>
              <svg width="160" height="160" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="66" fill="none" stroke="#f5f0e8" strokeWidth="10" />
                <circle cx="80" cy="80" r="66" fill="none" stroke={c} strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  style={{ transition: 'stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)' }} />
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 38, color: c, lineHeight: 1 }}>{s || '?'}</div>
                <span className="badge" style={{ background: `${c}18`, color: c, marginTop: 4, fontSize: 11 }}>{tier}</span>
              </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.1em', color: '#8c7d6a', marginTop: 10 }}>YOUR CREDITDNA SCORE</div>
          </div>

          <div style={{ flex: 1, minWidth: 200 }}>
            {s ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#8c7d6a', marginBottom: 6 }}>
                  <span>300 — Poor</span><span>900 — Excellent</span>
                </div>
                <div className="progress-bar" style={{ marginBottom: 20 }}>
                  <div className="progress-fill" style={{ width: `${pct}%`, background: c }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12 }}>
                  {subMetrics.map(([lbl, val, t]) => (
                    <div key={lbl} style={{ background: '#faf8f3', borderRadius: 10, padding: 12 }}>
                      <div style={{ fontSize: 12, color: '#8c7d6a', marginBottom: 4 }}>{lbl}</div>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                        <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 20, color: c }}>{val}</span>
                        <span style={{ fontSize: 11, color: '#8c7d6a' }}>/100</span>
                      </div>
                      <div style={{ fontSize: 11, color: '#8c7d6a' }}>{t}</div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <p style={{ color: '#4a3f30', marginBottom: 20, fontSize: 15, lineHeight: 1.6 }}>
                  Your CreditDNA score isn't generated yet. Parse your UPI statement to get your score in under 200ms.
                </p>
                <button onClick={() => go('check')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '12px 24px', border: 'none', cursor: 'pointer', fontSize: 14 }}>
                  Generate My Score →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16, marginBottom: 20 }}>
        {[
          { icon: '🎯', label: 'Check Score', sub: 'Parse UPI statement', page: 'check', c: '#d4500f' },
          { icon: '💳', label: 'Transactions', sub: `${MOCK_TXN.length} recent txns`, page: 'transactions', c: '#0f7e5a' },
          { icon: '👤', label: 'Profile', sub: OCC_LABELS[user.occ] || 'Your info', page: 'profile', c: '#1d5fa8' },
        ].map(({ icon, label, sub, page, c: cc }) => (
          <button key={page} onClick={() => go(page)} className="cdna-card cdna-card-lift" style={{ padding: '20px 24px', display: 'flex', gap: 14, alignItems: 'center', border: 'none', cursor: 'pointer', textAlign: 'left', background: '#fff' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${cc}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{icon}</div>
            <div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 15, color: '#1a1208' }}>{label}</div>
              <div style={{ fontSize: 12, color: '#8c7d6a', marginTop: 2 }}>{sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="cdna-card" style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#1a1208' }}>Recent Transactions</div>
          <button onClick={() => go('transactions')} style={{ background: 'none', border: 'none', color: '#d4500f', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>View all →</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {recentTxns.map(t => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0', borderBottom: '1px solid #f5f0e8' }}>
              <div className="txn-ico" style={{ background: t.credit ? '#e8f5ef' : '#f5f0e8' }}>{t.ico}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1208' }}>{t.merchant}</div>
                <div style={{ fontSize: 12, color: '#8c7d6a' }}>{t.date} · {t.cat}</div>
              </div>
              <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 15, color: t.credit ? '#0f7e5a' : '#1a1208' }}>
                {t.credit ? '+' : ''}{fmtAmt(t.amt)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
