const rateLimit = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000; // 1 minute window
const MAX_REQUESTS = 10; // 10 requests per minute per IP

export function checkRateLimit(ip: string): {
  allowed: boolean;
  remaining: number;
  resetIn: number;
} {
  const now = Date.now();
  const record = rateLimit.get(ip);

  // Clean up expired entries periodically (cap iteration to avoid O(n) on every request)
  if (rateLimit.size > 10000) {
    let cleaned = 0;
    rateLimit.forEach((val, key) => {
      if (cleaned >= 1000) return;
      if (now > val.resetTime) {
        rateLimit.delete(key);
        cleaned++;
      }
    });
  }

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1, resetIn: WINDOW_MS };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return {
    allowed: true,
    remaining: MAX_REQUESTS - record.count,
    resetIn: record.resetTime - now,
  };
}
