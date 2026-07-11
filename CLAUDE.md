# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Polarity Quiz** is a French political quiz application built with React 18, TypeScript, Vite, and Tailwind CSS. Users answer 101 political questions to discover their ideological position across 14 axes. Results are displayed as percentage breakdowns per axis, a radar chart (recharts), earned badges, and a proximity ranking against 22 reference profiles of political figures.

## Development Commands

```bash
npm run dev              # Vite dev server (HMR)
npm run build            # Production build
npm run preview          # Serve the production build locally
npm run typecheck        # tsc --noEmit (strict)
npm run test             # Vitest (data-sync test suite)
npm run optimize:badges  # Re-compress src/badges/*.png via sharp (512px, ≤150 KB)
npm run generate:share-assets  # Regenerate public/og-image.png + apple-touch-icon.png via sharp
```

## Architecture

### Core Flow (App.tsx)

1. **Welcome screen** — hero with PoleFaceoff, honest length notice ("101 questions · ~15 min"), and a "Reprendre le test" banner when an unfinished run exists in localStorage
2. **Question flow** — sequential display via `QuestionEnhanced.tsx` (7-point ink-intensity Likert scale, focus management, aria-live progress)
3. **Results** — `ResultEnhanced.tsx`, loaded via `React.lazy()` (recharts + html2canvas-pro stay out of the initial bundle)

`Question.tsx` and `Result.tsx` were removed (dead legacy versions) — only the `*Enhanced` components exist.

### Key State Management

- **Daily seed**: questions are shuffled deterministically per Paris-timezone day (or `?seed=` URL param) using FNV-1a + Mulberry32. The shuffle only affects presentation order, never scoring.
- **Answers**: `Record<string, number>` where key = question id, value = 0–6 (0 = "Tout à fait d'accord", 6 = "Pas du tout d'accord", 3 = neutral).
- **Progress persistence**: answers are saved to localStorage under `pq_progress_v1` on every answer; cleared on submit and on voluntary restart. Resume repositions on the first unanswered question in the current day's order.
- Shared-results URLs use a compact `?results=v2_<digits>` param — one char per question in `questions.json` file order (0–6, `-` = unanswered), plus an optional `&name=` param (`shareResults.ts`). Legacy base64-JSON links still decode. Everything read from the URL is untrusted: answers are filtered to known question ids / integers 0–6, the name is sanitized and capped. `share-results.test.ts` locks the format.

### Scoring (`src/utils/scoring.ts`)

**Scores are keyed by axis `id`** (e.g. `state_vs_market`), never by the display label — labels differ by apostrophe variants across files and renames must not break joins. `axisIdForName()` normalizes apostrophes and maps a label to its id from `axisexplaination.tsx`.

- Questions have a `favoredPole` ("left"/"right"); right-favored answers are inverted (`idx = 6 - idx`)
- Points distributed linearly: `leftPts = (6 - idx) / 6 * 10 * weight`
- Missing answers currently default to neutral (3) — known methodological limitation

### Badges (`src/data/badges.tsx`, `src/utils/badges.ts`)

- `test({ answers, axisScores })` — **`axisScores` is keyed by axis id** (see comment in the Badge type)
- All tests must return a real boolean and guard against missing axes/empty answers
- Badge PNGs in `src/badges/` are optimized (512px, ≤150 KB each); run `npm run optimize:badges` after adding one

### Data Files

- **`questions.json`** — 101 questions: `id`, `text`, `axis` (label matching `axisexplaination.tsx`), `leftPole`, `rightPole`, `favoredPole`, `weight`, `explanation`
- **`axisexplaination.tsx`** — the 14 axes: `id` (stable join key), `sortIndex` (display order everywhere), labels, left/right pole explanations
- **`referenceProfiles.ts`** — 22 political figures with full answer sets (must cover every question id). `excludeFromMatching: true` keeps historical totalitarian profiles (Hitler, Staline) out of the "closest personalities" ranking while staying browsable in the explorer.

### Tests (`src/__tests__/data-sync.test.ts`)

Run `npm run test` after ANY change to the data files. The suite locks the data joins: every question axis resolves to a known axis id, poles match axis labels, every profile covers exactly the current question ids, badges only read valid axis ids, every badge is reachable, no badge fires on empty answers.

### Styling

- Editorial "Scrutin" theme: warm paper background, near-black ink, Fraunces (display) + Libre Franklin (body)
- Tokens live in `tokens.css` (source of truth, OKLCH) and are mirrored in `tailwind.config.js` (hex, for opacity modifiers)
- **Red `#C62828` = left pole, blue `#1565C0` = right pole — strictly functional, never decorative.** The answer scale uses ink-intensity markers, no hue.
- Respect `prefers-reduced-motion`: use `useReducedMotion()` to gate framer-motion props

## Common Patterns

**Adding a question**: add to `questions.json` with a unique `id`, an `axis` label that matches `axisexplaination.tsx`, and matching pole labels — then add an answer for it in ALL 22 reference profiles and run `npm run test` (it fails loudly on any desync).

**Adding an axis**: add to `axisexplaination.tsx` with unique `id` and `sortIndex`; reference the exact label from questions.

**Adding a badge**: add to `badges.tsx`; read `axisScores` by axis **id**; return a boolean; guard missing data. The reachability test will fail if the badge can never trigger.

## Important Notes

- Answer indices run 0–6 (7 choices); scoring inverts right-favored questions
- Results are computed live from answers; no server/API
- GoatCounter analytics is **active** (code `polarity-quiz`, script in `index.html`); `analytics.ts` auto-detects it and tracks events (start, completion, shares, Ko-fi clicks). The CSP in `vercel.json` allows `https://gc.zgo.at` (script-src) and `https://*.goatcounter.com` (connect-src) — keep both aligned with the script tag if the code or domain ever changes
- Support links point to `https://ko-fi.com/lukaaasss` (plain outbound links, no third-party script): a salient block at the end of the results tab (`ResultEnhanced.tsx`) and a discreet line on the welcome screen (`App.tsx`)
- Security headers incl. CSP live in `vercel.json` — adding any new external origin (font, analytics…) requires updating the CSP there
- SEO/share assets live in `public/` (`favicon.svg`, `og-image.png`, `robots.txt`, `sitemap.xml`); the production domain is `https://polarity-quiz.fr` — `og:url`/`og:image`/canonical in `index.html`, the `Sitemap:` line in `robots.txt` and `sitemap.xml` all reference it and must stay in sync if it ever changes
- `html2canvas-pro` (maintained fork — the original html2canvas chokes on the oklch() colors of tokens.css) is dynamically imported inside the export handler (own chunk, loaded on click); recharts stays in the lazy ResultEnhanced chunk. On mobile the export goes through `navigator.share` (native share sheet), falling back to a blob download
- Legacy iteration docs are archived in `docs/archive/`
