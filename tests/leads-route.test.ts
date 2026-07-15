import { describe, expect, it } from "vitest";
import { parseLeadBody } from "@/lib/leads";

const validBody = {
  name: "Jane Doe",
  phone: "+905551234567",
  email: "jane@example.com",
  locale: "en" as const,
  department: "Checkup",
  message: "I would like an appointment",
  website: "",
};

describe("parseLeadBody", () => {
  it("accepts a valid body", () => {
    const result = parseLeadBody(validBody);
    expect(result.success).toBe(true);
  });

  it("rejects missing name", () => {
    const { name: _name, ...rest } = validBody;
    const result = parseLeadBody(rest);
    expect(result.success).toBe(false);
  });

  it("rejects honeypot website with content", () => {
    const result = parseLeadBody({ ...validBody, website: "x" });
    expect(result.success).toBe(false);
  });

  it("allows empty website honeypot", () => {
    const result = parseLeadBody({ ...validBody, website: "" });
    expect(result.success).toBe(true);
  });

  it("rejects invalid locale", () => {
    const result = parseLeadBody({ ...validBody, locale: "de" });
    expect(result.success).toBe(false);
  });
});
