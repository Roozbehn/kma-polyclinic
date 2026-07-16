import type { FaqItem } from "@/lib/seo-faq";

export function FaqSection({
  heading,
  items,
}: {
  heading: string;
  items: FaqItem[];
}) {
  if (!items.length) return null;

  return (
    <section className="faq-section" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="brand-display section-heading">
        {heading}
      </h2>
      <div className="faq-section__list">
        {items.map((item) => (
          <details key={item.question} className="faq-section__item">
            <summary className="faq-section__question">{item.question}</summary>
            <p className="faq-section__answer">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
