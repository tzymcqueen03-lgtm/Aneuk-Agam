// ============================================================================
//  ANEUKAGAM — KONFIGURASI UTAMA
//  Ubah semua konten website dari file ini: nama jasa, harga, nomor WA, dll.
//  TIDAK perlu menyentuh file lain kalau hanya mau mengubah harga/layanan.
// ============================================================================

export const site = {
  name: "AneukAgam",
  tagline: "Jasa Desain & Dokumen Kilat",
  description:
    "AneukAgam bantu kamu beresin makalah, PPT, poster, CV, dan desain lainnya. Pesan cepat, harga ramah kantong, hasil rapi.",
  // Nomor WhatsApp tujuan (format internasional, tanpa "+" dan tanpa spasi)
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER || "6289520644539",
  waNumberPretty: "+62 895-2064-4539",
  email: "aneukagam@example.com",
  instagram: "@aneukagam",
  city: "Sumatera Barat, Indonesia",
  hours: "Senin – Minggu, 08.00 – 23.00 WIB",
};

// ----------------------------------------------------------------------------
//  TOGGLE "JASA CEPAT (KILAT)"
// ----------------------------------------------------------------------------
export const fastService = {
  label: "Jasa Cepat (Kilat)",
  shortLabel: "KILAT",
  description:
    "Pesanan kamu dikerjakan paling depan. Prioritas antrean + respons lebih cepat.",
  price: 3000, // tambahan per pesanan
};

// ----------------------------------------------------------------------------
//  DAFTAR LAYANAN  —  tambah / ubah / hapus baris di sini saja.
//  icon  : nama ikon dari lib/icons.jsx  (lihat daftar yang tersedia di sana)
//  image : (opsional) path gambar di /public/images/services/xxx.png
//          Kalau diisi, gambar dipakai. Kalau kosong, pakai `icon`.
// ----------------------------------------------------------------------------
export const services = [
  {
    id: "rapikan-makalah",
    name: "Rapikan Makalah",
    price: 7000,
    unit: "per dokumen",
    icon: "document",
    badge: "TERLARIS",
    accent: "yellow",
    description:
      "Format, margin, daftar isi, nomor halaman, dan daftar pustaka diberesin sesuai kaidah kampus.",
    features: ["Margin & spasi rapi", "Daftar isi otomatis", "Daftar pustaka"],
  },
  {
    id: "buat-ppt",
    name: "Buat PPT",
    price: 15000,
    unit: "per deck",
    icon: "presentation",
    accent: "orange",
    description:
      "Presentasi siap tampil dengan layout bersih, poin-poin padat, dan visual pendukung.",
    features: ["Desain slide konsisten", "Poin padat & jelas", "Bisa revisi minor"],
  },
  {
    id: "infografis",
    name: "Infografis",
    price: 10000,
    unit: "per desain",
    icon: "chart",
    accent: "cream",
    description:
      "Data dan informasi rumit diubah jadi visual sekali lihat yang enak dibaca.",
    features: ["Visualisasi data", "Hierarki informasi jelas", "Siap share sosmed"],
  },
  {
    id: "cv",
    name: "CV",
    price: 15000,
    unit: "per CV",
    icon: "id-card",
    accent: "orange",
    badge: "ATS FRIENDLY",
    description:
      "Curriculum Vitae profesional yang lolos seleksi awal dan enak dipandang rekruter.",
    features: ["Format ATS friendly", "Layout bersih", "File PDF siap kirim"],
  },
  {
    id: "desain-cover-makalah",
    name: "Desain Cover Makalah",
    price: 7000,
    unit: "per cover",
    icon: "book",
    accent: "yellow",
    description:
      "Cover makalah, skripsi, atau laporan yang kelihatan serius dan tidak pasaran.",
    features: ["Cetak & digital", "Ukuran A4", "Logo kampus disesuaikan"],
  },
  {
    id: "buat-makalah",
    name: "Buat Makalah",
    price: 15000,
    unit: "per makalah",
    icon: "pencil",
    accent: "orange",
    badge: "POPULER",
    description:
      "Makalah disusun dari nol sesuai topik dan referensi yang kamu berikan.",
    features: ["Susunan sistematis", "Referensi relevan", "Bahasa akademik"],
  },
  {
    id: "desain-poster",
    name: "Desain Poster",
    price: 12000,
    unit: "per poster",
    icon: "image",
    accent: "cream",
    description:
      "Poster promosi, informasi, atau himbauan dengan pesan yang langsung nangkep.",
    features: ["Ukuran fleksibel", "Tipografi kuat", "File cetak & digital"],
  },
  {
    id: "desain-banner",
    name: "Desain Banner",
    price: 12000,
    unit: "per banner",
    icon: "banner",
    accent: "yellow",
    description:
      "Banner spanduk dan baliho ukuran besar dengan teks yang tetap terbaca dari jauh.",
    features: ["Siap cetak besar", "Resolusi tinggi", "Warna tahan pudar"],
  },
  {
    id: "desain-poster-acara",
    name: "Desain Poster Acara",
    price: 12000,
    unit: "per desain",
    icon: "calendar",
    accent: "orange",
    description:
      "Poster seminar, lomba, konser, atau acara kampus yang bikin orang penasaran.",
    features: ["Info acara lengkap", "Gaya sesuai tema", "Siap posting"],
  },
  {
    id: "desain-brosur",
    name: "Desain Brosur",
    price: 15000,
    unit: "per brosur",
    icon: "flyer",
    accent: "cream",
    description:
      "Brosur lipat dua atau tiga dengan alur informasi yang mengalir dan rapi.",
    features: ["Lipat 2 / 3", "Siap cetak", "Layout informatif"],
  },
  {
    id: "desain-sertifikat",
    name: "Desain Sertifikat",
    price: 10000,
    unit: "per desain",
    icon: "award",
    accent: "yellow",
    description:
      "Sertifikat penghargaan, pelatihan, atau lomba dengan ornamen yang pantas dipajang.",
    features: ["Ada area tanda tangan", "Nomor sertifikat", "Cetak A4 / F4"],
  },
  {
    id: "kartu-nama",
    name: "Kartu Nama",
    price: 7000,
    unit: "per desain",
    icon: "card",
    accent: "orange",
    description:
      "Kartu nama minimalis sampai berani, tinggal serahkan ke percetakan.",
    features: ["Siap cetak", "Desain 2 sisi", "QR code opsional"],
  },
];

