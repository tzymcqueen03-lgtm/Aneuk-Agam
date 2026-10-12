# AneukAgam — Prompt Gambar & Aset

Website sudah jadi dan **berfungsi penuh tanpa gambar apa pun** (memakai ikon SVG + placeholder).
Dokumen ini berisi prompt siap-tempel untuk AI image generator (Midjourney, DALL·E, Leonardo, Ideogram, dsb.)
beserta **ukuran dan nama file** yang tepat.

> Gaya wajib untuk semua aset: **neo-brutalism, flat vector, border hitam tebal (±6–10 px),
> hard shadow tanpa blur, palet terbatas: krem `#F7F5F0`, kuning `#FFC800`, oranye `#FF5A00`,
> hitam `#111111`. Tanpa gradasi, tanpa blur, tanpa teks tambahan (kecuali disebutkan).**

---

## 1. Gambar QRIS (WAJIB — untuk pembayaran)

Ini **bukan** gambar yang di-generate AI. Ambil dari aplikasi bank/e-wallet kamu
(GoPay, OVO, DANA, ShopeePay, m-banking) lalu unggah lewat `/admin`.

- **Nama file:** bebas, mis. `qris-aneukagam.png`
- **Format:** PNG
- **Ukuran:** 1000 × 1000 px (persegi, minimal 800 × 800 px)
- **Berat:** < 4 MB
- **Syarat:** seluruh kode QR terlihat utuh, tidak terpotong, tidak ada watermark menutupi QR.

Selama belum diunggah, halaman pemesanan menampilkan placeholder
`public/images/qris-placeholder.svg` + teks "QRIS belum diunggah".

---

## 2. Gambar Open Graph (untuk preview saat dibagikan di WhatsApp/IG)

- **Nama file:** `og-image.png`
- **Lokasi:** `public/og-image.png`
- **Ukuran:** 1200 × 630 px
- **Rasio:** 1.91:1

**Prompt:**
> Neo-brutalism social share card, flat vector illustration, 1200x630. Background solid cream #F7F5F0 with a
> black halftone dot cluster in the top-left corner and black-and-yellow diagonal hazard stripes along the bottom
> edge. Huge ultra-bold condensed uppercase black text "ANEUKAGAM" centered-left, with a thick solid black
> outline and a hard black offset shadow. Below it, smaller bold uppercase text "JASA DESAIN & DOKUMEN" on a
> solid yellow #FFC800 rectangle with a thick black border. On the right side, a flat vector illustration of a
> stack of papers and a laptop drawn with thick black outlines, filled with yellow and orange. Bold orange
> #FF5A00 square accents. No gradients, no blur, high contrast, industrial sticker look.

Setelah file ada, tambahkan baris ini di `app/layout.jsx` pada objek `metadata`:

```js
openGraph: {
  // ...yang sudah ada
  images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "AneukAgam" }],
},
```

---

## 3. Ilustrasi Hero (opsional — pengganti kartu "Tiket Pesanan")

Kalau mau hero lebih hidup, ganti komponen kartu tiket di `components/Hero.jsx`.

- **Nama file:** `hero-illustration.png`
- **Lokasi:** `public/images/hero-illustration.png`
- **Ukuran:** 1000 × 1000 px (PNG transparan)
- **Latar:** transparan (alpha)

**Prompt:**
> Neo-brutalism flat vector illustration, thick bold black outlines (8px), no gradients, no blur. A cheerful
> young Indonesian student sitting cross-legged on the floor with a laptop, surrounded by floating objects:
> a stack of papers, a presentation slide, a poster on a stick, an ID card, and a certificate. Limited palette
> only: cream #F7F5F0, golden yellow #FFC800, vivid orange #FF5A00, near-black #111111. Solid black hard drop
> shadows with zero blur. Black halftone dot cluster behind the character, small black-and-white diagonal
> stripes near the bottom. Industrial sticker aesthetic, high contrast, clean flat shapes, transparent
> background, square composition.

---

