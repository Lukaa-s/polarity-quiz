# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Polarity Quiz** is a political quiz application built with React, TypeScript, Vite, and Tailwind CSS. Users answer a series of political questions to discover their ideological position across multiple axes (e.g., progressivism vs. conservatism, interventionism vs. economic liberalism). Results are displayed as percentage breakdowns per axis, a radar chart visualization, and earned badges based on specific response patterns.

## Development Commands

```bash
# Start development server (with Vite HMR)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Core Flow

1. **Welcome Screen** (`App.tsx` lines 119-204): Hero section with test overview
2. **Question Flow** (`App.tsx` lines 228-237): Sequential question display using `Question.tsx`
3. **Results** (`App.tsx` lines 238-243): Shows axis scores, radar chart, and badges via `Result.tsx`

### Key State Management

- **Daily Seed**: Questions are shuffled deterministically based on Paris timezone date (or URL `?seed=` param) using FNV-1a hash + Mulberry32 PRNG
- **Answers**: Stored as `Record<string, number>` where key = question ID, value = 0-6 index (0 = "Tout à fait d'accord", 6 = "Pas du tout d'accord")
- **Navigation**: `currentIndex` tracks progress, `submitted` determines if results are shown

### Scoring System (`src/utils/scoring.ts`)

Each question contributes points to a specific axis (defined in `questions.json`):
- Questions have a `favoredPole` ("left" or "right")
- If `favoredPole === "right"`, the answer index is inverted: `idx = 6 - idx`
- Points are distributed linearly: `leftPts = (6 - idx) / 6 * 10 * weight`, `rightPts = idx / 6 * 10 * weight`
- Points are aggregated per axis to produce final `{ left, right }` scores

### Badge System (`src/utils/badges.ts`)

Badges are defined in `src/data/badges.tsx` with:
- `test({ answers, axisScores })`: A function that returns `true` if the badge should be awarded
- Evaluated badges are shuffled with a seed for consistent display order
- Badges have icons, labels, and descriptions shown on hover (desktop) or as title (mobile)

### Data Files

- **`questions.json`**: Array of questions with `id`, `text`, `axis`, `leftPole`, `rightPole`, `favoredPole`, `weight`, `explanation`
- **`axisexplaination.tsx`**: Defines 14 ideological axes with `sortIndex`, labels, and detailed left/right explanations
- **`badges.tsx`**: Badge definitions with test logic

### Styling Approach

- Tailwind CSS for utility-first styling
- Custom color palette: Red (`#C62828`) for left, Blue (`#1565C0`) for right
- Dark blue background (`#10284f`) with white text and glass-morphism effects (`bg-white/5`, `backdrop-blur`)
- Responsive design with mobile-first breakpoints

### Vite Configuration Notes

- `vite.config.ts` enables `host: true` and allows `.ngrok-free.app` hosts for remote development/testing
- React plugin for JSX/TSX support

### Profile Storage (Optional Feature)

`src/utils/profiles.ts` provides localStorage-based profile saving:
- `saveProfile({ name, answers, seedKey })`: Saves a profile with UUID
- `listProfiles()`: Retrieves all saved profiles
- `deleteProfile(id)`: Removes a profile by ID

## Common Patterns

**Adding a New Question:**
1. Add entry to `src/data/questions.json` with unique `id`, `axis` matching an existing axis from `axisexplaination.tsx`, and `favoredPole`
2. Questions are automatically shuffled daily

**Adding a New Axis:**
1. Add definition to `src/data/axisexplaination.tsx` with unique `id` and `sortIndex`
2. Update questions to reference the new axis name
3. Ensure axis name matches exactly between `questions.json` and `axisexplaination.tsx`

**Adding a New Badge:**
1. Add badge object to `src/data/badges.tsx` with `id`, `icon`, `label`, `description`, and `test` function
2. Test function receives `{ answers, axisScores }` and should return boolean

## Important Notes

- Question order is deterministic per day (Paris timezone) but can be overridden with `?seed=` URL param
- Answer indices run 0-6 (7 choices from strong agreement to strong disagreement)
- The scoring inverts right-favored questions to ensure consistent directionality
- Results are computed live from answers, no server/API required
- The app uses `dvh` (dynamic viewport height) units for mobile Safari compatibility
