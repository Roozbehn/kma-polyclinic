import { describe, expect, it } from "vitest";
import { buildUserData } from "@/lib/meta/capi";
import {
  hashCountry,
  hashEmail,
  hashExternalId,
  hashName,
  hashPhone,
} from "@/lib/meta/hash";

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

  it("hashes first name for fn", () => {
    const a = hashName("Ayşe");
    expect(a).toBeDefined();
    expect(a).toHaveLength(64);
    expect(hashName("Jane")).toBe(hashName("  jane "));
  });

  it("hashes ISO country", () => {
    expect(hashCountry("TR")).toBe(hashCountry("tr"));
    expect(hashCountry("turkey")).toBeUndefined();
  });

  it("hashes external_id", () => {
    expect(hashExternalId("lead_555")).toHaveLength(64);
  });
});

describe("buildUserData CAPI customer info", () => {
  it("includes hashed em/ph and plain fb_login_id", () => {
    const data = buildUserData({
      email: "patient@example.com",
      phone: "+905551112233",
      firstName: "Ali",
      lastName: "Yilmaz",
      country: "tr",
      externalId: "lead_5551112233",
      fbLoginId: "1000123456789",
      clientIpAddress: "1.2.3.4",
      clientUserAgent: "TestAgent/1.0",
      fbp: "fb.1.123",
      fbc: "fb.1.456",
    });

    expect(data.em).toEqual([hashEmail("patient@example.com")]);
    expect(data.ph).toEqual([hashPhone("+905551112233")]);
    expect(data.fn).toEqual([hashName("Ali")]);
    expect(data.ln).toEqual([hashName("Yilmaz")]);
    expect(data.country).toEqual([hashCountry("tr")]);
    expect(data.external_id).toEqual([hashExternalId("lead_5551112233")]);
    // fb_login_id must NOT be hashed
    expect(data.fb_login_id).toBe("1000123456789");
    expect(data.client_ip_address).toBe("1.2.3.4");
    expect(data.client_user_agent).toBe("TestAgent/1.0");
    expect(data.fbp).toBe("fb.1.123");
    expect(data.fbc).toBe("fb.1.456");
  });

  it("omits empty customer fields", () => {
    const data = buildUserData({
      clientUserAgent: "UA",
    });
    expect(data.em).toBeUndefined();
    expect(data.ph).toBeUndefined();
    expect(data.fb_login_id).toBeUndefined();
    expect(data.client_user_agent).toBe("UA");
  });
});
