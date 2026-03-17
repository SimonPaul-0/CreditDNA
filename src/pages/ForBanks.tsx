interface Props { go: (p: string) => void; }

export default function ForBanks({ go }: Props) {
  const plans = [
    { name: 'Starter', price: '₹2', unit: 'per API call', vol: 'Up to 5,000/month', c: '#8c7d6a', features: ['Full score + tier','Top 3 factors','99.5% uptime SLA','Email support'], popular: false },
    { name: 'Growth',  price: '₹1.50', unit: 'per API call', vol: '5K–50K/month',   c: '#d4500f', features: ['Everything in Starter','Webhook callbacks','Analytics dashboard','Priority support'], popular: true },
    { name: 'Enterprise', price: 'Custom', unit: 'pricing', vol: '100K+/month',     c: '#0f7e5a', features: ['Everything in Growth','Custom SLA agreement','White-label option','AA framework integration','On-premise deployment','Direct team access'], popular: false },
  ];

  const integrationSteps = [
    ['1', 'Get API Key', 'Sign up for a bank account and receive your API key. Integration takes under 30 minutes.'],
    ['2', 'Consent Flow', 'Direct applicants to our consent URL. They authorize their UPI history with a 4-digit pin.'],
    ['3', 'Receive Consent Token', 'We return a consent_token valid for 24 hours. Store it with your loan application.'],
    ['4', 'Call /api/score', 'POST the consent_token to our API. Receive score, tier, and top factors within 200ms.'],
  ];

  return (
    <div className="page-enter">
      {/* HERO */}
      <section style={{ background: '#1a1208', padding: 'clamp(60px,8vw,90px) 0' }}>
        <div className="wrap" style={{ textAlign: 'center', maxWidth: 700 }}>
          <span className="badge badge-green" style={{ marginBottom: 16 }}>For Banks & Lenders</span>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(30px,5vw,54px)', color: '#faf6ec', lineHeight: 1.08, marginBottom: 20 }}>
            Score 500M more borrowers.<br /><span style={{ color: '#22c55e' }}>Without the data risk.</span>
          </h1>
          <p style={{ color: 'rgba(250,246,236,.6)', fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
            One API call. Consent-first. Zero raw transaction data. Expand your addressable market to every Indian with a UPI account.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => go('register')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 14, padding: '14px 28px', border: 'none', cursor: 'pointer', fontSize: 15 }}>
              Get API Access →
            </button>
            <button style={{ background: 'rgba(255,255,255,.1)', color: '#faf6ec', border: '1.5px solid rgba(255,255,255,.15)', borderRadius: 14, padding: '13px 26px', cursor: 'pointer', fontSize: 15, fontWeight: 600 }}>
              View Documentation
            </button>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section" style={{ background: '#fffef9' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#1a1208' }}>Why lenders choose CreditDNA</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 20 }}>
            {[
              ['📊','Expand TAM', 'Access 500M+ previously unscoreable customers instantly.','#d4500f'],
              ['⚡','200ms Latency', 'Score returned within 200ms. No batch processing delays.','#0f7e5a'],
              ['🔒','Zero Data Liability', 'We never receive raw transaction data. You cannot lose what you never held.','#1d5fa8'],
              ['📋','Regulatory Ready', 'AA framework compliant. RBI sandbox tested. Audit-ready logs.','#b45309'],
              ['🎯','High Accuracy', '94% correlation with subsequent repayment behaviour in pilots.','#0f7e5a'],
              ['🔗','Easy Integration', 'REST API, webhooks, and SDKs for Node.js, Python, and Java.','#d4500f'],
            ].map(([ico, title, desc, c]) => (
              <div key={title} className="cdna-card" style={{ padding: 24, borderTop: `3px solid ${c}` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{ico}</div>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 17, color: '#1a1208', marginBottom: 8 }}>{title}</div>
                <p style={{ fontSize: 13, color: '#4a3f30', lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATION STEPS */}
      <section className="section" style={{ background: '#faf8f3' }}>
        <div className="wrap" style={{ maxWidth: 800 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#1a1208' }}>Integrate in 4 steps</h2>
            <p style={{ color: '#4a3f30', fontSize: 15, marginTop: 12 }}>Average integration time: 28 minutes</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {integrationSteps.map(([n, title, desc]) => (
              <div key={n} className="cdna-card" style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div className="step-dot">{n}</div>
                <div>
                  <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, color: '#1a1208', marginBottom: 4 }}>{title}</div>
                  <p style={{ fontSize: 13, color: '#4a3f30', lineHeight: 1.55 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="section" style={{ background: '#fffef9' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <span className="badge badge-accent" style={{ marginBottom: 12 }}>Pricing</span>
            <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(24px,4vw,38px)', color: '#1a1208', marginBottom: 12 }}>Simple, usage-based pricing</h2>
            <p style={{ color: '#4a3f30', fontSize: 15 }}>Pay only for what you use. No setup fees, no hidden costs.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 56, alignItems: 'start', marginTop: 40 }}>
            {plans.map(({ name, price, unit, vol, c, features, popular }) => (
              <div key={name} className={`cdna-card ${popular ? 'plan-popular' : ''}`} style={{ padding: 32, borderTop: `3px solid ${c}`, transform: popular ? 'scale(1.02)' : 'none' }}>
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c, letterSpacing: '.06em', marginBottom: 8, textTransform: 'uppercase' }}>{name}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                    <span style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 36, color: '#1a1208' }}>{price}</span>
                    <span style={{ fontSize: 14, color: '#8c7d6a' }}>{unit}</span>
                  </div>
                  <div style={{ fontSize: 13, color: '#8c7d6a', marginTop: 4 }}>{vol}</div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  {features.map(f => (
                    <div key={f} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '7px 0', borderBottom: '1px solid #f5f0e8', fontSize: 13, color: '#4a3f30' }}>
                      <span style={{ color: c, fontWeight: 700 }}>✓</span>{f}
                    </div>
                  ))}
                </div>
                <button onClick={() => go('register')} style={{ width: '100%', background: popular ? '#d4500f' : 'transparent', color: popular ? '#fff' : '#4a3f30', border: popular ? 'none' : '1.5px solid #e8e0d0', borderRadius: 12, padding: '12px 0', fontWeight: 700, cursor: 'pointer', fontSize: 14, transition: 'all .18s' }}>
                  Get Started →
                </button>
              </div>
            ))}
          </div>

          {/* API CODE */}
          <div className="cdna-card" style={{ padding: 32 }}>
            <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, color: '#1a1208', marginBottom: 8, textAlign: 'center' }}>API Reference</h3>
            <p style={{ fontSize: 14, color: '#4a3f30', marginBottom: 20, textAlign: 'center' }}>Simple REST call. Integrate in minutes.</p>
            <div className="code-block">
              <div style={{ color: '#8c7d6a', marginBottom: 8 }}>{'// Request'}</div>
              <div>POST /api/score HTTP/1.1</div>
              <div>Authorization: Bearer YOUR_API_KEY</div>
              <div>Content-Type: application/json</div>
              <br />
              <div>{'{"consent_token": "cdna_ct_abc123"}'}</div>
              <br />
              <div style={{ color: '#8c7d6a', marginBottom: 8 }}>{'// Response'}</div>
              <div>{'{'}</div>
              <div>&nbsp;&nbsp;"score": 724,</div>
              <div>&nbsp;&nbsp;"tier": "Good",</div>
              <div>&nbsp;&nbsp;"top_factors": ["payment_regularity","income_stability","merchant_diversity"],</div>
              <div>&nbsp;&nbsp;"generated_at": "2025-03-17T10:30:00Z"</div>
              <div>{'}'}</div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #e8e0d0', padding: '28px clamp(16px,4vw,32px)', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: '#8c7d6a' }}>CreditDNA © 2025 · BOTSQUAD · SRM IST · Chennai</p>
      </footer>
    </div>
  );
}
