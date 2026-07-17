# Stock Dashboard - Investment Portfolio Tracker

A single-page React application for tracking and managing a stock portfolio. Search for stocks,
add them to your watchlist, adjust holdings, and see your portfolio allocation update live on an
interactive chart. Prices come from a live market data API and each user's portfolio is stored in
their own account.

**Live demo:** https://badvilgo.github.io/investing-portfolio-2/

> Demo login: `test@test.com` / `test.com`

## Screenshots

> Add screenshots or a short GIF of the dashboard here (drop them in `docs/` and reference them),
> for example: `![Dashboard](docs/dashboard.png)`

## Features

- Email and password authentication (sign up, log in, log out) via Supabase Auth
- Protected dashboard route, accessible only to authenticated users
- Summary metrics with animated count-up: total value, total gain / loss, today's change, and
  largest position
- Gain / loss per holding based on an editable buy price, colour-coded for profit and loss
- Portfolio value history chart for the last 30 days, computed from daily closing prices
- 30-day sparkline charts per holding, hand-drawn in SVG
- Daily price change per holding from the Twelve Data quote endpoint
- Live stock search with a debounced input to limit API calls
- API rate-limit awareness: daily time-series data is cached in local storage for 24 hours and
  refreshes are throttled to stay within the free tier
- Add, remove (with undo), and update holdings, with allocation recalculated automatically
- Per-user portfolio persistence in Supabase, with a local storage fallback if the database is
  unreachable
- Portfolio concentration indicator (informational only) and CSV export
- Interactive doughnut chart of portfolio allocation with the total value in the centre
- Light and dark mode with a navbar toggle, persisted across visits
- Design tokens (CSS variables), skeleton loading states, and toast notifications
- Responsive layout (Bootstrap 5) with scroll animations (AOS) that respect reduced-motion
  preferences
- Basic SEO (meta description, Open Graph and Twitter tags) and accessibility (skip link,
  labelled controls, semantic landmarks)

## Tech stack

- **React 18** with **TypeScript**
- **Vite** for development and builds
- **React Router** for client-side routing
- **Supabase** for authentication and the portfolio database (PostgreSQL)
- **Twelve Data API** for market prices and symbol search
- **Chart.js** / react-chartjs-2 for data visualisation
- **Bootstrap 5** for styling
- **Vitest** and Testing Library for unit tests

## Project structure

```
src/
  components/      Reusable UI (Navbar, ProtectedRoute, Logout, Dashboard widgets)
  hooks/           Custom hooks (useAuth, useDebounce)
  lib/             Supabase client, Twelve Data client, portfolio logic and tests
  pages/           Route-level pages (Home, Login, Register, Dashboard, ContactUs)
  types/           Shared TypeScript types
```

## Getting started

### 1. Install dependencies

```
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in your own keys:

```
VITE_SUPABASE_URL=your-supabase-project-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_TWELVE_DATA_API_KEY=your-twelve-data-api-key
```

`.env` is git-ignored, so your keys are never committed.

### 3. Run locally

```
npm run dev
```

## Available scripts

- `npm run dev` - start the Vite dev server
- `npm run build` - type-check and build for production
- `npm run preview` - preview the production build locally
- `npm test` - run the unit tests
- `npm run deploy` - build and publish to GitHub Pages

## Deployment

The app is deployed to GitHub Pages with `npm run deploy`. The `base` path in `vite.config.ts`
must match the repository name so that assets resolve correctly.

## Notes

- Twelve Data's free tier is rate limited, so prices may occasionally be unavailable. The app
  handles this gracefully and shows the last known values.
- The Supabase anon key is a public, client-side key. Access to data is protected by Row Level
  Security policies (see the setup below), not by hiding the key.

## What I learned

- Migrating a legacy Create React App project to a modern Vite and TypeScript setup
- Structuring an app into hooks, a data-access layer, and typed components
- Working with a third-party REST API, including debouncing, error handling, caching, and
  staying within free-tier rate limits
- Integrating authentication and a database with Row Level Security
- Building a themeable UI with design tokens and a persisted light / dark mode
- Drawing custom SVG visualisations (sparklines) and extending Chart.js
- Writing unit tests for pure business logic
