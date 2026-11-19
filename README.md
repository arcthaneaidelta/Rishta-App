# FUTBOLIÑO — Premium Gaming Federation Platform
### High-Fidelity Interactive Web Application Demo

[![Vite](https://img.shields.io/badge/Vite-v8.3-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-v19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

A competitive, high-fidelity interactive demonstration of the **FUTBOLIÑO Gaming Federation Platform**. Designed to client acquisition standards, the platform simulates the full end-to-end player lifecycle: onboarding, matchmaking, tournament knockout brackets, season leagues, authoritative Unity match engine handshakes, Elo calculations, and federation admin operations with local persistence.

---

## 🌟 Executive Overview & Key Highlights

- **Aesthetic Direction:** Restrained, sophisticated sports technology aesthetic using forest greens (`#245C45`), warm off-whites (`#F7F8F5`), soft neutrals (`#F0F2EE`), deep charcoal (`#202722`), and muted gold accents (`#B69A60`). No electric blues or neon gradients.
- **Unified Demonstration State:** Built on a centralized Zustand store with `localStorage` persistence (`futbolino_demo_state_v1`). All match results, bracket progressions, points tables, and Elo adjustments synchronize in real-time.
- **Unity Match Engine Simulation:** Demonstrates pre-match session allocation, a 5-stage WebRTC connection handshake, live tactical pitch HUD, and server-authoritative score verification (PRD Section 25).
- **Interactive Knockout Bracket:** An 8-player single-elimination tournament bracket with Quarter-Finals, Semi-Finals, Grand Final, dynamic winner propagation, and champion coronation.
- **Round-Robin League:** 8-club championship table featuring automatic sorting by Points → Goal Difference → Goals Scored, with instant fixture simulation.
- **Federation High Command (Admin Console):** Complete user moderation (suspend/reactivate), scoreline arbitration, tournament creation modal, and payment ledger with simulated refunds.

---

## 🧭 Application Routes

### Public Federation Website
| Route | Page | Key Features |
|---|---|---|
| `/` | **Landing Page** | Cinematic stadium visual, animated live counters (12,480 players), split About section, How it works, Featured competitions, Top 5 global rankings preview, Footer |
| `/login` | **Authentication** | Demo 1-click login as Alex Morgan (`demo123`), show/hide password, simulated forgot password modal |
| `/register` | **Registration** | Player handle creation, password strength meter, country selector, baseline 1,000 Elo initialization |
| `/tutorial` | **Academy Playbook** | 6 masterclasses (Movement, Passing, Defence, Shooting, Tournaments) with interactive video player modal |

### Authenticated Player Platform
| Route | Page | Key Features |
|---|---|---|
| `/dashboard` | **Player Dashboard** | Welcome banner, 4 KPI cards (1,485 Elo, #124 Rank, 68 Matches, 64.7% Win Rate), performance bars, recent match dossiers, World Cup QF4 fixture launch |
| `/play` | **Friendly Match** | Tactician search, player directory, match sanction picker (Friendly vs Ranked) |
| `/challenges` | **Challenges Hub** | Incoming, Outgoing, and Accepted tabs with inline accept triggers |
| `/matches/:id` | **Unity Match Simulation** | Pre-match header, 5-stage handshake, live tactical pitch simulation, victory simulation triggers, Elo recalculation |
| `/tournaments` | **Tournament Hub** | Filter by All, Active, Registration Open, Upcoming; checkout modal with simulated credit card & PayPal processing |
| `/tournaments/:id` | **Tournament Details** | Overview, participant roster, and interactive 8-player knockout bracket with live advancement |
| `/league` | **League Championship** | Premier Division Season 4 table, matchday 7 fixtures with instant score simulation and table re-sorting |
| `/history` | **Match History** | KPI summary, search & filters (Ranked, Tournament, League, Friendly), detailed match dossiers |
| `/rankings` | **Global Rankings** | Verified Elo leaderboard (K=32), country filter, player search, user highlight |
| `/profile` & `/players/:id` | **Player Profile** | Dossier for Alex Morgan or any player, tactical formations, match logs |
| `/notifications` | **Notifications Center** | Unread badges, filter by category, inline challenge acceptance |

### Administration Console
| Route | Page | Key Features |
|---|---|---|
| `/admin` | **Admin Dashboard** | High-level metrics, active matches audit, competitor compliance status |
| `/admin/users` | **User Control** | Tactician directory, search, suspend & reactivate player actions |
| `/admin/matches` | **Match Arbitration** | Ledger review, scoreline correction modal, voiding anomalies |
| `/admin/tournaments` | **Tournament Operations** | New tournament sanctioning modal with validation (name, format, fee, prize, dates) |
| `/admin/leagues` | **League Operations** | Round schedule oversight, force-simulate fixtures |
| `/admin/payments` | **Treasury Ledger** | Transaction nonces, method breakdown, simulated refund processing |

---

## ⚽ Elo Rating Implementation (PRD Section 13.3)

Matches are recalibrated with standard Elo mathematics:
- **Baseline starting rating:** `1,000`
- **Federation K-factor:** `32`
- **Expected Score Formula:**
  $$\text{Expected} = \frac{1}{1 + 10^{\frac{\text{Rating}_{\text{Opponent}} - \text{Rating}_{\text{Player}}}{400}}}$$
- **Rating Delta:**
  $$\Delta = \text{Round}\left(K \times (\text{Actual} - \text{Expected})\right)$$

*Unranked Friendly matches do not modify Elo standings.*

---

## 🛠️ Development & Local Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript check & build production bundle
npm run build

# Preview production build
npm run preview
```
