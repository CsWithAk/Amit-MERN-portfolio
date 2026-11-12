import { Link, useLocation } from 'react-router-dom';
import SocialIcon from '../common/SocialIcon';
import { Mail, MapPin } from 'lucide-react';

export default function Footer({ profile, socialLinks = [], navigation = [], settings }) {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const hrefFor = (t) => (onHome ? t : `/${t}`);
  const year = new Date().getFullYear();

  return (
    <footer className="footer-glow relative mt-24 border-t border-line bg-bg-2/40">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-sm font-extrabold text-white"
              style={{ background: 'var(--primary)' }}
            >
              {(profile?.logoText || 'AK').slice(0, 2).toUpperCase()}
            </span>
            <span className="font-display font-bold">{profile?.logoText || 'Portfolio'}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted">{profile?.tagline || 'Building digital experiences.'}</p>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Explore</h4>
          <ul className="space-y-2 text-sm text-muted">
            {navigation.slice(0, 6).map((item) => (
              <li key={item._id || item.sectionKey}>
                <a href={hrefFor(item.target)} className="transition hover:text-text">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Connect</h4>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((s) => (
              <a
                key={s._id || s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-bg-2/60 text-muted transition hover:-translate-y-0.5 hover:text-primary"
              >
                <SocialIcon platform={s.icon || s.platform} size={17} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-3 text-sm font-semibold">Contact</h4>
          <ul className="space-y-2 text-sm text-muted">
            {profile?.email && (
              <li className="flex items-center gap-2">
                <Mail size={15} />
                <a href={`mailto:${profile.email}`} className="hover:text-text">
                  {profile.email}
                </a>
              </li>
            )}
            {profile?.location && (
              <li className="flex items-center gap-2">
                <MapPin size={15} /> {profile.location}
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>{settings?.copyrightText || `© ${year} ${profile?.name || 'Portfolio'}. All rights reserved.`}</p>
          <div className="flex items-center gap-4">
            <Link to="/login" className="transition hover:text-text">
              +
            </Link>
            <span>·</span>
            <span>{settings?.footerContent || 'Built with the MERN stack'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
