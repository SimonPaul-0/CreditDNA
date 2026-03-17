import { useState } from 'react';
import { MOCK_TXN, fmtAmt } from '@/lib/store';

interface Props { go: (p: string) => void; }

const CATS = ['All','Food','Utilities','Income','Groceries','Transport','Shopping'];

export default function Transactions({ go }: Props) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const txns = MOCK_TXN.filter(t => {
    const matchCat = filter === 'All' || t.cat === filter;
    const matchSearch = !search || t.merchant.toLowerCase().includes(search.toLowerCase()) || t.cat.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalIn  = MOCK_TXN.filter(t => t.credit).reduce((s, t) => s + t.amt, 0);
  const totalOut = MOCK_TXN.filter(t => !t.credit).reduce((s, t) => s + Math.abs(t.amt), 0);

  return (
    <div className="page-enter" style={{ padding: '28px clamp(16px,4vw,28px) 60px', maxWidth: 800, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 'clamp(22px,4vw,28px)', color: '#1a1208', marginBottom: 4 }}>Transactions</h1>
          <p style={{ fontSize: 13, color: '#8c7d6a' }}>{MOCK_TXN.length} transactions · Demo data</p>
        </div>
        <button onClick={() => go('dashboard')} style={{ background: 'transparent', color: '#4a3f30', border: '1.5px solid #e8e0d0', borderRadius: 10, padding: '8px 16px', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
          ← Dashboard
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { label: 'Total Income', val: `+${fmtAmt(totalIn)}`, c: '#0f7e5a', bg: '#e8f5ef' },
          { label: 'Total Spend',  val: `-${fmtAmt(totalOut)}`, c: '#c0392b', bg: '#fdecea' },
          { label: 'Net Flow',     val: fmtAmt(totalIn - totalOut), c: totalIn > totalOut ? '#0f7e5a' : '#c0392b', bg: '#faf8f3' },
          { label: 'Transactions', val: String(MOCK_TXN.length), c: '#1d5fa8', bg: '#eef4ff' },
        ].map(({ label, val, c, bg }) => (
          <div key={label} style={{ background: bg, borderRadius: 14, padding: '16px 18px' }}>
            <div style={{ fontSize: 12, color: '#8c7d6a', marginBottom: 6 }}>{label}</div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 800, fontSize: 22, color: c }}>{val}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)}
            style={{ padding: '6px 14px', borderRadius: 999, border: `1.5px solid ${filter === cat ? '#d4500f' : '#e8e0d0'}`, background: filter === cat ? '#fff0e8' : '#fff', color: filter === cat ? '#d4500f' : '#4a3f30', fontSize: 13, fontWeight: filter === cat ? 700 : 500, cursor: 'pointer', transition: 'all .15s' }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search merchant or category..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 20, width: '100%' }}
      />

      {/* List */}
      <div className="cdna-card" style={{ padding: 0, overflow: 'hidden' }}>
        {txns.length === 0 ? (
          <div style={{ padding: 40, textAlign: 'center', color: '#8c7d6a', fontSize: 14 }}>No transactions match your filters.</div>
        ) : txns.map((t, i) => (
          <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 20px', borderBottom: i < txns.length - 1 ? '1px solid #f5f0e8' : 'none' }}>
            <div className="txn-ico" style={{ background: t.credit ? '#e8f5ef' : '#f5f0e8' }}>{t.ico}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#1a1208', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.merchant}</div>
              <div style={{ fontSize: 12, color: '#8c7d6a' }}>{t.date} · {t.cat} · {t.upi}</div>
            </div>
            <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, color: t.credit ? '#0f7e5a' : '#1a1208', flexShrink: 0 }}>
              {t.credit ? '+' : ''}{fmtAmt(t.amt)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
