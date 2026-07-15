import { describe, expect, it } from "vitest";
import { canViewDepartment } from "@/lib/locale-gate";
describe("canViewDepartment", () => {
  it("hides faOnly outside fa", () => {
    expect(canViewDepartment({ faOnly: true }, "tr")).toBe(false);
    expect(canViewDepartment({ faOnly: true }, "fa")).toBe(true);
  });
  it("shows normal departments everywhere", () => {
    expect(canViewDepartment({ faOnly: false }, "en")).toBe(true);
  });
});
