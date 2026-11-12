import { useCallback, useEffect, useState } from 'react';
import { Search, X, Trash2, Mail, MailOpen, ChevronDown, Inbox, Send, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import adminApi from '../../services/adminApi';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import Badge from '../../components/common/Badge';
import Skeleton from '../../components/common/Skeleton';
import ConfirmDialog from '../../components/common/ConfirmDialog';

const LIMIT = 15;

export default function ContactMessages() {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0, unread: 0, page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [readFilter, setReadFilter] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => { setDebounced(search); setPage(1); }, 350);
    return () => clearTimeout(id);
  }, [search]);

  // Clear the reply composer whenever a different message row is expanded.
  useEffect(() => { setReplyText(''); }, [open]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (debounced) params.search = debounced;
      if (readFilter) params.read = readFilter;
      const data = await adminApi.messages.list(params);
      setRows(data.items || []);
      setMeta({ total: data.total || 0, unread: data.unread || 0, page: data.page || 1 });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }, [page, debounced, readFilter]);

  useEffect(() => { load(); }, [load]);

  const totalPages = Math.max(1, Math.ceil((meta.total || 0) / LIMIT));

  const toggleRead = async (msg) => {
    try {
      const updated = await adminApi.messages.markRead(msg._id, !msg.read);
      setRows((rs) => rs.map((r) => (r._id === msg._id ? updated : r)));
      setMeta((m) => ({ ...m, unread: Math.max(0, m.unread + (updated.read ? -1 : 1)) }));
    } catch (e) {
      toast.error(e.friendlyMessage || 'Update failed');
    }
  };

  const sendReply = async (msg) => {
    const body = replyText.trim();
    if (!body) {
      toast.error('Write a reply first');
      return;
    }
    setReplying(true);
    try {
      const updated = await adminApi.messages.reply(msg._id, { body, subject: msg.subject || '' });
      setRows((rs) => rs.map((r) => (r._id === msg._id ? updated : r)));
      if (updated.read && !msg.read) setMeta((m) => ({ ...m, unread: Math.max(0, m.unread - 1) }));
      setReplyText('');
      toast.success('Reply sent');
    } catch (e) {
      toast.error(e.friendlyMessage || 'Failed to send reply');
    } finally {
      setReplying(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await adminApi.messages.remove(toDelete._id);
      toast.success('Deleted');
      setToDelete(null);
      load();
    } catch (e) {
      toast.error(e.friendlyMessage || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="Contact Messages"
        subtitle="Inquiries submitted through the public contact form."
        actions={meta.unread > 0 ? <Badge color="danger">{meta.unread} unread</Badge> : <Badge color="success">All read</Badge>}
      />

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input className="field pl-9" placeholder="Search name, email, subject…" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-text"><X size={15} /></button>
          )}
        </div>
        <select className="field sm:w-44" value={readFilter} onChange={(e) => { setReadFilter(e.target.value); setPage(1); }}>
          <option value="">All messages</option>
          <option value="false">Unread</option>
          <option value="true">Read</option>
        </select>
      </div>

      <div className="space-y-2">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-xl" />)
        ) : rows.length === 0 ? (
          <div className="card glass grid place-items-center rounded-card py-16 text-muted">
            <Inbox size={28} className="mb-2" />
            <p className="text-sm">No messages found.</p>
          </div>
        ) : (
          rows.map((m) => {
            const isOpen = open === m._id;
            return (
              <div key={m._id} className={`card overflow-hidden rounded-card transition ${m.read ? '' : 'border-primary/40'}`}>
                <button
                  className="flex w-full items-center gap-3 px-4 py-3 text-left"
                  onClick={() => setOpen(isOpen ? null : m._id)}
                >
                  <span className={`shrink-0 ${m.read ? 'text-muted' : 'text-primary'}`}>
                    {m.read ? <MailOpen size={18} /> : <Mail size={18} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`truncate ${m.read ? 'font-medium' : 'font-bold'}`}>{m.subject || '(no subject)'}</span>
                      {!m.read && <Badge color="primary">new</Badge>}
                    </div>
                    <p className="truncate text-xs text-muted">{m.name} · {m.email}</p>
                  </div>
                  <span className="hidden text-xs text-muted sm:block">{new Date(m.createdAt).toLocaleDateString()}</span>
                  <ChevronDown size={16} className={`shrink-0 text-muted transition ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="border-t border-line px-4 py-4">
                    <p className="whitespace-pre-wrap text-sm">{m.message}</p>

                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted">
                      {m.replied ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400">
                          <Send size={12} /> Replied {m.repliedAt ? new Date(m.repliedAt).toLocaleDateString() : ''}
                        </span>
                      ) : (
                        <span>Not replied yet</span>
                      )}
                    </div>

                    {m.replies && m.replies.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {m.replies.map((r, i) => (
                          <div key={i} className="rounded-lg border border-line bg-bg-2/50 px-3 py-2">
                            <div className="mb-1 flex items-center justify-between text-[11px] text-muted">
                              <span className="truncate">{r.subject || 'Reply'}</span>
                              <span className="shrink-0">{new Date(r.sentAt).toLocaleString()}</span>
                            </div>
                            <p className="whitespace-pre-wrap text-sm">{r.body}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-4">
                      <textarea
                        rows={4}
                        className="field resize-y text-sm"
                        placeholder={`Reply to ${m.name} <${m.email}>…`}
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                        <button className="btn btn-primary !py-1.5 text-xs" onClick={() => sendReply(m)} disabled={replying}>
                          {replying ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
                          {replying ? 'Sending…' : 'Send reply'}
                        </button>
                        <div className="flex items-center gap-2">
                          <button className="btn btn-ghost !py-1.5 text-xs" onClick={() => toggleRead(m)}>
                            {m.read ? 'Mark unread' : 'Mark read'}
                          </button>
                          <button className="rounded-lg p-2 text-muted hover:bg-rose-500/15 hover:text-rose-400" onClick={() => setToDelete(m)} aria-label="Delete message">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted">
          <span>{meta.total} total</span>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost !px-3 !py-1.5 text-xs" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
            <span className="text-xs">Page {page} / {totalPages}</span>
            <button className="btn btn-ghost !px-3 !py-1.5 text-xs" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>Next</button>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this message?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        busy={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
