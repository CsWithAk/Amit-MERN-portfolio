import { useState } from 'react';
import { X } from 'lucide-react';

/** Comma/Enter-delimited list editor that stores a string array. */
export default function TagsInput({ value = [], onChange, placeholder = 'Type and press Enter' }) {
  const [draft, setDraft] = useState('');
  const items = Array.isArray(value) ? value : [];

  const add = (raw) => {
    const parts = raw.split(',').map((s) => s.trim()).filter(Boolean);
    if (!parts.length) return;
    const next = [...items];
    parts.forEach((p) => !next.includes(p) && next.push(p));
    onChange?.(next);
    setDraft('');
  };

  const remove = (idx) => onChange?.(items.filter((_, i) => i !== idx));

  return (
    <div>
      <div className="flex flex-wrap gap-1.5 rounded-xl border border-line bg-bg-2/70 p-2">
        {items.map((it, i) => (
          <span key={it + i} className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs text-primary">
            {it}
            <button type="button" onClick={() => remove(i)} className="hover:text-rose-400" aria-label={`Remove ${it}`}>
              <X size={12} />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault();
              add(draft);
            } else if (e.key === 'Backspace' && !draft && items.length) {
              remove(items.length - 1);
            }
          }}
          onBlur={() => add(draft)}
          placeholder={items.length ? '' : placeholder}
          className="min-w-[120px] flex-1 bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted/60"
        />
      </div>
    </div>
  );
}
