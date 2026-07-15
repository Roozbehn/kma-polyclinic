import { describe, expect, it } from "vitest";
import { createMemoryRateLimiter } from "@/lib/rate-limit";

describe("createMemoryRateLimiter", () => {
  it("allows first N requests then blocks", () => {
    const limiter = createMemoryRateLimiter({ limit: 2, windowMs: 60_000 });
    expect(limiter.check("1.1.1.1").ok).toBe(true);
    expect(limiter.check("1.1.1.1").ok).toBe(true);
    expect(limiter.check("1.1.1.1").ok).toBe(false);
  });
});
