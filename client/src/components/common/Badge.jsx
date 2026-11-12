export default function Badge({ children, color = 'primary', className = '' }) {
  const colors = {
    primary: 'text-primary border-primary/30 bg-primary/10',
    info: 'text-secondary border-secondary/30 bg-secondary/10',
    success: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/10',
    warn: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
    danger: 'text-rose-400 border-rose-400/30 bg-rose-400/10',
    muted: 'text-muted border-line bg-bg-2/60',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
        colors[color] || colors.muted
      } ${className}`}
    >
      {children}
    </span>
  );
}
