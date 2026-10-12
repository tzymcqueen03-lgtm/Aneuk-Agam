"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, site } from "@/config/site";
import { useCart } from "./CartProvider";
import { ArrowUpRightIcon, PlusIcon } from "@/lib/icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`mx-auto flex max-w-6xl items-center justify-between border-3 border-ink bg-cream transition-shadow duration-200 ${
          scrolled ? "shadow-brut-lg" : "shadow-brut"
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3 pl-3 pr-4 py-2.5">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden border-3 border-ink bg-white shadow-brut-xs transition-transform group-hover:rotate-6">
            <Image
              src="/images/logo-mark.png"
              alt="Logo AneukAgam"
              width={40}
              height={40}
              className="h-8 w-8 object-contain"
              priority
            />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-lg tracking-tight sm:text-xl">{site.name}</span>
            <span className="label-mono mt-0.5 hidden text-ink/60 sm:block">Desain &amp; Dokumen</span>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-3 border-transparent px-3 py-2 text-[11px] font-black uppercase tracking-[0.14em] transition-all hover:border-ink hover:bg-brand-yellow"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 pr-3">
          <a
            href="#pesan"
            className="brut-btn brut-btn-ink hidden !px-4 !py-2.5 !text-[10px] sm:inline-flex"
          >
            <PlusIcon size={14} />
            Pesan {count > 0 ? `(${count})` : "Sekarang"}
            <ArrowUpRightIcon size={14} />
          </a>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Buka menu"
            aria-expanded={open}
            className="brut-icon-box h-10 w-10 bg-brand-yellow md:hidden"
          >
            <span className="relative block h-4 w-5">
              <motion.span
                animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-0 block h-[3px] w-5 bg-ink"
              />
              <motion.span
                animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                className="absolute left-0 top-[7px] block h-[3px] w-5 bg-ink"
              />
              <motion.span
                animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="absolute left-0 top-[14px] block h-[3px] w-5 bg-ink"
              />
            </span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-0 z-40 bg-ink/40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 z-50 h-full w-[82%] max-w-sm border-l-3 border-ink bg-cream p-5 shadow-brut-lg md:hidden"
            >
              <div className="mb-6 flex items-center justify-between border-b-3 border-ink pb-4">
                <span className="font-display text-2xl">Menu</span>
                <span className="flex h-9 w-9 items-center justify-center overflow-hidden border-3 border-ink bg-white shadow-brut-xs">
                  <Image src="/images/logo-mark.png" alt="Logo AneukAgam" width={36} height={36} className="h-7 w-7 object-contain" />
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {navLinks.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i + 0.1 }}
                    className="flex items-center justify-between border-3 border-ink bg-white px-4 py-3 shadow-brut-sm active:translate-x-[3px] active:translate-y-[3px] active:shadow-none"
                    style={{ boxShadow: "3px 3px 0 0 #111111" }}
                  >
                    <span className="font-display text-xl">{l.label}</span>
                    <ArrowUpRightIcon size={18} />
                  </motion.a>
                ))}
              </div>

              <a
                href="#pesan"
                onClick={() => setOpen(false)}
                className="brut-btn brut-btn-orange brut-btn-lg mt-6 w-full"
              >
                Pesan Sekarang
                <ArrowUpRightIcon size={16} />
              </a>

              <div className="mt-8 border-3 border-ink bg-brand-yellow p-4 shadow-brut-sm" style={{ boxShadow: "3px 3px 0 0 #111111" }}>
                <p className="label-mono">Jam Operasional</p>
                <p className="mt-1 text-xs font-bold">{site.hours}</p>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
