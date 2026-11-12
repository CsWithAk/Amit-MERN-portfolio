import { Award, ExternalLink } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import MarkdownContent from '../common/MarkdownContent';
import { Reveal } from '../animations/Reveal';

export default function Certifications({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="certifications" data-cursor-section="certifications" className="container-x py-20">
      <SectionTitle
        eyebrow="Courses & credentials"
        title="Certifications"
        subtitle="Courses, training programs and internship credentials."
      />

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <Reveal key={item._id || `${item.title}-${index}`} delay={index * 0.03}>
            <article className="card glass lift flex h-full flex-col rounded-card p-5">
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg-2/60 text-primary">
                  <Award size={18} />
                </span>
                <div>
                  <h3 className="font-bold leading-tight">{item.title}</h3>
                  <p className="mt-1 text-sm text-highlight">{item.issuer}</p>
                </div>
              </div>
              {item.description && <MarkdownContent className="mt-4 text-sm text-muted">{item.description}</MarkdownContent>}
              <div className="mt-auto flex items-center justify-between gap-3 pt-4 text-xs text-muted">
                <span>{item.dateDisplay}</span>
                {item.certificateUrl && (
                  <a href={item.certificateUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-primary hover:underline">
                    View certificate <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
