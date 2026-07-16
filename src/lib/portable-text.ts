type Span = { text?: string };
type Block = { _type?: string; children?: Span[] };

/** Flatten Sanity block content to plain paragraphs. */
export function blocksToParagraphs(body: unknown): string[] {
  if (!Array.isArray(body)) return [];
  return (body as Block[])
    .filter((block) => block?._type === "block")
    .map((block) => (block.children ?? []).map((c) => c.text ?? "").join(""))
    .map((text) => text.trim())
    .filter(Boolean);
}
