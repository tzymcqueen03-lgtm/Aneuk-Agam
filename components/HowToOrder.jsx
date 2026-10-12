"use client";

import { steps, fastService, site } from "@/config/site";
import SectionHeading from "./ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "./ui/Stagger";
import Reveal from "./ui/Reveal";
import { StripeBar, DotCluster, SquareAccent } from "./ui/Patterns";
import { BoltIcon, ArrowIcon, WhatsAppIcon } from "@/lib/icons";

export default function HowToOrder() {
  return (
    <section id="cara-pesan" className="relative border-b-3 border-ink bg-white py-16 sm:py-20">
      <div className="pattern-dots pointer-events-none absolute inset-x-0 top-0 h-24 opacity-[0.08]" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Cara Pemesanan"
          title="Empat langkah,"
          accent="beres"
          description="Tidak perlu daftar akun, tidak perlu install aplikasi. Semua lewat browser dan WhatsApp."
          align="center"
        />

        {/* Langkah */}
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {steps.map((s) => (
            <StaggerItem key={s.no}>
              <div className="group relative h-full border-3 border-ink bg-cream p-5 shadow-brut transition-all duration-200 hover:-translate-y-2 hover:shadow-brut-lg">
                <div className="flex items-start justify-between">
                  <span className="font-display text-5xl text-outline leading-none">{s.no}</span>
                  <SquareAccent color="#FFC800" size={18} className="transition-transform group-hover:rotate-45" />
                </div>

                <h3 className="font-display mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-ink/70">{s.text}</p>

                <span className="absolute -bottom-3 left-5 hidden h-6 w-6 items-center justify-center border-3 border-ink bg-brand-orange lg:flex">
                  <ArrowIcon size={14} strokeWidth={3} />
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <StripeBar className="mt-14" variant="dense" />

        {/* Blok Jasa Kilat + WhatsApp */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Reveal x={-20} y={0}>
            <div className="relative h-full border-3 border-ink bg-brand-orange p-6 shadow-brut-md" style={{ boxShadow: "8px 8px 0 0 #111111" }}>
              <DotCluster className="absolute right-4 top-4 opacity-40" cols={4} rows={3} />
              <span className="brut-badge !bg-ink !text-cream">
                <BoltIcon size={12} strokeWidth={3.4} />
                Opsional
              </span>
              <h3 className="font-display mt-4 text-3xl sm:text-4xl">{fastService.label}</h3>
              <p className="mt-3 max-w-md text-sm font-bold leading-relaxed text-ink/80">
                {fastService.description}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="border-3 border-ink bg-white px-4 py-2 font-display text-2xl normal-case">
                  + Rp{fastService.price.toLocaleString("id-ID")}
                </span>
                <span className="label-mono text-ink/70">per pesanan</span>
              </div>
            </div>
          </Reveal>

          <Reveal x={20} y={0}>
            <div className="relative flex h-full flex-col justify-between border-3 border-ink bg-ink p-6 shadow-brut-md" style={{ boxShadow: "8px 8px 0 0 #FFC800" }}>
              <div>
                <span className="brut-badge">
                  <WhatsAppIcon size={12} />
                  WhatsApp
                </span>
                <h3 className="font-display mt-4 text-3xl text-cream sm:text-4xl">
                  Ada pertanyaan? <span className="text-brand-yellow">Tanya langsung.</span>
                </h3>
                <p className="mt-3 max-w-md text-sm font-bold leading-relaxed text-cream/70">
                  Bingung pilih layanan atau butuh request khusus? Chat saja, kami balas cepat di jam operasional.
                </p>
              </div>

              <div className="mt-6">
                <a
                  href={`https://wa.me/${site.waNumber}?text=${encodeURIComponent("Halo AneukAgam, saya mau tanya-tanya dulu soal layanan.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brut-btn brut-btn-wa brut-btn-lg w-full"
                >
                  <WhatsAppIcon size={18} />
                  Chat {site.waNumberPretty}
                </a>
                <p className="label-mono mt-3 text-cream/50">{site.hours}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
