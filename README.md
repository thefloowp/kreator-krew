# Kreator Krew

A React + TypeScript + Vite starter for the Kreator Krew community and customizable member pages.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

The production site is generated in `dist/`.

## Deploy to Cloudflare Pages

1. Push this folder to a GitHub repository.
2. In Cloudflare, open **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the repository.
4. Use these build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (or the project folder if this repo contains multiple projects)
5. Deploy.

No server runtime is required for this prototype. When authentication, database persistence, and uploads are introduced, connect Supabase and object storage in a later phase. Never put private API keys in frontend code.

## Current prototype

- Shared site navigation and consistent member-card information architecture
- Theme presets that style both the member card and personal page
- Editable theme accent, page background, and page layout controls
- Profile intro, skills, project gallery, interests, and collaboration section
- Responsive desktop and mobile layout

All member information and theme settings are currently demo state in the browser; they are not saved to a database yet.
