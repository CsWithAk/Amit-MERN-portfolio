import { useEffect, useState } from 'react';
import { Loader2, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminPageHeader from './AdminPageHeader';
import Field from '../forms/Field';
import FullScreenLoader from '../common/FullScreenLoader';

/**
 * Reusable editor for singleton documents (Profile, Appearance, Animations, SEO, Settings).
 * Loads `value` (already-fetched object), lets the admin edit `fields`, and PUTs via onSave.
 */
export default function SettingsForm({
  title,
  subtitle,
  fields,
  value,
  loading,
  onSave,
  saveLabel = 'Save changes',
  onSaved,
  columns = 2,
}) {
  const [draft, setDraft] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (value) setDraft(value);
  }, [value]);

  const set = (name, v) =>
    setDraft((current) => {
      const next = { ...current };
      const parts = name.split('.');
      let target = next;

      parts.forEach((part, index) => {
        if (index === parts.length - 1) {
          target[part] = v;
          return;
        }
        target[part] = { ...(target[part] || {}) };
        target = target[part];
      });

      return next;
    });

  // Convert flat dotted keys (e.g. "appearance.primaryColor") into a nested payload.
  const toNested = (flat) => {
    const out = {};
    Object.entries(flat).forEach(([k, v]) => {
      if (!k.includes('.')) {
        out[k] = v;
        return;
      }
      const parts = k.split('.');
      let cur = out;
      parts.forEach((p, i) => {
        if (i === parts.length - 1) cur[p] = v;
        else cur = (cur[p] ||= {});
      });
    });
    return out;
  };

  const save = async () => {
    setSaving(true);
    try {
      await onSave(toNested(draft));
      toast.success('Saved');
      onSaved?.();
    } catch (e) {
      toast.error(e.friendlyMessage || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <FullScreenLoader label="Loading settings…" />;

  const gridCols = columns === 1 ? 'sm:grid-cols-1' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2';

  return (
    <div>
      <AdminPageHeader title={title} subtitle={subtitle} />
      <div className="card glass max-w-4xl rounded-card p-6">
        <div className={`grid grid-cols-1 gap-4 ${gridCols}`}>
          {fields.map((f) => {
            // Support nested keys like "appearance.primaryColor" via get/set helpers.
            const val = get(draft, f.name);
            return <Field key={f.name} field={f} value={val} onChange={set} />;
          })}
        </div>
        <div className="mt-6 flex justify-end">
          <button className="btn btn-primary" onClick={save} disabled={saving}>
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving…' : saveLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

// Nested path getter, e.g. get(obj, 'appearance.primaryColor')
function get(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
