import { NextResponse } from "next/server";
import { del, list, put } from "@vercel/blob";
import { isAuthed, blobToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

const QRIS_PATH = "qris/qris.png";
const QRIS_PREFIX = "qris/qris";
const MAX_BYTES = 4 * 1024 * 1024; // 4 MB (batas body Vercel)

const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];

/** Daftar gambar QRIS yang tersimpan. */
export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ ok: false, error: "Tidak diizinkan." }, { status: 401 });
  }

  if (!blobToken()) {
    return NextResponse.json({ ok: true, blobs: [], blobConfigured: false });
  }

  try {
    const { blobs } = await list({ prefix: QRIS_PREFIX, token: blobToken() });
    const sorted = [...(blobs || [])].sort(
      (a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );
    return NextResponse.json({
      ok: true,
      blobConfigured: true,
      blobs: sorted.map((b) => ({
        url: b.url,
        size: b.size,
        uploadedAt: b.uploadedAt,
        pathname: b.pathname,
      })),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Gagal membaca Blob: " + (err?.message || "unknown") },
      { status: 500 }
    );
  }
}

/** Unggah / ganti gambar QRIS. */
export async function POST(request) {
  if (!isAuthed()) {
    return NextResponse.json({ ok: false, error: "Tidak diizinkan." }, { status: 401 });
  }

  if (!blobToken()) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "BLOB_READ_WRITE_TOKEN belum diatur. Aktifkan Vercel Blob di dashboard (Storage → Create → Blob) lalu redeploy.",
      },
      { status: 500 }
    );
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Form tidak valid." }, { status: 400 });
  }

  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ ok: false, error: "File gambar tidak ditemukan." }, { status: 400 });
  }

  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json(
      { ok: false, error: "Format harus PNG, JPG, WEBP, GIF, atau SVG." },
      { status: 400 }
    );
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "Ukuran maksimal 4 MB." }, { status: 400 });
  }

  try {
    const blob = await put(QRIS_PATH, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: file.type,
      token: blobToken(),
      cacheControlMaxAge: 60,
    });

    return NextResponse.json({
      ok: true,
      url: `${blob.url}?v=${Date.now()}`,
      rawUrl: blob.url,
      uploadedAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Gagal mengunggah: " + (err?.message || "unknown") },
      { status: 500 }
    );
  }
}

/** Hapus gambar QRIS. */
export async function DELETE() {
  if (!isAuthed()) {
    return NextResponse.json({ ok: false, error: "Tidak diizinkan." }, { status: 401 });
  }

  if (!blobToken()) {
    return NextResponse.json({ ok: false, error: "Blob belum dikonfigurasi." }, { status: 500 });
  }

  try {
    const { blobs } = await list({ prefix: QRIS_PREFIX, token: blobToken() });
    if (blobs && blobs.length > 0) {
      await del(
        blobs.map((b) => b.url),
        { token: blobToken() }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Gagal menghapus: " + (err?.message || "unknown") },
      { status: 500 }
    );
  }
}
