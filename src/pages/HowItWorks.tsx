interface Props { go: (p: string) => void; }

export default function HowItWorks({ go }: Props) {
  const steps = [
    {
      num: '01', title: 'Share Your UPI Statement',
      desc: 'Export your UPI SMS history or transaction data from your banking app. CreditDNA supports Google Pay, PhonePe, Paytm, BHIM, and all major UPI apps. One-time action, full consent from you.',
      detail: ['Works with all major UPI apps','SMS export or CSV upload','Your data stays on your device','No sharing with third parties'],
      ico: '📱',
    },
    {
      num: '02', title: 'On-Device Processing',
      desc: 'Our ML model runs entirely in your browser using JavaScript — no network call required. 50+ behavioural signals are extracted including income patterns, spending regularity, merchant diversity, and bill payment consistency.',
      detail: ['Runs in your browser via JavaScript','50+ signals extracted','No data ever leaves your device','Processes 6 months of history in <200ms'],
      ico: '🧠',
    },
    {
      num: '03', title: 'Score Generated',
      desc: 'A compressed machine learning model converts your behavioural signals into a score between 300 and 900. Trained on synthetic UPI data, bias-tested across occupations, with plain-English factor explanations.',
      detail: ['300–900 output range','Trained on synthetic UPI data','Bias-tested across occupations','Plain-English factor explanations'],
      ico: '🎯',
    },
    {
      num: '04', title: 'Bank API Integration',
      desc: 'When you apply for a loan, the lender calls our REST API with your consent token. They receive your score, tier, and top factors. Raw transaction data transmission is architecturally impossible.',
      detail: ['POST /api/score — simple REST call','Input: consent token only','Output: score + tier + top 3 factors','Zero raw transactions ever transmitted'],
      ico: '🏦',
    },
  ];

  const signals = [
    ['💸', 'Income Signals', 'Salary credits, freelance payments, regular inflows. Consistency, amount, and growth trend.'],
    ['🔄', 'Payment Regularity', 'Utility bills, rent, subscription payments. On-time rate and regularity score.'],
    ['🛒', 'Merchant Diversity', 'Variety of merchants transacted with. Breadth of economic participation.'],
    ['📈', 'Balance Behaviour', 'Average balance maintained, spending-to-income ratio, savings tendency.'],
    ['🤝', 'P2P Patterns', 'Peer-to-peer transfers, family support patterns, remittance behaviour.'],
    ['📅', 'Transaction Tenure', 'Length of UPI history, account age, long-term consistency.'],
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ background: '#faf8f3', padding: 'clamp(48px,8vw,80px) 0' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 700 }}>
          <span className="badge badge-green" style={{ marginBottom: 16 }}>How It Works</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(30px,5vw,54px)', color: '#1a1208', lineHeight: 1.08, marginBottom: 20 }}>
            From UPI history to credit score — in 4 steps
          </h1>
          <p style={{ color: '#4a3f30', fontSize: 17, lineHeight: 1.7 }}>
            CreditDNA processes your transaction history entirely on your device. No data ever leaves your phone. We generate a comprehensive credit score that banks can query with your consent.
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="section" style={{ background: '#fffef9' }}>
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {steps.map(({ num, title, desc, detail, ico }) => (
              <div key={num} className="cdna-card" style={{ padding: 32, borderTop: `3px solid #d4500f` }}>
                <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div>
                    <div className="step-dot" style={{ marginBottom: 8 }}>{num}</div>
                    <div style={{ fontSize: 32 }}>{ico}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, color: '#1a1208', marginBottom: 12 }}>{title}</h3>
                    <p style={{ fontSize: 15, color: '#4a3f30', lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 8 }}>
                      {detail.map(d => (
                        <div key={d} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13, color: '#4a3f30' }}>
                          <span style={{ color: '#0f7e5a', fontWeight: 700, flexShrink: 0 }}>✓</span>{d}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIGNALS */}
      <section className="section" style={{ background: '#1a1208' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>The Science</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#faf6ec', lineHeight: 1.1 }}>
              50+ behavioural signals
            </h2>
            <p style={{ color: 'rgba(250,246,236,.5)', fontSize: 15, marginTop: 12 }}>Everything your UPI history reveals about your financial health</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {signals.map(([ico, title, desc]) => (
              <div key={title} style={{ background: 'rgba(255,255,255,.05)', border: '1.5px solid rgba(255,250,235,.08)', borderRadius: 16, padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{ico}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, color: '#faf6ec', fontSize: 17, marginBottom: 8 }}>{title}</div>
                <div style={{ fontSize: 13, color: 'rgba(250,246,236,.5)', lineHeight: 1.65 }}>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section className="section" style={{ background: '#faf8f3' }}>
        <div className="wrap" style={{ maxWidth: 700, textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#1a1208', marginBottom: 16 }}>Privacy by architecture</h2>
          <p style={{ color: '#4a3f30', fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            We didn't add privacy as a feature. We built the system so that sharing raw data is technically impossible. The ML model runs in your browser. Your transactions never leave your device. Banks receive only a score token — not your data.
          </p>
          <button onClick={() => go('register')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 14, padding: '14px 28px', border: 'none', cursor: 'pointer', fontSize: 15 }}>
            Get Your Score →
          </button>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #e8e0d0', padding: '28px clamp(16px,4vw,32px)', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#8c7d6a' }}>CreditDNA © 2025 · BOTSQUAD · SRM IST · Chennai</p>
      </footer>
    </div>
  );
}
