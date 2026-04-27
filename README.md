# LESTI

LESTI is a mobile-first character quiz built with Vite, React, TypeScript, and Tailwind CSS.

The app asks a set of relationship and personality questions, maps answers onto four dimensions, and returns the closest matching sapphic character. It includes:

- a custom landing page
- a paper-textured quiz flow
- character-specific result pages with per-character background art
- optional quote + translation support on result pages
- preview URLs for checking any result directly

## Stack

- Vite
- React 19
- TypeScript
- Tailwind CSS 4
- Motion

## Local development

Requirements:

- Node.js 18+ recommended

Install dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

The app runs on:

- [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

Type-check:

```bash
npm run lint
```

## Project structure

Main files:

- `/Users/jing/Documents/New project 2/LesTi/src/App.tsx`  
  Main app flow: landing page, quiz flow, result page, preview mode, share handling, image prefetching.

- `/Users/jing/Documents/New project 2/LesTi/src/data/questions.ts`  
  Quiz question set and key-question tie breakers.

- `/Users/jing/Documents/New project 2/LesTi/src/data/characters.ts`  
  Character metadata, coordinates, tags, analysis copy, TO YOU copy, and optional quote data.

- `/Users/jing/Documents/New project 2/LesTi/src/lib/scoring.ts`  
  Score normalization and nearest-character matching logic.

- `/Users/jing/Documents/New project 2/LesTi/src/components/CharacterImage.tsx`  
  Result background image loader with extension fallback.

- `/Users/jing/Documents/New project 2/LesTi/public/images/`  
  Landing, quiz, and result page images.

## Image conventions

Result page backgrounds live in:

`public/images/{character-id}-bg.jpg`

PNG fallbacks are also supported:

`public/images/{character-id}-bg.png`

Other shared images:

- `public/images/home-bg.jpg`
- `public/images/quiz-bg.jpg`

## Preview mode

You can open any result page directly with:

```text
/?preview=<character-id>
```

Examples:

- `/?preview=alice`
- `/?preview=bette`
- `/?preview=heloise`

To hide the result background for inspection:

```text
/?preview=alice&bg=off
```

## Deployment

The project is deployed through Cloudflare Pages.

- `main` is used for production
- branch deployments can be used for preview review

## Notes

- The share button prefers the native share sheet when available.
- If native share is unavailable, it falls back to clipboard copy.
- Result backgrounds are prefetched after the user enters the quiz to improve result-page load time without slowing the landing page too aggressively.
