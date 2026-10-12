import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import { blobToken } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const QRIS_PREFIX = "qris/qris";

// Gambar QRIS statis bawaan (ada di public/images/qris.jpg).
// Dipakai kalau belum ada upload dari /admin dan QRIS_FALLBACK_URL tidak diisi.
const STATIC_QRIS = "/images/qris.jpg";

/**
 * Mengembalikan URL gambar QRIS terbaru.
 * 1) Cari di Vercel Blob (hasil upload dari /admin) — paling diprioritaskan
 * 2) Kalau belum ada, pakai QRIS_FALLBACK_URL dari env (opsional)
 * 3) Kalau tidak diisi, pakai gambar statis /images/qris.jpg
 */
export async function GET() {
  const fallback = process.env.QRIS_FALLBACK_URL || STATIC_QRIS;

  if (!blobToken()) {
    return NextResponse.json({ url: fallback, source: fallback ? "fallback" : "none", blobConfigured: false });
  }

  try {
    const { blobs } = await list({ prefix: QRIS_PREFIX, token: blobToken() });

    if (blobs && blobs.length > 0) {
      const newest = [...blobs].sort(
        (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
      )[0];
      const version = new Date(newest.uploadedAt).getTime();
      return NextResponse.json({
        url: `${newest.url}?v=${version}`,
        source: "blob",
        updatedAt: newest.uploadedAt,
        blobConfigured: true,
      });
    }

    return NextResponse.json({ url: fallback, source: fallback ? "fallback" : "none", blobConfigured: true });
  } catch (err) {
    return NextResponse.json(
      {
        url: fallback,
        source: fallback ? "fallback" : "none",
        blobConfigured: true,
        error: "Gagal membaca Vercel Blob: " + (err?.message || "unknown"),
      },
      { status: 200 }
    );
  }
}
