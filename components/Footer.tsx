export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 mt-20 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                ARTELIER STORE
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              Website katalog dan manajemen penjualan alat gambar lengkap: dari
              pensil sketsa grafit, cat air, spidol ilustrasi, buku gambar, hingga
              meja gambar arsitek.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 rounded-full text-xs text-amber-400 border border-stone-700">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              PostgreSQL Connected (toko_alat_gambar)
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Spesifikasi Tugas UTS Remedial
            </h4>
            <ul className="text-sm text-stone-400 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Halaman Utama (Tabel / Kartu Data & Tombol Hapus)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Halaman Tambah (Formulir Input Data Baru)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Halaman Edit (Formulir Ubah URL Dinamis)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Rute API JSON (/api/produk)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">✓</span> Halaman Login Admin
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-3">
              Identitas Pembuat
            </h4>
            <div className="bg-stone-800/80 p-4 rounded-xl border border-stone-700/60 text-sm space-y-1.5">
              <p className="text-white font-semibold">
                Sayyidah Mumtaza Hananillah
              </p>
              <p className="text-stone-400 text-xs">
                Kelas: <span className="text-amber-300 font-medium">XI PPLG</span> | No. Urut: 30
              </p>
              <p className="text-stone-400 text-xs">
                Mata Pelajaran: <span className="text-stone-200">Pemrograman Web</span>
              </p>
              <p className="text-stone-400 text-xs">
                Guru Pengampu: <span className="text-stone-200">Bu Wiwit</span>
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-3">
          <p>© 2026 Artelier Store. Dibuat menggunakan Next.js & PostgreSQL.</p>
          <p>Remedial Ulangan Tengah Semester (UTS) Pemrograman Web</p>
        </div>
      </div>
    </footer>
  );
}
