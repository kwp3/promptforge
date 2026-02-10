# PromptForge — Visual Design Specification
**Author:** Crucible 🎨 | **Date:** 2026-02-09 | **Status:** Draft

---

## 1. Color Palette (Fire/Forge Dark Theme)

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| Primary | Ember Orange | `#F97316` | Buttons, links, active states |
| Primary Focus | Deep Orange | `#EA580C` | Hover/focus on primary elements |
| Secondary | Warm Gray | `#A8A29E` | Secondary text, borders |
| Accent | Molten Gold | `#FBBF24` | Highlights, badges, special elements |
| Base 100 | Dark Charcoal | `#1C1917` | Page background |
| Base 200 | Warm Black | `#292524` | Card/surface background |
| Base 300 | Stone Gray | `#44403C` | Borders, dividers |
| Base Content | Warm White | `#F5F5F4` | Primary text |
| Neutral | Dark Stone | `#1C1917` | Neutral backgrounds |
| Neutral Content | Light Stone | `#D6D3D1` | Text on neutral |
| Info | Sky Blue | `#38BDF8` | Info states |
| Success | Emerald | `#34D399` | Success states |
| Warning | Amber | `#FBBF24` | Warning states |
| Error | Red | `#F87171` | Error states |

### DaisyUI Custom Theme Config

```js
// tailwind.config.js
module.exports = {
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
}
```

---

## 2. Landing Page Layout

### Hero Section
- Full-width, centered content
- Gradient overlay: subtle radial gradient from `#F97316` (10% opacity) at center to transparent
- Tagline in large bold font
- Subheadline in secondary text color
- No CTA button in hero — the tool IS the page (scroll down or it's immediately visible)
- Subtle animated ember particles (optional, CSS-only)

```
┌─────────────────────────────────────────┐
│            🔥 PromptForge               │
│     "Raw ideas in. Refined prompts out."│
│     Turn rough thoughts into AI-ready   │
│     prompts — free, instant, no signup. │
└─────────────────────────────────────────┘
```

### Main Tool Area
```
┌─────────────────────────────────────────┐
│  [ 💻 Code ] [ ✍️ Write ] [ 💼 Biz ]   │
│  [ 🎨 Create ] [ 📚 Edu ] [ 📢 Mktg ] │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │  Describe your idea...            │  │
│  │                                   │  │
│  │                           120/500 │  │
│  └───────────────────────────────────┘  │
│                                         │
│         [ 🔥 Forge It ]                 │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  Your enhanced prompt appears     │  │
│  │  here...                    📋    │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Footer
```
┌─────────────────────────────────────────┐
│  ⚒️ Sponsored by ForgeWorks             │
│  Built by AI agents. For everyone.      │
│  GitHub · Twitter · About               │
└─────────────────────────────────────────┘
```

---

## 3. Component Specs

### Category Picker
- **Style:** Pill buttons in a flex-wrap row, centered
- **Inactive:** `btn btn-ghost btn-sm` with subtle border
- **Active:** `btn btn-primary btn-sm` with glow shadow
- **Spacing:** `gap-2` on mobile, `gap-3` on desktop
- Each pill has emoji + short label
- Transition: `transition-all duration-200`

```html
<button class="btn btn-sm btn-ghost border border-base-300 hover:border-primary hover:text-primary transition-all duration-200">
  💻 Coding
</button>
<!-- Active state -->
<button class="btn btn-sm btn-primary shadow-[0_0_15px_rgba(249,115,22,0.3)]">
  ✍️ Writing
</button>
```

### Input Textarea
- **Container:** `textarea textarea-bordered w-full h-32 bg-base-200 text-base-content placeholder:text-secondary`
- **Character count:** Small text bottom-right, `text-xs text-secondary`
- Changes to `text-warning` when near limit, `text-error` when over
- **Focus ring:** `focus:border-primary focus:ring-1 focus:ring-primary`

### Output Display
- **Container:** `bg-base-200 rounded-xl p-4 border border-base-300 relative min-h-[120px]`
- **Text:** `text-base-content font-mono text-sm leading-relaxed`
- **Copy button:** Absolute positioned top-right
  - `btn btn-ghost btn-xs` with clipboard icon
  - Tooltip: "Copy to clipboard"
  - On click: icon changes to checkmark for 2s, toast appears
- **Empty state:** Centered italic text in `text-secondary`

### "Forge It" Button
- **Base:** `btn btn-primary btn-lg gap-2 text-lg font-bold`
- **Glow effect:** `shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]`
- **Hover:** Scale up slightly `hover:scale-105 transition-all duration-300`
- **Fire emoji** prefix: 🔥
- **Disabled state:** While loading, `btn-disabled loading`

```html
<button class="btn btn-primary btn-lg gap-2 text-lg font-bold shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:scale-105 transition-all duration-300">
  🔥 Forge It
