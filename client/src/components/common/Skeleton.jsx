export default function Skeleton({ className = '', ...props }) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-bg-2/60 ${className}`} {...props}>
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent, color-mix(in srgb, var(--primary) 12%, transparent), transparent)',
        }}
      />
    </div>
  );
}
