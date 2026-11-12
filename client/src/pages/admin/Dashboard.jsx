import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  FolderGit2, Layers, GraduationCap, Briefcase, FileText, Award, Users, Mail,
  ArrowUpRight, User, Palette,
} from 'lucide-react';
import toast from 'react-hot-toast';
import adminApi from '../../services/adminApi';
import { useAuth } from '../../context/AuthContext';
import useFetch from '../../hooks/useFetch';
import publicApi from '../../services/publicApi';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';

const CARDS = [
  { key: 'projects', label: 'Projects', icon: FolderGit2, to: '/admin/projects', color: 'text-primary bg-primary/10' },
  { key: 'skills', label: 'Skills', icon: Layers, to: '/admin/skills', color: 'text-secondary bg-secondary/10' },
  { key: 'education', label: 'Education', icon: GraduationCap, to: '/admin/education', color: 'text-emerald-400 bg-emerald-400/10' },
  { key: 'experiences', label: 'Experience', icon: Briefcase, to: '/admin/experience', color: 'text-amber-400 bg-amber-400/10' },
  { key: 'publications', label: 'Publications', icon: FileText, to: '/admin/publications', color: 'text-sky-400 bg-sky-400/10' },
  { key: 'certifications', label: 'Certifications', icon: Award, to: '/admin/certifications', color: 'text-fuchsia-400 bg-fuchsia-400/10' },
  { key: 'team', label: 'Team', icon: Users, to: '/admin/team', color: 'text-rose-400 bg-rose-400/10' },
  { key: 'messages', label: 'Messages', icon: Mail, to: '/admin/contact-messages', color: 'text-violet-400 bg-violet-400/10' },
];

export default function Dashboard() {
  const { user } = useAuth();
  const { data: profile } = useFetch(publicApi.profile, []);
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    adminApi.dashboard()
      .then((d) => alive && setOverview(d))
      .catch((e) => toast.error(e.friendlyMessage || 'Failed to load dashboard'))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  const counts = overview?.counts || {};
  const recent = overview?.recentMessages || [];

  return (
    <div>
      {/* Greeting */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome{profile?.name ? `, ${profile.name.split(' ')[0]}` : ''} 👋
          </h1>
          <p className="mt-1 text-sm text-muted">
            Signed in as <span className="font-medium text-text">{user?.username || 'admin'}</span> · Here's an overview of your portfolio.
          </p>
        </div>
        <Link to="/" className="btn btn-ghost hidden sm:inline-flex" target="_blank" rel="noreferrer">
          View site <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* Bento stat grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {CARDS.map((c) => (
          <Link
            key={c.key}
            to={c.to}
            className="card glass group lift relative rounded-card p-5 transition hover:border-primary/40"
          >
            <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl ${c.color}`}>
              <c.icon size={20} />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-12" />
            ) : (
              <div className="text-3xl font-bold tabular-nums">{counts[c.key] ?? 0}</div>
            )}
            <div className="mt-1 text-sm text-muted">{c.label}</div>
            {c.key === 'messages' && !loading && counts.unreadMessages > 0 && (
              <span className="absolute right-4 top-4"><Badge color="danger">{counts.unreadMessages} new</Badge></span>
            )}
          </Link>
        ))}
      </div>

      {/* Quick actions + recent messages */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card glass rounded-card p-5 lg:col-span-1">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted">Quick actions</h2>
          <div className="space-y-2">
            <Link to="/admin/profile" className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-bg-2/40">
              <User size={16} className="text-primary" /> Edit profile
            </Link>
            <Link to="/admin/about" className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-bg-2/40">
              <FileText size={16} className="text-secondary" /> Edit about section
            </Link>
            <Link to="/admin/appearance" className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-bg-2/40">
              <Palette size={16} className="text-fuchsia-400" /> Customize appearance
            </Link>
            <Link to="/admin/projects" className="flex items-center gap-3 rounded-xl border border-line px-3 py-2.5 text-sm transition hover:border-primary/40 hover:bg-bg-2/40">
              <FolderGit2 size={16} className="text-emerald-400" /> Add a project
            </Link>
          </div>
        </div>

        <div className="card glass rounded-card p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Recent messages</h2>
            <Link to="/admin/contact-messages" className="text-xs text-primary hover:underline">View all</Link>
          </div>
          {loading ? (
            <div className="space-y-2">{Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-14 w-full rounded-lg" />)}</div>
          ) : recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">No messages yet.</p>
          ) : (
            <ul className="divide-y divide-line">
              {recent.map((m) => (
                <li key={m._id} className="flex items-center gap-3 py-3">
                  <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-bold ${m.read ? 'bg-bg-2 text-muted' : 'bg-primary/15 text-primary'}`}>
                    {(m.name || '?').charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate text-sm font-medium">{m.name}</span>
                      {!m.read && <Badge color="primary">new</Badge>}
                    </div>
                    <p className="truncate text-xs text-muted">{m.subject || '(no subject)'}</p>
                  </div>
                  <span className="hidden text-xs text-muted sm:block">{new Date(m.createdAt).toLocaleDateString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