</button>
```

### Loading State
- Replace button text with `<span class="loading loading-dots loading-lg"></span>`
- Rotating text below button: "Heating the forge...", "Shaping your prompt...", "Adding the finishing touches...", "Almost there..."
- Text cycles every 2 seconds with fade transition
- Subtle pulse animation on the output container: `animate-pulse`

---

## 4. Typography

### Fonts (Google Fonts, free)
- **Headings:** `Inter` — clean, modern, highly readable
- **Body/UI:** `Inter` — consistent throughout
- **Code/Output:** `JetBrains Mono` — monospace for prompt display

### Scale
| Element | Size | Weight | Class |
|---------|------|--------|-------|
| Hero title | 3rem / 48px | 800 | `text-5xl font-extrabold` |
| Hero subtitle | 1.25rem / 20px | 400 | `text-xl font-normal text-secondary` |
| Section header | 1.5rem / 24px | 700 | `text-2xl font-bold` |
| Body text | 1rem / 16px | 400 | `text-base` |
| Button text | 1.125rem / 18px | 700 | `text-lg font-bold` |
| Caption/helper | 0.75rem / 12px | 400 | `text-xs text-secondary` |
| Prompt output | 0.875rem / 14px | 400 | `text-sm font-mono` |

---

## 5. Responsive Design

### Breakpoints (Tailwind defaults)
| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Default (mobile) | < 640px | Single column, stacked layout, smaller hero text (`text-3xl`), full-width buttons |
| `sm` | 640px | Category pills wrap to 2 rows max |
| `md` | 768px | Hero text scales up, more padding |
| `lg` | 1024px | Max-width container (`max-w-2xl`), comfortable spacing |
| `xl` | 1280px | `max-w-3xl`, generous whitespace |

### Mobile-First Approach
- Tool area: `px-4 sm:px-6 lg:px-8`
- Container: `mx-auto max-w-2xl lg:max-w-3xl`
- Category pills: `flex flex-wrap justify-center gap-2`
- Hero: `text-3xl sm:text-4xl lg:text-5xl`
- Input/output: Full width always

---

## 6. Micro-Interactions

### Hover States
- **Buttons:** Scale + glow increase (`hover:scale-105`, shadow brightens)
- **Category pills:** Border color shifts to primary, text color shifts
- **Copy button:** Background appears (`hover:bg-base-300`)
- **Links:** Underline appears with `transition-all duration-200`

### Transitions
- All interactive elements: `transition-all duration-200` minimum
- Page load: Fade in from slight translate-y (`animate-fadeIn` custom)
- Output appear: Slide up + fade in when prompt is generated

### "Forging" Animation
- **Concept:** When user clicks "Forge It":
  1. Button text replaced with loading dots
  2. Output container gets subtle pulse animation
  3. Rotating status text appears below button with fade transition
  4. When complete: output slides in from bottom with spring-like ease
- **CSS-only approach:** Use Tailwind `animate-pulse`, `animate-bounce`, and custom keyframes
- **Optional enhancement:** Tiny ember particle effect using CSS `::before`/`::after` pseudo-elements on the button during loading

### Copy Feedback
- Click copy → icon swaps to checkmark (✓) for 2 seconds
- DaisyUI toast appears bottom-center: "Copied to clipboard! 🔥"
- Toast auto-dismisses after 2s

### Category Selection
- Selected pill: smooth background fill + glow shadow
- Deselected pill: smooth background drain
- Use `transition-colors duration-200`
