import { prisma } from "@/lib/prisma";
import Link from "next/link";
import DaftarProduk from "@/components/DaftarProduk";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const dataProduk = await prisma.alatGambar.findMany({
    orderBy: {
      id: "desc",
    },
  });

  // Hitung ringkasan statistik toko
  const totalProduk = dataProduk.length;
  const totalStok = dataProduk.reduce((acc, curr) => acc + curr.stok, 0);
  const totalKategori = new Set(dataProduk.map((p) => p.kategori)).size;
  const totalNilaiAset = dataProduk.reduce(
    (acc, curr) => acc + curr.harga * curr.stok,
    0
  );

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-8 sm:p-10 shadow-xl border border-stone-800">
        {/* Dekorasi Aksen Lingkaran di Belakang */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 rounded-full bg-orange-600/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
            <span>🎨</span>
            <span>Katalog & Inventaris Alat Gambar</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Perlengkapan Menggambar & <br className="hidden sm:block" />
            Seni Ilustrasi Terlengkap
          </h1>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Kelola inventaris produk seni mulai dari pensil grafit sketsa, cat
            air, spidol ilustrasi, buku sketsa, hingga peralatan studio.
            Dilengkapi fitur CRUD lengkap dan integrasi database PostgreSQL.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/tambah"
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm transition-all shadow-md hover:shadow-amber-500/25 flex items-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Tambah Produk Baru
            </Link>
          </div>
        </div>
      </div>

      {/* Ringkasan Statistik Kartu */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl">
            📦
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Total Macam Produk
            </span>
            <span className="text-2xl font-black text-stone-900">
              {totalProduk}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl">
            🏷️
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Kategori Alat Gambar
            </span>
            <span className="text-2xl font-black text-stone-900">
              {totalKategori}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xl">
            🔢
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Total Stok Unit
            </span>
            <span className="text-2xl font-black text-stone-900">
              {totalStok}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl">
            💰
          </div>
          <div>
            <span className="text-xs text-stone-500 font-medium block">
              Nilai Total Inventaris
            </span>
            <span className="text-lg font-black text-stone-900 leading-tight block">
              {formatRupiah(totalNilaiAset)}
            </span>
          </div>
        </div>
      </div>

      {/* Komponen Utama: Daftar Produk */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
            <span>Daftar Produk Alat Gambar</span>
          </h2>
        </div>

        <DaftarProduk initialProduk={dataProduk} />
      </div>
    </div>
  );
}