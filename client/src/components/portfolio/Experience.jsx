import { Building2, Calendar, Award, ExternalLink } from 'lucide-react';
import SectionTitle from '../common/SectionTitle';
import MarkdownContent from '../common/MarkdownContent';
import { Reveal } from '../animations/Reveal';

export default function Experience({ items = [], achievements = [] }) {
  return (
    <section id="experience" data-cursor-section="experience" className="container-x py-20">
      <SectionTitle
        eyebrow="Internships & Roles"
        title="Experience & Achievements"
        subtitle="Hands-on internships and recognitions across AI, data, networking and web development."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {items.map((e, i) => (
          <Reveal key={e._id || i} delay={i * 0.03}>
            <div className="card glass lift h-full rounded-card p-6" data-cursor-anchor="card">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-2/60 text-primary">
                    <Building2 size={18} />
                  </span>
                  <div>
                    <h3 className="text-base font-bold leading-tight">{e.position}</h3>
                    <p className="text-sm text-highlight">{e.organization}</p>
                  </div>
                </div>
                <span className="chip capitalize">{e.employmentType}</span>
              </div>

              <div className="mt-3 flex items-center gap-2 text-xs text-muted">
                <Calendar size={13} /> {e.dateDisplay}
                {e.location && <span className="ml-auto">📍 {e.location}</span>}
              </div>

              {e.description && <MarkdownContent className="mt-3 text-sm text-muted">{e.description}</MarkdownContent>}

              {e.skills?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.skills.map((s) => (
                    <span key={s} className="chip !text-[11px]">
                      {s}
                    </span>
                  ))}
                </div>
              )}

              {e.certificateUrl && (
                <a
                  href={e.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                >
                  View certificate <ExternalLink size={12} />
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {achievements.length > 0 && (
        <>
          <h3 className="mb-5 mt-14 flex items-center gap-2 text-lg font-bold">
            <Award className="text-amber-300" size={20} /> Achievements & Awards
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((a, i) => (
              <Reveal key={a._id || i} delay={i * 0.04}>
                <div className="card glass lift accent-cyan flex h-full items-start gap-3 rounded-card p-5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                    <Award size={16} />
                  </span>
                  <div>
                    <h4 className="font-semibold leading-tight">{a.title}</h4>
                    {a.issuer && <p className="text-xs text-highlight">{a.issuer}</p>}
                    {a.description && <MarkdownContent className="mt-1 text-sm text-muted">{a.description}</MarkdownContent>}
                    {a.yearDisplay && <p className="mt-1 text-xs text-muted">{a.yearDisplay}</p>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
