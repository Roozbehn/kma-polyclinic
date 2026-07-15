import { describe, expect, it } from "vitest";
import { whatsappNumberForLocale, whatsappHref } from "@/lib/whatsapp";
describe("whatsappNumberForLocale", () => {
  it("routes fa to Persian WhatsApp", () => {
    expect(whatsappNumberForLocale("fa")).toBe("905550362924");
  });
  it("routes tr/en/ar to primary WhatsApp", () => {
    expect(whatsappNumberForLocale("tr")).toBe("905019446595");
    expect(whatsappNumberForLocale("en")).toBe("905019446595");
    expect(whatsappNumberForLocale("ar")).toBe("905019446595");
  });
});
describe("whatsappHref", () => {
  it("builds wa.me link with encoded text", () => {
    const href = whatsappHref("en", "Hello");
    expect(href).toBe("https://wa.me/905019446595?text=Hello");
  });
});
