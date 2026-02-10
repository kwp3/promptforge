# PromptForge — Full Build Prompt
> **For:** Ken's external coder (Kilo Code / Cline)
> **Compiled by:** Ember 🔥 (COO, ForgeWorks)
> **Date:** 2026-02-09
> **Source:** 5 agent deliverables (Anvil, Pyrex, Crucible, Scoria, Forge)

---

## Project Overview

Build **PromptForge** — a free, single-page AI prompt generator web app. Users pick a category, describe their idea in plain text, click "Forge It", and get back a polished, detailed prompt they can copy and use with any AI tool (ChatGPT, Claude, Midjourney, etc.).

**Key Constraints:**
- Free to use, no login, no paywall
- Single page app (no routing needed beyond the API)
- Dark theme with fire/forge aesthetic
- "Sponsored by ForgeWorks" branding in footer
- Must work perfectly on mobile

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI (custom theme)
- **Deployment:** Vercel
- **AI API:** OpenRouter (free model — use `deepseek/deepseek-chat-v3-0324:free` or `meta-llama/llama-4-maverick:free`)
- **Font:** Inter (headings + body) + JetBrains Mono (prompt output)

---

## Folder Structure

```
promptforge/
├── app/
│   ├── api/
│   │   └── forge/
│   │       └── route.ts          # POST endpoint for prompt enhancement
│   ├── favicon.ico
│   ├── globals.css               # Tailwind imports + custom styles
│   ├── layout.tsx                # Root layout (font, theme, meta)
│   └── page.tsx                  # Main (only) page
├── components/
│   ├── Hero.tsx                  # Hero section with tagline
│   ├── CategoryPicker.tsx        # Category pill buttons
│   ├── PromptInput.tsx           # Textarea with char count
│   ├── ForgeButton.tsx           # The main CTA button
│   ├── OutputDisplay.tsx         # Enhanced prompt display + copy
│   ├── CopyButton.tsx            # Copy-to-clipboard button
│   ├── LoadingState.tsx          # Rotating loading messages
│   ├── Toast.tsx                 # Success/error toast notifications
│   └── Footer.tsx                # ForgeWorks branding footer
├── lib/
│   └── constants.ts              # Categories, templates, system prompt
├── types/
│   └── index.ts                  # TypeScript interfaces
├── public/
│   └── (favicon, og-image if desired)
├── tailwind.config.ts
├── next.config.js
├── package.json
├── tsconfig.json
└── .env.local                    # OPENROUTER_API_KEY
```

---

## DaisyUI Custom Theme

Add to `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        forge: {
          "primary": "#F97316",
          "primary-content": "#1C1917",
          "secondary": "#A8A29E",
          "secondary-content": "#1C1917",
          "accent": "#FBBF24",
          "accent-content": "#1C1917",
          "neutral": "#1C1917",
          "neutral-content": "#D6D3D1",
          "base-100": "#1C1917",
          "base-200": "#292524",
          "base-300": "#44403C",
          "base-content": "#F5F5F4",
          "info": "#38BDF8",
          "success": "#34D399",
          "warning": "#FBBF24",
          "error": "#F87171",
        },
      },
    ],
  },
};

export default config;
```

Set `data-theme="forge"` on the `<html>` element in `layout.tsx`.

---

## API Route: `/api/forge`

**File:** `app/api/forge/route.ts`

```ts
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are PromptForge, an expert prompt engineer. Your job is to transform rough ideas into powerful, detailed prompts optimized for AI assistants.

CATEGORY: {{category}}

Transform the user's rough input into a comprehensive, well-structured prompt. Follow these rules:

1. Add a clear ROLE for the AI to assume (relevant expert/specialist)
2. Expand vague requests into specific, actionable instructions
3. Add STRUCTURE — numbered steps, sections, or deliverables
4. Include CONSTRAINTS — word count, tone, format, audience level
5. Add QUALITY MARKERS — what "good" looks like for this request
6. Include 2-3 specific details the user probably wants but didn't mention
7. Keep the enhanced prompt under 300 words
8. Match the prompt style to the category
9. Write in second person ("Act as...", "Provide...", "Include...")
10. Never explain what you're doing — just output the enhanced prompt

Output ONLY the enhanced prompt. No preamble, no explanation, no meta-commentary.`;

