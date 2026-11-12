import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ArrowRight, Sparkles, Briefcase } from 'lucide-react';
import SocialIcon from '../common/SocialIcon';

function useTypewriter(words = [], speed = 90, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const word = words[index % words.length];
    let timeout;
    if (!deleting) {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), speed / 2);
      } else {
        setDeleting(false);
        setIndex((i) => i + 1);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, speed, pause]);

  return text;
}

export default function Hero({ profile, socialLinks = [] }) {
  const roles = profile?.roles?.length ? profile.roles : [profile?.designation].filter(Boolean);
  const typed = useTypewriter(roles.length ? roles : ['Developer'], 85, 1500);

  return (
    <section
      id="home"
      data-cursor-section="hero"
      className="relative overflow-hidden"
    >
      <div className="container-x grid items-center gap-8 py-8 sm:py-10 md:grid-cols-[1.1fr_0.9fr] md:gap-12 md:py-16">
        {/* Left: intro */}
        <div className="relative z-10">
          {profile?.availability && (
            <span className="eyebrow">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px] shadow-emerald-400" />
              {profile.availability}
            </span>
          )}

          <p className="mb-2 text-lg text-muted">Hi, I'm</p>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl" data-cursor-anchor="heading">
            <span className="text-gradient">{profile?.name || 'Amit Kumar'}</span>
          </h1>

          <div className="mt-3 flex items-center gap-2 font-display text-xl font-semibold sm:text-2xl">
            <Sparkles size={20} className="text-highlight" />
            <span>{typed}</span>
            <span className="inline-block w-0.5 animate-pulse self-stretch bg-primary" />
          </div>

          <p className="mt-5 max-w-xl text-muted" data-cursor-anchor="text">
            {profile?.heroIntro || profile?.tagline}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8">
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Download size={16} /> Download Resume
              </a>
            )}
            <a href="#contact" className="btn btn-ghost">
              Get in touch <ArrowRight size={16} />
            </a>
            {profile?.companyUrl && (
              <a
                href={profile.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <Briefcase size={16} /> {profile.companyLabel || 'My Company'}
              </a>
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2.5 sm:mt-8" data-cursor-anchor="social">
            {socialLinks.map((s) => (
              <a
                key={s._id || s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-bg-2/60 text-muted transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                <SocialIcon platform={s.icon || s.platform} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Right: portrait + info badges */}
        <div className="relative mx-auto flex w-full flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[min(75vw,280px)] md:w-full md:max-w-sm"
            data-cursor-anchor="card"
          >
            <div
              className="absolute -inset-3 -z-10 rounded-[2rem] opacity-70 blur-2xl"
              style={{ background: 'var(--primary)' }}
            />
            <div className="glass img-neon overflow-hidden rounded-[1.75rem] p-2">
              <img
                src={profile?.image}
                alt={profile?.name || 'Profile'}
                loading="eager"
                className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-top"
              />
            </div>
          </motion.div>

          {/* Info badges — one row below the image: location (left) + designation (right) */}
          {/*{(profile?.location || profile?.designation) && (
            <div className="mt-4 flex w-full flex-wrap items-center justify-center gap-3">
              {profile?.location && (
                <div className="glass whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-medium shadow-soft">
                  📍 {profile.location}
                </div>
              )}
              {profile?.designation && (
                <div className="glass whitespace-nowrap rounded-2xl px-4 py-2 text-xs font-medium shadow-soft">
                  🎓 {profile.designation}
                </div>
              )}
            </div>
          )}*/}
        </div>
      </div>
    </section>
  );
}
