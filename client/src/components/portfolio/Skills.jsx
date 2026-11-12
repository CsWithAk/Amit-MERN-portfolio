import { motion, useReducedMotion } from 'framer-motion';
import {
  Code,
  Code2,
  Laptop,
  Server,
  Database,
  Cpu,
  Wrench,
  ArrowRight,
  Settings,
  Crosshair,
  BrainCircuit,
} from 'lucide-react';
import {
  DiPython,
  DiJava,
  DiReact,
  DiHtml5,
  DiCss3,
  DiJavascript,
  DiMysql,
  DiLinux,
} from 'react-icons/di';
import {
  SiC,
  SiCplusplus,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiOpencv,
  SiGit,
  SiGithub,
  SiFigma,
} from 'react-icons/si';

/**
 * Technical Arsenal — a faithful reproduction of the reference design.
 * Six neon-bordered category cards in a responsive 3-column grid, each with a
 * gradient icon tile, a top-right index number, technology chips carrying real
 * brand icons, and a circular arrow. No percentage bars / fake proficiency.
 *
 * Content is still driven by the skills API (grouped by `category`); the visual
 * metadata (accent colour, description, index, category icon) lives here so the
 * admin can keep editing which technologies belong to each group.
 */

// Category metadata. `key` must match a backend skill `category`. `accent` is
// exposed to CSS as --accent so the neon border/glow/icon are driven by one var.
const GROUPS = [
  {
    key: 'Programming',
    num: '01',
    icon: Code2,
    accent: '#A855F7', // purple
    description: 'Core programming languages for building solutions.',
  },
  {
    key: 'Frontend Development',
    num: '02',
    icon: Laptop,
    accent: '#3B82F6', // electric blue
    description: 'Modern and responsive user interfaces.',
  },
  {
    key: 'Backend Development',
    num: '03',
    icon: Server,
    accent: '#22D3EE', // cyan
    description: 'Scalable and robust server-side technologies.',
  },
  {
    key: 'Databases',
    num: '04',
    icon: Database,
    accent: '#F59E0B', // orange / gold
    description: 'Efficient data management and storage solutions.',
  },
  {
    key: 'AI & Data Analytics',
    num: '05',
    icon: Cpu,
    accent: '#10B981', // green / turquoise
    description: 'Intelligent systems and data-driven insights.',
  },
  {
    key: 'Tools & Platforms',
    num: '06',
    icon: Wrench,
    accent: '#D946EF', // pink / purple
    description: 'Development tools and collaboration platforms.',
  },
];

// Genuine technology brand icons, keyed by the skill name (lower-cased).
// react-icons renders single-colour glyphs, so each entry supplies its brand
// colour. Unknown / admin-added skills fall back to a subtle accent dot.
const TECH_ICONS = {
  python: { Icon: DiPython, color: '#3B8FD6' },
  java: { Icon: DiJava, color: '#EA2D2E' },
  c: { Icon: SiC, color: '#6E9BE0' },
  'c++': { Icon: SiCplusplus, color: '#7BA7DE' },
  sql: { Icon: Database, color: '#3B82F6' },
  html: { Icon: DiHtml5, color: '#E34F26' },
  css: { Icon: DiCss3, color: '#2E8FD0' },
  javascript: { Icon: DiJavascript, color: '#F7DF1E' },
  react: { Icon: DiReact, color: '#61DAFB' },
  'tailwind css': { Icon: SiTailwindcss, color: '#38BDF8' },
  'node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  'express.js': { Icon: SiExpress, color: '#E2E8F0' },
  'rest apis': { Icon: Settings, color: '#38BDF8' },
  mongodb: { Icon: SiMongodb, color: '#4FA85A' },
  mysql: { Icon: DiMysql, color: '#00C1FF' },
  firebase: { Icon: SiFirebase, color: '#FFCA28' },
  yolo: { Icon: Crosshair, color: '#2DD4BF' },
  opencv: { Icon: SiOpencv, color: '#7C6BF0' },
  'llm apis': { Icon: BrainCircuit, color: '#A78BFA' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub, color: '#E6EDF3' },
  figma: { Icon: SiFigma, color: '#F24E1E' },
  linux: { Icon: DiLinux, color: '#FCCD04' },
};

function TechChip({ name }) {
  const conf = TECH_ICONS[(name || '').toLowerCase()];
  const Icon = conf?.Icon;
  return (
    <span className="arsenal-chip">
      {Icon ? (
        <Icon size={16} color={conf.color} aria-hidden="true" />
      ) : (
        <span className="arsenal-chip-dot" aria-hidden="true" />
      )}
      <span>{name}</span>
    </span>
  );
}

function SkillCard({ group, items, index, reduce, onExplore }) {
  const Icon = group.icon;
  return (
    <motion.div
      className="arsenal-card h-full"
      style={{ '--accent': group.accent }}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -5 }}
    >
      <div className="arsenal-surface" data-cursor-anchor="card">
        <span className="arsenal-num">{group.num}</span>

        <div className="flex items-start gap-4">
          <span className="arsenal-icon">
            <Icon size={30} strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-snug text-text">{group.key}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{group.description}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          {items.map((s) => (
            <TechChip key={s._id || s.name} name={s.name} />
          ))}
        </div>

        <button
          type="button"
          className="arsenal-arrow"
          aria-label={`Explore ${group.key} projects`}
          onClick={onExplore}
        >
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Skills({ skills }) {
  const reduce = useReducedMotion();
  const groups = skills?.groups || {};
  const items = skills?.items || [];

  // Resolve a card's technologies: prefer backend grouping by exact category,
  // otherwise match the key case-insensitively, then filter the flat list.
  const resolve = (key) => {
    if (Array.isArray(groups[key])) return groups[key];
    const lower = key.toLowerCase();
    const altKey = Object.keys(groups).find((k) => k.toLowerCase() === lower);
    if (altKey) return groups[altKey];
    return items.filter((it) => (it.category || '').toLowerCase() === lower);
  };

  const cards = GROUPS.map((g) => ({ ...g, items: resolve(g.key) })).filter((g) => g.items.length);

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section id="skills" data-cursor-section="skills" className="container-x py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <span className="arsenal-rule arsenal-rule--left" aria-hidden="true" />
          <motion.span
            className="arsenal-pill"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
          >
            <Code size={15} aria-hidden="true" />
            My Tech Stack
          </motion.span>
          <span className="arsenal-rule arsenal-rule--right" aria-hidden="true" />
        </div>

        <motion.h2
          className="mt-5 text-4xl font-extrabold tracking-tight text-text sm:text-5xl"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Technical{' '}
          <span className="bg-gradient-to-r from-white via-primary to-secondary bg-clip-text text-transparent">
            Arsenal
          </span>
        </motion.h2>

        <motion.p
          className="mx-auto mt-3 max-w-2xl text-muted"
          initial={reduce ? false : { opacity: 0 }}
          whileInView={reduce ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.12 }}
        >
          Technologies, tools and frameworks I work with
        </motion.p>
      </div>

      {cards.length === 0 ? (
        <p className="text-center text-muted">No technologies to show yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((g, i) => (
            <SkillCard
              key={g.key}
              group={g}
              items={g.items}
              index={i}
              reduce={reduce}
              onExplore={scrollToProjects}
            />
          ))}
        </div>
      )}

      {/* Bottom call to action */}
      <div className="mt-12 flex justify-center">
        <a href="#projects" className="arsenal-cta" onClick={scrollToProjects}>
          <span>
            Explore My Projects
            <ArrowRight size={18} aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
}
