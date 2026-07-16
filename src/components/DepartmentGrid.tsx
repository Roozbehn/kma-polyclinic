import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";

export type DepartmentGridItem = {
  slug: string;
  title: string;
  summary: string;
  navPriority?: number;
};

type DepartmentGridProps = {
  items: DepartmentGridItem[];
  heading?: string;
};

export function DepartmentGrid({ items, heading }: DepartmentGridProps) {
  const sorted = [...items].sort(
    (a, b) => (a.navPriority ?? 99) - (b.navPriority ?? 99),
  );

  return (
    <section
      className="department-grid"
      aria-labelledby={heading ? "department-grid-heading" : undefined}
      aria-label={!heading ? "Departments" : undefined}
    >
      {heading ? (
        <h2 id="department-grid-heading" className="brand-display section-heading">
          {heading}
        </h2>
      ) : null}
      <ul className="department-grid__list reveal-stagger">
        {sorted.map((item) => (
          <Reveal key={item.slug} as="li">
            <Link href={`/departments/${item.slug}`} className="department-grid__link">
              <span className="department-grid__title">{item.title}</span>
              <span className="department-grid__summary">{item.summary}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
