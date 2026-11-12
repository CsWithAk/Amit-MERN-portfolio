import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSettings } from '../../context/SettingsContext';

/**
 * AnimatedCursorOrchestrator
 * -------------------------------------------------------------
 * A premium, autonomous multi-cursor "construction team" effect.
 *
 * - A pool of 8 visually distinct cursor actors (unique colour, pointer
 *   glyph, role-style label, typing / drawing micro-animations).
 * - Only 2–4 actors are active at a time; the roster rotates as the visitor
 *   scrolls so it feels like a coordinated team assembling the page.
 * - Fully pointer-events: none — it never blocks clicks, text selection,
 *   links or buttons, and never mutates portfolio data.
 * - Synchronized to section visibility via IntersectionObserver + rAF.
 * - Pauses when the tab is hidden, is lightweight on mobile, and renders
 *   nothing when animation is disabled or reduced motion is requested.
 *
 * Public sections opt-in by carrying `data-cursor-section="key"` and
 * individual buildable elements carry `data-cursor-anchor="type"`.
 */

const ACTOR_POOL = [
  { id: 'frontend', role: 'Frontend', color: '#8B5CF6', snippet: 'const layout = grid()' },
  { id: 'uiux', role: 'UI / UX', color: '#38BDF8', snippet: 'design → refine' },
  { id: 'motion', role: 'Motion', color: '#A78BFA', snippet: 'animate.in(600)' },
  { id: 'backend', role: 'Backend', color: '#60A5FA', snippet: 'GET /api/ok' },
  { id: 'data', role: 'Data', color: '#F472B6', snippet: 'render(metrics)' },
  { id: 'qa', role: 'QA', color: '#34D399', snippet: 'tests: pass ✓' },
  { id: 'content', role: 'Content', color: '#FBBF24', snippet: 'draft ✎ polish' },
  { id: 'research', role: 'Research', color: '#22D3EE', snippet: 'cite[1] → paper' },
];

// Distinct pointer glyphs (SVG paths) so actors don't all look identical.
const GLYPHS = [
  'M2 2l7 16 2-6 6-2z', // classic arrow
  'M2 2l16 6-6 2-2 6z', // rotated arrow
  'M3 3l14 7-7 2-2 7z', // nib
  'M2 2l16 8-8 1-1 8z', // dart
];

const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

function CursorActor({ actor, target, action, glyphIndex, typingSpeed }) {
  const { x, y } = target;
  const isDrawing = action === 'draw';
  const isTyping = action === 'type';

  return (
    <motion.div
      className="absolute left-0 top-0"
      initial={{ opacity: 0, x: x - 40, y: y + 30 }}
      animate={{ opacity: 1, x, y }}
      exit={{ opacity: 0, scale: 0.6 }}
      transition={{ type: 'spring', stiffness: 60, damping: 14, mass: 0.9 }}
      style={{ color: actor.color }}
    >
      {/* pointer */}
      <svg width="26" height="26" viewBox="0 0 22 22" className="drop-shadow" fill={actor.color}>
        <path d={GLYPHS[glyphIndex % GLYPHS.length]} stroke="#0b1120" strokeWidth="0.6" />
      </svg>

      {/* role label chip */}
      <div
        className="ml-4 -mt-1 flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-lg"
        style={{ background: actor.color, color: '#0b1120' }}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: '#0b1120', opacity: 0.5 }} />
        {actor.role}
      </div>

      {/* typing caret + snippet */}
      {isTyping && (
        <TypingTag text={actor.snippet} color={actor.color} speed={typingSpeed} />
      )}

      {/* drawing bracket outline */}
      {isDrawing && <DrawOutline color={actor.color} />}
    </motion.div>
  );
}

function TypingTag({ text, color, speed = 60 }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, clamp(speed, 20, 160));
    return () => clearInterval(id);
  }, [text, speed]);
  return (
    <div
      className="mt-1.5 ml-1 w-max max-w-[220px] truncate rounded-md border px-2 py-1 font-mono text-[10px] shadow"
      style={{ borderColor: color, color, background: 'rgba(8,11,20,0.7)' }}
    >
      {text.slice(0, n)}
      <span className="ml-0.5 inline-block w-1.5 animate-pulse" style={{ background: color }}>▍</span>
    </div>
  );
}

function DrawOutline({ color }) {
  // A small SVG "selection bracket" that draws itself — evokes a card being built.
  return (
    <motion.svg
      width="150"
      height="120"
      viewBox="0 0 150 120"
      className="absolute left-3 top-3 -z-10"
      initial="hidden"
      animate="show"
    >
      <motion.path
        d="M8 40 V8 H40 M110 8 H142 V40 M142 80 V112 H110 M40 112 H8 V80"
        fill="none"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0.9 },
          show: { pathLength: 1, opacity: 0.9, transition: { duration: 1.1, ease: 'easeInOut' } },
        }}
      />
    </motion.svg>
  );
}

