# PromptForge SEO Implementation

## Context
PromptForge is a free AI prompt generator built with Next.js App Router, hosted on Vercel. 9 categories: coding, writing, business, creative, education, marketing, ai-agent, system-prompt, agent-workflow. Currently has ZERO SEO optimization. The repo is at `/tmp/promptforge`.

## What to implement (in order):

### 1. robots.txt
Create `public/robots.txt`:
```
User-agent: *
Allow: /
Disallow: /api/
Sitemap: https://promptforge-teal.vercel.app/sitemap.xml
```

### 2. Dynamic Sitemap
Create `app/sitemap.ts` that auto-generates from our category list:
- Homepage (priority 1.0)
- All 9 category slugs (priority 0.8) — use the `id` field from `lib/constants.ts` CATEGORIES array
- `changeFrequency: 'weekly'`

### 3. Meta Tags & Layout Update
Update `app/layout.tsx` metadata export:
- **Title template:** `'%s | PromptForge'` with default `'PromptForge — Free AI Prompt Generator | Build Better Prompts'`
- **Description:** `'Generate powerful AI prompts instantly. Free, no signup. 9 categories: coding, writing, business, marketing, AI agents, system prompts, and more.'`
- **Keywords:** ai prompt generator, free prompt generator, chatgpt prompts, prompt engineering, system prompt generator, ai agent prompts
- **OpenGraph:** type website, site_name PromptForge, image `/og-image.png` (1200x630)
- **Twitter:** card summary_large_image
- **Theme color:** dark `#0A0C10`, light `#FF5500`
- **Canonical:** `https://promptforge-teal.vercel.app`
- **Robots:** index true, follow true

### 4. Structured Data
Add JSON-LD to layout as a `<script>` tag:
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "PromptForge",
  "description": "Free AI prompt generator with 9 categories. No signup required.",
  "url": "https://promptforge-teal.vercel.app",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Web Browser",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
  "author": { "@type": "Organization", "name": "ForgeWorks" }
}
```

### 5. Favicon & Manifest
Create `public/manifest.json`:
```json
{
  "name": "PromptForge — Build Better Prompts",
  "short_name": "PromptForge",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A0C10",
  "theme_color": "#FF5500"
}
```
Add to metadata: `manifest: '/manifest.json'`

Note: We don't have favicon assets yet — just wire up the manifest and icon references. We'll add the actual image files later.

### 6. Canonical URL Helper
Create `lib/canonical.ts`:
```typescript
const BASE_URL = 'https://promptforge-teal.vercel.app'
export function getCanonicalUrl(path: string = ''): string {
  const cleanPath = path.replace(/\/$/, '').replace(/\/+/g, '/')
  return `${BASE_URL}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`
}
```

### What NOT to do:
- Don't create category landing pages yet (future task)
- Don't add a blog (future task)
- Don't create OG images (we'll do those separately)
- Don't add fake aggregate ratings to structured data
- Don't change any existing functionality or styling
