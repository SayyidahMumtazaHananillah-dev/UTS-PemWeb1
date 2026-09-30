import Link from "next/link";
import FormProduk from "@/components/FormProduk";
import { tambahProduk } from "@/lib/actions";

export const metadata = {
  title: "Tambah Produk Alat Gambar | ARTELIER",
};

export default function TambahProdukPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumb & Judul */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <nav className="flex items-center gap-2 text-xs text-stone-500 mb-1">
            <Link href="/" className="hover:text-amber-800 transition-colors">
              Katalog
            </Link>
            <span>/</span>
            <span className="text-stone-800 font-semibold">Tambah Produk</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Tambah Data Alat Gambar Baru
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Isi formulir di bawah ini untuk menambahkan inventaris perlengkapan
            menggambar baru ke database.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl transition-colors self-start"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Kembali ke Katalog
        </Link>
      </div>

      {/* Formulir Tambah Data Produk */}
      <FormProduk onSubmitAction={tambahProduk} isEdit={false} />
    </div>
  );
}
