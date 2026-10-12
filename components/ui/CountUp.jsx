"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useReducedMotion } from "framer-motion";
import { formatNumber } from "@/lib/format";

/**
 * Angka yang beranimasi (count-up / count-down) saat nilainya berubah.
 */
export default function CountUp({
  value = 0,
  duration = 0.7,
  prefix = "",
  suffix = "",
  className = "",
  separator = true,
}) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const target = Number(value) || 0;

    if (reduce) {
      setDisplay(target);
      prev.current = target;
      return;
    }

    const controls = animate(prev.current, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(v),
      onComplete: () => {
        prev.current = target;
      },
    });
    return () => controls.stop();
  }, [value, duration, reduce]);

  const rounded = Math.round(display);
  const text = separator ? formatNumber(rounded) : String(rounded);

  return (
    <span className={`normal-case ${className}`}>
      {prefix}
      {text}
      {suffix}
    </span>
  );
}
