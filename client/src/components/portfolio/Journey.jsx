import { GraduationCap, ExternalLink, Calendar } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import MarkdownContent from '../common/MarkdownContent';
import { Reveal } from '../animations/Reveal';

export default function Journey({ items = [] }) {
  return (
    <section id="journey" data-cursor-section="journey" className="container-x py-20">
      <SectionTitle
        eyebrow="Education"
        title="My Journey"
        subtitle="The formal education that shaped my technical foundation."
      />

      <div className="relative">
        {/* timeline connector */}
        <div className="rail-neon absolute left-4 top-0 h-full w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent md:left-1/2" />

        <div className="space-y-6">
          {items.map((item, i) => {
            const Icon = GraduationCap;
            const right = i % 2 === 1;
            return (
              <Reveal key={item._id || i} delay={0.04}>
                <div
                  className={`relative pl-12 md:w-1/2 md:pl-0 ${right ? 'md:ml-auto md:pl-12' : 'md:pr-12 md:text-right'}`}
                  data-cursor-anchor="timeline"
                >
                  {/* node */}
                  <span
                    className={`node-neon absolute top-3 grid h-8 w-8 place-items-center rounded-full border-2 border-line bg-bg-2 text-primary ${
                      right ? 'md:-left-4' : 'left-0 md:-right-4 md:left-auto'
                    }`}
                    style={{ boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary) 18%, transparent)' }}
                  >
                    <Icon size={15} />
                  </span>

                  <div className="card glass lift rounded-card p-5 text-left">
                    <div className="flex items-center justify-between gap-3 text-xs text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={13} /> {item.dateDisplay}
                      </span>
                      <span className="chip capitalize">{item.category}</span>
                    </div>
                    <h3 className="mt-2 text-base font-bold">{item.title}</h3>
                    <p className="text-sm font-medium text-highlight">{item.institution}</p>
                    {item.description && <MarkdownContent className="mt-2 text-sm text-muted">{item.description}</MarkdownContent>}
                    {item.certificateUrl && (
                      <a
                        href={item.certificateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                      >
                        View certificate <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
          {items.length === 0 && <p className="text-sm text-muted">No education records yet.</p>}
        </div>
      </div>
    </section>
  );
}
