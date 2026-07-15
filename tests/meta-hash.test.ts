import { describe, expect, it } from "vitest";
import { hashEmail, hashPhone } from "@/lib/meta/hash";

describe("meta hash helpers", () => {
  it("hashes normalized email", () => {
    const a = hashEmail("  Test@Example.com ");
    const b = hashEmail("test@example.com");
    expect(a).toBe(b);
    expect(a).toHaveLength(64);
  });

  it("normalizes TR phone before hash", () => {
    const a = hashPhone("0555 036 29 24");
    const b = hashPhone("+90 555 036 2924");
    expect(a).toBe(b);
  });
});
