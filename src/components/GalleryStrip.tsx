import Image from "next/image";

export type GalleryCmsItem = {
  id: string;
  title?: string | null;
  beforeAfter?: boolean | null;
  departmentSlug?: string | null;
  departmentTitle?: string | null;
  imageUrl?: string | null;
};

type GalleryStripProps = {
  heading?: string;
  emptyLabel: string;
  items: GalleryCmsItem[];
};

export function GalleryStrip({ heading, emptyLabel, items }: GalleryStripProps) {
  return (
    <section
      className="gallery-strip"
      aria-labelledby={heading ? "gallery-heading" : undefined}
      aria-label={!heading ? "Gallery" : undefined}
    >
      {heading ? (
        <h2 id="gallery-heading" className="brand-display section-heading">
          {heading}
        </h2>
      ) : null}
      {items.length === 0 ? (
        <p className="gallery-strip__empty">{emptyLabel}</p>
      ) : (
        <ul className="gallery-strip__list">
          {items.map((item) => {
            const label =
              item.title?.trim() ||
              item.departmentTitle?.trim() ||
              item.departmentSlug ||
              "Gallery";
            return (
              <li key={item.id} className="gallery-strip__item">
                {item.imageUrl ? (
                  <div className="gallery-strip__visual gallery-strip__visual--photo">
                    <Image
                      src={item.imageUrl}
                      alt={label}
                      width={1200}
                      height={900}
                      className="gallery-strip__img"
                      sizes="(max-width: 900px) 100vw, 33vw"
                    />
                  </div>
                ) : (
                  <div
                    className="gallery-strip__visual gallery-strip__visual--placeholder"
                    role="img"
                    aria-label={label}
                  />
                )}
                <p className="gallery-strip__tag">{label}</p>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
