"use client";

export default function Marquee({
  items = [],
  className = "",
  itemClassName = "",
  separator = "★",
  speed = 26,
  reverse = false,
}) {
  const row = [...items, ...items];

  return (
    <div className={`group relative flex overflow-hidden border-y-3 border-ink bg-brand-yellow py-3 ${className}`}>
      <div
        className="flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {row.map((item, i) => (
          <span key={i} className={`flex items-center whitespace-nowrap ${itemClassName}`}>
            <span className="px-5 text-sm font-black uppercase tracking-[0.18em]">{item}</span>
            <span className="text-lg leading-none">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
