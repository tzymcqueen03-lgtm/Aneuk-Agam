"use client";

import { navLinks, services, site } from "@/config/site";
import Image from "next/image";
import Reveal from "./ui/Reveal";
import { DotCluster, StripeBar } from "./ui/Patterns";
import { ArrowUpRightIcon, WhatsAppIcon, BoltIcon, ArrowIcon } from "@/lib/icons";

export default function Footer() {
  const waUrl = `https://wa.me/${site.waNumber}?text=${encodeURIComponent(
    "Halo AneukAgam, saya mau pesan jasa desain & dokumen."
  )}`;

  return (
    <footer className="relative bg-cream">
      <StripeBar variant="dense" />

      {/* Blok ajakan besar */}
      <div className="border-b-3 border-ink bg-brand-yellow">
        <div className="relative mx-auto max-w-6xl overflow-hidden px-4 py-14 sm:px-6 sm:py-20">
          <DotCluster className="absolute right-6 top-8 hidden opacity-40 sm:grid" cols={6} rows={5} />
          <DotCluster className="absolute bottom-6 left-6 hidden opacity-40 lg:grid" cols={4} rows={3} />

          <Reveal>
            <span className="brut-badge !bg-ink !text-cream">
              <BoltIcon size={12} strokeWidth={3.4} />
              Siap Dikerjakan Hari Ini
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="font-display mt-5 max-w-3xl text-5xl leading-[0.88] sm:text-7xl lg:text-8xl">
              Punya tugas numpuk?
              <br />
              <span className="text-outline">Serahkan</span> ke AneukAgam.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#pesan" className="brut-btn brut-btn-ink brut-btn-lg w-full sm:w-auto">
                Pesan Sekarang
                <ArrowUpRightIcon size={16} />
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="brut-btn brut-btn-cream brut-btn-lg w-full sm:w-auto"
              >
                <WhatsAppIcon size={18} />
                WhatsApp Kami
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Isi footer */}
      <div className="border-b-3 border-ink bg-ink text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border-3 border-cream/20 bg-white shadow-brut-xs">
                <Image
                  src="/images/logo-mark.png"
                  alt="Logo AneukAgam"
                  width={48}
                  height={48}
                  className="h-10 w-10 object-contain"
                />
              </span>
              <div>
                <p className="font-display text-2xl">{site.name}</p>
                <p className="label-mono text-cream/50">{site.tagline}</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-xs font-semibold leading-relaxed text-cream/60">
              {site.description}
            </p>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="brut-btn brut-btn-wa brut-btn-lg mt-6 w-full sm:w-auto"
            >
              <WhatsAppIcon size={18} />
              Pesan via WhatsApp
            </a>

            <p className="mt-4 text-[11px] font-bold text-cream/50">
              {site.waNumberPretty} • {site.hours}
            </p>
          </div>

          {/* Layanan */}
          <div>
            <p className="label-mono text-brand-yellow">Layanan</p>
            <ul className="mt-4 space-y-2">
              {services.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <a
                    href="#layanan"
                    className="group flex items-center justify-between border-b-2 border-cream/10 py-1.5 text-xs font-bold text-cream/70 transition-colors hover:text-brand-yellow"
                  >
                    {s.name}
                    <ArrowIcon size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigasi & kontak */}
          <div>
            <p className="label-mono text-brand-yellow">Navigasi</p>
            <ul className="mt-4 space-y-2">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group flex items-center justify-between border-b-2 border-cream/10 py-1.5 text-xs font-bold text-cream/70 transition-colors hover:text-brand-yellow"
                  >
                    {l.label}
                    <ArrowIcon size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/admin"
                  className="group flex items-center justify-between border-b-2 border-cream/10 py-1.5 text-xs font-bold text-cream/40 transition-colors hover:text-brand-yellow"
                >
                  Admin
                  <ArrowIcon size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                </a>
              </li>
            </ul>

            <p className="label-mono mt-8 text-brand-yellow">Kontak</p>
            <ul className="mt-4 space-y-2 text-xs font-bold text-cream/70">
              <li>WA: {site.waNumberPretty}</li>
              <li>IG: {site.instagram}</li>
              <li>Lokasi: {site.city}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bar bawah */}
      <div className="bg-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6">
          <p className="label-mono text-ink/50">
            © {new Date().getFullYear()} {site.name}. Semua hak dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <span className="block h-3 w-3 border-2 border-ink bg-brand-orange" />
            <span className="block h-3 w-3 border-2 border-ink bg-brand-yellow" />
            <span className="block h-3 w-3 border-2 border-ink bg-ink" />
            <span className="label-mono ml-2 text-ink/50">Dibuat di Sumatera Barat</span>
          </div>
        </div>
      </div>

      {/* Ruang untuk bar keranjang agar tidak menutupi konten */}
      <div className="h-24 bg-cream" aria-hidden="true" />
    </footer>
  );
}
