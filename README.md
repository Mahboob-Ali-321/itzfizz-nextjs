# Itzfizz – Scroll-Driven Hero Section

Next.js (App Router) + Tailwind CSS + GSAP ScrollTrigger.

- Load animation: staggered headline reveal, then stats one by one with a count-up.
- Scroll animation: hero is pinned; car, wheels, road lines, headline and stats are all scrubbed by scroll progress (`scrub: 1.2`).
- Only `transform` and `opacity` are animated.

## Run locally
    npm install
    npm run dev

## Deploy (GitHub Pages)
1. Push this folder to a GitHub repo (branch `main`).
2. Repo Settings > Pages > Source: **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds the static export and publishes it.
