# NEXUS://OS

An operating-system-inspired developer portfolio for Ashok Pasala.

This is not a static landing page pretending to be a portfolio. It behaves more like a small interactive environment: terminal navigation, hidden routes, cinematic boot flow, diagnostics, a command palette, ambient AI chat, and a few quiet breadcrumbs for developers who inspect a little deeper.

## What It Is

`NEXUS://OS` is a React + Vite portfolio built to present:

- identity and positioning
- project archive
- skills and technical clusters
- systems/AI lab work
- cybersecurity and research interests
- writing, roadmap, and services
- contact flow for real Netlify form submissions

It is designed to feel memorable without losing credibility.

## Core Experience

- OS-style landing page with boot sequence
- command palette navigation
- terminal page with hidden commands
- animated galaxy background and scanline/noise layers
- floating AI assistant with themed dialogue changes
- classified route and easter eggs
- firewall/breach mini-games
- visitor diagnostics page
- Netlify-ready SPA routing and contact form handling

## Stack

- React 19
- Vite 8
- React Router
- GSAP
- Three.js
- React Three Fiber / Drei
- React Force Graph 3D
- ESLint
- Netlify

## Local Development

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Run lint:

```bash
npm run lint
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  components/   UI systems, terminal widgets, effects, games
  context/      theme and telemetry state
  data/         portfolio content and project metadata
  hooks/        shared interaction hooks
  pages/        route-level screens
  utils/        local AI response logic
public/
  _redirects    SPA fallback for Netlify
  .well-known/  a quiet place for curious developers
```

## Netlify Deployment

This repo is set up for Netlify deployment.

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: `public/_redirects`
- Netlify config: `netlify.toml`
- Contact form: wired for Netlify Forms

### Deploy Steps

1. Push the repo to GitHub.
2. Import the repo into Netlify.
3. Keep the default build command and publish directory from `netlify.toml`.
4. Deploy.
5. Open the Netlify dashboard and verify form submissions under `Forms`.
6. If you later add a custom domain, update social metadata URLs as needed.

## Notes For Future Updates

- Add real deployment/source links to more project cards when available.
- Replace `/canvas.png` with a dedicated Open Graph image for sharper social previews.
- If the Netlify site URL changes, update metadata to match the final domain.
- If you expand the hidden developer trail, keep it subtle. The best clues reward inspection.

## Why It Works

There are many portfolio sites that are clean.

Very few are clean, technically ambitious, memorable, and curious enough to make another developer open DevTools.

That is the lane this project is trying to own.

## Contact

- Email: `ashokashishms@gmail.com`
- GitHub: `https://github.com/ashokwebs`
- LinkedIn: `https://www.linkedin.com/in/ashok-raj-p-1b8539317/`

## License

MIT