// ----------------------------------------------------------------------------
//  LANGKAH CARA PEMESANAN
// ----------------------------------------------------------------------------
export const steps = [
  {
    no: "01",
    title: "Pilih Layanan",
    text: "Centang layanan yang kamu butuh di etalase. Bisa lebih dari satu, totalnya dihitung otomatis.",
  },
  {
    no: "02",
    title: "Isi Form Pesanan",
    text: "Isi nama, deadline, dan catatan khusus. Aktifkan Jasa Cepat kalau butuh prioritas.",
  },
  {
    no: "03",
    title: "Bayar Pakai QRIS",
    text: "Scan gambar QRIS di ringkasan pesanan, lalu simpan bukti pembayarannya.",
  },
  {
    no: "04",
    title: "Kirim ke WhatsApp",
    text: "Klik Pesan via WhatsApp. Pesanan otomatis terformat, tinggal upload bukti bayar di chat.",
  },
];

// ----------------------------------------------------------------------------
//  NAVIGASI
// ----------------------------------------------------------------------------
export const navLinks = [
  { label: "Layanan", href: "#layanan" },
  { label: "Cara Pesan", href: "#cara-pesan" },
  { label: "Pesan", href: "#pesan" },
];

// ----------------------------------------------------------------------------
//  HELPER — jangan perlu diubah
// ----------------------------------------------------------------------------
export function getServiceById(id) {
  return services.find((s) => s.id === id) || null;
}

export const accentClasses = {
  yellow: {
    bg: "bg-brand-yellow",
    badge: "bg-ink text-cream",
    chip: "bg-brand-yellow text-ink",
  },
  orange: {
    bg: "bg-brand-orange",
    badge: "bg-ink text-cream",
    chip: "bg-brand-orange text-cream",
  },
  cream: {
    bg: "bg-cream",
    badge: "bg-ink text-cream",
    chip: "bg-cream text-ink",
  },
};