export default function AnimatedCursorOrchestrator() {
  const { animation, multiCursorEnabled, reducedMotion } = useSettings();
  const prefersReduced = useReducedMotion();
  const layerRef = useRef(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const rosterRef = useRef(0); // rotates the actor pool between section changes
  const sectionMapRef = useRef(new Map()); // sectionKey -> element
  const lastKeyRef = useRef('');

  const enabled = multiCursorEnabled && !reducedMotion && !prefersReduced;
  const actorCount = clamp(Number(animation.cursorActors) || 3, 2, 4);
  const typingSpeed = Number(animation.typingSpeed) || 60;

  // Track viewport size + coarse pointer (mobile) to stay lightweight.
  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [enabled]);

  // Discover sections + pause when tab hidden.
  useEffect(() => {
    if (!enabled) return;
    const els = document.querySelectorAll('[data-cursor-section]');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const key = e.target.getAttribute('data-cursor-section');
          if (e.isIntersecting) sectionMapRef.current.set(key, e.target);
          else sectionMapRef.current.delete(key);
        });
        scheduleRecompute();
      },
      // Activate when a section occupies the central band of the viewport.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 }
    );
    els.forEach((el) => io.observe(el));

    let hidden = false;
    const onVis = () => {
      hidden = document.hidden;
      if (hidden) setAssignments([]);
      else scheduleRecompute();
    };
    document.addEventListener('visibilitychange', onVis);

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Recompute actor targets from currently-visible sections' anchors.
  const recompute = useMemo(() => {
    let raf = 0;
    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const sections = [...sectionMapRef.current.entries()];
        if (!sections.length) {
          if (lastKeyRef.current !== '') {
            lastKeyRef.current = '';
            setAssignments([]);
          }
          return;
        }
        // Primary = the section nearest the viewport vertical center.
        const mid = window.innerHeight / 2;
        const scored = sections.map(([key, el]) => {
          const r = el.getBoundingClientRect();
          return { key, el, score: Math.abs(r.top + r.height / 2 - mid) };
        });
        scored.sort((a, b) => a.score - b.score);
        const primary = scored[0];

        // Gather anchors within the top 2 visible sections (fallback to the section box).
        const anchors = [];
        scored.slice(0, 2).forEach(({ el }) => {
          const nodes = el.querySelectorAll('[data-cursor-anchor]');
          if (nodes.length) {
            nodes.forEach((n) => anchors.push(n));
          } else {
            const r = el.getBoundingClientRect();
            if (r.width > 0) anchors.push(el);
          }
        });
        if (!anchors.length) anchors.push(primary.el);

        // Rotate roster only when the active section changes (prevents jitter).
        if (lastKeyRef.current !== primary.key) {
          lastKeyRef.current = primary.key;
          rosterRef.current = (rosterRef.current + 2) % ACTOR_POOL.length;
        }

        const vh = window.innerHeight;
        const vw = window.innerWidth;
        const limit = isMobile ? 2 : actorCount;
        const actions = ['type', 'draw', 'idle', 'draw', 'type'];

        const next = [];
        for (let i = 0; i < Math.min(limit, anchors.length || 1); i++) {
          const actor = ACTOR_POOL[(rosterRef.current + i) % ACTOR_POOL.length];
          const node = anchors[i % anchors.length];
          const r = node.getBoundingClientRect();
          const x = clamp(r.left + (i % 2 ? r.width * 0.7 : r.width * 0.12), 8, vw - 120);
          const y = clamp(r.top + (i % 2 ? 18 : Math.min(r.height * 0.4, 140)), 70, vh - 120);
          next.push({
            actorId: actor.id,
            actor,
            target: { x, y },
            action: isMobile ? 'idle' : actions[(i + rosterRef.current) % actions.length],
            glyphIndex: (i + rosterRef.current) % GLYPHS.length,
          });
        }
        setAssignments(next);
      });
    };
  }, [actorCount, isMobile]);

  const scheduleRecompute = () => recompute();

  // React to scroll + anchor-affecting changes.
  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => scheduleRecompute();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, recompute]);

  if (!enabled) return null;

  const byMobile = isMobile;
  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden"
      style={{ contain: 'strict' }}
    >
      <AnimatePresence mode="popLayout">
        {assignments.map((a) => (
          <CursorActor
            key={a.actorId + lastKeyRef.current}
            actor={a.actor}
            target={a.target}
            action={a.action}
            glyphIndex={a.glyphIndex}
            typingSpeed={typingSpeed}
          />
        ))}
      </AnimatePresence>
      {/* subtle mobile fallback: nothing animated, effect simply absent */}
      {byMobile ? null : null}
    </div>
  );
}
