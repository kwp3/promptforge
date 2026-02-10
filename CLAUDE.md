# CLAUDE.md

## Project Overview

PromptForge is a Next.js 14 single-page app that transforms rough ideas into polished AI prompts via OpenRouter API. No auth, no database, no routing beyond `/`.

## Current State

This repo is **scaffolded** — all infrastructure is in place (types, constants, API route, Tailwind/DaisyUI config, state management). The 9 UI components have correct props interfaces but **stub UI** — visual design is pending.

- `GEMINI-DESIGN-BRIEF.md` — comprehensive design brief for UI/UX implementation
- `BUILD-PROMPT.md` — primary build specification
- `agent-docs/` — architecture, content strategy, visual design, UX copy, GTM docs

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI (custom "forge" dark theme)
- **AI API:** OpenRouter (free models)
- **Deployment:** Vercel
- **Fonts:** Inter (headings + body) + JetBrains Mono (prompt output)

## Build/Dev Commands

```
npm run dev       # Dev server on localhost:3000
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
```

## Architecture

- Single page (`app/page.tsx`) with all state managed via React `useState` hooks
- 9 UI components in `components/` — each has a single responsibility:
  `Hero`, `CategoryPicker`, `PromptInput`, `ForgeButton`, `OutputDisplay`, `CopyButton`, `LoadingState`, `Toast`, `Footer`
- One API route: `POST /api/forge` (`app/api/forge/route.ts`) calls OpenRouter
- Constants/config in `lib/constants.ts`, types in `types/index.ts`
- Environment: `OPENROUTER_API_KEY` in `.env.local`

## Key Design Decisions

- DaisyUI custom "forge" theme defined in `tailwind.config.ts` with `data-theme="forge"` on `<html>` — all colors specified in BUILD-PROMPT.md
- System prompt template in `lib/constants.ts` uses `{{category}}` interpolation
- 6 prompt categories: coding, writing, business, creative, education, marketing
- OpenRouter model: `deepseek/deepseek-chat-v3-0324:free`, temp 0.7, max 1000 tokens
- Mobile-first responsive design, container `max-w-2xl mx-auto`
- No external state management — plain `useState` in `page.tsx`
