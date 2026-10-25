/** Shared Desi Bold decorations for inner pages. */
export function Bunting({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 40" preserveAspectRatio="none" className={`pointer-events-none absolute left-0 top-0 h-7 w-full opacity-90 ${className}`} aria-hidden>
      {Array.from({ length: 20 }).map((_, k) => (
        <path key={k} d={`M${k * 30} 0 L${k * 30 + 15} 28 L${k * 30 + 30} 0 Z`} fill={["#FF6A13", "#FFC531", "#16A34A", "#ffffff", "#E8381E"][k % 5]} opacity="0.9" />
      ))}
    </svg>
  );
}

/** Orange + white brush strokes along the bottom of a dark hero. */
export function HeroBrush({ to = "#fff8ec" }: { to?: string }) {
  return (
    <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="pointer-events-none absolute bottom-0 left-0 h-14 w-full sm:h-20" aria-hidden>
      <path d="M0 52 C 220 26, 420 76, 660 50 S 1080 20, 1440 46 L1440 90 L0 90 Z" fill="#FF6A13" opacity="0.9" />
      <path d="M0 74 C 300 56, 600 92, 900 70 S 1260 56, 1440 70 L1440 90 L0 90 Z" fill={to} />
    </svg>
  );
}

export function TeluguTag({ te, en }: { te: string; en: string }) {
  return (
    <span className="rise inline-flex flex-wrap items-center gap-2 rounded-lg bg-white/10 px-3 py-1.5 text-[13px] ring-1 ring-white/20">
      <span lang="te" className="te font-bold text-sun">{te}</span>
      <span className="text-white/70">· {en}</span>
    </span>
  );
}
