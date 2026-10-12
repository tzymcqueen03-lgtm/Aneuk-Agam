"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/config/site";
import { useCart } from "./CartProvider";
import { WhatsAppIcon } from "@/lib/icons";

export default function FloatingWhatsApp() {
  const [show, setShow] = useState(false);
  const [hint, setHint] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setHint(true), 900);
    const t2 = setTimeout(() => setHint(false), 6500);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [show]);

  const href = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(
    "Halo AneukAgam, saya mau tanya soal jasa desain & dokumen."
  )}`;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          className={`fixed right-3 z-[55] sm:right-5 ${count > 0 ? "bottom-28 sm:bottom-32" : "bottom-4 sm:bottom-6"}`}
        >
          <div className="flex items-center gap-2">
            <AnimatePresence>
              {hint ? (
                <motion.span
                  initial={{ opacity: 0, x: 14, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 14, scale: 0.9 }}
                  className="hidden border-3 border-ink bg-white px-3 py-2 shadow-brut-xs sm:block"
                  style={{ boxShadow: "2px 2px 0 0 #111111" }}
                >
                  <span className="text-[10px] font-black uppercase tracking-wider">Butuh bantuan?</span>
                </motion.span>
              ) : null}
            </AnimatePresence>

            <motion.a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Hubungi AneukAgam via WhatsApp"
              whileHover={{ y: -4 }}
              className="relative flex h-14 w-14 items-center justify-center border-3 border-ink bg-[#25D366] shadow-brut transition-shadow hover:shadow-brut-md"
            >
              <WhatsAppIcon size={26} className="text-ink" />
              <span className="absolute -right-1 -top-1 block h-4 w-4 border-2 border-ink bg-brand-orange" />
            </motion.a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
