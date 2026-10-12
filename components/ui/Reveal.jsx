"use client";

import { motion, useReducedMotion } from "framer-motion";

// Animasi masuk saat scroll. `delay` dalam detik.
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  duration = 0.55,
  once = true,
  amount = 0.25,
  className = "",
  as = "div",
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}
