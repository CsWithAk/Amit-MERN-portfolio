import ImageUploadField from './ImageUploadField';
import TagsInput from './TagsInput';
import PairListInput from './PairListInput';

/** Renders a single admin form control based on a field descriptor. */
export default function Field({ field, value, onChange, error }) {
  const { name, label, type = 'text', placeholder, options = [], required, hint, min, max, rows = 4 } = field;
  const id = `fld-${name}`;

  const wrap = (children) => (
    <div className={field.colSpan === 'full' ? 'sm:col-span-2' : ''}>
      {label && (
        <label className="label" htmlFor={id}>
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
      )}
      {children}
      {error && <p className="mt-1 text-xs text-rose-400">{error}</p>}
      {!error && hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  );

  const set = (v) => onChange(name, v);

  switch (type) {
    case 'textarea':
      return wrap(
        <textarea id={id} rows={rows} className="field resize-y" placeholder={placeholder} value={value || ''} onChange={(e) => set(e.target.value)} />
      );
    case 'number':
      return wrap(
        <input id={id} type="number" className="field" placeholder={placeholder} min={min} max={max} value={value ?? ''} onChange={(e) => set(e.target.value === '' ? '' : Number(e.target.value))} />
      );
    case 'select':
      return wrap(
        <select id={id} className="field" value={value || ''} onChange={(e) => set(e.target.value)}>
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o.value ?? o} value={o.value ?? o}>
              {o.label ?? o}
            </option>
          ))}
        </select>
      );
    case 'boolean':
      return wrap(
        <label htmlFor={id} className="flex cursor-pointer items-center gap-2 text-sm">
          <input id={id} type="checkbox" checked={!!value} onChange={(e) => set(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
          <span className="text-muted">{value ? 'Yes' : 'No'}</span>
        </label>
      );
    case 'tags':
      return wrap(<TagsInput value={value || []} onChange={(v) => set(v)} placeholder={placeholder} />);
    case 'pairs':
      return wrap(<PairListInput value={value || []} onChange={(v) => set(v)} keyLabel={field.keyLabel} valLabel={field.valLabel} />);
    case 'image':
      return wrap(<ImageUploadField label={null} value={value || ''} onChange={(v) => set(v)} hint={hint} />);
    case 'date':
      return wrap(<input id={id} type="date" className="field" value={value ? String(value).slice(0, 10) : ''} onChange={(e) => set(e.target.value)} />);
    default:
      return wrap(<input id={id} type="text" className="field" placeholder={placeholder} value={value || ''} onChange={(e) => set(e.target.value)} />);
  }
}
