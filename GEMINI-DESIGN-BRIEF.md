# PromptForge — Design Brief for Gemini

> **For:** Gemini Pro 3 (UI/UX Designer & Implementer)
> **From:** Ken / ForgeWorks
> **Date:** 2026-02-09

---

## 1. Project Context

**PromptForge** is a free, single-page AI prompt generator. Users pick a category, describe their idea in plain text, click "Forge It", and get back a polished, detailed prompt they can copy and use with any AI tool.

**The aesthetic is fire/forge** — warm dark backgrounds, ember orange accents, molten gold highlights. Think a blacksmith's workshop rendered as a modern web app: powerful, warm, inviting.

**Key product attributes:**
- Free, no login, no paywall
- Single page (no routing)
- Dark theme with fire/forge visual identity
- "Sponsored by ForgeWorks" branding in footer
- Must work perfectly on mobile

---

## 2. Your Task

The entire project scaffold is already built. You have:

- **Types** defined in `types/index.ts`
- **Constants** (categories, system prompt, loading messages) in `lib/constants.ts`
- **API route** fully implemented in `app/api/forge/route.ts`
- **9 stub components** in `components/` with correct props interfaces
- **Page layout** wired up in `app/page.tsx` with all state management

**Your job:** Implement the visual UI/UX for all 9 components and refine the page layout. You only need to write JSX, Tailwind classes, and any CSS animations. The plumbing is done — you're designing the experience.

### Files you'll modify:

| File | What to do |
|------|-----------|
| `components/Hero.tsx` | Full visual implementation |
| `components/CategoryPicker.tsx` | Styled pill buttons with states |
| `components/PromptInput.tsx` | Styled textarea with character count |
| `components/ForgeButton.tsx` | Glowing CTA with loading state |
| `components/OutputDisplay.tsx` | Styled output card with copy integration |
| `components/CopyButton.tsx` | Icon button with copied feedback |
| `components/LoadingState.tsx` | Animated rotating messages |
| `components/Toast.tsx` | Bottom-center toast notifications |
| `components/Footer.tsx` | Branded footer |
| `app/page.tsx` | Refine spacing/layout between components |
| `app/globals.css` | Add custom keyframes/animations if needed |

---

## 3. Design System

### Color Palette (DaisyUI "forge" theme — already configured)

Use DaisyUI semantic color classes. The theme is set via `data-theme="forge"` on `<html>`.

| Token | Hex | DaisyUI Class | Usage |
|-------|-----|--------------|-------|
| Primary | `#F97316` (Ember Orange) | `text-primary`, `bg-primary`, `btn-primary` | Buttons, links, active states, accents |
| Primary Content | `#1C1917` | `text-primary-content` | Text on primary backgrounds |
| Secondary | `#A8A29E` (Warm Gray) | `text-secondary`, `bg-secondary` | Secondary text, helper text, borders |
| Accent | `#FBBF24` (Molten Gold) | `text-accent`, `bg-accent` | Highlights, badges, special elements |
| Base 100 | `#1C1917` (Dark Charcoal) | `bg-base-100` | Page background |
| Base 200 | `#292524` (Warm Black) | `bg-base-200` | Card/surface backgrounds |
| Base 300 | `#44403C` (Stone Gray) | `bg-base-300`, `border-base-300` | Borders, dividers |
| Base Content | `#F5F5F4` (Warm White) | `text-base-content` | Primary text |
| Neutral Content | `#D6D3D1` (Light Stone) | `text-neutral-content` | Text on neutral |
| Info | `#38BDF8` | `text-info` | Informational states |
| Success | `#34D399` | `text-success`, `alert-success` | Success states, copy confirmation |
| Warning | `#FBBF24` | `text-warning` | Near character limit |
| Error | `#F87171` | `text-error`, `alert-error` | Errors, over character limit |

### Typography

Fonts are loaded in `layout.tsx` via `next/font/google` and set as CSS variables.

