type Entry = { count: number; resetAt: number };

export function createMemoryRateLimiter(opts: { limit: number; windowMs: number }) {
  const map = new Map<string, Entry>();
  return {
    check(key: string): { ok: boolean } {
      const now = Date.now();
      const cur = map.get(key);
      if (!cur || now > cur.resetAt) {
        map.set(key, { count: 1, resetAt: now + opts.windowMs });
        return { ok: true };
      }
      if (cur.count >= opts.limit) return { ok: false };
      cur.count += 1;
      return { ok: true };
    },
  };
}
