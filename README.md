# Remedial UTS Pemrograman Web - Toko Alat Gambar (ARTELIER)

Repository tugas Remedial Ulangan Tengah Semester (UTS) mata pelajaran **Pemrograman Web** kelas **XI PPLG**.  
Website ini bertema **Toko Perlengkapan Alat Gambar Lengkap (Artelier)** yang dibuat menggunakan **Next.js**, **Tailwind CSS**, dan **PostgreSQL** dengan **Prisma ORM**.

---

## 👤 Identitas Siswa
- **Nama Lengkap**: Sayyidah Mumtaza Hananillah
- **Kelas**: XI PPLG
- **No. Urut**: 30
- **Mata Pelajaran**: Pemrograman Web
- **Guru Pengampu**: Bu Wiwit

---

## 🎨 Tema & Deskripsi Website
Website e-commerce / katalog inventaris penjualan alat gambar dan perlengkapan seni rupa lengkap, mencakup berbagai produk seperti:
- Pensil grafit & sketsa (Faber-Castell, Derwent)
- Cat air & cat akrilik (Sakura Koi, Winsor & Newton)
- Drawing pen & spidol ilustrasi (Sakura Pigma Micron, Copic)
- Kertas gambar & sketchbook (Canson XL, Daler Rowney)
- Perlengkapan studio (Meja gambar arsitek, kuas lukis set, soft pastel)

---

## 📋 Pemenuhan Syarat Wajib Tugas UTS

| No | Syarat Halaman Wajib | Status | Rute / Halaman | Keterangan |
|---|---|:---:|---|---|
| 1 | **Halaman Utama** | ✅ Selesai | `/` | Menampilkan data produk alat gambar dalam bentuk **Kartu Produk** dan opsi **Tabel Data**, dilengkapi **tombol hapus** (dengan dialog konfirmasi), pencarian, dan filter kategori. |
| 2 | **Halaman Tambah** | ✅ Selesai | `/tambah` | Formulir input data alat gambar baru (nama, kategori, merk, harga, stok, gambar, deskripsi) dengan live preview foto. |
| 3 | **Halaman Edit** | ✅ Selesai | `/edit/[id]` | Formulir ubah data dengan **URL dinamis** (contoh: `/edit/1`) yang otomatis memuat data lama dan mengupdate database. |
| 4 | **API JSON** | ✅ Selesai | `/api/produk` & `/api/produk/[id]` | Rute API yang menampilkan data dalam format JSON (`GET`) serta mendukung `POST`, `PUT`, dan `DELETE`. |
| 5 | **Halaman Login** | ✅ Selesai | `/login` | Formulir login admin modern dengan show/hide password dan verifikasi autentikasi. |

---

## 🛠️ Teknologi yang Digunakan
- **Framework**: Next.js 16 (App Router)
- **Library UI**: React 19, Tailwind CSS v4
- **Database**: PostgreSQL 17
- **ORM**: Prisma Client & Prisma Pg Adapter
- **Bahasa**: TypeScript & JavaScript

---

## 🚀 Cara Menjalankan Project

### 1. Clone Repository
```bash
git clone https://github.com/SayyidahMumtazaHananillah-dev/UTS-PemWeb1.git
cd UTS-PemWeb1
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Konfigurasi Database (.env)
Buat atau sesuaikan file `.env` di folder utama:
```env
DATABASE_URL="postgresql://postgres:1111@localhost:5432/toko_alat_gambar"
```
*(Sesuaikan username, password, dan port PostgreSQL Anda jika berbeda).*

### 4. Migrasi & Sinkronisasi Database
Jalankan perintah sinkronisasi schema tabel ke PostgreSQL:
```bash
npx prisma db push
```

### 5. Masukkan Data Contoh (Seeding)
Jalankan script seed untuk mengisi data awal produk alat gambar dan akun admin:
```bash
node prisma/seed.js
```

### 6. Jalankan Server Development
```bash
npm run dev
```
Buka browser pada alamat [http://localhost:3000](http://localhost:3000).

---

## 🔐 Akun Login Admin (Pengujian)
Untuk mencoba fitur login admin pada halaman `/login`:
- **Username**: `admin`
- **Password**: `admin123` *(atau `admin`)*
- *Tersedia tombol "Isi Otomatis" pada halaman login untuk kemudahan pengujian.*

---

## 📂 Struktur Folder Utama
```text
├── app/
│   ├── api/
│   │   ├── auth/login/      # API Login
│   │   └── produk/          # API JSON data produk (/api/produk & /api/produk/[id])
│   ├── edit/[id]/           # Halaman Edit dengan URL Dinamis
│   ├── login/               # Halaman Login Admin
│   ├── tambah/              # Halaman Tambah Produk Baru
│   ├── tentang/             # Halaman Info Project & Profil Siswa
│   ├── globals.css          # Styling Tailwind CSS
│   ├── layout.tsx           # Layout utama & navigasi
│   └── page.tsx             # Halaman Utama (Katalog & Tabel Data)
├── components/
│   ├── DaftarProduk.tsx     # Komponen katalog, filter, toggle kartu/tabel
│   ├── Footer.tsx           # Komponen footer identitas siswa
│   ├── FormProduk.tsx       # Formulir input & edit data alat gambar
│   ├── Navbar.tsx           # Navigasi atas & status login
│   └── TombolHapus.tsx      # Komponen aksi hapus data dengan dialog modal
├── lib/
│   ├── actions.ts           # Server Actions untuk operasi CRUD
│   └── prisma.ts            # Konfigurasi koneksi Prisma Client ke PostgreSQL
├── prisma/
│   ├── schema.prisma        # Definisi model database (AlatGambar & Pengguna)
│   └── seed.js              # Script seeding data awal produk & admin
└── package.json
```
