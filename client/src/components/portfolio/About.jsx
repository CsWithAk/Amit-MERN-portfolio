import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import SectionTitle from '../common/SectionTitle';
import MarkdownContent from '../common/MarkdownContent';
import { Reveal, RevealGroup, RevealItem } from '../animations/Reveal';

function Counter({ to = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1200;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function About({ about, profile }) {
  const stats = about?.statistics || [];
  const interests = about?.interests || [];

  return (
    <section id="about" data-cursor-section="about" className="container-x py-16 sm:py-20">
      <SectionTitle eyebrow="Who I am" title={about?.heading || 'About Me'} subtitle={about?.subtitle} />

      <div className="grid items-stretch gap-6 md:grid-cols-[1.3fr_0.8fr] md:gap-8">
        {/* LEFT column — heading, biography, interests */}
        <div className="flex h-full flex-col gap-6">
          <div className="card glass flex-1 rounded-card p-6 sm:p-7" data-cursor-anchor="card">
            <div className="space-y-4 text-[15px] leading-relaxed text-muted">
              {(about?.biography || []).map((para, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <MarkdownContent>{para}</MarkdownContent>
                </Reveal>
              ))}
            </div>
          </div>

          {interests.length > 0 && (
            <div className="card glass rounded-card p-6">
              <h4 className="mb-3 text-sm font-semibold text-text">Interests</h4>
              <RevealGroup className="flex flex-wrap gap-2" stagger={0.05}>
                {interests.map((it) => (
                  <RevealItem key={it}>
                    <span className="chip">{it}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}
        </div>

        {/* RIGHT column — statistics */}
        <div className="grid h-full auto-rows-fr grid-cols-2 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06} className="h-full">
                <div className="card glass lift flex h-full flex-col items-center justify-center rounded-card p-5 text-center">
                  <div className="text-3xl font-extrabold text-gradient">
                    <Counter to={Number(s.value) || 0} suffix={s.suffix} />
                  </div>
                  <div className="mt-1 text-xs font-medium text-muted">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
      </div>
    </section>
  );
}
