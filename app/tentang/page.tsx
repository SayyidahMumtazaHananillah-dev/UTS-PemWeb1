import Link from "next/link";

export const metadata = {
  title: "Tentang Toko | Artelier Store",
};

export default function TentangPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Box Tentang */}
      <div className="bg-white rounded-xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-4">
        <h1 className="text-2xl font-bold text-stone-900">
          Tentang Artelier Store
        </h1>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Artelier Store adalah aplikasi katalog sederhana untuk mengelola
          inventaris alat gambar dan perlengkapan seni, seperti pensil sketsa,
          cat air, drawing pen, spidol ilustrasi, dan buku gambar.
        </p>

        <div className="pt-4 border-t border-stone-200">
          <h2 className="text-sm font-bold text-stone-800 mb-2">
            Informasi Pembuat
          </h2>
          <div className="bg-stone-50 p-4 rounded-lg border border-stone-200 text-sm space-y-1 text-stone-700">
            <p><strong>Nama:</strong> Sayyidah Mumtaza Hananillah</p>
            <p><strong>Kelas:</strong> XI PPLG</p>
            <p><strong>Mata Pelajaran:</strong> Pemrograman Web</p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-block text-xs font-semibold text-amber-700 hover:text-amber-800 hover:underline"
          >
            ← Kembali ke Katalog
          </Link>
        </div>
      </div>
    </div>
  );
}
