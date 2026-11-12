export default function FullScreenLoader({ label = 'Loading…' }) {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <span className="absolute inset-0 rounded-full border-2 border-line" />
          <span
            className="absolute inset-0 animate-spin rounded-full border-2 border-transparent"
            style={{ borderTopColor: 'var(--primary)', borderRightColor: 'var(--secondary)' }}
          />
        </div>
        <p className="text-sm text-muted">{label}</p>
      </div>
    </div>
  );
}
