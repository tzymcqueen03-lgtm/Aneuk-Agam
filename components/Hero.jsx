"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site, services } from "@/config/site";
import { useCart } from "./CartProvider";
import { ArrowIcon, ArrowUpRightIcon, CheckIcon, ServiceIcon, BoltIcon } from "@/lib/icons";
import { DotCluster, SquareAccent } from "./ui/Patterns";
import CountUp from "./ui/CountUp";

const marqueeWords = [
  "RAPIKAN MAKALAH",
  "BUAT PPT",
  "INFOGRAFIS",
  "CV",
  "COVER MAKALAH",
  "POSTER",
  "BANNER",
  "BROSUR",
  "SERTIFIKAT",
  "KARTU NAMA",
];

export default function Hero() {
  const reduce = useReducedMotion();
  const { count, total } = useCart();
  const startingPrice = Math.min(...services.map((s) => s.price));

  const fade = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section id="hero" className="relative overflow-hidden border-b-3 border-ink bg-cream pt-28 sm:pt-32">
      {/* Dekorasi latar */}
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-10 top-24 hidden h-64 w-64 rounded-full border-3 border-ink bg-brand-yellow/0 lg:block" aria-hidden="true" />
      <DotCluster className="absolute left-4 top-32 hidden opacity-70 sm:grid" cols={5} rows={5} />
      <DotCluster className="absolute bottom-32 right-6 hidden opacity-70 lg:grid" cols={4} rows={4} />

      <div className="relative mx-auto max-w-6xl px-4 pb-0 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          {/* ---------- KIRI: teks ---------- */}
          <div className="pt-6 sm:pt-10">
            <motion.div {...fade(0)} className="flex flex-wrap items-center gap-3">
              <span className="brut-badge">
                <BoltIcon size={12} strokeWidth={3} />
                {site.tagline}
              </span>
              <span className="brut-chip">Mulai dari <span className="normal-case">Rp{startingPrice.toLocaleString("id-ID")}</span></span>
            </motion.div>

            <motion.h1
              {...fade(0.08)}
              className="font-display mt-5 text-[17vw] leading-[0.85] tracking-tight sm:text-[9rem] lg:text-[8.5rem]"
            >
              Aneuk
              <br />
              <span className="relative inline-block">
                Agam
                <span className="absolute -bottom-1 left-0 h-[10px] w-full bg-brand-orange sm:h-[14px]" aria-hidden="true" />
              </span>
            </motion.h1>

            <motion.p {...fade(0.16)} className="mt-6 max-w-xl text-base font-bold leading-relaxed sm:text-lg">
              Beresin <span className="hl-yellow">makalah</span>, <span className="hl-orange">PPT</span>, poster,
              CV, dan desain lainnya tanpa drama. Pilih layanan, isi form, bayar QRIS, kirim ke WhatsApp —
              selesai.
            </motion.p>

            <motion.div {...fade(0.24)} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#pesan" className="brut-btn brut-btn-ink brut-btn-lg">
                Pesan Sekarang
                <ArrowUpRightIcon size={16} />
              </a>
              <a href="#layanan" className="brut-btn brut-btn-cream brut-btn-lg">
                Lihat Layanan
                <ArrowIcon size={16} />
              </a>
            </motion.div>

            {/* Statistik kecil */}
            <motion.dl {...fade(0.32)} className="mt-10 grid max-w-lg grid-cols-3 divide-x-3 divide-ink border-3 border-ink bg-white shadow-brut">
              {[
                { k: "Layanan", v: services.length, suffix: "+" },
                { k: "Mulai", v: startingPrice, prefix: "Rp" },
                { k: "Dipilih", v: count, suffix: count > 0 ? " item" : "" },
              ].map((s) => (
                <div key={s.k} className="px-3 py-4 text-center">
                  <dt className="label-mono text-ink/60">{s.k}</dt>
                  <dd className="font-display mt-1 text-2xl sm:text-3xl">
                    <CountUp value={s.v} prefix={s.prefix || ""} suffix={s.suffix || ""} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- KANAN: kartu brutalism ---------- */}
          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.94, rotate: -3 }}
            animate={reduce ? {} : { opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-sm lg:max-w-none"
          >
            <div className="relative border-3 border-ink bg-white shadow-brut-lg" style={{ boxShadow: "10px 10px 0 0 #111111" }}>
              {/* Header kartu */}
              <div className="flex items-center justify-between border-b-3 border-ink bg-ink px-4 py-3">
                <span className="label-mono text-cream">Tiket Pesanan</span>
                <span className="brut-badge !shadow-none">NO. 001</span>
              </div>

              {/* Isi kartu */}
              <div className="space-y-3 p-4">
                {services.slice(0, 4).map((s, i) => (
                  <motion.div
                    key={s.id}
                    initial={reduce ? {} : { opacity: 0, x: 20 }}
                    animate={reduce ? {} : { opacity: 1, x: 0 }}
                    transition={{ delay: 0.45 + i * 0.1 }}
                    className="flex items-center gap-3 border-3 border-ink bg-cream px-3 py-2.5"
                  >
                    <span className="brut-icon-box h-9 w-9 bg-brand-yellow">
                      <ServiceIcon name={s.icon} size={18} />
                    </span>
                    <span className="flex-1 truncate text-xs font-black uppercase tracking-wider">{s.name}</span>
                    <span className="text-xs font-black">Rp{s.price.toLocaleString("id-ID")}</span>
                  </motion.div>
                ))}

                <div className="border-t-3 border-dashed border-ink pt-3">
                  <div className="flex items-center justify-between">
                    <span className="label-mono">Total Dipilih</span>
                    <span className="font-display text-2xl">
                      <CountUp value={total} prefix="Rp" />
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 border-3 border-ink bg-brand-yellow px-3 py-2">
                  <CheckIcon size={16} strokeWidth={3.2} />
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    Garansi revisi &amp; respons cepat
                  </span>
                </div>
              </div>

              {/* Footer kartu */}
              <div className="flex items-center justify-between border-t-3 border-ink bg-brand-orange px-4 py-3">
                <span className="label-mono">Wa: {site.waNumberPretty}</span>
                <SquareAccent color="#111111" size={16} />
              </div>
            </div>

            {/* Badge melayang */}
            <motion.div
              animate={reduce ? {} : { y: [0, -8, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-4 top-1/3 hidden border-3 border-ink bg-brand-orange px-3 py-2 shadow-brut sm:block"
            >
              <p className="font-display text-lg leading-none">KILAT</p>
              <p className="label-mono mt-0.5">+ Rp3.000</p>
            </motion.div>
          </motion.div>
        </div>

        {/* ---------- Strip berjalan ---------- */}
        <div className="relative mt-14 -mx-4 border-t-3 border-ink sm:-mx-6">
          <div className="flex overflow-hidden bg-brand-yellow py-3">
            <div className="flex w-max shrink-0 animate-marquee items-center">
              {[...marqueeWords, ...marqueeWords].map((word, i) => (
                <span key={i} className="flex items-center whitespace-nowrap">
                  <span className="px-5 font-display text-lg tracking-tight sm:text-xl">{word}</span>
                  <span className="text-xl">★</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