## 4. Ikon Layanan (opsional — saat ini pakai SVG di `lib/icons.jsx`)

Kalau ingin ikon berwarna, buat 12 gambar terpisah.

- **Lokasi:** `public/images/services/`
- **Ukuran:** 256 × 256 px (PNG transparan)
- **Nama file (tepat seperti ini):**

| No | Nama file | Layanan | Prompt inti (tambahkan gaya neo-brutalism di atas) |
|----|-----------|---------|---------------------------------------------------|
| 1 | `rapikan-makalah.png` | Rapikan Makalah | flat vector stack of papers with aligned text lines, a ruler and a checklist |
| 2 | `buat-ppt.png` | Buat PPT | flat vector presentation screen on a stand with a rising bar chart and a pointer |
| 3 | `infografis.png` | Infografis | flat vector infographic board with pie chart, bar chart and a big percentage badge |
| 4 | `cv.png` | CV | flat vector resume document with a portrait circle and bullet lines |
| 5 | `desain-cover-makalah.png` | Desain Cover Makalah | flat vector closed book cover with a geometric emblem |
| 6 | `buat-makalah.png` | Buat Makalah | flat vector open notebook with a pencil writing a line |
| 7 | `desain-poster.png` | Desain Poster | flat vector poster sheet with a bold headline block and an image frame |
| 8 | `desain-banner.png` | Desain Banner | flat vector horizontal banner mounted on two poles |
| 9 | `desain-poster-acara.png` | Desain Poster Acara | flat vector event poster with a calendar block and a date ribbon |
| 10 | `desain-brosur.png` | Desain Brosur | flat vector tri-fold brochure with three panels |
| 11 | `desain-sertifikat.png` | Desain Sertifikat | flat vector certificate with a seal ribbon and signature line |
| 12 | `kartu-nama.png` | Kartu Nama | flat vector business card with a name line and a small QR square |

**Contoh prompt lengkap (untuk `desain-poster.png`):**
> Neo-brutalism flat vector icon, thick bold black outline 8px, no gradient, no blur, centered composition,
> 256x256, transparent background. A single poster sheet with a bold black headline bar and a framed image
> area, filled with golden yellow #FFC800 and vivid orange #FF5A00 on cream #F7F5F0, with a solid black hard
> shadow offset 8px down-right. Industrial sticker style, high contrast, flat shapes only.

Setelah semua ikon ada, isi properti `image` pada tiap layanan di `config/site.js`:

```js
{
  id: "desain-poster",
  // ...
  image: "/images/services/desain-poster.png",
}
```

*(Komponen `ServiceCard` otomatis pakai `image` bila ada, dan jatuh kembali ke ikon SVG bila kosong.)*

---

## 5. Favicon / Ikon Aplikasi (opsional)

- **Nama file:** `icon.png` → letakkan di `app/icon.png` (Next.js mendeteksi otomatis)
- **Ukuran:** 512 × 512 px

**Prompt:**
> Neo-brutalism app icon, flat vector, 512x512. Solid vivid orange #FF5A00 square with a thick black border.
> A bold white lightning bolt in the center with a thick black outline, plus a small yellow #FFC800 square
> accent in the top-right corner. Hard black shadow, no gradient, no blur, no text, high contrast sticker look.

---

## Ringkasan Checklist

| Aset | Wajib? | Nama file | Ukuran | Lokasi |
|------|--------|-----------|--------|--------|
| QRIS | **Ya** | bebas (`.png`) | 1000×1000 | diunggah via `/admin` |
| OG image | Disarankan | `og-image.png` | 1200×630 | `public/` |
| Hero illustration | Tidak | `hero-illustration.png` | 1000×1000 | `public/images/` |
| Ikon layanan (12) | Tidak | `nama-layanan.png` | 256×256 | `public/images/services/` |
| App icon | Tidak | `icon.png` | 512×512 | `app/` |

Selama aset belum diunggah, website tetap tampil rapi dan **fungsional penuh**.
