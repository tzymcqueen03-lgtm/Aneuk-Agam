"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/config/site";
import ServiceCard from "./ServiceCard";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { ArrowUpRightIcon, BoltIcon, CheckIcon } from "@/lib/icons";
import { useCart } from "./CartProvider";
import { formatRupiah } from "@/lib/format";

const filters = [
  { id: "all", label: "Semua" },
  { id: "dokumen", label: "Dokumen", ids: ["rapikan-makalah", "buat-ppt", "buat-makalah", "cv"] },
  { id: "desain", label: "Desain", ids: ["infografis", "desain-cover-makalah", "desain-poster", "desain-banner", "desain-poster-acara", "desain-brosur", "desain-sertifikat", "kartu-nama"] },
  { id: "murah", label: "Hemat — 10rb ke bawah", ids: ["rapikan-makalah", "desain-cover-makalah", "infografis", "desain-sertifikat", "kartu-nama"] },
];

export default function ServiceShowcase() {
  const [active, setActive] = useState("all");
  const { count, total, fast, toggleFast } = useCart();

  const visible = useMemo(() => {
    const f = filters.find((x) => x.id === active);
    if (!f || f.id === "all") return services;
    return services.filter((s) => f.ids.includes(s.id));
  }, [active]);

  return (
    <section id="layanan" className="relative border-b-3 border-ink bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Etalase Layanan"
            title="Pilih layanan,"
            accent="campur jadi satu"
            description="Centang sebanyak yang kamu butuh. Total harga langsung dihitung dan muncul di bar bawah layar."
          />
          <Reveal delay={0.15} className="shrink-0">
            <div className="border-3 border-ink bg-white p-4 shadow-brut">
              <p className="label-mono text-ink/60">Keranjang saat ini</p>
              <p className="font-display mt-1 text-3xl">
                {count} <span className="text-lg">layanan</span>
              </p>
              <p className="mt-1 text-sm font-black">{formatRupiah(total)}</p>
            </div>
          </Reveal>
        </div>

        {/* Filter */}
        <Reveal delay={0.1}>
          <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`shrink-0 border-3 border-ink px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] transition-all ${
                  active === f.id
                    ? "bg-ink text-cream shadow-brut-sm"
                    : "bg-white text-ink hover:bg-brand-yellow"
                }`}
                style={active === f.id ? { boxShadow: "3px 3px 0 0 #FF5A00" } : { boxShadow: "3px 3px 0 0 #111111" }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Toggle Jasa Cepat */}
        <Reveal delay={0.12}>
          <button
            type="button"
            onClick={toggleFast}
            aria-pressed={fast}
            className={`mt-6 flex w-full items-center gap-4 border-3 border-ink p-4 text-left transition-all duration-150 ${
              fast ? "bg-brand-orange shadow-brut" : "bg-white shadow-brut-sm hover:bg-brand-yellow/40"
            }`}
            style={{ boxShadow: fast ? "6px 6px 0 0 #111111" : "4px 4px 0 0 #111111" }}
          >
            <span className={`brut-icon-box h-12 w-12 ${fast ? "bg-white" : "bg-brand-yellow"} transition-transform ${fast ? "rotate-6" : ""}`}>
              <BoltIcon size={22} strokeWidth={2.8} />
            </span>

            <span className="flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-display text-lg sm:text-xl">Jasa Cepat (Kilat)</span>
                <span className="brut-badge !bg-ink !text-cream">+ Rp3.000</span>
              </span>
              <span className="mt-1 block text-[11px] font-bold text-ink/70">
                Pesanan kamu ditaruh paling depan. Prioritas antrean + respons lebih cepat.
              </span>
            </span>

            {/* Switch */}
            <span className={`relative h-8 w-16 shrink-0 border-3 border-ink transition-colors ${fast ? "bg-ink" : "bg-cream"}`}>
              <motion.span
                layout
                transition={{ type: "spring", stiffness: 500, damping: 32 }}
                className={`absolute top-[3px] h-[20px] w-[22px] border-2 border-ink ${fast ? "right-[3px] bg-brand-yellow" : "left-[3px] bg-white"}`}
              />
            </span>

            <AnimatePresence>
              {fast ? (
                <motion.span
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0 }}
                  className="hidden shrink-0 items-center gap-1 border-3 border-ink bg-white px-2 py-1 sm:flex"
                >
                  <CheckIcon size={12} strokeWidth={3.4} />
                  <span className="label-mono">Aktif</span>
                </motion.span>
              ) : null}
            </AnimatePresence>
          </button>
        </Reveal>

        {/* Grid kartu */}
        <motion.div layout className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Ajakan ke form */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-3 border-ink bg-ink p-5 sm:flex-row sm:p-6">
            <div>
              <p className="font-display text-2xl text-cream sm:text-3xl">
                Sudah lengkap? <span className="text-brand-yellow">Isi form pesanan.</span>
              </p>
              <p className="mt-1 text-xs font-bold text-cream/70">
                {count > 0
                  ? `${count} layanan dipilih • total ${formatRupiah(total)}`
                  : "Belum ada layanan dipilih."}
              </p>
            </div>
            <a href="#pesan" className="brut-btn brut-btn-yellow brut-btn-lg w-full sm:w-auto">
              Lanjut Isi Form
              <ArrowUpRightIcon size={16} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
