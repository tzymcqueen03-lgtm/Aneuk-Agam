import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 py-20">
      <div className="pattern-dots absolute inset-0 opacity-10" aria-hidden="true" />
      <div className="relative w-full max-w-lg border-3 border-ink bg-white p-8 text-center shadow-brut-lg" style={{ boxShadow: "12px 12px 0 0 #111111" }}>
        <span className="brut-badge">Error 404</span>
        <h1 className="font-display mt-4 text-6xl leading-none sm:text-8xl">Halaman Hilang</h1>
        <p className="mt-4 text-sm font-bold text-ink/70">
          Sepertinya halaman ini belum dikerjakan. Yuk balik ke etalase.
        </p>
        <Link href="/" className="brut-btn brut-btn-orange brut-btn-lg mt-6 w-full">
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}
