import { useEffect, useState } from 'react';
import { Plus, Trash2, Loader2, Save, GripVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import useFetch from '../../hooks/useFetch';
import publicApi from '../../services/publicApi';
import adminApi from '../../services/adminApi';
import AdminPageHeader from '../../components/admin/AdminPageHeader';
import TagsInput from '../../components/forms/TagsInput';
import FullScreenLoader from '../../components/common/FullScreenLoader';

/** Editable list of Markdown blocks (biography). */
function StringList({ items = [], onChange, placeholder = 'Add a paragraph…' }) {
  const update = (i, v) => onChange(items.map((x, idx) => (idx === i ? v : x)));
  const add = () => onChange([...items, '']);
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          <textarea
            className="field resize-y"
            rows={5}
            placeholder={placeholder}
            value={it}
            onChange={(e) => update(i, e.target.value)}
          />
          <button type="button" onClick={() => remove(i)} className="rounded-lg p-2 text-muted hover:text-rose-400" aria-label="Remove paragraph">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <p className="text-[11px] text-muted">Markdown supported: use <code>- item</code> for bullets, <code>1. item</code> for numbered lists, and <code>**bold**</code> for emphasis.</p>
      <button type="button" onClick={add} className="btn btn-ghost !py-1.5 text-xs">
        <Plus size={14} /> Add Markdown block
      </button>
    </div>
  );
}

/** Editable list of { label, value, suffix } statistics. */
function StatsList({ rows = [], onChange }) {
  const update = (i, patch) => onChange(rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const add = () => onChange([...rows, { label: '', value: 0, suffix: '' }]);
  const remove = (i) => onChange(rows.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <input className="field flex-1" placeholder="Label" value={r.label || ''} onChange={(e) => update(i, { label: e.target.value })} />
          <input className="field w-24" type="number" placeholder="Value" value={r.value ?? ''} onChange={(e) => update(i, { value: Number(e.target.value) })} />
          <input className="field w-20" placeholder="Suffix" value={r.suffix || ''} onChange={(e) => update(i, { suffix: e.target.value })} />
          <button type="button" onClick={() => remove(i)} className="rounded-lg p-2 text-muted hover:text-rose-400" aria-label="Remove stat">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn btn-ghost !py-1.5 text-xs">
        <Plus size={14} /> Add statistic
      </button>
    </div>
  );
}

/** Editable reorderable list of image URLs. */
function ImageList({ items = [], onChange }) {
  const [draft, setDraft] = useState('');
  const add = (url) => {
    const u = (url || '').trim();
    if (!u) return;
    onChange([...items, u]);
    setDraft('');
  };
  const remove = (i) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i, dir) => {
    const next = [...items];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-3">
      {items.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {items.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-xl border border-line bg-bg-2/60">
              <img src={src} alt="" className="h-28 w-full object-cover" />
              <div className="absolute right-1 top-1 flex gap-1 opacity-0 transition group-hover:opacity-100">
                <button type="button" onClick={() => move(i, -1)} className="rounded bg-black/60 p-1 text-white hover:bg-black/80" aria-label="Move earlier">↑</button>
                <button type="button" onClick={() => move(i, 1)} className="rounded bg-black/60 p-1 text-white hover:bg-black/80" aria-label="Move later">↓</button>
                <button type="button" onClick={() => remove(i)} className="rounded bg-rose-600/80 p-1 text-white hover:bg-rose-600" aria-label="Remove image"><Trash2 size={12} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center gap-2">
        <input className="field flex-1" placeholder="Paste image URL and press Enter" value={draft} onChange={(e) => setDraft(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); add(draft); } }} />
        <button type="button" onClick={() => add(draft)} className="btn btn-ghost !py-2 text-xs"><Plus size={14} /> Add</button>
      </div>
    </div>
  );
}

const inputCls = 'field w-full';

export default function AboutEditor() {
  const { data, loading } = useFetch(publicApi.about, []);
  const [draft, setDraft] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setDraft({
        heading: data.heading || '',
        subtitle: data.subtitle || '',
        biography: Array.isArray(data.biography) ? data.biography : [],
        interests: Array.isArray(data.interests) ? data.interests : [],
        statistics: Array.isArray(data.statistics) ? data.statistics : [],
        images: Array.isArray(data.images) ? data.images : [],
      });
    }
  }, [data]);

  if (loading || !draft) return <FullScreenLoader label="Loading About…" />;

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      await adminApi.updateAbout(draft);
      toast.success('Saved');
    } catch (e) {
      toast.error(e.friendlyMessage || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <AdminPageHeader title="About" subtitle="The story, interests, numbers and imagery of the About section." />
      <div className="max-w-4xl space-y-6">
        <div className="card glass rounded-card p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Heading</label>
              <input className={inputCls} value={draft.heading} onChange={(e) => set('heading', e.target.value)} />
            </div>
            <div>
              <label className="label">Subtitle</label>
              <input className={inputCls} value={draft.subtitle} onChange={(e) => set('subtitle', e.target.value)} />
            </div>
          </div>
        </div>

        <div className="card glass rounded-card p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Biography paragraphs</h3>
          <StringList items={draft.biography} onChange={(v) => set('biography', v)} />
        </div>

        <div className="card glass rounded-card p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Interests</h3>
          <TagsInput value={draft.interests} onChange={(v) => set('interests', v)} placeholder="Add an interest and press Enter" />
        </div>

        <div className="card glass rounded-card p-6">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">Statistics</h3>
          <StatsList rows={draft.statistics} onChange={(v) => set('statistics', v)} />
        </div>

        <div className="card glass rounded-card p-6">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
            <GripVertical size={14} /> Images
          </h3>
          <ImageList items={draft.images} onChange={(v) => set('images', v)} />
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
