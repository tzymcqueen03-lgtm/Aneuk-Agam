"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowIcon, BoltIcon, LockIcon } from "@/lib/icons";
import { site } from "@/config/site";

export default function AdminLogin({ passwordConfigured = true }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data?.error || "Gagal masuk.");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan.");
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="border-3 border-ink bg-white shadow-brut-lg"
        style={{ boxShadow: "10px 10px 0 0 #111111" }}
      >
        <div className="flex items-center justify-between border-b-3 border-ink bg-brand-yellow px-4 py-3">
          <span className="flex items-center gap-2">
            <BoltIcon size={16} strokeWidth={3} />
            <span className="font-display text-lg">{site.name}</span>
          </span>
          <span className="brut-badge !bg-ink !text-cream">ADMIN</span>
        </div>

        <form onSubmit={onSubmit} className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="brut-icon-box h-12 w-12 bg-brand-orange">
              <LockIcon size={22} strokeWidth={2.6} />
            </span>
            <div>
              <h1 className="font-display text-2xl leading-none">Masuk Admin</h1>
              <p className="mt-1 text-[11px] font-bold text-ink/60">Area terbatas pengelola QRIS.</p>
            </div>
          </div>

          {!passwordConfigured ? (
            <div className="mt-5 border-3 border-ink bg-brand-orange px-3 py-3">
              <p className="text-[11px] font-black uppercase leading-snug tracking-wider">
                ADMIN_PASSWORD belum diatur. Tambahkan environment variable itu di Vercel, lalu redeploy.
              </p>
            </div>
          ) : null}

          <div className="mt-6">
            <label htmlFor="admin-password" className="brut-label">
              Password Admin
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••"
              autoComplete="current-password"
              className={`brut-input ${error ? "brut-input-error" : ""}`}
              disabled={loading}
            />
            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-[11px] font-black uppercase tracking-wider text-brand-orange"
              >
                {error}
              </motion.p>
            ) : null}
          </div>

          <button type="submit" disabled={loading || !password} className="brut-btn brut-btn-ink brut-btn-lg mt-5 w-full">
            {loading ? "Memeriksa..." : "Masuk"}
            <ArrowIcon size={16} />
          </button>

          <Link
            href="/"
            className="mt-4 block text-center text-[10px] font-bold uppercase tracking-wider text-ink/40 underline decoration-dotted underline-offset-4 hover:text-ink"
          >
            Kembali ke beranda
          </Link>
        </form>
      </motion.div>
    </div>
  );
}
