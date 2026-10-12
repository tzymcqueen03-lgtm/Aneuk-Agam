"use client";

import Reveal from "./Reveal";

export default function SectionHeading({ eyebrow, title, accent, description, align = "left", dark = false }) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-3xl flex-col ${alignCls}`}>
      {eyebrow ? (
        <Reveal>
          <span className={`brut-badge ${dark ? "bg-brand-orange text-ink" : ""}`}>{eyebrow}</span>
        </Reveal>
      ) : null}

      <Reveal delay={0.06}>
        <h2 className="font-display mt-4 text-4xl leading-[0.9] sm:text-5xl lg:text-6xl">
          {title} {accent ? <span className="hl-yellow inline-block">{accent}</span> : null}
        </h2>
      </Reveal>

      {description ? (
        <Reveal delay={0.12}>
          <p className={`mt-4 max-w-2xl text-sm font-semibold leading-relaxed sm:text-base ${dark ? "text-cream/80" : "text-ink/75"}`}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