| Purpose | Font | Tailwind Class | Notes |
|---------|------|---------------|-------|
| Headings & Body | Inter | `font-sans` (default) | Clean, modern, highly readable |
| Code / Prompt Output | JetBrains Mono | `font-mono` | Monospace for generated prompts |

### Type Scale

| Element | Tailwind Classes |
|---------|-----------------|
| Hero headline | `text-3xl sm:text-4xl lg:text-5xl font-extrabold` |
| Hero subheadline | `text-lg text-secondary` |
| Section headers | `text-2xl font-bold` |
| Body text | `text-base` |
| Button text (Forge It) | `text-lg font-bold` |
| Helper/caption text | `text-xs text-secondary` |
| Prompt output text | `text-sm font-mono leading-relaxed` |

### Spacing

Use the Tailwind spacing scale consistently:
- Section gaps: `space-y-8` or equivalent
- Inner padding: `p-4` to `p-6`
- Component margins: `mt-6`, `mt-8`, etc.

---

## 4. Component Specifications

### 4.1 Hero (`components/Hero.tsx`)

**Purpose:** Welcome users, establish brand identity, set the tone.

**Props:** None

**Content:**
- Headline: **"Forge Powerful AI Prompts"**
- Subheadline: **"Turn rough ideas into expert prompts — free, instant, no signup."**

