import { useState } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard, User, Info, GraduationCap, Layers, FolderKanban, Briefcase,
  FileText, Award, Medal, Users, Share2, Inbox, Navigation, Palette, Sparkles, HelpCircle,
  Globe, Settings, LogOut, Menu, X, ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/profile', label: 'Profile', icon: User },
  { to: '/admin/about', label: 'About', icon: Info },
  { to: '/admin/education', label: 'Education', icon: GraduationCap },
  { to: '/admin/skills', label: 'Skills', icon: Layers },
  { to: '/admin/projects', label: 'Projects', icon: FolderKanban },
  { to: '/admin/experience', label: 'Experience', icon: Briefcase },
  { to: '/admin/publications', label: 'Publications', icon: FileText },
  { to: '/admin/certifications', label: 'Certifications', icon: Award },
  { to: '/admin/achievements', label: 'Achievements', icon: Medal },
  { to: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { to: '/admin/team', label: 'Team', icon: Users },
  { to: '/admin/social-links', label: 'Social Links', icon: Share2 },
  { to: '/admin/contact-messages', label: 'Messages', icon: Inbox },
  { to: '/admin/navigation', label: 'Navigation', icon: Navigation },
  { to: '/admin/appearance', label: 'Appearance', icon: Palette },
  { to: '/admin/animations', label: 'Animations', icon: Sparkles },
  { to: '/admin/seo', label: 'SEO', icon: Globe },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  const Sidebar = (
    <nav className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 px-5 py-5">
        <span
          className="grid h-9 w-9 place-items-center rounded-xl text-sm font-extrabold text-white"
          style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}
        >
          AK
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold">Admin CMS</div>
          <div className="text-[11px] text-muted">Amit Portfolio</div>
        </div>
      </div>

      <div className="no-scrollbar flex-1 overflow-y-auto px-3 pb-4">
        <ul className="space-y-0.5">
          {NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-primary/15 font-semibold text-primary'
                      : 'text-muted hover:bg-bg-2/60 hover:text-text'
                  }`
                }
              >
                <Icon size={17} /> {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line p-3">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-muted hover:text-text"
        >
          <ExternalLink size={16} /> View site
        </Link>
        <button
          onClick={onLogout}
          className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-line bg-bg-2/40 lg:block">
        {Sidebar}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-line bg-bg-2">
            <button className="absolute right-3 top-4 text-muted" onClick={() => setOpen(false)}>
              <X size={20} />
            </button>
            {Sidebar}
          </aside>
        </div>
      )}

      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-line bg-bg/80 px-4 py-3 backdrop-blur lg:px-8">
          <button className="btn btn-ghost !px-3 lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu size={18} />
          </button>
          <div className="hidden text-sm text-muted lg:block">
            Welcome back, <span className="font-semibold text-text">{user?.username || 'admin'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip capitalize">{user?.username || 'admin'}</span>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
