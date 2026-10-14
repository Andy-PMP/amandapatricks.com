# amandapatricks.com

Personal site built with [Astro](https://astro.build) and deployed to GitHub Pages.

## Develop

```sh
npm install
npm run dev       # http://localhost:4321
npm run build     # outputs to dist/
```

## Edit content

- **Résumé / experience:** `src/data/resume.ts`. Everything on the page renders from this file.
- **Résumé PDF:** drop it in at `public/Amanda-Patricks-Resume.pdf`. The "Download résumé" button appears automatically.
- **Projects:** copy `src/content/projects/README.md.example` to `src/content/projects/<name>.md` and fill it in. The Projects section and nav link appear once one exists.
- **Social preview image:** `public/og-image.png` (1200×630).

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages.
`public/CNAME` points the site at amandapatricks.com.
