"use client";

import { useState } from "react";
import Link from "next/link";
import TombolHapus from "./TombolHapus";

export interface ProdukItem {
  id: number;
  nama_produk: string;
  kategori: string;
  merk: string;
  harga: number;
  stok: number;
  deskripsi: string;
  gambar: string;
  createdAt: Date | string;
}

interface DaftarProdukProps {
  initialProduk: ProdukItem[];
}

export default function DaftarProduk({ initialProduk }: DaftarProdukProps) {
  const [produkList, setProdukList] = useState<ProdukItem[]>(initialProduk);
  const [kategoriTerpilih, setKategoriTerpilih] = useState("Semua");
  const [kataKunci, setKataKunci] = useState("");
  const [modeTampilan, setModeTampilan] = useState<"kartu" | "tabel">("kartu");

  // Filter berdasarkan kategori dan pencarian nama/merk
  const produkTersaring = produkList.filter((item) => {
    const cocokKategori =
      kategoriTerpilih === "Semua" || item.kategori === kategoriTerpilih;
    const cocokKataKunci =
      item.nama_produk.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.merk.toLowerCase().includes(kataKunci.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(kataKunci.toLowerCase());
    return cocokKategori && cocokKataKunci;
  });

  const daftarKategori = [
    "Semua",
    "Pensil & Sketsa",
    "Cat & Kuas",
    "Marker & Pen",
    "Kertas & Sketchbook",
    "Peralatan & Aksesoris",
  ];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Kontrol Pencarian, Filter & Switch Tampilan */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Input Pencarian */}
          <div className="relative flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 absolute left-3.5 top-3 text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Cari alat gambar berdasarkan nama, merk (contoh: Faber-Castell, Sakura, Copic)..."
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm transition-all placeholder:text-stone-400"
            />
          </div>

          {/* Toggle Tampilan Kartu vs Tabel */}
          <div className="flex items-center gap-2 self-end md:self-auto">
            <div className="bg-stone-100 p-1 rounded-xl flex items-center border border-stone-200">
              <button
                type="button"
                onClick={() => setModeTampilan("kartu")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  modeTampilan === "kartu"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
                Kartu Data
              </button>
              <button
                type="button"
                onClick={() => setModeTampilan("tabel")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  modeTampilan === "tabel"
                    ? "bg-white text-stone-900 shadow-xs"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
                Tabel Data
              </button>
            </div>

            <Link
              href="/tambah"
              className="px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
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
              Tambah Data
            </Link>
          </div>
        </div>

        {/* Tab Filter Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {daftarKategori.map((kat) => (
            <button
              key={kat}
              type="button"
              onClick={() => setKategoriTerpilih(kat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                kategoriTerpilih === kat
                  ? "bg-stone-900 text-white shadow-xs"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              {kat}
            </button>
          ))}
        </div>
      </div>

      {/* Info Jumlah Hasil */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <p>
          Menampilkan{" "}
          <span className="font-bold text-stone-800">
            {produkTersaring.length}
          </span>{" "}
          dari {produkList.length} produk alat gambar
        </p>
        {kataKunci && (
          <button
            onClick={() => setKataKunci("")}
            className="text-amber-700 font-semibold hover:underline"
          >
            Reset Pencarian
          </button>
        )}
      </div>

      {/* Tampilan Konten: Kartu Data vs Tabel Data */}
      {produkTersaring.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-stone-800 mb-1">
            Produk Tidak Ditemukan
          </h3>
          <p className="text-sm text-stone-500 max-w-sm mx-auto mb-5">
            Tidak ada produk alat gambar yang cocok dengan kata kunci &quot;{kataKunci}&quot; pada kategori &quot;{kategoriTerpilih}&quot;.
          </p>
          <button
            onClick={() => {
              setKataKunci("");
              setKategoriTerpilih("Semua");
            }}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800"
          >
            Lihat Semua Produk
          </button>
        </div>
      ) : modeTampilan === "kartu" ? (
        /* MODE KARTU DATA */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {produkTersaring.map((produk) => (
            <div
              key={produk.id}
              className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
            >
              {/* Gambar Produk */}
              <div className="relative aspect-4/3 bg-stone-100 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={produk.gambar}
                  alt={produk.nama_produk}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80";
                  }}
                />
                {/* Badge Kategori */}
                <span className="absolute top-2.5 left-2.5 px-2.5 py-1 bg-stone-900/80 backdrop-blur-xs text-white rounded-md text-[11px] font-bold">
                  {produk.kategori}
                </span>

                {/* Badge Stok */}
                <span
                  className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                    produk.stok > 10
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : produk.stok > 0
                      ? "bg-amber-100 text-amber-800 border border-amber-300"
                      : "bg-rose-100 text-rose-800 border border-rose-300"
                  }`}
                >
                  {produk.stok > 0 ? `Stok: ${produk.stok}` : "Habis"}
                </span>
              </div>

              {/* Konten Kartu */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-wider text-amber-700 uppercase block mb-1">
                    {produk.merk}
                  </span>
                  <h3 className="font-bold text-stone-900 text-sm leading-snug line-clamp-2 mb-2">
                    {produk.nama_produk}
                  </h3>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-3 leading-relaxed">
                    {produk.deskripsi}
                  </p>
                </div>

                <div>
                  {/* Harga */}
                  <div className="pt-3 border-t border-stone-100 mb-3 flex items-baseline justify-between">
                    <div>
                      <span className="text-[10px] text-stone-400 block">
                        Harga Satuan
                      </span>
                      <span className="text-base font-extrabold text-stone-900">
                        {formatRupiah(produk.harga)}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-400">
                      ID #{produk.id}
                    </span>
                  </div>

                  {/* Tombol Aksi: Edit & Hapus */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Link
                      href={`/edit/${produk.id}`}
                      className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 hover:text-amber-900 border border-amber-200 rounded-lg transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-3.5 h-3.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                      </svg>
                      Edit
                    </Link>
                    <TombolHapus id={produk.id} nama={produk.nama_produk} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* MODE TABEL DATA */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-600 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4 w-12 text-center">No</th>
                  <th className="py-3.5 px-4 w-20">Foto</th>
                  <th className="py-3.5 px-4">Nama Produk</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Merk</th>
                  <th className="py-3.5 px-4">Harga</th>
                  <th className="py-3.5 px-4 text-center">Stok</th>
                  <th className="py-3.5 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {produkTersaring.map((produk, idx) => (
                  <tr
                    key={produk.id}
                    className="hover:bg-amber-50/40 transition-colors"
                  >
                    <td className="py-3 px-4 text-center text-xs text-stone-500 font-medium">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-stone-100 border border-stone-200 flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={produk.gambar}
                          alt={produk.nama_produk}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80";
                          }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-stone-900 leading-snug">
                        {produk.nama_produk}
                      </p>
                      <p className="text-xs text-stone-500 line-clamp-1">
                        {produk.deskripsi}
                      </p>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-100 text-stone-700">
                        {produk.kategori}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs font-semibold text-stone-700 whitespace-nowrap">
                      {produk.merk}
                    </td>
                    <td className="py-3 px-4 font-bold text-stone-900 whitespace-nowrap">
                      {formatRupiah(produk.harga)}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-xs font-bold ${
                          produk.stok > 10
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : produk.stok > 0
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {produk.stok} unit
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/edit/${produk.id}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                          </svg>
                          Edit
                        </Link>
                        <TombolHapus id={produk.id} nama={produk.nama_produk} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
