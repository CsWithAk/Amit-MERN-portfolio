import { Reveal } from '../animations/Reveal';

export default function SectionTitle({ eyebrow, title, subtitle, center = true }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <Reveal>
          <span className="eyebrow">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="section-title">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={`mt-3 max-w-2xl text-muted ${center ? 'mx-auto' : ''}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
