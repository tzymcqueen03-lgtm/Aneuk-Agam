import { site } from "@/config/site";
import { formatRupiah, formatTanggal } from "./format";

/**
 * Membuat teks pesan WhatsApp persis seperti format yang diminta,
 * lalu mengembalikan URL wa.me yang sudah URL-encoded.
 */
export function buildWhatsAppMessage({
  items = [],
  fast = false,
  total = 0,
  nama = "",
  deadline = "",
  catatan = "",
}) {
  const daftar =
    items.length > 0
      ? items.map((it) => `- ${it.name} ${formatRupiah(it.price)}`).join("\n")
      : "- (belum ada layanan dipilih)";

  const pesan = [
    "Halo AneukAgam, saya mau pesan:",
    daftar,
    `Jasa cepat: ${fast ? "Ya" : "Tidak"}`,
    `Total: ${formatRupiah(total)}`,
    `Nama: ${nama || "-"}`,
    `Deadline: ${deadline ? formatTanggal(deadline) : "-"}`,
    `Catatan: ${catatan && catatan.trim() ? catatan.trim() : "-"}`,
    "",
    "Silakan upload bukti pembayaran di chat ini.",
  ].join("\n");

  return pesan;
}

export function buildWhatsAppUrl(payload) {
  const text = buildWhatsAppMessage(payload);
  return `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
}

export const WA_UPLOAD_NOTE =
  "Setelah klik, upload bukti pembayaran ke WhatsApp.";
