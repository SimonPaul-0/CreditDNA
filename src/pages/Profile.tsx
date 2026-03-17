import { useState } from 'react';
import { DB, OCC_LABELS, scoreColor, scoreTier } from '@/lib/store';
import { toast } from '@/lib/toast';

interface Props { go: (p: string) => void; }

export default function Profile({ go }: Props) {
  const user = DB.me();
  if (!user) { go('login'); return null; }

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);

  const save = () => {
    if (!name.trim()) { toast('Name cannot be empty', 'err'); return; }
    DB.updateMe({ name: name.trim(), phone });
    setEditing(false);
    toast('Profile updated ✓', 'ok');
  };

  const logout = () => {
    DB.logout();
    toast('See you soon!', 'info');
    go('landing');
  };

  const c = scoreColor(user.score);

  return (
    <div className="page-enter" style={{ padding: '28px clamp(16px,4vw,28px) 60px', maxWidth: 640, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
        <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', color: '#1a1208' }}>Profile</h1>
        <button onClick={() => go('dashboard')} style={{ background: 'transparent', color: '#4a3f30', border: '1.5px solid #e8e0d0', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>← Dashboard</button>
      </div>

      {/* Avatar card */}
      <div className="cdna-card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: '#fff0e8', border: '2px solid rgba(212,80,15,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 30, color: '#d4500f', flexShrink: 0 }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, color: '#1a1208', marginBottom: 4 }}>{user.name}</div>
            <div style={{ fontSize: 14, color: '#8c7d6a', marginBottom: 6 }}>{user.email}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {user.isAdmin && <span className="badge badge-accent">👑 Admin</span>}
              <span className="badge badge-green">{OCC_LABELS[user.occ] || 'User'}</span>
              {user.score && <span className="badge" style={{ background: `${c}15`, color: c }}>Score: {user.score} · {scoreTier(user.score)}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="cdna-card" style={{ padding: 28, marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#1a1208' }}>Personal Details</div>
          {!editing && <button onClick={() => setEditing(true)} style={{ background: 'none', border: '1.5px solid #e8e0d0', borderRadius: 9, padding: '6px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#4a3f30' }}>Edit</button>}
        </div>

        {editing ? (
          <>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#4a3f30', marginBottom: 6 }}>Phone</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 9876543210" />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => { setEditing(false); setName(user.name); setPhone(user.phone); }} style={{ flex: 1, background: 'transparent', color: '#4a3f30', border: '1.5px solid #e8e0d0', borderRadius: 12, padding: '11px 0', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={save} style={{ flex: 1, background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '11px 0', border: 'none', cursor: 'pointer', fontSize: 14 }}>Save Changes</button>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              ['Full Name', user.name],
              ['Email', user.email],
              ['Phone', user.phone || 'Not provided'],
              ['Occupation', OCC_LABELS[user.occ] || '—'],
              ['UPI App', user.upiApp || '—'],
              ['Monthly Volume', user.txn || '—'],
              ['Member Since', new Date(user.joined).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })],
            ].map(([label, val]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '10px 0', borderBottom: '1px solid #f5f0e8', gap: 12 }}>
                <span style={{ fontSize: 13, color: '#8c7d6a', fontWeight: 500, flexShrink: 0 }}>{label}</span>
                <span style={{ fontSize: 14, color: '#1a1208', fontWeight: 600, textAlign: 'right' }}>{val}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Score summary */}
      <div className="cdna-card" style={{ padding: 28, marginBottom: 20, borderTop: `3px solid ${c}` }}>
        <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#1a1208', marginBottom: 16 }}>Credit Score</div>
        {user.score ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 52, color: c, lineHeight: 1 }}>{user.score}</div>
            <div>
              <span className="badge" style={{ background: `${c}18`, color: c, fontSize: 13 }}>{scoreTier(user.score)}</span>
              <p style={{ fontSize: 13, color: '#4a3f30', marginTop: 8, lineHeight: 1.55 }}>Your score is in the {scoreTier(user.score).toLowerCase()} range. Keep transacting regularly to maintain or improve it.</p>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontSize: 14, color: '#4a3f30', marginBottom: 16, lineHeight: 1.6 }}>You haven't generated your CreditDNA score yet.</p>
            <button onClick={() => go('check')} style={{ background: '#d4500f', color: '#fff', fontWeight: 700, borderRadius: 12, padding: '10px 20px', border: 'none', cursor: 'pointer', fontSize: 14 }}>
              Generate My Score →
            </button>
          </div>
        )}
      </div>

      {/* Danger zone */}
      <div className="cdna-card" style={{ padding: 28 }}>
        <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 18, color: '#1a1208', marginBottom: 16 }}>Account</div>
        <button onClick={logout} style={{ background: '#fdecea', color: '#c0392b', border: '1.5px solid rgba(192,57,43,.25)', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 700, cursor: 'pointer', transition: 'all .15s' }}
          onMouseOver={e => { e.currentTarget.style.background = '#c0392b'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = '#fdecea'; e.currentTarget.style.color = '#c0392b'; }}>
          🚪 Sign Out
        </button>
      </div>
    </div>
  );
}
