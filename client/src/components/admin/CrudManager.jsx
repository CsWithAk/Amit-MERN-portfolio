import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pencil, Trash2, Search, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import AdminPageHeader from './AdminPageHeader';
import Field from '../forms/Field';
import Skeleton from '../common/Skeleton';
import Badge from '../common/Badge';
import ConfirmDialog from '../common/ConfirmDialog';

const LIMIT = 10;

export default function CrudManager({
  title,
  subtitle,
  resource,
  fields,
  columns,
  defaults = {},
  entityLabel = 'item',
  searchPlaceholder = 'Search…',
  filter,
  addLabel,
}) {
  const [rows, setRows] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [filterVal, setFilterVal] = useState('');
  const [page, setPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaults);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // debounce search
  useEffect(() => {
    const id = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(id);
  }, [search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: LIMIT };
      if (debounced) params.search = debounced;
      if (filter && filterVal) params[filter.key] = filterVal;
      const data = await resource.list(params);
      setRows(data.items || []);
      setMeta({ total: data.total || 0, page: data.page || 1 });
    } catch (e) {
      toast.error(e.friendlyMessage || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [resource, page, debounced, filter, filterVal]);

  useEffect(() => {
    load();
  }, [load]);

  const totalPages = Math.max(1, Math.ceil((meta.total || 0) / LIMIT));

  const openCreate = () => {
    setEditing(null);
    setForm({ ...defaults });
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (row) => {
    setEditing(row);
    const init = { ...defaults };
    fields.forEach((f) => {
      const value = getPath(row, f.name);
      if (value !== undefined && value !== null) setPath(init, f.name, value);
    });
    setForm(init);
    setErrors({});
    setModalOpen(true);
  };

  const setField = (name, val) => {
    setForm((current) => {
      const next = { ...current };
      setPath(next, name, val);
      return next;
    });
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const err = {};
    fields.forEach((f) => {
      const v = getPath(form, f.name);
      if (f.required && (v === undefined || v === '' || v === null)) err[f.name] = `${f.label || f.name} is required`;
      if (f.type === 'number' && v !== '' && v != null && (isNaN(v))) err[f.name] = 'Enter a number';
    });
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const buildPayload = () => {
    const payload = {};
    fields.forEach((f) => {
      let v = getPath(form, f.name);
      if (f.type === 'number') v = v === '' || v === null ? undefined : Number(v);
      if (v !== undefined) setPath(payload, f.name, v);
    });
    return payload;
  };

  const save = async () => {
    if (!validate()) return;
    setSaving(true);
    try {
      const payload = buildPayload();
      if (editing) {
        await resource.update(editing._id, payload);
        toast.success('Updated');
      } else {
        await resource.create(payload);
        toast.success('Created');
      }
      setModalOpen(false);
      load();
    } catch (e) {
      toast.error(e.friendlyMessage || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await resource.remove(toDelete._id);
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
      <AdminPageHeader title={title} subtitle={subtitle} onAdd={openCreate} addLabel={addLabel || `Add ${entityLabel}`} />

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            className="field pl-9"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-text">
              <X size={15} />
            </button>
          )}
        </div>
        {filter && (
          <select className="field sm:w-52" value={filterVal} onChange={(e) => { setFilterVal(e.target.value); setPage(1); }}>
            <option value="">All {filter.label}</option>
            {filter.options.map((o) => (
              <option key={o.value ?? o} value={o.value ?? o}>
                {o.label ?? o}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-muted">
                {columns.map((c) => (
                  <th key={c.key} className="whitespace-nowrap px-4 py-3 font-semibold">{c.label}</th>
                ))}
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="border-b border-line">
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3"><Skeleton className="h-5 w-full" /></td>
                    ))}
                    <td className="px-4 py-3" />
                  </tr>
                ))
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length + 1} className="px-4 py-10 text-center text-muted">
                    No {entityLabel}s found.
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row._id} className="border-b border-line transition hover:bg-bg-2/40">
                    {columns.map((c) => (
                      <td key={c.key} className="px-4 py-3 align-middle">
                        {c.render ? c.render(row) : String(row[c.key] ?? '—')}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="rounded-lg p-2 text-muted hover:bg-primary/15 hover:text-primary" onClick={() => openEdit(row)} aria-label="Edit">
                          <Pencil size={15} />
                        </button>
                        <button className="rounded-lg p-2 text-muted hover:bg-rose-500/15 hover:text-rose-400" onClick={() => setToDelete(row)} aria-label="Delete">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-line px-4 py-3 text-sm text-muted">
          <span>{meta.total} total</span>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost !px-3 !py-1.5 text-xs" disabled={page <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              Prev
            </button>
            <span className="text-xs">Page {page} / {totalPages}</span>
            <button className="btn btn-ghost !px-3 !py-1.5 text-xs" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Form modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => !saving && setModalOpen(false)} />
          <div className="card relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-lg font-bold">{editing ? `Edit ${entityLabel}` : `New ${entityLabel}`}</h3>
              <button className="text-muted hover:text-text" onClick={() => setModalOpen(false)} disabled={saving}>
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {fields.map((f) => (
                <Field key={f.name} field={f} value={getPath(form, f.name)} onChange={setField} error={errors[f.name]} />
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-ghost" onClick={() => setModalOpen(false)} disabled={saving}>Cancel</button>
              <button className="btn btn-primary" onClick={save} disabled={saving}>
                {saving ? <Loader2 size={16} className="animate-spin" /> : null}
                {saving ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Delete this item?"
        message="This action cannot be undone."
        confirmLabel="Delete"
        busy={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

function getPath(object, path) {
  return path.split('.').reduce((value, key) => (value == null ? undefined : value[key]), object);
}

function setPath(object, path, value) {
  const parts = path.split('.');
  let target = object;
  parts.forEach((part, index) => {
    if (index === parts.length - 1) {
      target[part] = value;
      return;
    }
    target[part] = { ...(target[part] || {}) };
    target = target[part];
  });
}
