export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  occ: string;
  txn: string;
  upiApp: string;
  isAdmin: boolean;
  score: number | null;
  joined: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  cat: string;
  amt: number;
  credit: boolean;
  upi: string;
  ico: string;
}

const USERS_KEY = 'cdna_users';
const ME_KEY = 'cdna_me';

export const ADMIN_EMAILS = [
  'simon@creditdna.in',
  'mayank@creditdna.in',
  'varsha@creditdna.in',
  'deva@creditdna.in',
  'admin@creditdna.in',
];

export const MOCK_TXN: Transaction[] = [
  { id:'T1',  date:'14 Mar', merchant:'Swiggy',            cat:'Food',       amt:-340,  credit:false, upi:'swiggy@icici',  ico:'🍔' },
  { id:'T2',  date:'13 Mar', merchant:'BESCOM Electricity', cat:'Utilities',  amt:-1240, credit:false, upi:'bescom@sbi',    ico:'⚡' },
  { id:'T3',  date:'13 Mar', merchant:'Salary Credit',      cat:'Income',     amt:25000, credit:true,  upi:'employer@hdfc', ico:'💰' },
  { id:'T4',  date:'12 Mar', merchant:'Zomato',             cat:'Food',       amt:-280,  credit:false, upi:'zomato@kotak',  ico:'🍕' },
  { id:'T5',  date:'11 Mar', merchant:'DMart',              cat:'Groceries',  amt:-1850, credit:false, upi:'dmart@axis',    ico:'🛒' },
  { id:'T6',  date:'10 Mar', merchant:'Airtel Recharge',    cat:'Utilities',  amt:-399,  credit:false, upi:'airtel@airtel', ico:'📱' },
  { id:'T7',  date:'09 Mar', merchant:'Rapido',             cat:'Transport',  amt:-95,   credit:false, upi:'rapido@ybl',    ico:'🛵' },
  { id:'T8',  date:'08 Mar', merchant:'Freelance Payment',  cat:'Income',     amt:5000,  credit:true,  upi:'client@paytm',  ico:'💼' },
  { id:'T9',  date:'07 Mar', merchant:'Amazon',             cat:'Shopping',   amt:-1299, credit:false, upi:'amazon@apl',    ico:'📦' },
  { id:'T10', date:'06 Mar', merchant:'BWSSB Water Bill',   cat:'Utilities',  amt:-480,  credit:false, upi:'bwssb@sbi',     ico:'💧' },
  { id:'T11', date:'05 Mar', merchant:'Ola Auto',           cat:'Transport',  amt:-65,   credit:false, upi:'ola@ola',       ico:'🚗' },
  { id:'T12', date:'04 Mar', merchant:'Jio Recharge',       cat:'Utilities',  amt:-299,  credit:false, upi:'jio@jio',       ico:'📶' },
];

export const OCC_LABELS: Record<string, string> = {
  gig: 'Gig Worker', farmer: 'Farmer', student: 'Student',
  sme: 'Business Owner', daily: 'Daily Wage Worker', freelance: 'Freelancer',
  employed: 'Salaried Employee', other: 'Other',
};

export function scoreColor(s: number | null): string {
  if (!s) return '#8c7d6a';
  if (s >= 800) return '#0f7e5a';
  if (s >= 700) return '#22c55e';
  if (s >= 600) return '#b45309';
  if (s >= 500) return '#d4500f';
  return '#c0392b';
}

export function scoreTier(s: number | null): string {
  if (!s) return 'Not Scored';
  if (s >= 800) return 'Excellent';
  if (s >= 700) return 'Very Good';
  if (s >= 600) return 'Good';
  if (s >= 500) return 'Fair';
  return 'Poor';
}

export function scorePct(s: number | null): number {
  if (!s) return 0;
  return Math.round(((s - 300) / 600) * 100);
}

export function fmtAmt(n: number): string {
  const abs = Math.abs(n);
  if (abs >= 100000) return `₹${(abs / 100000).toFixed(1)}L`;
  if (abs >= 1000) return `₹${(abs / 1000).toFixed(1)}K`;
  return `₹${abs}`;
}

export const DB = {
  users(): User[] {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
    catch { return []; }
  },
  save(users: User[]) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },
  findByEmail(email: string): User | null {
    return this.users().find(u => u.email === email.toLowerCase()) || null;
  },
  me(): User | null {
    try {
      const raw = localStorage.getItem(ME_KEY);
      if (!raw) return null;
      const saved = JSON.parse(raw) as User;
      return this.findByEmail(saved.email) || null;
    } catch { return null; }
  },
  setMe(u: User) { localStorage.setItem(ME_KEY, JSON.stringify(u)); },
  logout() { localStorage.removeItem(ME_KEY); },
  updateMe(updates: Partial<User>) {
    const me = this.me();
    if (!me) return;
    const users = this.users().map(u => u.id === me.id ? { ...u, ...updates } : u);
    this.save(users);
    this.setMe({ ...me, ...updates });
  },
};
