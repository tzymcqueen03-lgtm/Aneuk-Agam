"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowIcon, BoltIcon, QrIcon, TrashIcon, UploadIcon, CheckIcon } from "@/lib/icons";
import { site } from "@/config/site";

export default function AdminDashboard({ blobConfigured = true }) {
  const router = useRouter();
  const inputRef = useRef(null);

  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null); // {type:'ok'|'err', text}
  const [preview, setPreview] = useState(null);
  const [dragging, setDragging] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [pubRes, listRes] = await Promise.all([fetch("/api/qris", { cache: "no-store" }), fetch("/api/admin/qris", { cache: "no-store" })]);
      const pub = await pubRes.json();
      const listData = await listRes.json();
      setCurrent(pub?.url || null);
      setHistory(Array.isArray(listData?.blobs) ? listData.blobs : []);
    } catch {
      setMessage({ type: "err", text: "Gagal memuat data QRIS." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpload(file) {
    if (!file) return;
    setMessage(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/qris", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage({ type: "err", text: data?.error || "Gagal mengunggah gambar." });
        setUploading(false);
        return;
      }
      setMessage({ type: "ok", text: "Gambar QRIS berhasil diperbarui." });
      setPreview(null);
      await load();
    } catch {
      setMessage({ type: "err", text: "Terjadi kesalahan saat mengunggah." });
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleDelete() {
    if (!window.confirm("Hapus gambar QRIS? Halaman pemesanan akan kembali menampilkan placeholder.")) return;
    setMessage(null);
    setUploading(true);
    try {
      const res = await fetch("/api/admin/qris", { method: "DELETE" });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setMessage({ type: "err", text: data?.error || "Gagal menghapus." });
      } else {
        setMessage({ type: "ok", text: "Gambar QRIS dihapus." });
        await load();
      }
    } catch {
      setMessage({ type: "err", text: "Terjadi kesalahan." });
    } finally {
      setUploading(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  function onDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      setPreview({ url: URL.createObjectURL(file), name: file.name, size: file.size });
      handleUpload(file);
    }
  }

  function onPick(e) {
    const file = e.target.files?.[0];
    if (file) {
      setPreview({ url: URL.createObjectURL(file), name: file.name, size: file.size });
      handleUpload(file);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-3 border-ink bg-ink px-4 py-4 shadow-brut">
        <div className="flex items-center gap-3">
          <span className="brut-icon-box h-11 w-11 bg-brand-yellow">
            <BoltIcon size={22} strokeWidth={2.8} />
          </span>
          <div>
            <p className="font-display text-2xl text-cream">{site.name} Admin</p>
            <p className="label-mono text-cream/50">Kelola gambar QRIS</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/" className="brut-btn brut-btn-cream !px-3 !py-2.5 !text-[10px]">
            Lihat Situs
            <ArrowIcon size={14} />
          </Link>
          <button type="button" onClick={handleLogout} className="brut-btn brut-btn-orange !px-3 !py-2.5 !text-[10px]">
            Keluar
          </button>
        </div>
      </div>

      {/* Peringatan Blob */}
      {!blobConfigured ? (
        <div className="mt-6 border-3 border-ink bg-brand-orange p-4 shadow-brut">
          <p className="font-display text-lg">BLOB_READ_WRITE_TOKEN belum diatur</p>
          <p className="mt-2 text-[11px] font-bold leading-relaxed">
            Aktifkan penyimpanan: <b>Vercel Dashboard → Storage → Create Database → Blob</b>. Salin token ke
            environment variable <b>BLOB_READ_WRITE_TOKEN</b>, lalu redeploy. Tanpa itu, gambar QRIS tidak bisa
            disimpan permanen.
          </p>
        </div>
      ) : null}

      {/* Notifikasi */}
      <AnimatePresence>
        {message ? (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className={`mt-6 flex items-center gap-3 border-3 border-ink px-4 py-3 shadow-brut-sm ${
              message.type === "ok" ? "bg-brand-yellow" : "bg-brand-orange"
            }`}
            style={{ boxShadow: "3px 3px 0 0 #111111" }}
          >
            {message.type === "ok" ? <CheckIcon size={18} strokeWidth={3.2} /> : <span className="font-display text-lg">!</span>}
            <p className="text-[11px] font-black uppercase tracking-wider">{message.text}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* ---------- Kolom unggah ---------- */}
        <div className="border-3 border-ink bg-white shadow-brut">
          <div className="flex items-center justify-between border-b-3 border-ink bg-brand-yellow px-4 py-3">
            <h2 className="font-display text-xl">Ganti Gambar QRIS</h2>
            <span className="brut-chip">PNG / JPG / WEBP</span>
          </div>

          <div className="p-4 sm:p-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
              className={`flex cursor-pointer flex-col items-center justify-center gap-3 border-3 border-dashed p-8 text-center transition-all ${
                dragging ? "border-brand-orange bg-brand-yellow/40" : "border-ink bg-cream hover:bg-brand-yellow/30"
              }`}
            >
              <span className="brut-icon-box h-14 w-14 bg-brand-orange">
                <UploadIcon size={26} strokeWidth={2.6} />
              </span>
              <p className="font-display text-xl">{uploading ? "Mengunggah..." : "Klik atau tarik gambar ke sini"}</p>
              <p className="text-[11px] font-bold text-ink/60">
                Maksimal 4 MB. Disarankan PNG persegi (mis. 1000 × 1000 px) agar QR tetap tajam.
              </p>
              {uploading ? (
                <span className="mt-2 h-6 w-6 animate-spin-slow border-3 border-ink border-t-transparent" />
              ) : null}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
              onChange={onPick}
              className="hidden"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="brut-btn brut-btn-ink w-full sm:w-auto"
              >
                <UploadIcon size={16} />
                Pilih Gambar
              </button>
              {current ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={uploading}
                  className="brut-btn brut-btn-cream w-full sm:w-auto"
                >
                  <TrashIcon size={16} />
                  Hapus QRIS
                </button>
              ) : null}
            </div>

            <div className="mt-6 border-t-3 border-dashed border-ink pt-5">
              <p className="label-mono text-ink/50">Tips</p>
              <ul className="mt-3 space-y-2">
                {[
                  "Gunakan gambar QRIS resmi dari bank/e-wallet kamu (PNG lebih baik dari screenshot).",
                  "Pastikan seluruh kode QR terlihat, tidak terpotong, dan tidak ada watermark menutupi.",
                  "Setelah unggah, buka halaman pemesanan untuk memastikan QR tampil dengan benar.",
                ].map((t) => (
                  <li key={t} className="flex gap-2 text-[11px] font-semibold leading-relaxed text-ink/70">
                    <span className="mt-[4px] block h-3 w-3 shrink-0 border-2 border-ink bg-brand-yellow" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ---------- Kolom pratinjau ---------- */}
        <div className="space-y-6">
          <div className="border-3 border-ink bg-white shadow-brut">
            <div className="flex items-center justify-between border-b-3 border-ink bg-ink px-4 py-3">
              <h2 className="font-display text-lg text-cream">Tampil Saat Ini</h2>
              <span className="brut-badge !shadow-none">
                <QrIcon size={12} />
                LIVE
              </span>
            </div>
            <div className="p-4">
              <div className="relative mx-auto aspect-square w-full max-w-[240px] border-3 border-ink bg-cream p-3">
                {loading ? (
                  <div className="flex h-full items-center justify-center">
                    <span className="h-8 w-8 animate-spin-slow border-3 border-ink border-t-transparent" />
                  </div>
                ) : current ? (
                  <Image
                    src={current}
                    alt="Pratinjau QRIS"
                    fill
                    sizes="240px"
                    className="object-contain p-2"
                    unoptimized
                  />
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
                    <QrIcon size={40} className="text-ink/30" />
                    <p className="label-mono text-ink/50">Belum ada QRIS</p>
                  </div>
                )}
              </div>
              <p className="mt-3 text-center text-[10px] font-bold text-ink/50">
                {current ? "Gambar ini yang tampil di halaman pemesanan." : "Placeholder tampil di halaman pemesanan."}
              </p>
            </div>
          </div>

          {/* Riwayat */}
          <div className="border-3 border-ink bg-white shadow-brut">
            <div className="flex items-center justify-between border-b-3 border-ink bg-brand-orange px-4 py-3">
              <h2 className="font-display text-lg">Riwayat Berkas</h2>
              <span className="brut-chip">{history.length}</span>
            </div>
            <div className="p-4">
              {history.length === 0 ? (
                <p className="text-[11px] font-bold text-ink/50">Belum ada berkas tersimpan.</p>
              ) : (
                <ul className="space-y-2">
                  {history.map((b) => (
                    <li key={b.url} className="border-3 border-ink bg-cream px-3 py-2">
                      <p className="truncate text-[10px] font-black uppercase tracking-wider">{b.pathname}</p>
                      <p className="mt-0.5 text-[10px] font-bold text-ink/50">
                        {new Date(b.uploadedAt).toLocaleString("id-ID")} • {(b.size / 1024).toFixed(0)} KB
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-3 text-[10px] font-semibold leading-relaxed text-ink/50">
                Setiap unggahan menimpa berkas <b>qris/qris.png</b> di Vercel Blob (path tetap), jadi gambar
                terbaru selalu yang dipakai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
