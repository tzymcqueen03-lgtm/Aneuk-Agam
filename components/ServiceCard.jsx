"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatRupiah } from "@/lib/format";
import { CheckIcon, PlusIcon, ServiceIcon, BoltIcon } from "@/lib/icons";
import { useCart } from "./CartProvider";

const accentBg = {
  yellow: "bg-brand-yellow",
  orange: "bg-brand-orange",
  cream: "bg-cream",
};

export default function ServiceCard({ service, index = 0 }) {
  const reduce = useReducedMotion();
  const { isSelected, toggleItem } = useCart();
  const selected = isSelected(service.id);
  const bg = accentBg[service.accent] || "bg-cream";

  return (
    <motion.article
      layout
      initial={reduce ? {} : { opacity: 0, y: 34 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? {} : { y: -8, rotate: index % 2 === 0 ? -1.1 : 1.1 }}
      className={`group relative flex flex-col border-3 border-ink bg-white shadow-brut transition-shadow duration-200 hover:shadow-brut-lg ${
        selected ? "ring-0" : ""
      }`}
    >
      {/* Pita "DIPILIH" */}
      <AnimatePresence>
        {selected ? (
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="absolute -top-[3px] left-1/2 z-20 -translate-x-1/2 border-3 border-ink bg-ink px-3 py-1"
          >
            <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-brand-yellow">
              <CheckIcon size={12} strokeWidth={3.4} />
              Dipilih
            </span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Bagian atas berwarna */}
      <div className={`relative flex items-start justify-between border-b-3 border-ink p-4 ${bg}`}>
        <div className="brut-icon-box relative h-14 w-14 bg-white transition-transform duration-300 group-hover:-rotate-6">
          {service.image ? (
            <Image src={service.image} alt="" width={36} height={36} className="h-9 w-9 object-contain" />
          ) : (
            <ServiceIcon name={service.icon} size={28} />
          )}
        </div>

        {service.badge ? (
          <span className="brut-badge !bg-ink !text-cream">{service.badge}</span>
        ) : (
          <span className="label-mono text-ink/40">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>

      {/* Isi */}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display text-xl leading-tight sm:text-2xl">{service.name}</h3>

        <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/70">{service.description}</p>

        <ul className="mt-3 space-y-1.5">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-[11px] font-bold">
              <span className="mt-[3px] block h-3 w-3 shrink-0 border-2 border-ink bg-brand-yellow" />
              {f}
            </li>
          ))}
        </ul>

        {/* Harga */}
        <div className="mt-4 flex items-end justify-between border-t-3 border-dashed border-ink pt-3">
          <div>
            <p className="label-mono text-ink/50">Harga</p>
            <p className="font-display text-2xl leading-none normal-case sm:text-3xl">{formatRupiah(service.price)}</p>
          </div>
          <span className="brut-chip">{service.unit}</span>
        </div>

        {/* Tombol pilih */}
        <button
          type="button"
          onClick={() => toggleItem(service)}
          aria-pressed={selected}
          className={`brut-btn mt-4 w-full ${selected ? "brut-btn-ink" : "brut-btn-orange"}`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {selected ? (
              <motion.span
                key="sel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <CheckIcon size={14} strokeWidth={3.4} />
                Terpilih — Klik untuk Batal
              </motion.span>
            ) : (
              <motion.span
                key="unsel"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-center gap-2"
              >
                <PlusIcon size={14} strokeWidth={3.4} />
                Pilih Layanan
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Aksen kilat di sudut */}
      <span
        className="pointer-events-none absolute bottom-3 right-3 hidden h-6 w-6 items-center justify-center border-2 border-ink bg-brand-yellow text-ink group-hover:flex"
        aria-hidden="true"
      >
        <BoltIcon size={12} strokeWidth={3} />
      </span>
    </motion.article>
  );
}
