let toastEl: HTMLDivElement | null = null;
let toastTimer: ReturnType<typeof setTimeout> | null = null;

export function toast(msg: string, type: 'ok' | 'err' | 'info' = 'info') {
  if (toastEl) { toastEl.remove(); toastEl = null; }
  if (toastTimer) clearTimeout(toastTimer);
  const el = document.createElement('div');
  el.className = `toast ${type === 'ok' ? 'ok' : type === 'err' ? 'err' : ''}`;
  el.textContent = msg;
  document.body.appendChild(el);
  toastEl = el;
  toastTimer = setTimeout(() => { el.remove(); toastEl = null; }, 3000);
}
