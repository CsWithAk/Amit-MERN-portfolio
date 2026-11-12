import { useMemo, useState } from 'react';
import { Github, ExternalLink, Star, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '../common/SectionTitle';
import { Reveal } from '../animations/Reveal';
import Badge from '../common/Badge';
import MarkdownContent from '../common/MarkdownContent';

export default function Projects({ data }) {
  const items = data?.items || [];
  const categories = data?.categories || [];
  const [cat, setCat] = useState('all');

  const visible = useMemo(
    () => (cat === 'all' ? items : items.filter((p) => p.category === cat)),
    [items, cat]
  );

  return (
    <section id="projects" data-cursor-section="projects" className="container-x py-20">
      <SectionTitle
        eyebrow="Selected work"
        title="Projects"
        subtitle="Real applications I have designed and built — from AI systems to full-stack web apps."
      />

      {categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setCat('all')}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${
              cat === 'all' ? 'border-transparent text-white' : 'border-line bg-bg-2/60 text-muted hover:text-text'
            }`}
              style={cat === 'all' ? { background: 'var(--primary)' } : undefined}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition ${
                cat === c ? 'border-transparent text-white' : 'border-line bg-bg-2/60 text-muted hover:text-text'
              }`}
              style={cat === c ? { background: 'var(--primary)' } : undefined}
            >
              {c}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => (
          <Reveal key={p._id || p.slug} delay={i * 0.04}>
            <article
              className="card glass group lift flex h-full flex-col overflow-hidden rounded-card"
              data-cursor-anchor="card"
            >
              <div className="img-neon relative aspect-video overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {p.featured && (
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-amber-300 backdrop-blur">
                    <Star size={12} className="fill-amber-300" /> Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-2 flex items-center gap-2">
                  <Badge color="muted">{p.category}</Badge>
                </div>
                <h3 className="text-base font-bold leading-snug">{p.title}</h3>
                <MarkdownContent className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{p.description}</MarkdownContent>

                {p.technologies?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.technologies.slice(0, 6).map((t) => (
                      <span key={t} className="chip !text-[11px]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto flex min-h-10 flex-wrap items-center gap-2 border-t border-line pt-4">
                  {p.githubUrl && (
                    <a
                      href={p.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-line px-3 py-2 text-xs font-semibold text-muted transition hover:border-primary/50 hover:text-text"
                    >
                      <Github size={16} /> Code
                    </a>
                  )}
                  <Link
                    to={`/projects/${p.slug}`}
                    className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                  >
                    <FileText size={16} /> Case Study
                  </Link>
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-primary/30 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/10"
                    >
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
