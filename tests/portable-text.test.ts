import { describe, expect, it } from "vitest";
import { blocksToParagraphs } from "@/lib/portable-text";

describe("blocksToParagraphs", () => {
  it("flattens sanity blocks to paragraphs", () => {
    const body = [
      {
        _type: "block",
        children: [{ text: "Hello " }, { text: "world" }],
      },
      { _type: "image" },
      {
        _type: "block",
        children: [{ text: "Second" }],
      },
    ];
    expect(blocksToParagraphs(body)).toEqual(["Hello world", "Second"]);
  });

  it("returns empty for missing body", () => {
    expect(blocksToParagraphs(null)).toEqual([]);
    expect(blocksToParagraphs(undefined)).toEqual([]);
  });
});
