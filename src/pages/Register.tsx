import { useState } from 'react';
import { DB, ADMIN_EMAILS, OCC_LABELS } from '@/lib/store';
import { toast } from '@/lib/toast';

interface Props { go: (p: string) => void; }

export default function Register({ go }: Props) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', occ: '', txn: '', upiApp: '' });
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const next = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (step === 1) {
      if (!form.name || !form.email || !form.password) { setErr('Please fill in all required fields.'); return; }
      if (form.password.length < 6) { setErr('Password must be at least 6 characters.'); return; }
      if (DB.findByEmail(form.email)) { setErr('This email is already registered.'); return; }
      setStep(2);
    } else {
      if (!form.occ) { setErr('Please select your occupation.'); return; }
      setLoading(true);
      setTimeout(() => {
        const isAdm = ADMIN_EMAILS.includes(form.email.toLowerCase());
        const user = {
          id: Date.now(), name: form.name, email: form.email.toLowerCase(),
          password: form.password, phone: form.phone, occ: form.occ,
          txn: form.txn, upiApp: form.upiApp, isAdmin: isAdm,
          score: null, joined: new Date().toISOString(),
        };
        const users = DB.users();
        users.push(user);
        DB.save(users);
        DB.setMe(user);
        toast(isAdm ? '👑 Admin account created!' : '🎉 Welcome to CreditDNA!', 'ok');
        go('dashboard');
      }, 800);
    }
  };

  const occs = Object.entries(OCC_LABELS);
  const upiApps = ['Google Pay', 'PhonePe', 'Paytm', 'BHIM', 'Amazon Pay', 'WhatsApp Pay', 'Other'];
  const txnRanges = ['Less than ₹5,000/month','₹5,000–₹20,000/month','₹20,000–₹50,000/month','₹50,000–₹1L/month','More than ₹1L/month'];

  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: '#d4500f', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 16 }}>C</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 28, color: '#1a1208', marginBottom: 8 }}>
            {step === 1 ? 'Create your account' : 'Tell us about yourself'}
          </h1>
          <p style={{ color: '#8c7d6a', fontSize: 14 }}>Step {step} of 2</p>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
            {[1,2].map(s => (
              <div key={s} style={{ height: 4, borderRadius: 2, width: 48, background: s <= step ? '#d4500f' : '#e8e0d0', transition: 'background .3s' }} />
            ))}
          </div>
        </div>

        <div className="cdna-card" style={{ padding: 32 }}>
          {err && <div style={{ background: '#fdecea', border: '1px solid rgba(192,57,43,.25)', borderRadius: 12, padding: '11px 14px', marginBottom: 16, color: '#c0392b', fontSize: 13, fontWeight: 500 }}>{err}</div>}
          <form onSubmit={next}>
            {step === 1 ? (
              <>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Full Name *</label>
                  <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="Ravi Kumar" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Password *</label>
                  <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" />
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Phone (optional)</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 9876543210" />
                </div>
                <button type="submit" style={{ width: '100%', background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '13px 0', border: 'none', cursor: 'pointer', fontSize: 15 }}>
                  Continue →
                </button>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 10 }}>Occupation *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {occs.map(([k, v]) => (
                      <button key={k} type="button" onClick={() => set('occ', k)} style={{ padding: '10px 12px', border: `2px solid ${form.occ === k ? '#d4500f' : '#e8e0d0'}`, borderRadius: 12, background: form.occ === k ? '#fff0e8' : '#fff', color: '#1a1208', fontSize: 13, fontWeight: form.occ === k ? 700 : 500, cursor: 'pointer', transition: 'all .15s', textAlign: 'left' }}>
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Primary UPI App</label>
                  <select value={form.upiApp} onChange={e => set('upiApp', e.target.value)}>
                    <option value="">Select UPI app</option>
                    {upiApps.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Monthly UPI Transaction Volume</label>
                  <select value={form.txn} onChange={e => set('txn', e.target.value)}>
                    <option value="">Select range</option>
                    {txnRanges.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button type="button" onClick={() => setStep(1)} style={{ flex: 1, background: 'transparent', color: '#4a3f30', border: '1.5px solid #e8e0d0', borderRadius: 12, padding: '13px 0', cursor: 'pointer', fontWeight: 600 }}>← Back</button>
                  <button type="submit" disabled={loading} style={{ flex: 2, background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '13px 0', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, opacity: loading ? .7 : 1 }}>
                    {loading ? 'Creating account...' : 'Create Account →'}
                  </button>
                </div>
              </>
            )}
          </form>

          {step === 1 && (
            <div style={{ borderTop: '1px solid #e8e0d0', marginTop: 20, paddingTop: 18, textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: '#8c7d6a' }}>
                Already have an account?{' '}
                <button onClick={() => go('login')} style={{ background: 'none', border: 'none', color: '#d4500f', fontWeight: 700, cursor: 'pointer', fontSize: 14, padding: 0 }}>Sign in</button>
              </p>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#8c7d6a', marginTop: 16 }}>
          Free forever for individuals · No credit card required
        </p>
      </div>
    </div>
  );
}
