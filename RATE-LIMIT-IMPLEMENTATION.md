# Rate Limiting for PromptForge

## Context
PromptForge has one API endpoint: `POST /api/forge` which calls OpenRouter. Currently no rate limiting — anyone can spam it. We need IP-based rate limiting before public launch.

## Implementation

### 1. Create `lib/rate-limit.ts`

Simple in-memory rate limiter (no external deps needed — this is a Vercel serverless function, in-memory works per instance):

```typescript
const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 10; // 10 requests per minute per IP

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimit.get(ip);

  // Clean up expired entries periodically
  if (rateLimit.size > 10000) {
    for (const [key, val] of rateLimit) {
      if (now > val.resetTime) rateLimit.delete(key);
    }
  }

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: MAX_REQUESTS - record.count, resetIn: record.resetTime - now };
}
```

### 2. Update `app/api/forge/route.ts`

Add at the top of the POST handler, before any processing:

```typescript
import { checkRateLimit } from "@/lib/rate-limit";

// Inside POST handler, first thing:
const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() 
  || req.headers.get("x-real-ip") 
  || "unknown";

const { allowed, remaining, resetIn } = checkRateLimit(ip);

if (!allowed) {
  return NextResponse.json(
    { error: "Too many requests. Please wait a moment and try again." },
    { 
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(resetIn / 1000)),
        "X-RateLimit-Remaining": "0",
      }
    }
  );
}
```

Also add rate limit headers to successful responses:
```typescript
// On the final NextResponse.json({ enhancedPrompt }), add headers:
return NextResponse.json(
  { enhancedPrompt },
  { headers: { "X-RateLimit-Remaining": String(remaining) } }
);
```

### 3. Update frontend to handle 429

In the component that calls the API, handle the 429 response gracefully. Show the user a friendly message like "You're generating prompts too fast! Wait a moment and try again." instead of a generic error.

### What NOT to do:
- Don't install any npm packages — this is pure in-memory
- Don't add Redis or external stores — overkill for our scale
- Don't rate limit GET requests — only POST /api/forge
- Don't change any existing styling or functionality
