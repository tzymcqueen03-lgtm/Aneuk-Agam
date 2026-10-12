"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { fastService, site } from "@/config/site";
import { useCart } from "./CartProvider";
import { formatRupiah, formatTanggal } from "@/lib/format";
import { buildWhatsAppUrl, WA_UPLOAD_NOTE } from "@/lib/whatsapp";
import CountUp from "./ui/CountUp";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { StripeBar, DotCluster } from "./ui/Patterns";
import {
  ArrowUpRightIcon,
  BoltIcon,
  CheckIcon,
  PlusIcon,
  QrIcon,
  TrashIcon,
  WhatsAppIcon,
  UploadIcon,
} from "@/lib/icons";

function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

export default function OrderForm() {
  const { items, count, total, subtotal, fastFee, fast, toggleFast, removeItem, clearCart } = useCart();

  const [nama, setNama] = useState("");
  const [deadline, setDeadline] = useState("");
  const [catatan, setCatatan] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [qrisUrl, setQrisUrl] = useState(null);
  const [qrisLoading, setQrisLoading] = useState(true);

  const minDate = useMemo(() => todayISO(), []);

  // Ambil URL QRIS terbaru dari API (dari Vercel Blob)
  useEffect(() => {
    let alive = true;
    fetch("/api/qris")
      .then((r) => r.json())
      .then((d) => {
        if (alive) setQrisUrl(d?.url || null);
      })
      .catch(() => {})
      .finally(() => alive && setQrisLoading(false));
    return () => {
      alive = false;
    };
  }, []);

  function validate() {
    const e = {};
    if (!nama.trim()) e.nama = "Nama wajib diisi.";
    if (!deadline) e.deadline = "Deadline wajib dipilih.";
    if (count === 0) e.items = "Pilih minimal 1 layanan dulu.";
    return e;
  }

  const liveErrors = validate();
  const isValid = Object.keys(liveErrors).length === 0;

  function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = document.querySelector("[data-error='true']");
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const url = buildWhatsAppUrl({ items, fast, total, nama, deadline, catatan });
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const waUrl = isValid ? buildWhatsAppUrl({ items, fast, total, nama, deadline, catatan }) : "#pesan";

  return (
    <section id="pesan" className="relative border-b-3 border-ink bg-cream py-16 sm:py-20">
      <div className="pattern-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Form Pemesanan"
          title="Terakhir,"
          accent="isi datanya"
          description="Isi nama dan deadline, cek ringkasan di sebelah kanan, lalu kirim ke WhatsApp."
          align="center"
        />

        <form onSubmit={handleSubmit} noValidate className="mt-12 grid gap-6 lg:grid-cols-[1fr_400px]">
          {/* ---------------- KOLOM KIRI ---------------- */}
          <div className="space-y-6">
            {/* Data pemesan */}
            <Reveal y={20}>
              <div className="border-3 border-ink bg-white shadow-brut">
                <div className="flex items-center justify-between border-b-3 border-ink bg-brand-yellow px-4 py-3">
                  <h3 className="font-display text-xl">Data Pemesan</h3>
                  <span className="brut-chip">01</span>
                </div>

                <div className="space-y-5 p-4 sm:p-5">
                  {/* Nama */}
                  <div data-error={Boolean(touched && errors.nama)}>
                    <label htmlFor="nama" className="brut-label">
                      Nama Lengkap <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      value={nama}
                      onChange={(e) => {
                        setNama(e.target.value);
                        if (touched) setErrors(validate());
                      }}
                      onBlur={() => setTouched(true)}
                      placeholder="Contoh: Rizki Ananda"
                      autoComplete="name"
                      aria-invalid={Boolean(touched && errors.nama)}
                      className={`brut-input ${touched && errors.nama ? "brut-input-error" : ""}`}
                    />
                    <FieldError show={Boolean(touched && errors.nama)} msg={errors.nama} />
                  </div>

                  {/* Deadline */}
                  <div data-error={Boolean(touched && errors.deadline)}>
                    <label htmlFor="deadline" className="brut-label">
                      Deadline <span className="text-brand-orange">*</span>
                    </label>
                    <input
                      id="deadline"
                      name="deadline"
                      type="date"
                      value={deadline}
                      min={minDate}
                      onChange={(e) => {
                        setDeadline(e.target.value);
                        if (touched) setErrors(validate());
                      }}
                      onBlur={() => setTouched(true)}
                      aria-invalid={Boolean(touched && errors.deadline)}
                      className={`brut-input ${touched && errors.deadline ? "brut-input-error" : ""}`}
                    />
                    <FieldError show={Boolean(touched && errors.deadline)} msg={errors.deadline} />
                    {deadline && !errors.deadline ? (
                      <p className="mt-2 text-[11px] font-bold text-ink/60">
                        Deadline: <span className="text-ink">{formatTanggal(deadline)}</span>
                      </p>
                    ) : null}
                  </div>

                  {/* Catatan */}
                  <div>
                    <label htmlFor="catatan" className="brut-label">
                      Catatan Khusus <span className="text-ink/40">(opsional)</span>
                    </label>
                    <textarea
                      id="catatan"
                      name="catatan"
                      rows={4}
                      value={catatan}
                      onChange={(e) => setCatatan(e.target.value)}
                      placeholder="Contoh: pakai font Times New Roman 12, ada 20 halaman, judul tentang..."
                      className="brut-input resize-y"
                    />
                    <p className="mt-2 text-[11px] font-semibold text-ink/50">
                      Tulis detail sesukamu — makin jelas, makin cepat dikerjakan.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Layanan dipilih */}
            <Reveal y={20} delay={0.06}>
              <div data-error={Boolean(touched && errors.items)} className="border-3 border-ink bg-white shadow-brut">
                <div className="flex items-center justify-between border-b-3 border-ink bg-brand-orange px-4 py-3">
                  <h3 className="font-display text-xl">Layanan Dipilih</h3>
                  <span className="brut-chip">{count} item</span>
                </div>

                <div className="p-4 sm:p-5">
                  {count === 0 ? (
                    <div className="border-3 border-dashed border-ink bg-cream p-6 text-center">
                      <p className="font-display text-lg">Belum ada layanan</p>
                      <p className="mt-2 text-xs font-bold text-ink/60">
                        Pilih minimal 1 layanan dari etalase.
                      </p>
                      <a href="#layanan" className="brut-btn brut-btn-yellow mt-4">
                        <PlusIcon size={14} />
                        Ke Etalase
                      </a>
                    </div>
                  ) : (
                    <ul className="space-y-2">
                      <AnimatePresence initial={false}>
                        {items.map((it) => (
                          <motion.li
                            key={it.id}
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: 30, height: 0 }}
                            className="flex items-center gap-3 border-3 border-ink bg-cream px-3 py-2.5"
                          >
                            <span className="brut-icon-box h-7 w-7 bg-brand-yellow">
                              <CheckIcon size={13} strokeWidth={3.4} />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-xs font-black uppercase tracking-wider">
                              {it.name}
                            </span>
                            <span className="text-xs font-black">{formatRupiah(it.price)}</span>
                            <button
                              type="button"
                              onClick={() => removeItem(it.id)}
                              aria-label={`Hapus ${it.name}`}
                              className="text-ink/40 transition-colors hover:text-brand-orange"
                            >
                              <TrashIcon size={16} />
                            </button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}

                  {/* Toggle kilat */}
                  <button
                    type="button"
                    onClick={toggleFast}
                    aria-pressed={fast}
                    className={`mt-4 flex w-full items-center gap-3 border-3 border-ink p-3 text-left transition-all ${
                      fast ? "bg-brand-orange" : "bg-white hover:bg-brand-yellow/40"
                    }`}
                    style={{ boxShadow: "3px 3px 0 0 #111111" }}
                  >
                    <span className={`brut-icon-box h-9 w-9 ${fast ? "bg-white" : "bg-brand-yellow"}`}>
                      <BoltIcon size={18} strokeWidth={2.8} />
                    </span>
                    <span className="flex-1">
                      <span className="block text-[11px] font-black uppercase tracking-[0.14em]">
                        {fastService.label}
                      </span>
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

                  {touched && errors.items ? (
                    <p className="mt-2 text-[11px] font-black uppercase tracking-wider text-brand-orange">
                      {errors.items}
                    </p>
                  ) : null}
                </div>
              </div>
            </Reveal>

            {/* QRIS */}
            <Reveal y={20} delay={0.12}>
              <div className="border-3 border-ink bg-white shadow-brut">
                <div className="flex items-center justify-between border-b-3 border-ink bg-ink px-4 py-3">
                  <h3 className="font-display text-xl text-cream">Pembayaran QRIS</h3>
                  <span className="brut-badge !shadow-none">
                    <QrIcon size={12} />
                    SCAN
                  </span>
                </div>

                <div className="grid gap-5 p-4 sm:grid-cols-[230px_1fr] sm:p-5">
                  {/* Gambar QRIS */}
                  <div className="mx-auto w-full max-w-[230px]">
                    <div className="relative aspect-[3/4] border-3 border-ink bg-cream p-2 shadow-brut">
                      {qrisLoading ? (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="h-8 w-8 animate-spin-slow border-3 border-ink border-t-transparent" />
                        </div>
                      ) : qrisUrl ? (
                        <Image
                          src={qrisUrl}
                          alt="Kode QRIS pembayaran AneukAgam"
                          fill
                          sizes="200px"
                          className="object-contain p-2"
                          unoptimized
                        />
                      ) : (
                        <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-center">
                          <QrIcon size={40} className="text-ink/30" />
                          <p className="label-mono text-ink/50">QRIS belum diunggah</p>
                          <p className="px-2 text-[9px] font-bold leading-tight text-ink/40">
                            Admin belum mengunggah gambar QRIS. Hubungi WhatsApp untuk kode pembayaran.
                          </p>
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-center text-[10px] font-black uppercase tracking-[0.16em] text-ink/50">
                      Scan / screenshot
                    </p>
                  </div>

                  {/* Instruksi */}
                  <div className="flex flex-col justify-center">
                    <h4 className="font-display text-xl">Cara Bayar</h4>
                    <ol className="mt-3 space-y-2.5">
                      {[
                        "Buka aplikasi bank atau e-wallet kamu (GoPay, OVO, DANA, ShopeePay, m-banking).",
                        "Pilih menu Bayar / Scan QRIS, lalu scan gambar di samping.",
                        "Masukkan nominal sesuai total di ringkasan pesanan.",
                        "Screenshot bukti pembayaran — nanti diupload ke WhatsApp.",
                      ].map((t, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="brut-icon-box h-6 w-6 shrink-0 bg-brand-yellow text-[10px] font-black">
                            {i + 1}
                          </span>
                          <span className="pt-0.5 text-[11px] font-semibold leading-relaxed text-ink/75">{t}</span>
                        </li>
                      ))}
                    </ol>

                    <div className="mt-4 flex items-start gap-2 border-3 border-ink bg-brand-yellow px-3 py-2.5">
                      <UploadIcon size={16} strokeWidth={2.8} className="mt-0.5 shrink-0" />
                      <p className="text-[11px] font-black uppercase leading-snug tracking-wider">
                        {WA_UPLOAD_NOTE}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* ---------------- KOLOM KANAN: RINGKASAN STICKY ---------------- */}
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <Reveal y={20} delay={0.1}>
              <div className="border-3 border-ink bg-white shadow-brut-md" style={{ boxShadow: "8px 8px 0 0 #111111" }}>
                <div className="relative flex items-center justify-between overflow-hidden border-b-3 border-ink bg-brand-yellow px-4 py-3">
                  <DotCluster className="absolute right-2 top-1/2 -translate-y-1/2 opacity-30" cols={4} rows={3} />
                  <h3 className="font-display relative text-xl">Ringkasan Pesanan</h3>
                  <span className="brut-chip relative">REVIEW</span>
                </div>

                <div className="p-4 sm:p-5">
                  {/* Item */}
                  {count > 0 ? (
                    <ul className="space-y-2">
                      {items.map((it) => (
                        <li key={it.id} className="flex items-baseline justify-between gap-3 text-xs">
                          <span className="font-bold text-ink/80">{it.name}</span>
                          <span className="shrink-0 font-black">{formatRupiah(it.price)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs font-bold text-ink/50">Belum ada layanan dipilih.</p>
                  )}

                  <div className="my-4 border-t-3 border-dashed border-ink" />

                  {/* Perhitungan */}
                  <dl className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <dt className="font-bold text-ink/60">Subtotal</dt>
                      <dd className="font-black">{formatRupiah(subtotal)}</dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="flex items-center gap-1.5 font-bold text-ink/60">
                        Jasa Cepat
                        {fast ? <BoltIcon size={12} strokeWidth={3.4} /> : null}
                      </dt>
                      <dd className={`font-black ${fast ? "" : "text-ink/40"}`}>
                        {fast ? `+ ${formatRupiah(fastFee)}` : "—"}
                      </dd>
                    </div>
                  </dl>

                  {/* Total */}
                  <div className="mt-4 flex items-end justify-between border-3 border-ink bg-ink px-4 py-4">
                    <span className="label-mono text-cream/70">Total Bayar</span>
                    <span className="font-display text-3xl leading-none text-brand-yellow sm:text-4xl">
                      <CountUp value={total} prefix="Rp" />
                    </span>
                  </div>

                  {/* Detail pemesan */}
                  <div className="mt-4 space-y-2 border-3 border-ink bg-cream p-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="label-mono text-ink/50">Nama</span>
                      <span className="text-right text-[11px] font-black">{nama.trim() || "—"}</span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="label-mono text-ink/50">Deadline</span>
                      <span className="text-right text-[11px] font-black">
                        {deadline ? formatTanggal(deadline) : "—"}
                      </span>
                    </div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="label-mono text-ink/50">Catatan</span>
                      <span className="max-w-[60%] text-right text-[11px] font-semibold text-ink/70">
                        {catatan.trim() || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Tombol kirim */}
                  <motion.button
                    type="submit"
                    whileHover={isValid ? { scale: 1.01 } : {}}
                    className={`brut-btn brut-btn-wa brut-btn-lg mt-4 w-full ${!isValid ? "opacity-60" : ""}`}
                  >
                    <WhatsAppIcon size={18} />
                    Pesan via WhatsApp
                    <ArrowUpRightIcon size={16} />
                  </motion.button>

                  {!isValid ? (
                    <p className="mt-2 text-center text-[10px] font-black uppercase tracking-wider text-brand-orange">
                      Lengkapi nama, deadline &amp; 1 layanan
                    </p>
                  ) : (
                    <p className="mt-2 text-center text-[10px] font-black uppercase tracking-wider text-ink/50">
                      Pesan terisi otomatis, siap kirim
                    </p>
                  )}

                  <a
                    href={waUrl}
                    target={isValid ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="mt-3 block text-center text-[10px] font-bold uppercase tracking-wider text-ink/40 underline decoration-dotted underline-offset-4 hover:text-ink"
                  >
                    atau buka link WhatsApp langsung
                  </a>

                  {count > 0 ? (
                    <button
                      type="button"
                      onClick={clearCart}
                      className="brut-btn brut-btn-cream mt-3 w-full !py-2.5 !text-[10px]"
                    >
                      <TrashIcon size={13} />
                      Kosongkan &amp; Mulai Ulang
                    </button>
                  ) : null}
                </div>
              </div>

              {/* Catatan kecil */}
              <div className="mt-4 flex items-start gap-2 border-3 border-ink bg-white px-3 py-3">
                <span className="mt-[3px] block h-3 w-3 shrink-0 border-2 border-ink bg-brand-orange" />
                <p className="text-[10px] font-bold leading-relaxed text-ink/60">
                  Pastikan nominal transfer sama dengan total. Kalau ada perbedaan, sebutkan di chat WhatsApp
                  supaya tidak bingung.
                </p>
              </div>
            </Reveal>
          </div>
        </form>

        <StripeBar className="mt-16" variant="yellow" />
      </div>
    </section>
  );
}

function FieldError({ show, msg }) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.p
          initial={{ opacity: 0, y: -6, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          className="mt-2 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-brand-orange"
        >
          <span className="block h-3 w-3 border-2 border-brand-orange" />
          {msg}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
