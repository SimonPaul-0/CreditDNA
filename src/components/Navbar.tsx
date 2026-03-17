import { useState } from 'react';
import { useLocation } from 'wouter';
import { DB } from '@/lib/store';
import { toast } from '@/lib/toast';

interface Props {
  page: string;
  onNavigate: (p: string) => void;
}

export default function Navbar({ page, onNavigate }: Props) {
  const [mmOpen, setMmOpen] = useState(false);
  const user = DB.me();
  const [, setLocation] = useLocation();

  const go = (p: string) => {
    setMmOpen(false);
    onNavigate(p);
  };

  const logout = () => {
    DB.logout();
    toast('See you soon!', 'info');
    go('landing');
  };

  const navLink = (id: string, label: string) => (
    <button
      onClick={() => go(id)}
      className="btn-ghost text-sm"
      style={{ color: page === id ? '#d4500f' : '#4a3f30', fontWeight: page === id ? 700 : 500 }}
    >
      {label}
    </button>
  );

  return (
    <>
      <nav
        className="nav-glass flex items-center justify-between"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999, height: 60, padding: '0 clamp(16px,4vw,32px)', borderBottom: '1px solid #e8e0d0' }}
      >
        <button onClick={() => go('landing')} className="flex items-center gap-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
          <div style={{ width: 32, height: 32, background: '#d4500f', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14 }}>C</div>
          <span style={{ fontWeight: 800, fontSize: 17, color: '#1a1208' }}>CreditDNA</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navLink('landing', 'Home')}
          {navLink('how', 'How It Works')}
          {navLink('pricing', 'For Banks')}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <button onClick={() => go('dashboard')} className="user-avatar">{user.name.charAt(0).toUpperCase()}</button>
              <button onClick={() => go('dashboard')} className="btn-ghost text-sm">Dashboard</button>
              <button onClick={logout} className="btn-ghost text-sm" style={{ color: '#c0392b' }}>Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => go('login')} className="btn-ghost text-sm">Sign In</button>
              <button onClick={() => go('register')} className="btn-primary text-sm" style={{ padding: '8px 18px', borderRadius: 10, fontSize: 13, fontWeight: 700, minHeight: 36, background: '#d4500f', color: '#fff', border: 'none', cursor: 'pointer' }}>Get Started</button>
            </>
          )}
        </div>

        <button
          id="hb"
          onClick={() => setMmOpen(v => !v)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: 22, height: 2, background: '#1a1208', borderRadius: 2, transition: 'all .2s' }} />
          ))}
        </button>
      </nav>

      <div className={`mobile-menu ${mmOpen ? 'open' : ''}`}>
        <div className="flex flex-col gap-1">
          {[['landing','🏠','Home'],['how','🔬','How It Works'],['pricing','🏦','For Banks']].map(([id,ico,label]) => (
            <button key={id} onClick={() => go(id)} className="btn-ghost text-left" style={{ justifyContent: 'flex-start', fontWeight: page === id ? 700 : 500, color: page === id ? '#d4500f' : '#1a1208' }}>
              {ico} {label}
            </button>
          ))}
          <hr style={{ border: 'none', borderTop: '1px solid #e8e0d0', margin: '8px 0' }} />
          {user ? (
            <>
              {[['dashboard','📊','Dashboard'],['check','🎯','My Score'],['transactions','💳','Transactions'],['profile','👤','Profile']].map(([id,ico,label]) => (
                <button key={id} onClick={() => go(id)} className="btn-ghost text-left" style={{ justifyContent: 'flex-start' }}>{ico} {label}</button>
              ))}
              <button onClick={logout} className="btn-ghost text-left" style={{ justifyContent: 'flex-start', color: '#c0392b' }}>🚪 Sign Out</button>
            </>
          ) : (
            <>
              <button onClick={() => go('login')} className="btn-ghost text-left" style={{ justifyContent: 'flex-start' }}>🔑 Sign In</button>
              <button onClick={() => go('register')} style={{ background: '#d4500f', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 16px', fontWeight: 700, cursor: 'pointer', marginTop: 4 }}>Get Started Free</button>
            </>
          )}
        </div>
      </div>
      <div style={{ height: 60 }} />
    </>
  );
}
