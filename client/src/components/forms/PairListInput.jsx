import { Plus, Trash2 } from 'lucide-react';

/** Editable list of { platform, url } pairs (used for team social links). */
export default function PairListInput({ value = [], onChange, keyLabel = 'Platform', valLabel = 'URL' }) {
  const rows = Array.isArray(value) ? value : [];

  const update = (idx, patch) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...patch } : r));
    onChange?.(next);
  };
  const add = () => onChange?.([...rows, { platform: '', url: '' }]);
  const remove = (idx) => onChange?.(rows.filter((_, i) => i !== idx));

  return (
    <div className="space-y-2">
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="field"
            placeholder={keyLabel}
            value={r.platform || ''}
            onChange={(e) => update(i, { platform: e.target.value })}
          />
          <input
            className="field flex-1"
            placeholder={valLabel}
            value={r.url || ''}
            onChange={(e) => update(i, { url: e.target.value })}
          />
          <button type="button" onClick={() => remove(i)} className="rounded-lg p-2 text-muted hover:text-rose-400" aria-label="Remove row">
            <Trash2 size={16} />
          </button>
        </div>
      ))}
      <button type="button" onClick={add} className="btn btn-ghost !py-1.5 text-xs">
        <Plus size={14} /> Add {keyLabel.toLowerCase()}
      </button>
    </div>
  );
}
