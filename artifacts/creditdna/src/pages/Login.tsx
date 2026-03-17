import { useState } from 'react';
import { DB } from '@/lib/store';
import { toast } from '@/lib/toast';

interface Props { go: (p: string) => void; }

export default function Login({ go }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr('');
    if (!email || !password) { setErr('Please fill in all fields.'); return; }
    setLoading(true);
    setTimeout(() => {
      const user = DB.findByEmail(email);
      if (!user || user.password !== password) {
        setErr('Invalid email or password.');
        setLoading(false);
        return;
      }
      DB.setMe(user);
      toast('Welcome back! 👋', 'ok');
      go('dashboard');
    }, 600);
  };

  return (
    <div className="page-enter" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, background: '#d4500f', borderRadius: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 16 }}>C</div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 28, color: '#1a1208', marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: '#8c7d6a', fontSize: 14 }}>Sign in to your CreditDNA account</p>
        </div>

        <div className="cdna-card" style={{ padding: 32 }}>
          {err && <div style={{ background: '#fdecea', border: '1px solid rgba(192,57,43,.25)', borderRadius: 12, padding: '11px 14px', marginBottom: 16, color: '#c0392b', fontSize: 13, fontWeight: 500 }}>{err}</div>}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password" />
            </div>
            <button type="submit" disabled={loading} style={{ width: '100%', background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '13px 0', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', fontSize: 15, opacity: loading ? .7 : 1, transition: 'all .18s' }}>
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <div style={{ borderTop: '1px solid #e8e0d0', marginTop: 24, paddingTop: 20, textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: '#8c7d6a' }}>
              Don't have an account?{' '}
              <button onClick={() => go('register')} style={{ background: 'none', border: 'none', color: '#d4500f', fontWeight: 700, cursor: 'pointer', fontSize: 14, padding: 0 }}>
                Get started free
              </button>
            </p>
          </div>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: '#8c7d6a', marginTop: 16 }}>
          Demo: use any email from your registration
        </p>
      </div>
    </div>
  );
}
