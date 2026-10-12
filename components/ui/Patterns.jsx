// Elemen dekoratif pola: titik, strip, kotak — inti gaya neo-brutalism.

export function DotCluster({ className = "", cols = 5, rows = 4, color = "#111111" }) {
  return (
    <div
      className={`pointer-events-none grid gap-[6px] ${className}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 6px)` }}
      aria-hidden="true"
    >
      {Array.from({ length: cols * rows }).map((_, i) => (
        <span key={i} className="block h-[6px] w-[6px]" style={{ background: color }} />
      ))}
    </div>
  );
}

export function StripeBar({ className = "", variant = "dark" }) {
  const cls =
    variant === "yellow" ? "pattern-stripes-yellow" : variant === "dense" ? "pattern-stripes-dense" : "pattern-stripes";
  return <div className={`h-6 w-full border-y-3 border-ink ${cls} ${className}`} aria-hidden="true" />;
}

export function SquareAccent({ className = "", color = "#FF5A00", size = 22 }) {
  return (
    <span
      className={`pointer-events-none inline-block border-3 border-ink ${className}`}
      style={{ width: size, height: size, background: color }}
      aria-hidden="true"
    />
  );
}

export function CrossMark({ className = "" }) {
  return (
    <span className={`pointer-events-none relative inline-block h-6 w-6 ${className}`} aria-hidden="true">
      <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 bg-ink" />
      <span className="absolute top-1/2 left-0 h-[3px] w-full -translate-y-1/2 bg-ink" />
    </span>
  );
}
