import { motion, AnimatePresence } from 'framer-motion';

export default function ConfirmDialog({
  open,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  danger = true,
  onConfirm,
  onCancel,
  busy = false,
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={busy ? undefined : onCancel} />
          <motion.div
            role="dialog"
            aria-modal="true"
            className="card relative w-full max-w-md p-6"
            initial={{ scale: 0.94, y: 12, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 12, opacity: 0 }}
          >
            <h3 className="text-lg font-bold">{title}</h3>
            {message && <p className="mt-2 text-sm text-muted">{message}</p>}
            <div className="mt-6 flex justify-end gap-3">
              <button className="btn btn-ghost" onClick={onCancel} disabled={busy}>
                {cancelLabel}
              </button>
              <button
                className={`btn ${danger ? 'bg-rose-500 text-white hover:bg-rose-600' : 'btn-primary'}`}
                onClick={onConfirm}
                disabled={busy}
              >
                {busy ? 'Working…' : confirmLabel}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
