import { Link } from "@/i18n/navigation";

export type ServiceHighlightItem = {
  slug: string;
  title: string;
  summary: string;
};

const HOME_SLUGS = new Set(["eyebrow-transplant", "hair-transplant", "botox"]);

type ServiceHighlightProps = {
  items: ServiceHighlightItem[];
  heading: string;
};

export function ServiceHighlight({ items, heading }: ServiceHighlightProps) {
  const selected = items.filter((item) => HOME_SLUGS.has(item.slug));
  const list = selected.length > 0 ? selected : items.slice(0, 3);

  return (
    <section className="service-highlight" aria-labelledby="service-highlight-heading">
      <h2 id="service-highlight-heading" className="brand-display section-heading">
        {heading}
      </h2>
      <ul className="service-highlight__list">
        {list.map((item) => (
          <li key={item.slug}>
            <Link href={`/services/${item.slug}`} className="service-highlight__link">
              <span className="service-highlight__title">{item.title}</span>
              <span className="service-highlight__summary">{item.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
