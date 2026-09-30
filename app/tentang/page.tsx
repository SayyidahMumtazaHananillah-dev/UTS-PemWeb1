import Link from "next/link";

export const metadata = {
  title: "Tentang Project & Pengembang | ARTELIER",
};

export default function TentangPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header Info */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
          <span>📋</span>
          <span>Informasi Ujian & Pengembang</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
          Remedial UTS Pemrograman Web
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Projek website toko alat gambar lengkap ini dikembangkan sebagai
          pemenuhan tugas Remedial Ulangan Tengah Semester (UTS) mata pelajaran
          Pemrograman Web tingkat SMK Kompetensi Keahlian Pengembangan Perangkat
          Lunak dan Gim (PPLG).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-stone-100">
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500 uppercase tracking-wider block font-bold mb-1">
              Data Siswa
            </span>
            <p className="text-base font-bold text-stone-900">
              Sayyidah Mumtaza Hananillah
            </p>
            <p className="text-sm text-stone-600">No. Urut: 30</p>
            <p className="text-sm text-stone-600">Kelas: XI PPLG</p>
          </div>

          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200">
            <span className="text-xs text-stone-500 uppercase tracking-wider block font-bold mb-1">
              Informasi Pelajaran
            </span>
            <p className="text-base font-bold text-stone-900">
              Pemrograman Web
            </p>
            <p className="text-sm text-stone-600">Guru Pengampu: Bu Wiwit</p>
            <p className="text-sm text-stone-600">Tema: Penjualan Alat Gambar</p>
          </div>
        </div>
      </div>

      {/* Checklist Pemenuhan Syarat Wajib */}
      <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-xs space-y-5">
        <h2 className="text-xl font-bold text-stone-900">
          Pemenuhan Syarat Halaman Wajib
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">
                1. Halaman Utama
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                Selesai
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Memiliki tabel data dan kartu produk interaktif lengkap dengan
              tombol hapus terkonfirmasi, filter kategori, dan pencarian cepat.
            </p>
            <Link
              href="/"
              className="inline-block text-xs font-bold text-emerald-900 hover:underline pt-1"
            >
              Kunjungi Halaman Utama →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">
                2. Halaman Tambah
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                Selesai
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Formulir input data alat gambar baru dengan validasi, live photo
              preview, dan integrasi Server Actions ke PostgreSQL.
            </p>
            <Link
              href="/tambah"
              className="inline-block text-xs font-bold text-emerald-900 hover:underline pt-1"
            >
              Kunjungi Halaman Tambah →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">
                3. Halaman Edit (URL Dinamis)
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                Selesai
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Formulir ubah data dengan rute URL dinamis (contoh:{" "}
              <code>/edit/1</code>) yang memuat data lama dan memperbaruinya di
              database.
            </p>
            <span className="inline-block text-xs font-bold text-emerald-900 pt-1">
              Dapat diuji dari tombol edit di katalog
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">
                4. Rute API JSON
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                Selesai
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Endpoint REST API pada <code>/api/produk</code> dan{" "}
              <code>/api/produk/[id]</code> yang menyajikan dan mengelola data
              dalam format standar JSON.
            </p>
            <Link
              href="/api/produk"
              target="_blank"
              className="inline-block text-xs font-bold text-emerald-900 hover:underline pt-1"
            >
              Buka /api/produk (JSON) →
            </Link>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950 text-sm">
                5. Halaman Login Admin
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-200 text-emerald-900">
                Selesai
              </span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              Halaman login modern dengan UI estetik, toggle show/hide
              password, autentikasi terhubung database PostgreSQL, dan
              fitur auto-fill untuk pengujian praktis bagi penguji/guru.
            </p>
            <Link
              href="/login"
              className="inline-block text-xs font-bold text-emerald-900 hover:underline pt-1"
            >
              Kunjungi Halaman Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
