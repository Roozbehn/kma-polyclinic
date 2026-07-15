import type { MvpLegalPage } from "@/lib/mvp-legal";

type LegalDocumentProps = {
  document: MvpLegalPage;
};

export function LegalDocument({ document }: LegalDocumentProps) {
  return (
    <main className="legal-page">
      <h1 className="brand-display legal-page__title">{document.title}</h1>
      {document.sections.map((section) => (
        <section key={section.heading} className="legal-page__section">
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => (
            <p key={`${section.heading}-${index}`}>{paragraph}</p>
          ))}
        </section>
      ))}
    </main>
  );
}
