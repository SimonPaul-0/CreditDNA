# CreditDNA — Credit for Every Indian

Your UPI history is your credit history. CreditDNA is a **client-side web app** (single `index.html`) that helps users think about credit scoring in a **privacy-first** way: questionnaires and document OCR run **in the browser**, with **no server** in this repository.

## What fits CreditDNA best

The name blends **credit** (measurable, serious) with **DNA** (personal, unique, biological metaphor). The strongest fit is everything that reinforces **“your pattern is yours”** without feeling clinical or gimmicky.

| Direction | Why it fits |
|-----------|-------------|
| **Warm, paper-like UI** | Cream/off-white (`#fffef9`), deep brown ink (`#1a1208`) — approachable and “Indian consumer app,” not cold bank grey. |
| **Orange + green** | **Orange** (`#d4500f`) for primary actions and energy; **green** for trust, growth, and the DNA metaphor — reads as hopeful finance, not alarm-red debt. |
| **Plain language + consent** | Short sentences, real examples (UPI, bills, gig work). Privacy as **architecture** (on-device) matches the story better than generic “we care” copy. |
| **Helix / structure, not chaos** | A **double helix** reads as “encoded identity” — good for the brand; keep motion **slow and subtle** so it feels premium, not arcade. |
| **India-first examples** | UPI, DPDP, NBFCs, CIBIL as *context* — not generic US FICO clone positioning. |

**Avoid:** purple-gradient “AI startup” clichés; pure black/white neo-bank minimalism that erases warmth; overpromising bureau-equivalent scores without a licensed backend.

## What this project is

- **Frontend-only SPA** — Navigation, auth UI, dashboard, score check, OCR upload, and “For Banks” pricing/API docs all live in one HTML file.
- **Local demo accounts** — Email/password are stored in **`localStorage`** for prototyping. This is **not** production-grade authentication.
- **Scores** — Generated **on device** from (a) answers on the “My Score” flow and (b) **signals parsed from OCR text** on uploaded statements (not from a remote credit bureau).
- **OCR** — Real text extraction via **[Tesseract.js](https://github.com/naptha/tesseract.js)** and **[PDF.js](https://mozilla.github.io/pdf.js/)** (CDN). PDFs: up to **40 pages** are rasterized and scanned; images are a single page.
- **Lender API keys (demo)** — If you are **signed in** and open **For Banks**, the app **creates a persistent key** (`cdna_live_…`) stored on your user record in `localStorage`. Use it in the documented `Authorization: Bearer` example. A **real** production API would validate keys on a server; this repo does **not** include that backend.

## Features

- **Device-side flows** — Score questionnaire, OCR upload, dashboard, profile.
- **300–900 score range** — Same band as conventional credit scores; calculation is **local and illustrative**.
- **For Banks** — Pricing copy, API example, and **per-account API key** when logged in (copy / regenerate).
- **Mobile-first UI** — Tailwind (CDN), custom cards, responsive layout.
- **3D landing visual** — Double-helix hero built with **Three.js** (r128, CDN): spline-based **tube** strands, rungs, accent torus rings, standard materials + directional lights; animation stops when you leave the page (no leaked `requestAnimationFrame` loops).

## How it works (user journey)

1. **Register / sign in** — Credentials saved in the browser (`localStorage`).
2. **My Score** — User answers questions; a score is computed from those values and saved to the profile.
3. **OCR** — User uploads an image or PDF; text is read in-browser; amounts, dates, IFSC-like strings, and keywords are **heuristically** parsed; a **deterministic** score adjustment from those signals can update the stored score (see code in `index.html`).
4. **For Banks** — Guests see **Get Started** on plans. **Signed-in** users see **their API key** and **Go to Dashboard** on Starter/Growth; **Contact Sales** opens email for Enterprise.

## Getting started

### Prerequisites

- A modern browser (Chrome, Firefox, Safari, Edge).
- **HTTPS or localhost** — Recommended for clipboard API, workers, and CDN scripts (e.g. deploy on **Vercel** or run a local server).

### Run locally

```bash
git clone https://github.com/SimonPaul-0/CreditDNA.git
cd CreditDNA
python -m http.server 8000
# Open http://localhost:8000
```

Avoid relying on `file://` only; OCR libraries and workers behave more reliably over `http(s)://`.

## Architecture (this repo)

| Piece | Role |
|--------|------|
| `index.html` | Entire UI, routing via hash (`#dashboard`, `#pricing`, …), `localStorage` “DB”, OCR, scoring helpers, hero 3D (`initDNA` + `stopHeroDNAIfRunning` on route changes). |
| CDNs | Tailwind, Three.js, **pdf.js**, **tesseract.js** |
| `localStorage` | Keys `cdna_users`, `cdna_me` — user list and session. |

There is **no** Node/Java API in this repository. Endpoints such as `https://api.creditdna.in/v1/score` in the UI are **illustrative** for partners until a backend ships.

## Tech stack

- HTML5, inline JavaScript
- Tailwind CSS (CDN)
- Three.js (r128)
- PDF.js 3.11, Tesseract.js 5

## File structure

```
CreditDNA/
├── index.html    # Full application
└── README.md
```

## Contributing

1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature`).
3. Commit and push; open a Pull Request.

## Team

- **Simon Paul** — Lead Developer  
- **Varsha Rani** — Design & UX  
- **Mayank Bansal** — Backend & Architecture  
- **Deva Nandha** — Product & Research  

## License

MIT License — see LICENSE if present in the repo.

## Contact

- **Email:** contact@creditdna.in (also used for Enterprise **Contact Sales** from the app when signed in.)

---

**Making credit accessible to every Indian.**
