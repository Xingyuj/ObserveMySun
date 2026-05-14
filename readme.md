# Suncorp Brand Status Console

Standalone React + TypeScript + Vite demo for brand-level operational health monitoring.

## Run locally

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

## Build

```bash
npm run build
```

## GitHub Pages

This project includes a GitHub Actions workflow that builds and deploys the app to GitHub Pages from the `main` branch:

```text
.github/workflows/deploy-github-pages.yml
```

In GitHub, enable Pages with:

```text
Settings -> Pages -> Build and deployment -> Source: GitHub Actions
```

After the workflow finishes, the site should be available at:

```text
https://<github-username>.github.io/ObserveMySun/
```

## Data source

The demo currently loads mock brand health data from:

```text
public/brand-status.json
```

The provider interface is separated from the UI so the mock provider can later be replaced with the Dynatrace provider in:

```text
src/providers/dynatraceBrandStatusProvider.ts
```
