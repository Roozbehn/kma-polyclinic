export type GallerySeedItem = {
  id: string;
  department: string;
  tone: string;
};

const SEED: GallerySeedItem[] = [
  { id: "g1", department: "aesthetics", tone: "linear-gradient(145deg, #e8e2d8 0%, #7d8f7a 100%)" },
  { id: "g2", department: "dermatology", tone: "linear-gradient(160deg, #f5f5f4 0%, #57534e 90%)" },
  { id: "g3", department: "hair-transplant", tone: "linear-gradient(135deg, #d6d3d1 0%, #5f6f5c 100%)" },
  { id: "g4", department: "eyebrow-transplant", tone: "linear-gradient(150deg, #fafaf9 10%, #1c1917 95%)" },
  { id: "g5", department: "dentistry", tone: "linear-gradient(170deg, #e7e5e4 0%, #7d8f7a 85%)" },
  { id: "g6", department: "plastic-surgery", tone: "linear-gradient(140deg, #f3efe9 0%, #57534e 100%)" },
];

type GalleryStripProps = {
  heading: string;
  labels: Record<string, string>;
};

export function GalleryStrip({ heading, labels }: GalleryStripProps) {
  return (
    <section className="gallery-strip" aria-labelledby="gallery-heading">
      <h1 id="gallery-heading" className="brand-display section-heading">
        {heading}
      </h1>
      <ul className="gallery-strip__list">
        {SEED.map((item) => (
          <li key={item.id} className="gallery-strip__item">
            <div
              className="gallery-strip__visual"
              style={{ background: item.tone }}
              role="img"
              aria-label={labels[item.department] ?? item.department}
            />
            <p className="gallery-strip__tag">{labels[item.department] ?? item.department}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
