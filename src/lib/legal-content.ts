import { getLegal } from "@/lib/sanity";
import { getMvpLegal, type LegalKey, type MvpLegalPage } from "@/lib/mvp-legal";
import { blocksToParagraphs } from "@/lib/portable-text";

export async function getLegalForLocale(
  locale: string,
  key: LegalKey,
): Promise<MvpLegalPage> {
  const fromSanity = await getLegal(locale, key);
  const paragraphs = blocksToParagraphs(fromSanity?.body);
  if (fromSanity?.title && paragraphs.length > 0) {
    return {
      title: fromSanity.title,
      sections: [{ heading: fromSanity.title, paragraphs }],
    };
  }
  const mvp = getMvpLegal(locale, key);
  if (fromSanity?.title?.trim()) {
    return { ...mvp, title: fromSanity.title.trim() };
  }
  return mvp;
}