**Design guidance:**
- Centered text, generous vertical padding (`py-12 sm:py-16`)
- Subtle radial gradient background — `#F97316` at 10% opacity at center, fading to transparent
- Headline: `text-3xl sm:text-4xl lg:text-5xl font-extrabold`
- Subheadline: `text-lg text-secondary`
- Optional: very subtle animated ember/particle effect using CSS `::before`/`::after` (don't overdo it)

**States:** Static — no interaction states.

---

### 4.2 CategoryPicker (`components/CategoryPicker.tsx`)

**Purpose:** Let users select a prompt category. Sets context for the AI.

**Props:**
```ts
{
  selected: string;
  onSelect: (id: string) => void;
}
```

**Categories** (from `lib/constants.ts` — already imported):
| ID | Emoji | Label |
|----|-------|-------|
| coding | 💻 | Coding |
| writing | ✍️ | Writing |
| business | 💼 | Business |
| creative | 🎨 | Creative |
| education | 📚 | Education |
| marketing | 📢 | Marketing |

**Design guidance:**
- Flex-wrap row, centered: `flex flex-wrap justify-center gap-2 sm:gap-3`
- Each pill shows emoji + label text
- **Inactive pill:** `btn btn-ghost btn-sm border border-base-300 hover:border-primary hover:text-primary transition-all duration-200`
- **Active pill:** `btn btn-sm btn-primary shadow-[0_0_15px_rgba(249,115,22,0.3)]`
- Smooth transition between states: `transition-colors duration-200`

**States:**
- Default: one category pre-selected ("coding")
- Hover (inactive): border shifts to primary, text shifts to primary
- Active: primary fill with orange glow shadow

---

### 4.3 PromptInput (`components/PromptInput.tsx`)

**Purpose:** Text area for the user's raw idea.

**Props:**
```ts
{
  value: string;
  onChange: (val: string) => void;
}
```

**Content:**
- Placeholder: **"Tell us your rough idea..."**
- Helper text below: **"Describe what you want the AI to do. Be as specific or vague as you like."**
- Character count display (bottom-right of textarea)

**Design guidance:**
- Textarea: `textarea textarea-bordered w-full h-32 bg-base-200 text-base-content placeholder:text-secondary focus:border-primary focus:ring-1 focus:ring-primary`
- Helper text below textarea: `text-xs text-secondary`
- Character count: `text-xs` positioned at bottom-right of textarea
  - Normal: `text-secondary`
  - Near limit (>400): `text-warning`
  - Over limit (≥500): `text-error`
- Max characters: 500 (constant `MAX_INPUT_LENGTH` imported from constants)

**States:**
- Empty: shows placeholder
- Typing: live character count updates
- Near limit: character count turns amber
- At limit: character count turns red

---

### 4.4 ForgeButton (`components/ForgeButton.tsx`)

**Purpose:** The main CTA. Triggers prompt generation.

**Props:**
```ts
{
  onClick: () => void;
  isLoading: boolean;
  disabled: boolean;
}
```

**Content:**
- Default text: **"🔥 Forge It"**
- Loading: DaisyUI loading dots replace text

**Design guidance:**
- Base: `btn btn-primary btn-lg gap-2 text-lg font-bold`
- Glow: `shadow-[0_0_20px_rgba(249,115,22,0.4)]`
- Hover: `hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300`
- Full width on mobile, auto width on desktop (your call)
- Loading: `<span className="loading loading-dots loading-lg"></span>` replaces button text
- Disabled when input is empty or loading

**States:**
- Default: glowing orange button
- Hover: intensified glow + slight scale
- Loading: dots animation, disabled
- Disabled: muted, no glow

---

### 4.5 OutputDisplay (`components/OutputDisplay.tsx`)

**Purpose:** Shows the generated prompt. Includes copy button.

**Props:**
```ts
{
  prompt: string | null;
  isLoading: boolean;
}
```

**Content:**
- Section header: **"Your Forged Prompt"** (optional — your design call)
- Empty state text: **"Your forged prompt will appear here."** (italic, centered)
- Copy button positioned top-right (uses `CopyButton` component)

**Design guidance:**
- Container: `bg-base-200 rounded-xl p-4 border border-base-300 relative min-h-[120px]`
- Prompt text: `font-mono text-sm leading-relaxed`
- Empty state: italic, `text-secondary`, visually centered
- Loading: `animate-pulse` on the container or a skeleton effect
- When prompt appears: consider a subtle slide-up/fade-in animation
- CopyButton: absolute positioned top-right corner of the container

**States:**
- Empty: italic placeholder message
- Loading: pulse/skeleton animation
- Filled: prompt text displayed with copy button visible
- Just copied: CopyButton shows checkmark

---

### 4.6 CopyButton (`components/CopyButton.tsx`)

**Purpose:** Copy the generated prompt to clipboard.

**Props:**
```ts
{
  text: string;
}
```

**Design guidance:**
- Small, unobtrusive: `btn btn-ghost btn-xs` or `btn btn-ghost btn-sm`
- Default icon: clipboard icon (📋 or an SVG clipboard icon)
- Copied state: checkmark icon (✓) for 2 seconds
- Hover: `hover:bg-base-300`
- Tooltip: **"Copy to clipboard"** (optional — DaisyUI tooltip)

**States:**
- Default: clipboard icon
- Hover: subtle background
- Copied: checkmark icon (auto-reverts after 2s)

**Note:** The copy logic is already implemented with `useState` and `navigator.clipboard`. You just need to style it and optionally swap to SVG icons.

---

### 4.7 LoadingState (`components/LoadingState.tsx`)

**Purpose:** Show rotating messages while the prompt generates.

**Props:** None (uses `LOADING_MESSAGES` from constants internally)

**Messages** (cycle every 2s):
1. "Heating the forge..."
2. "Shaping your prompt..."
3. "Adding the finishing touches..."
4. "Almost there..."

**Design guidance:**
- Centered text below the Forge button
- `text-sm text-secondary animate-pulse`
- Fade transition between messages (CSS transition or Tailwind animation)
- Consider a subtle fire emoji or spinner alongside the text

**States:** Always animating when visible.

**Note:** The cycling logic is already implemented with `useState` + `useEffect`. You just need to style it and add the fade transition.

---

### 4.8 Toast (`components/Toast.tsx`)

**Purpose:** Show success/error feedback.

**Props:**
```ts
{
  message: string;
  type: "success" | "error";
  visible: boolean;
}
```

**UX copy:**
- Success: **"Prompt copied to clipboard! 🔥"**
- Error: contextual message passed via props

**Design guidance:**
- Position: bottom-center of viewport (fixed/absolute)
- DaisyUI toast: `toast toast-center toast-bottom`
- Use DaisyUI alerts inside: `alert alert-success` or `alert alert-error`
- Auto-dismiss after 3s (handled by parent state)
- Entrance/exit animation: slide up + fade, slide down + fade

**States:**
- Hidden: `visible === false` → not rendered
- Visible success: green alert with message
- Visible error: red alert with message

---

### 4.9 Footer (`components/Footer.tsx`)

**Purpose:** ForgeWorks branding.

**Props:** None

**Content:**
- Line 1: **"⚒️ Sponsored by ForgeWorks"**
- Line 2: **"Built by AI agents. For everyone."**

**Design guidance:**
- `text-center text-sm text-secondary py-8 border-t border-base-300`
- Subtle, unobtrusive — the footer shouldn't compete with the tool
- Optional: dim link styles if you add GitHub/Twitter links

**States:** Static.

---

## 5. Page Layout

### Component Order (top to bottom)

```
<main className="mx-auto max-w-2xl px-4 sm:px-6">
  1. Hero
  2. CategoryPicker
  3. PromptInput
  4. ForgeButton
  5. LoadingState (conditional — only during loading)
  6. OutputDisplay
  7. Footer
  8. Toast (fixed position — floating above everything)
</main>
```

### Container
- `mx-auto max-w-2xl px-4 sm:px-6`
- Everything is single-column, centered
- Add vertical spacing between sections (e.g., `space-y-6` or individual margins)

### Visual Flow
The page should feel like a natural top-to-bottom flow:
1. **Hero** catches your eye (big text, warm glow)
2. **Categories** are immediately accessible (no scrolling needed on desktop)
3. **Input** is prominent and inviting
4. **Forge button** draws the eye with its glow
5. **Output** appears below — the reward
6. **Footer** is quiet and respectful

---

## 6. Micro-Interactions & Animations

### Hover Effects
- **Buttons:** Scale up slightly (`hover:scale-105`) + glow shadow intensifies
- **Category pills:** Border color shifts to primary, text color shifts
- **Copy button:** Subtle background appears
- **Links:** Underline with `transition-all duration-200`

### Loading / "Forging" Sequence
When the user clicks "Forge It":
1. Button text → loading dots
2. Output container gets subtle `animate-pulse`
3. Rotating loading messages appear below button with fade transitions
4. On completion: output slides in with a satisfying ease

### Copy Feedback
1. Click copy → icon swaps to checkmark (✓) for 2 seconds
2. Toast slides up from bottom: "Prompt copied to clipboard! 🔥"
3. Toast auto-dismisses after 3 seconds

### Category Selection
- Selected pill smoothly fills with primary color + gains glow shadow
- Deselected pill smoothly drains color
- `transition-colors duration-200`

### Optional Enhancements (Creative Freedom)
- Subtle ember/particle CSS effect on the hero or button
- Custom `@keyframes` for a "forge glow" pulse on the button
- Typing animation on the output (text appearing character by character)
- Slight parallax or float on the hero heading

---

## 7. Responsive Design

### Approach: Mobile-First

Everything is designed mobile-first, then enhanced at larger breakpoints.

| Breakpoint | Width | Adjustments |
|-----------|-------|------------|
| Default (mobile) | < 640px | Single column, stacked, `text-3xl` hero, full-width buttons, `px-4` |
| `sm` (640px) | ≥ 640px | Hero text scales to `text-4xl`, `px-6`, category pills wrap to 2 rows max |
| `md` (768px) | ≥ 768px | More vertical padding, comfortable spacing |
| `lg` (1024px) | ≥ 1024px | `max-w-2xl` container comfortable, generous whitespace |

### Key responsive patterns:
- Hero text: `text-3xl sm:text-4xl lg:text-5xl`
- Container padding: `px-4 sm:px-6`
- Category pills: `flex flex-wrap justify-center gap-2` (wraps naturally)
- Input and output: always full-width within the container
- Forge button: full-width on mobile (`w-full sm:w-auto`) or centered — your call
- Footer stacks gracefully

---

## 8. UX Copy Reference

Every piece of user-facing text in the app:

| Element | Text |
|---------|------|
| Page title (meta) | "PromptForge — Free AI Prompt Generator" |
| Meta description | "Turn rough ideas into powerful AI prompts. Free, instant, no signup required. Sponsored by ForgeWorks." |
| Hero headline | "Forge Powerful AI Prompts" |
| Hero subheadline | "Turn rough ideas into expert prompts — free, instant, no signup." |
| Input placeholder | "Tell us your rough idea..." |
| Input helper text | "Describe what you want the AI to do. Be as specific or vague as you like." |
| Forge button (default) | "🔥 Forge It" |
| Output section header | "Your Forged Prompt" |
| Output empty state | "Your forged prompt will appear here." |
| Copy button tooltip | "Copy to clipboard" |
| Copy success toast | "Prompt copied to clipboard! 🔥" |
| Loading message 1 | "Heating the forge..." |
| Loading message 2 | "Shaping your prompt..." |
| Loading message 3 | "Adding the finishing touches..." |
| Loading message 4 | "Almost there..." |
| Error: empty input | "Describe your idea first — even a rough thought works!" |
| Error: API failure | "Something went a little wonky. Please try again!" |
| Error: rate limit | "Whoa, slow down! Give it a sec and try again." |
| Footer line 1 | "⚒️ Sponsored by ForgeWorks" |
| Footer line 2 | "Built by AI agents. For everyone." |

---

## 9. Tone & Voice Guidelines

### Voice Attributes
- **Warm** — friendly, approachable, never cold or robotic
- **Confident** — we know prompts, and it shows
- **Playful** — light touches of humor, forge/fire metaphors welcome
- **Inclusive** — anyone can use this, no gatekeeping
- **Concise** — respect the user's time, don't over-explain

### Do
- Use contractions (it's, you'll, don't)
- Use 🔥 as the signature emoji — sparingly but effectively
- Speak directly to the user ("you" not "users")
- Keep instructions under 10 words when possible

### Don't
- Use jargon without context
- Be condescending ("It's easy!", "Simply just...")
- Over-promise ("The BEST prompt EVER")
- Use corporate speak ("leverage", "synergize")
- Apologize unnecessarily

---

## 10. What's Flexible (Your Creative Freedom)

The design system above is your **guardrails**, not a straitjacket. Within these constraints, you have full creative freedom over:

- **Animation timing and easing** — make transitions feel satisfying
- **Ember/particle effects** — CSS-only particles on the hero or button are encouraged if tasteful
- **Toast positioning details** — bottom-center is the spec, but exact offset/animation is yours
- **Output reveal animation** — slide up, fade in, typewriter effect — whatever feels magical
- **Micro-interaction details** — hover states, focus rings, active states
- **Spacing fine-tuning** — the spec gives ranges, you dial in what looks right
- **Icon choices** — clipboard/checkmark can be emoji, SVG, or Heroicons
- **Loading animation flourishes** — beyond the rotating text, add visual personality
- **Overall visual polish** — shadows, gradients, borders — make it beautiful

### What's NOT flexible:
- The color palette (hex values are locked)
- The font choices (Inter + JetBrains Mono)
- The component names and props interfaces
- The UX copy (use the exact text from the copy reference table)
- The basic page structure (Hero → Categories → Input → Button → Output → Footer)
- The DaisyUI theme name ("forge") and `data-theme="forge"` on `<html>`

---

## Quick Start

1. Run `npm run dev` to start the dev server
2. Open each component file in `components/`
3. Replace the stub JSX with your designed implementation
4. Use `app/globals.css` for any custom `@keyframes` or animations
5. Adjust spacing in `app/page.tsx` as needed
6. Test on mobile viewport (375px) and desktop (1280px)
7. Run `npm run build` to verify no TypeScript errors

The scaffold compiles and renders already. You're adding the beauty.
