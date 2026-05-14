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

## Data source

The demo currently loads mock brand health data from:

```text
public/brand-status.json
```

The provider interface is separated from the UI so the mock provider can later be replaced with the Dynatrace provider in:

```text
src/providers/dynatraceBrandStatusProvider.ts
```
