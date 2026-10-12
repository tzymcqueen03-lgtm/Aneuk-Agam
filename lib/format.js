// Utilitas format harga & tanggal — dipakai di seluruh aplikasi.

export function formatRupiah(value) {
  const n = Number(value) || 0;
  return "Rp" + n.toLocaleString("id-ID");
}

// Versi ringkas tanpa "Rp" (untuk animasi count-up di keranjang)
export function formatNumber(value) {
  const n = Math.round(Number(value) || 0);
  return n.toLocaleString("id-ID");
}

export function formatTanggal(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso + "T00:00:00");
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export function hitungTotal({ items = [], fast = false, fastPrice = 0 }) {
  const subtotal = items.reduce((acc, it) => acc + (Number(it.price) || 0), 0);
  const fastFee = fast ? Number(fastPrice) || 0 : 0;
  return { subtotal, fastFee, total: subtotal + fastFee };
}
