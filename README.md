# AneukAgam — Jasa Desain & Dokumen

Website pemesanan jasa desain & dokumen bergaya **neo-brutalism** (kuning, oranye, hitam, krem, border tebal, shadow keras).
Dibangun dengan **Next.js 14 (App Router) + Tailwind CSS + Framer Motion**, siap deploy ke **Vercel** tanpa database tambahan.

---

## 1. Menjalankan di komputer

```bash
npm install
cp .env.example .env.local   # Windows: copy .env.example .env.local
npm run dev
```

Buka http://localhost:3000

---

## 2. Mengubah harga / layanan / nomor WhatsApp

**Semua data ada di satu file:** `config/site.js`

| Yang mau diubah | Ubah di |
| --- | --- |
| Daftar layanan & harga | array `services` |
| Tambahan Jasa Kilat (Rp3.000) | `fastService.price` |
| Nomor WhatsApp | `site.waNumber` (format `62…`, tanpa `+` dan spasi) |
| Nama jasa, tagline, jam buka | objek `site` |
| Langkah cara pemesanan | array `steps` |
| Menu navigasi | array `navLinks` |

Contoh menambah layanan:

```js
{
  id: "desain-thumbnail",       // harus unik
  name: "Desain Thumbnail",
  price: 10000,
  unit: "per desain",
  icon: "image",                // lihat daftar ikon di lib/icons.jsx
  accent: "yellow",             // "yellow" | "orange" | "cream"
  badge: "BARU",                // opsional
  description: "Thumbnail YouTube yang bikin orang klik.",
  features: ["1280 × 720 px", "Teks tebal", "Siap upload"],
}
```

Harga ditulis sebagai angka tanpa titik: `7000` → otomatis tampil `Rp7.000`.

---

## 3. Environment Variables

Salin dari `.env.example`. Di Vercel: **Project → Settings → Environment Variables**.

| Nama | Wajib? | Fungsi |
| --- | --- | --- |
| `ADMIN_PASSWORD` | **Ya** | Password untuk masuk `/admin`. |
| `BLOB_READ_WRITE_TOKEN` | Tidak (opsional) | Menyimpan gambar QRIS di Vercel Blob. Tanpa ini, web pakai QRIS statis di `public/images/qris.jpg`. |
| `QRIS_FALLBACK_URL` | Tidak | URL gambar QRIS cadangan. Default otomatis `/images/qris.jpg`. |
| `NEXT_PUBLIC_WA_NUMBER` | Tidak | Override nomor WhatsApp (default `6289520644539`). |

> **QRIS sudah terpasang** (`public/images/qris.jpg` — Aneuk Agam, Service). Web langsung menampilkannya tanpa perlu setup apa pun.
> `BLOB_READ_WRITE_TOKEN` hanya perlu bila kamu mau **mengganti** QRIS lewat `/admin` (agar tersimpan permanen).

---

## 4. Deploy ke Vercel (langkah lengkap)

### A. Push ke GitHub
```bash
git init
git add .
git commit -m "AneukAgam: website jasa desain & dokumen"
git branch -M main
git remote add origin https://github.com/USERNAME/aneukagam.git
git push -u origin main
```

### B. Import di Vercel
1. Buka https://vercel.com/new
2. Pilih repo `aneukagam` → **Import**
3. Framework otomatis terdeteksi **Next.js** → **Deploy**

### C. Buat Blob store (untuk QRIS permanen)
1. Buka project di Vercel → tab **Storage**
2. **Create Database** → pilih **Blob** → **Create**
3. Pilih project `aneukagam` → **Connect**
4. Vercel otomatis menambahkan `BLOB_READ_WRITE_TOKEN` ke environment variables.

### D. Set `ADMIN_PASSWORD`
1. Project → **Settings** → **Environment Variables**
2. **Add New** → Key: `ADMIN_PASSWORD`, Value: password rahasia kamu (Production + Preview + Development)
3. **Save**

### E. Redeploy
Deploy ulang agar environment variable terbaca:
```bash
git commit --allow-empty -m "redeploy" && git push
```
atau di Vercel: **Deployments → ⋯ → Redeploy**.

### F. Unggah QRIS
1. Buka `https://nama-project.vercel.app/admin`
2. Masukkan `ADMIN_PASSWORD` → **Masuk**
3. Klik / tarik gambar QRIS → otomatis tersimpan di Blob
4. Buka halaman pemesanan → gambar QRIS langsung tampil

---

## 5. Struktur Proyek

```
aneukagam/
├── app/
│   ├── page.jsx                 # Halaman utama (hero → etalase → cara pesan → form → footer)
│   ├── layout.jsx               # Font, metadata, CartProvider, CartBar
│   ├── globals.css              # Design system neo-brutalism (Tombol, badge, pola, input)
│   ├── not-found.jsx
│   ├── admin/page.jsx           # /admin (dilindungi password)
│   └── api/
│       ├── qris/route.js        # GET publik: URL QRIS terbaru
│       └── admin/
│           ├── login/route.js   # POST login
│           ├── logout/route.js  # POST logout
│           └── qris/route.js    # GET/POST/DELETE QRIS (butuh login)
├── components/
│   ├── CartProvider.jsx         # State keranjang + localStorage
│   ├── CartBar.jsx              # Bar total harga selalu terlihat + drawer
│   ├── Navbar.jsx / Hero.jsx / ServiceShowcase.jsx / ServiceCard.jsx
│   ├── HowToOrder.jsx / OrderForm.jsx / Footer.jsx / FloatingWhatsApp.jsx
│   ├── admin/AdminLogin.jsx / admin/AdminDashboard.jsx
│   └── ui/  (Reveal, Stagger, CountUp, Marquee, SectionHeading, Patterns)
├── config/site.js               # ★ SEMUA DATA: layanan, harga, WA, langkah
├── lib/  (format.js, whatsapp.js, auth.js, icons.jsx)
└── public/images/qris-placeholder.svg
```

---

## 6. Format pesan WhatsApp otomatis

Saat pengunjung klik **Pesan via WhatsApp**, pesan terisi otomatis (URL-encoded):

```
Halo AneukAgam, saya mau pesan:
- Rapikan Makalah Rp7.000
- Desain Cover Makalah Rp7.000
Jasa cepat: Ya
Total: Rp17.000
Nama: Rizki Ananda
Deadline: 20 Desember 2025
Catatan: Pakai font Times New Roman 12

Silakan upload bukti pembayaran di chat ini.
```

Tujuan: `wa.me/6289520644539`. Di web juga ditampilkan tulisan
**"Setelah klik, upload bukti pembayaran ke WhatsApp."**

---

## 7. Aset gambar yang perlu kamu siapkan

Lihat **`IMAGE_PROMPTS.md`** — ada prompt lengkap (ukuran + nama file) untuk:
QRIS, ilustrasi hero, ikon layanan, dan gambar Open Graph.

Selama belum diunggah, website tetap tampil rapi memakai ikon SVG bawaan + placeholder.
