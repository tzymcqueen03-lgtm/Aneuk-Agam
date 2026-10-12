# 🚀 Panduan Deploy ke Vercel

Repo GitHub: https://github.com/tzymcqueen03-lgtm/Aneuk-Agam

---

## Cara cepat (import langsung)

Klik tautan ini, lalu login/daftar Vercel pakai akun GitHub:

**https://vercel.com/new/clone?repository-url=https://github.com/tzymcqueen03-lgtm/Aneuk-Agam&env=ADMIN_PASSWORD**

---

## Langkah manual

### 1. Daftar / login Vercel
- Buka https://vercel.com/signup
- Pilih **Continue with GitHub** (paling mudah, langsung tersambung ke repo)

### 2. Import repo
- Buka https://vercel.com/new
- Cari repo **Aneuk-Agam** → klik **Import**
- Kalau repo tidak muncul: klik **Adjust GitHub App Permissions** → beri akses ke repo tersebut

### 3. Atur project
- **Framework Preset**: Next.js (otomatis terdeteksi — biarkan)
- **Root Directory**: `./` (biarkan)
- **Build Command**: `next build` (biarkan)
- **Output Directory**: `.next` (biarkan)

### 4. Tambah Environment Variables

Buka bagian **Environment Variables**, lalu isi satu per satu:

| Name | Value | Wajib? |
|---|---|---|
| `ADMIN_PASSWORD` | *(password rahasia pilihanmu, mis. `AneukAgam2025!`)* | ✅ **WAJIB** |
| `NEXT_PUBLIC_WA_NUMBER` | `6289520644539` | Opsional |
| `BLOB_READ_WRITE_TOKEN` | *(dari Storage → Blob, lihat bagian bawah)* | Opsional |

> **Penting**: `ADMIN_PASSWORD` harus diisi, kalau tidak halaman `/admin` tidak bisa login.

### 5. Deploy
- Klik **Deploy** → tunggu ±1 menit
- Selesai → dapat URL seperti `https://aneuk-agam.vercel.app`

### 6. Verifikasi
- Buka URL-nya → halaman utama harus tampil
- Buka `URL/admin` → harus muncul form login
- Login pakai `ADMIN_PASSWORD` yang tadi di-set

---

## Setelah deploy

### Update kode
Setiap kali kamu `git push` ke branch `main`, Vercel otomatis build & deploy ulang.

```bash
git add -A
git commit -m "update"
git push origin master:main
```

### QRIS
Sudah otomatis jalan — gambar `public/images/qris.jpg` ikut ter-deploy. Tidak perlu setup apa pun.

### Ganti QRIS dari halaman /admin (opsional)
Supaya bisa ganti QRIS tanpa push kode, aktifkan Vercel Blob:
1. Vercel Dashboard → tab **Storage** → **Create Database** → pilih **Blob**
2. Salin **`BLOB_READ_WRITE_TOKEN`**
3. Project → **Settings** → **Environment Variables** → tambah `BLOB_READ_WRITE_TOKEN`
4. **Redeploy** (Deployments → titik tiga → Redeploy)

Tanpa Blob: untuk ganti QRIS, timpa file `public/images/qris.jpg` lalu `git push`.

### Domain sendiri (opsional)
Project → **Settings** → **Domains** → tambah domain (mis. `aneukagam.com`), lalu atur DNS sesuai instruksi.

---

## Catatan keamanan

- ✅ `.env.local` **tidak** ikut ter-upload (sudah masuk `.gitignore`)
- ✅ Tidak ada password/token asli di dalam kode
- ⚠️ Repo GitHub ini **publik** (siapa saja bisa lihat kodenya). Kalau ingin privat:
  GitHub → repo → **Settings** → paling bawah → **Change visibility** → **Private**.
  (Vercel tetap bisa akses selama kamu sudah memberi izin GitHub App saat import.)
