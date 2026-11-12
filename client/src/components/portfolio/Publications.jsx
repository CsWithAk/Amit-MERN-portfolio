import { FileText, ExternalLink, Link2, Library } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import MarkdownContent from '../common/MarkdownContent';
import { Reveal } from '../animations/Reveal';
import Badge from '../common/Badge';

export default function Publications({ items = [] }) {
  return (
    <section id="publications" data-cursor-section="publications" className="container-x py-20">
      <SectionTitle
        eyebrow="Research"
        title="Publications"
        subtitle="Peer-reviewed research and review papers in AI, computer vision and healthcare."
      />

      <div className="space-y-5">
        {items.map((p, i) => (
          <Reveal key={p._id || i} delay={i * 0.04}>
            <article className="card glass lift rounded-card p-6" data-cursor-anchor="card">
              <div className="flex flex-wrap items-center gap-3">
                <Badge color="primary">{p.type}</Badge>
                {p.yearDisplay && <span className="text-xs text-muted">{p.yearDisplay}</span>}
              </div>

              <h3 className="mt-3 text-lg font-bold leading-snug">{p.title}</h3>
              {p.authors && <p className="mt-1 text-sm text-highlight">{p.authors}</p>}
              {p.publication && <p className="mt-1 text-sm text-muted">{p.publication}</p>}

              {p.abstract && (
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  <span className="font-semibold text-text">Abstract — </span>
                  <MarkdownContent>{p.abstract}</MarkdownContent>
                </p>
              )}

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {p.doi && (
                  <a href={p.doi} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-primary hover:underline">
                    <Link2 size={15} /> DOI
                  </a>
                )}
                {p.pdfUrl && (
                  <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-text">
                    <FileText size={15} /> PDF
                  </a>
                )}
                {p.researchGateUrl && (
                  <a href={p.researchGateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-text">
                    <Library size={15} /> ResearchGate
                  </a>
                )}
                {p.scholarUrl && (
                  <a href={p.scholarUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-text">
                    <ExternalLink size={15} /> Google Scholar
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
        {items.length === 0 && <p className="text-sm text-muted">No publications listed yet.</p>}
      </div>
    </section>
  );
}
