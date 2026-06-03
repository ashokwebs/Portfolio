# NEXUS://OS

Interactive developer portfolio for **Ashok Pasala**, built as a cinematic operating-system-style web experience.

[GitHub](https://github.com/ashokwebs) · [LinkedIn](https://www.linkedin.com/in/ashok-raj-p-1b8539317/) · [Email](mailto:ashokashishms@gmail.com)

## Overview

`NEXUS://OS` is a portfolio application designed to present technical identity, projects, research interests, and services through an interface that feels closer to a live system than a traditional personal website.

The project combines strong visual direction with interactive navigation, hidden states, terminal-driven discovery, and layered UI behavior while still functioning as a practical portfolio and contact surface.

## Highlights

- Operating-system-inspired landing experience
- Cinematic boot sequence before entering the main interface
- Persistent navigation dock and top system bar
- Command palette for fast route navigation
- Interactive terminal route with custom commands
- Animated galaxy background with scanline and noise effects
- Floating AI assistant with contextual dialogue
- Classified route and hidden discovery paths
- Visitor diagnostics page powered by client-side telemetry
- Skills visualization and project archive views
- Systems, AI, cybersecurity, research, writing, services, and roadmap sections
- Firewall and breach-style interactive mini-games
- Hidden developer breadcrumbs and local CTF-style notes for curious builders
- Contact form integrated into the application experience

## Feature Breakdown

### Interface System

- custom visual identity built around the `NEXUS://OS` theme
- layered ambient effects for depth and atmosphere
- responsive layout across desktop and mobile screens
- page transitions, motion cues, and interactive feedback states

### Navigation

- side dock for section-based browsing
- command palette for fast access
- terminal route for command-driven navigation
- hidden routes and unlock-style discovery elements

### Content Areas

- home / identity presentation
- project archive with category filtering
- skills ecosystem and technical clusters
- systems and AI lab section
- cybersecurity section
- web3 and finance interests
- research and learning section
- writing archive
- services overview
- roadmap and objectives
- direct contact section

### Interactive Systems

- AI assistant with themed response behavior
- diagnostics page that reads client environment data
- classified page with access-gated reveal
- breach and terminal-inspired game interactions
- developer-only clues placed in source and terminal flows

## Tech Stack

- React 19
- Vite 8
- React Router
- GSAP
- Three.js
- React Three Fiber
- Drei
- React Force Graph 3D
- ESLint

## Project Structure

```text
src/
  components/   interface systems, widgets, effects, games
  context/      theme and telemetry providers
  data/         portfolio content and metadata
  hooks/        shared interaction hooks
  pages/        route-level screens
  utils/        local AI/response logic
public/
  _redirects    SPA routing support
  .well-known/  hidden developer artifacts
```

## Notable Design Goals

- make the portfolio memorable without sacrificing clarity
- present technical breadth in a more original format
- reward exploration through interaction and hidden details
- keep the experience cinematic while still usable as a professional portfolio

## Contact

- Email: `ashokashishms@gmail.com`
- GitHub: `https://github.com/ashokwebs`
- LinkedIn: `https://www.linkedin.com/in/ashok-raj-p-1b8539317/`

## License

MIT
