import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';

export default function Navigation({ profile, navigation = [] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = pathname === '/';
  // On non-home pages, in-page anchors should route back to home first.
  const hrefFor = (target) => (onHome ? target : `/${target}`);

  const logo = profile?.logoText || 'AK';

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="container-x">
        <nav
          className={`flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-300 ${
            scrolled ? 'glass shadow-soft' : 'bg-transparent'
          }`}
        >
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Home">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-sm font-extrabold text-white shadow-glow"
              style={{ background: 'var(--primary)' }}
            >
              {logo.slice(0, 2).toUpperCase()}
            </span>
            <span className="font-display text-sm font-bold tracking-tight">{logo}</span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
              <li key={item._id || item.sectionKey}>
                <a
                  href={hrefFor(item.target)}
                  className="link-underline rounded-full px-3 py-2 text-sm text-muted transition hover:text-text"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {profile?.resumeUrl && (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary hidden sm:inline-flex"
              >
                <Download size={16} /> Resume
              </a>
            )}
            <button
              className="btn btn-ghost !px-3 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="glass mt-2 overflow-hidden rounded-2xl lg:hidden"
            >
              <ul className="flex flex-col p-2">
                {navigation.map((item) => (
                  <li key={item._id || item.sectionKey}>
                    <a
                      href={hrefFor(item.target)}
                      onClick={() => setOpen(false)}
                      className="block rounded-xl px-4 py-3 text-sm text-muted hover:bg-bg-2/60 hover:text-text"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                {profile?.resumeUrl && (
                  <li>
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-primary"
                    >
                      <Download size={16} /> Download Resume
                    </a>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
