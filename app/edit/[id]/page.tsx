import { prisma } from "@/lib/prisma";
import Link from "next/link";
import FormProduk from "@/components/FormProduk";
import { updateProduk } from "@/lib/actions";

export const metadata = {
  title: "Edit Produk Alat Gambar | ARTELIER",
};

interface EditProdukPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProdukPage({ params }: EditProdukPageProps) {
  const { id } = await params;
  const produkId = parseInt(id);

  if (isNaN(produkId)) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border border-stone-200 text-center space-y-4">
        <h2 className="text-xl font-bold text-stone-900">ID Produk Tidak Valid</h2>
        <p className="text-sm text-stone-500">
          Parameter URL harus berupa angka ID produk yang valid.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800"
        >
          Kembali ke Katalog
        </Link>
      </div>
    );
  }

  // Ambil data produk lama dari PostgreSQL berdasarkan ID URL dinamis
  const produk = await prisma.alatGambar.findUnique({
    where: { id: produkId },
  });

  if (!produk) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-white rounded-2xl border border-stone-200 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
          !
        </div>
        <h2 className="text-xl font-bold text-stone-900">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-stone-500">
          Data produk alat gambar dengan ID #{produkId} tidak ada di database.
        </p>
        <Link
          href="/"
          className="inline-block px-4 py-2 bg-stone-900 text-white rounded-xl text-sm font-semibold hover:bg-stone-800"
        >
          Kembali ke Katalog Utama
        </Link>
      </div>
    );
  }

  // Ikat ID ke Server Action updateProduk
  const updateProdukDenganId = updateProduk.bind(null, produk.id);

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
            <span className="text-stone-800 font-semibold">
              Edit Produk #{produk.id}
            </span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Ubah Data Produk: {produk.nama_produk}
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            URL Dinamis: <code className="bg-stone-100 px-2 py-0.5 rounded text-amber-900 font-mono text-xs">/edit/{produk.id}</code>
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

      {/* Formulir Ubah Data dengan Data Lama */}
      <FormProduk
        initialData={produk}
        onSubmitAction={updateProdukDenganId}
        isEdit={true}
      />
    </div>
  );
}
