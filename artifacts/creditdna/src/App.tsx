import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Landing from '@/pages/Landing';
import HowItWorks from '@/pages/HowItWorks';
import ForBanks from '@/pages/ForBanks';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Dashboard from '@/pages/Dashboard';
import CheckScore from '@/pages/CheckScore';
import Transactions from '@/pages/Transactions';
import Profile from '@/pages/Profile';
import { DB } from '@/lib/store';

type Page = 'landing'|'how'|'pricing'|'login'|'register'|'dashboard'|'check'|'transactions'|'profile';
const PROTECTED: Page[] = ['dashboard','check','transactions','profile'];

const hashToPage = (): Page => {
  const h = window.location.hash.replace('#','') as Page;
  return ['landing','how','pricing','login','register','dashboard','check','transactions','profile'].includes(h) ? h : 'landing';
};

export default function App() {
  const [page, setPage] = useState<Page>(hashToPage);

  const go = (p: string) => {
    const target = p as Page;
    const next = PROTECTED.includes(target) && !DB.me() ? 'login' : target;
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState({ page: next }, '', `#${next}`);
  };

  useEffect(() => {
    const onPop = () => setPage(hashToPage());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const pages: Record<Page, JSX.Element> = {
    landing:      <Landing go={go} />,
    how:          <HowItWorks go={go} />,
    pricing:      <ForBanks go={go} />,
    login:        <Login go={go} />,
    register:     <Register go={go} />,
    dashboard:    <Dashboard go={go} />,
    check:        <CheckScore go={go} />,
    transactions: <Transactions go={go} />,
    profile:      <Profile go={go} />,
  };

  return (
    <>
      <Navbar page={page} onNavigate={go} />
      <main key={page}>
        {pages[page] ?? pages.landing}
      </main>
    </>
  );
}
