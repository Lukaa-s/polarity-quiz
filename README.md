# Polarity Quiz

A 101-question political positioning quiz. It scores each answer onto 14 ideological axes, then compares the result to a set of reference political figures. Live at https://polarity-quiz.fr.

## What it does

- 101 questions (`src/data/questions.json`), each tagged to one of 14 ideological axes (`src/data/axisexplaination.tsx`), answered on a 7-point scale (0 = totally agree, 6 = totally disagree, 3 = neutral default for unanswered questions).
- Questions are shuffled in a different but reproducible order each day (a deterministic per-day seed via FNV-1a + Mulberry32, or pinned with a `?seed=` URL parameter); the shuffle only changes presentation order, never scoring.
- Results show the three sharpest divides first, then one ruler per axis (all 14) with the dominant side and its percentage, a radar chart (Recharts), a list of the closest reference political figures ranked by similarity (22 figures, each with a full 101-answer set scored the same way as the user), and any badges earned (56 defined in `scripts/stamps/defs/`, rendered as SVG icons).
- A result can be shared through a compact URL parameter that encodes every answer, or exported as an image card.
- Available in French (the source of truth for questions, axes, and scoring) and English (a display-only overlay: UI text and question/axis/badge labels translate; the English version uses its own separate roster of reference figures instead of translating the French one).
- Everything runs client-side. Answers are kept in localStorage during the quiz and are not sent anywhere; there is no backend.

## How the positioning is computed

From `src/utils/scoring.ts` and the aggregation in `src/components/ResultEnhanced.tsx`:

- Each question has an axis, a left pole and a right pole, and a `favoredPole`. If `favoredPole` is `"right"`, the raw answer index (0-6) is inverted (`idx = 6 - idx`) so that agreeing always pushes toward the same conceptual side of the axis, regardless of how the question is phrased.
- Each answered question distributes up to 10 points (times an optional per-question `weight`, default 1) between its axis's left and right pole, proportional to how strongly the user agreed or disagreed:
  `leftPts = (6 - idx) / 6 * 10 * weight`, `rightPts = idx / 6 * 10 * weight`.
- Points are summed per axis id, not by label (labels can differ by an apostrophe variant between files), giving a `{left, right}` point total for each of the 14 axes across all its questions.
- Each axis's result is a percentage: `pctLeft = left / (left + right) * 100`, with the dominant side being whichever pole has the higher share.
- Distance to a reference figure is the average, across all 14 axes, of the absolute difference in percentage points between the user's dominant-side percentage and that figure's (the figure's own 101 stored answers run through the identical scoring function). Displayed similarity is `100 - distance`, with no extra bonus or malus term, so the number stays interpretable as an average axis-by-axis gap.

## Stack

React 18 and TypeScript on Vite, Tailwind CSS for styling, Recharts for the radar chart, Framer Motion for animation, html2canvas-pro for the exportable share-card image.

## Run it locally

Verified against `package.json`'s `scripts` (Node 22, npm 10 here):

```shell
npm install
npm run dev        # Vite dev server; verified it serves (HTTP 200) locally
npm run typecheck  # tsc --noEmit; verified clean, no errors
npm run test       # vitest; verified: 4 test files, 43 tests, all passing
npm run build      # production build; verified: builds to dist/ in about 8s
npm run preview    # serve the production build locally
```

Two more scripts regenerate generated assets and aren't needed just to run the app: `npm run generate:stamps` rebuilds the SVG badge icons from `scripts/stamps/defs/`, and `npm run generate:share-assets` rebuilds `public/og-image.png` and the Apple touch icon via `sharp`.