export async function POST(req: NextRequest) {
  try {
    const { category, rawPrompt } = await req.json();

    if (!rawPrompt?.trim()) {
      return NextResponse.json(
        { error: "Please describe your idea first." },
        { status: 400 }
      );
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://promptforge.vercel.app",
        "X-Title": "PromptForge",
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324:free",
        messages: [
          {
            role: "system",
            content: SYSTEM_PROMPT.replace("{{category}}", category || "General"),
          },
          {
            role: "user",
            content: rawPrompt,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("OpenRouter error:", errorData);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const enhancedPrompt = data.choices?.[0]?.message?.content?.trim();

    if (!enhancedPrompt) {
      return NextResponse.json(
        { error: "No prompt was generated. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ enhancedPrompt });
  } catch (error) {
    console.error("Forge API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
```

**Environment variable needed:** `OPENROUTER_API_KEY`

---

## 6 Prompt Categories

Define in `lib/constants.ts`:

```ts
export const CATEGORIES = [
  { id: "coding", emoji: "💻", label: "Coding", description: "Generate code snippets, debug, or brainstorm solutions." },
  { id: "writing", emoji: "✍️", label: "Writing", description: "Draft stories, articles, emails, or polish your prose." },
  { id: "business", emoji: "💼", label: "Business", description: "Summarize reports, draft proposals, or brainstorm strategies." },
  { id: "creative", emoji: "🎨", label: "Creative", description: "Unleash your imagination for art, music, or unique concepts." },
  { id: "education", emoji: "📚", label: "Education", description: "Explain complex topics, create study guides, or quiz yourself." },
  { id: "marketing", emoji: "📢", label: "Marketing", description: "Craft compelling ad copy, social posts, or campaign ideas." },
] as const;
```

---

## Page Layout & Components

### `app/page.tsx` — Main Page

Single-page layout, top to bottom:

1. **Hero** — Title + tagline (no separate nav needed)
2. **Category Picker** — 6 pill buttons in a flex-wrap row
3. **Input Area** — Textarea with placeholder + char count
4. **Forge Button** — Big primary CTA
5. **Output Area** — Result display with copy button
6. **Footer** — ForgeWorks branding

All centered in a `max-w-2xl mx-auto` container with comfortable padding.

### Component Details

#### `Hero.tsx`
- **Headline:** "Forge Powerful AI Prompts" (`text-4xl sm:text-5xl font-extrabold`)
- **Subheadline:** "Turn rough ideas into expert prompts — free, instant, no signup." (`text-lg text-secondary`)
- Subtle radial gradient background (10% opacity orange at center)
- Padding: `py-12 sm:py-16`

#### `CategoryPicker.tsx`
- Flex-wrap row of pill buttons, centered: `flex flex-wrap justify-center gap-2`
- Each pill: emoji + label
- **Inactive:** `btn btn-ghost btn-sm border border-base-300 hover:border-primary hover:text-primary transition-all duration-200`
- **Active:** `btn btn-sm btn-primary shadow-[0_0_15px_rgba(249,115,22,0.3)]`
- Props: `{ selected: string; onSelect: (id: string) => void }`

#### `PromptInput.tsx`
- **Placeholder:** "Tell us your rough idea..."
- **Helper text below:** "Describe what you want the AI to do. Be as specific or vague as you like."
- `textarea textarea-bordered w-full h-32 bg-base-200 focus:border-primary focus:ring-1 focus:ring-primary`
- Character count bottom-right: `text-xs text-secondary` → `text-warning` near limit → `text-error` over 500
- Max 500 characters
- Props: `{ value: string; onChange: (val: string) => void }`

#### `ForgeButton.tsx`
- Text: "🔥 Forge It"
- `btn btn-primary btn-lg gap-2 text-lg font-bold`
- Glow: `shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]`
- Hover: `hover:scale-105 transition-all duration-300`
- Loading state: replace text with `<span class="loading loading-dots loading-lg"></span>`
- Disabled when input is empty or loading
- Props: `{ onClick: () => void; isLoading: boolean; disabled: boolean }`

#### `OutputDisplay.tsx`
- Container: `bg-base-200 rounded-xl p-4 border border-base-300 relative min-h-[120px]`
- Text: `font-mono text-sm leading-relaxed`
- **Empty state:** "Your forged prompt will appear here." (italic, `text-secondary`, centered)
- **Copy button:** Top-right absolute positioned, clipboard icon → checkmark on success (2s)
- Props: `{ prompt: string | null; isLoading: boolean }`

#### `LoadingState.tsx`
- Rotating messages with fade transition (cycle every 2s):
  1. "Heating the forge..."
  2. "Shaping your prompt..."
  3. "Adding the finishing touches..."
  4. "Almost there..."
- Appears below the Forge button during loading
- `text-sm text-secondary animate-pulse`

#### `Toast.tsx`
- Success: "Prompt copied to clipboard! 🔥"
- Error: contextual error message
- Bottom-center, auto-dismiss after 3s
- Use DaisyUI toast: `toast toast-center toast-bottom`

#### `Footer.tsx`
- "⚒️ Sponsored by ForgeWorks"
- Subtext: "Built by AI agents. For everyone."
- `text-center text-sm text-secondary py-8 border-t border-base-300`

---

## UX Copy Reference

| Element | Text |
|---------|------|
| Page title (meta) | "PromptForge — Free AI Prompt Generator" |
| Hero headline | "Forge Powerful AI Prompts" |
| Hero subheadline | "Turn rough ideas into expert prompts — free, instant, no signup." |
| Input placeholder | "Tell us your rough idea..." |
| Input helper | "Describe what you want the AI to do. Be as specific or vague as you like." |
| Forge button | "🔥 Forge It" |
| Output header | "Your Forged Prompt" |
| Output empty | "Your forged prompt will appear here." |
| Copy button tooltip | "Copy to clipboard" |
| Copy success toast | "Prompt copied to clipboard! 🔥" |
| Loading msg 1 | "Heating the forge..." |
| Loading msg 2 | "Shaping your prompt..." |
| Loading msg 3 | "Adding the finishing touches..." |
| Loading msg 4 | "Almost there..." |
| Error: empty input | "Describe your idea first — even a rough thought works!" |
| Error: API fail | "Something went a little wonky. Please try again!" |
| Error: rate limit | "Whoa, slow down! Give it a sec and try again." |
| Footer line 1 | "⚒️ Sponsored by ForgeWorks" |
| Footer line 2 | "Built by AI agents. For everyone." |

---

## Responsive Behavior

- Mobile-first, single column throughout
- Container: `mx-auto max-w-2xl px-4 sm:px-6`
- Hero text: `text-3xl sm:text-4xl lg:text-5xl`
- Category pills wrap naturally with `flex-wrap`
- Input/output are full width at all sizes
- Footer stacks gracefully

---

## State Management

Simple `useState` in `page.tsx` — no need for external state management:

```ts
const [category, setCategory] = useState("coding");
const [input, setInput] = useState("");
const [output, setOutput] = useState<string | null>(null);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [copied, setCopied] = useState(false);
```

**Flow:**
1. User selects category → `setCategory(id)`
2. User types in textarea → `setInput(text)`
3. User clicks "Forge It" → `setIsLoading(true)`, POST to `/api/forge`, display result
4. User clicks copy → clipboard API, show toast for 3s

---

## Meta / SEO

In `layout.tsx`:
```ts
export const metadata = {
  title: "PromptForge — Free AI Prompt Generator",
  description: "Turn rough ideas into powerful AI prompts. Free, instant, no signup required. Sponsored by ForgeWorks.",
  openGraph: {
    title: "PromptForge — Free AI Prompt Generator",
    description: "Turn rough ideas into powerful AI prompts. Free, instant, no signup.",
    url: "https://promptforge.vercel.app",
    siteName: "PromptForge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PromptForge — Free AI Prompt Generator",
    description: "Turn rough ideas into powerful AI prompts. Free, instant, no signup.",
  },
};
```

---

## GitHub Repo

Create a new repo: `kwp3/promptforge` (public this time — it's a free product).

---

## Environment Variables (Vercel)

| Variable | Value | Notes |
|----------|-------|-------|
| `OPENROUTER_API_KEY` | (Ken's key) | Required for `/api/forge` route |

---

## Summary

This is a simple, beautiful, single-page app. No auth, no database, no complex routing. Just:

1. Pick a category
2. Type your idea
3. Click Forge It
4. Copy your polished prompt

Ship it fast. Iterate from feedback. 🔥
