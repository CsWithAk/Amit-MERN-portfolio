import { useRef, useState } from 'react';
import { Upload, Loader2, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import adminApi from '../../services/adminApi';

/** Image / asset picker. Uploads to the API (Cloudinary or base64 fallback)
 *  and also allows pasting a URL directly. */
export default function ImageUploadField({ label, value = '', onChange, hint }) {
  const inputRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    try {
      const res = await adminApi.upload(file);
      onChange?.(res.url);
      toast.success('Uploaded');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Upload failed');
    } finally {
      setBusy(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      <label className="label">{label}</label>
      <div className="flex items-start gap-3">
        <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-bg-2/60">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <span className="text-[10px] text-muted">No image</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            className="field"
            placeholder="https://… or upload"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
          />
          <div className="flex items-center gap-2">
            <input ref={inputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={onFile} />
            <button
              type="button"
              className="btn btn-ghost !py-1.5 text-xs"
              onClick={() => inputRef.current?.click()}
              disabled={busy}
            >
              {busy ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />} Upload
            </button>
            {hint && <span className="text-[11px] text-muted">{hint}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
