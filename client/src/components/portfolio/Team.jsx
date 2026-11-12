import SectionTitle from '../common/SectionTitle';
import { Reveal } from '../animations/Reveal';
import SocialIcon from '../common/SocialIcon';

export default function Team({ items = [] }) {
  if (!items.length) return null;

  return (
    <section id="team" data-cursor-section="team" className="container-x py-20">
      <SectionTitle
        eyebrow="Collaborators"
        title="Team"
        subtitle="The people behind the projects and product experiences."
        center
      />

      <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <Reveal key={m._id || i} delay={i * 0.05} className="h-full">
            <div
              className="card glass group lift flex h-full flex-col items-center rounded-card p-6 text-center"
              data-cursor-anchor="card"
            >
              {/* Circular avatar — double-layer neon ring (gradient outer + thin white inner) */}
              <div
                className="relative mx-auto"
                style={{ width: 'clamp(124px, 34vw, 152px)', height: 'clamp(124px, 34vw, 152px)' }}
              >
                {/* Ambient violet→blue outer glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-3 rounded-full opacity-55 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
                  style={{
                    background:
                      'conic-gradient(from 180deg, var(--neon-purple), var(--neon-blue), var(--neon-pink), var(--neon-purple))',
                  }}
                />
                {/* Layer 1: purple → violet → blue gradient neon ring */}
                <div
                  className="relative h-full w-full rounded-full p-[2.5px] transition-shadow duration-300 group-hover:shadow-[0_0_30px_-6px_rgba(168,85,247,0.85)]"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg, var(--neon-purple) 0%, var(--neon-pink) 45%, var(--neon-blue) 100%)',
                  }}
                >
                  {/* Layer 2: dark backing + thin inner white/translucent ring */}
                  <div className="h-full w-full rounded-full bg-bg-2 p-[3px] ring-1 ring-white/25">
                    {/* Photograph — perfectly circular, face-centered, never distorted */}
                    <div className="h-full w-full overflow-hidden rounded-full bg-bg-2">
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full rounded-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="mt-5 text-base font-bold">{m.name}</h3>
              <p className="text-sm text-highlight">{m.designation}</p>
              {m.biography && <p className="mt-2 text-sm text-muted">{m.biography}</p>}

              {m.social?.length > 0 && (
                <div className="mt-auto flex flex-wrap justify-center gap-2.5 pt-4">
                  {m.social.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="grid h-9 w-9 place-items-center rounded-full border border-line bg-bg-2/60 text-muted transition duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_16px_-6px_rgba(168,85,247,0.8)]"
                    >
                      <SocialIcon platform={s.platform} size={16} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
