"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartProvider";
import CountUp from "./ui/CountUp";
import { ArrowUpRightIcon, BoltIcon, TrashIcon, CheckIcon, PlusIcon } from "@/lib/icons";

export default function CartBar() {
  const { items, count, total, fast, toggleFast, removeItem, clearCart, hydrated, subtotal, fastFee } = useCart();
  const [open, setOpen] = useState(false);

  // Jangan render sebelum localStorage dibaca (hindari kedipan)
  if (!hydrated) return null;

  const visible = count > 0;

  return (
    <>
      {/* ---------------- Bar bawah ---------------- */}
      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            exit={{ y: 120 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-5 sm:pb-4"
          >
            <div className="mx-auto flex max-w-4xl items-stretch border-3 border-ink bg-ink shadow-brut-lg" style={{ boxShadow: "0 -6px 0 0 #FF5A00, 6px 6px 0 0 #111111" }}>
              {/* Ikon + jumlah */}
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="flex flex-1 items-center gap-3 px-3 py-3 text-left sm:px-5"
                aria-label="Buka keranjang"
              >
                <span className="brut-icon-box h-11 w-11 shrink-0 bg-brand-yellow">
                  <motion.span
                    key={count}
                    initial={{ scale: 1.5, rotate: -12 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    className="font-display text-lg"
                  >
                    {count}
                  </motion.span>
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="label-mono text-cream/60">Keranjang</span>
                    {fast ? (
                      <span className="brut-badge !border-cream !py-0.5 !text-[9px]">
                        <BoltIcon size={10} strokeWidth={3.4} />
                        Kilat
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-display text-2xl text-brand-yellow sm:text-3xl">
                      <CountUp value={total} prefix="Rp" />
                    </span>
                    <span className="hidden text-[10px] font-bold uppercase tracking-wider text-cream/50 sm:inline">
                      {count} layanan
                    </span>
                  </span>
                </span>
              </button>

              {/* Aksi */}
              <a
                href="#pesan"
                className="flex shrink-0 items-center gap-2 border-l-3 border-cream/25 bg-brand-orange px-4 text-[11px] font-black uppercase tracking-[0.14em] text-ink transition-colors hover:bg-brand-yellow sm:px-6"
              >
                <span className="hidden sm:inline">Lanjut</span>
                <ArrowUpRightIcon size={18} />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* ---------------- Drawer keranjang ---------------- */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[70] bg-ink/50"
            />
            <motion.aside
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="fixed inset-x-0 bottom-0 z-[80] max-h-[88vh] overflow-y-auto border-t-3 border-ink bg-cream sm:inset-x-auto sm:right-0 sm:top-0 sm:h-full sm:max-h-none sm:w-[440px] sm:border-l-3 sm:border-t-0"
              role="dialog"
              aria-label="Keranjang pesanan"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b-3 border-ink bg-brand-yellow px-4 py-4">
                <div>
                  <p className="font-display text-2xl">Keranjang</p>
                  <p className="label-mono mt-0.5 text-ink/60">{count} layanan dipilih</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="brut-icon-box h-10 w-10 bg-white"
                  aria-label="Tutup keranjang"
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rotate-45 bg-ink" />
                    <span className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 -rotate-45 bg-ink" />
                  </span>
                </button>
              </div>

              <div className="p-4">
                {/* Daftar item */}
                {count > 0 ? (
                  <ul className="space-y-3">
                    <AnimatePresence initial={false}>
                      {items.map((it) => (
                        <motion.li
                          key={it.id}
                          layout
                          initial={{ opacity: 0, x: 24 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
                          transition={{ duration: 0.22 }}
                          className="flex items-center gap-3 border-3 border-ink bg-white p-3 shadow-brut-xs"
                          style={{ boxShadow: "2px 2px 0 0 #111111" }}
                        >
                          <span className="brut-icon-box h-8 w-8 bg-brand-yellow">
                            <CheckIcon size={14} strokeWidth={3.4} />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-xs font-black uppercase tracking-wider">{it.name}</span>
                            <span className="block text-[11px] font-bold text-ink/60">Rp{it.price.toLocaleString("id-ID")}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeItem(it.id)}
                            className="brut-icon-box h-8 w-8 bg-cream transition-colors hover:bg-brand-orange"
                            aria-label={`Hapus ${it.name}`}
                          >
                            <TrashIcon size={14} />
                          </button>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                ) : (
                  <div className="border-3 border-dashed border-ink bg-white p-8 text-center">
                    <p className="font-display text-xl">Keranjang kosong</p>
                    <p className="mt-2 text-xs font-bold text-ink/60">Pilih layanan di etalase dulu ya.</p>
                    <a href="#layanan" onClick={() => setOpen(false)} className="brut-btn brut-btn-yellow mt-4">
                      <PlusIcon size={14} />
                      Ke Etalase
                    </a>
                  </div>
                )}

                {/* Toggle kilat */}
                <button
                  type="button"
                  onClick={toggleFast}
                  aria-pressed={fast}
                  className={`mt-4 flex w-full items-center gap-3 border-3 border-ink p-3 text-left transition-all ${
                    fast ? "bg-brand-orange shadow-brut-sm" : "bg-white hover:bg-brand-yellow/40"
                  }`}
                  style={{ boxShadow: "3px 3px 0 0 #111111" }}
                >
                  <span className={`brut-icon-box h-9 w-9 ${fast ? "bg-white" : "bg-brand-yellow"}`}>
                    <BoltIcon size={18} strokeWidth={2.8} />
                  </span>
                  <span className="flex-1">
                    <span className="block text-[11px] font-black uppercase tracking-[0.14em]">Jasa Cepat (Kilat)</span>
                    <span className="block text-[10px] font-bold text-ink/60">+ Rp3.000 per pesanan</span>
                  </span>
                  <span className={`relative h-7 w-14 shrink-0 border-3 border-ink ${fast ? "bg-ink" : "bg-cream"}`}>
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                      className={`absolute top-[3px] h-[16px] w-[20px] border-2 border-ink ${fast ? "right-[3px] bg-brand-yellow" : "left-[3px] bg-white"}`}
                    />
                  </span>
                </button>

                {/* Ringkasan harga */}
                <div className="mt-4 border-3 border-ink bg-white">
                  <div className="flex items-center justify-between border-b-3 border-dashed border-ink px-4 py-3">
                    <span className="label-mono text-ink/60">Subtotal</span>
                    <span className="text-sm font-black">Rp{Math.round(subtotal).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex items-center justify-between border-b-3 border-dashed border-ink px-4 py-3">
                    <span className="label-mono text-ink/60">Jasa Cepat</span>
                    <span className={`text-sm font-black ${fast ? "" : "text-ink/40"}`}>
                      {fast ? `+ Rp${Math.round(fastFee).toLocaleString("id-ID")}` : "Tidak aktif"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-ink px-4 py-4">
                    <span className="label-mono text-cream">Total</span>
                    <span className="font-display text-3xl text-brand-yellow">
                      <CountUp value={total} prefix="Rp" />
                    </span>
                  </div>
                </div>

                {/* Aksi bawah */}
                <div className="mt-4 flex flex-col gap-3">
                  <a
                    href="#pesan"
                    onClick={() => setOpen(false)}
                    className="brut-btn brut-btn-orange brut-btn-lg w-full"
                  >
                    Lanjut ke Form Pesanan
                    <ArrowUpRightIcon size={16} />
                  </a>
                  {count > 0 ? (
                    <button type="button" onClick={clearCart} className="brut-btn brut-btn-cream w-full">
                      <TrashIcon size={14} />
                      Kosongkan Keranjang
                    </button>
                  ) : null}
                </div>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
