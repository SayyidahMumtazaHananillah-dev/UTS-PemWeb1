"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface ProdukData {
  id?: number;
  nama_produk?: string;
  kategori?: string;
  merk?: string;
  harga?: number;
  stok?: number;
  deskripsi?: string;
  gambar?: string;
}

interface FormProdukProps {
  initialData?: ProdukData;
  onSubmitAction: (formData: FormData) => Promise<void>;
  isEdit?: boolean;
}

const CONTOH_GAMBAR = [
  {
    label: "Pensil Faber-Castell",
    url: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Cat Air Sakura",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Drawing Pen",
    url: "https://images.unsplash.com/photo-1585336261026-613d09a06bdf?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Sketchbook Canson",
    url: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
  },
  {
    label: "Marker Ilustrasi",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
  },
];

const DAFTAR_KATEGORI = [
  "Pensil & Sketsa",
  "Cat & Kuas",
  "Marker & Pen",
  "Kertas & Sketchbook",
  "Peralatan & Aksesoris",
];

export default function FormProduk({
  initialData,
  onSubmitAction,
  isEdit = false,
}: FormProdukProps) {
  const [gambarUrl, setGambarUrl] = useState(
    initialData?.gambar ||
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80"
  );
  const [harga, setHarga] = useState(initialData?.harga || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // biarkan form action berjalan secara default
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <form
      action={onSubmitAction}
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-6 sm:p-8 rounded-2xl border border-stone-200 shadow-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri & Tengah: Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-bold text-stone-800 mb-1.5">
              Nama Produk Alat Gambar <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              name="nama_produk"
              required
              defaultValue={initialData?.nama_produk || ""}
              placeholder="Contoh: Pensil Grafit Faber-Castell 9000 Set 12"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 placeholder:text-stone-400 text-sm transition-all"
            />
          </div>

          {/* Kategori & Merk */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-1.5">
                Kategori <span className="text-rose-500">*</span>
              </label>
              <select
                name="kategori"
                required
                defaultValue={initialData?.kategori || "Pensil & Sketsa"}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm transition-all bg-white"
              >
                {DAFTAR_KATEGORI.map((kat) => (
                  <option key={kat} value={kat}>
                    {kat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-800 mb-1.5">
                Merk / Brand <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="merk"
                required
                defaultValue={initialData?.merk || ""}
                placeholder="Contoh: Faber-Castell, Sakura, Copic"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 placeholder:text-stone-400 text-sm transition-all"
              />
            </div>
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-stone-800 mb-1.5">
                Harga (Rupiah) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-stone-500 font-semibold text-sm">
                  Rp
                </span>
                <input
                  type="number"
                  name="harga"
                  required
                  min="0"
                  step="1000"
                  defaultValue={initialData?.harga || ""}
                  onChange={(e) => setHarga(parseInt(e.target.value) || 0)}
                  placeholder="Contoh: 85000"
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm font-medium transition-all"
                />
              </div>
              <p className="mt-1 text-xs text-amber-700 font-medium">
                Pratinjau: {formatRupiah(harga)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-800 mb-1.5">
                Jumlah Stok Unit <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                name="stok"
                required
                min="0"
                defaultValue={initialData?.stok ?? 10}
                placeholder="Contoh: 25"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm font-medium transition-all"
              />
            </div>
          </div>

          {/* URL Gambar */}
          <div>
            <label className="block text-sm font-bold text-stone-800 mb-1.5">
              URL Gambar Produk <span className="text-rose-500">*</span>
            </label>
            <input
              type="url"
              name="gambar"
              required
              value={gambarUrl}
              onChange={(e) => setGambarUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm transition-all"
            />
            {/* Tombol Preset Gambar Cepat */}
            <div className="mt-2.5 flex flex-wrap gap-1.5 items-center">
              <span className="text-xs text-stone-500 mr-1">
                Pilihan cepat:
              </span>
              {CONTOH_GAMBAR.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setGambarUrl(sample.url)}
                  className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-amber-100 hover:text-amber-900 text-stone-600 rounded-md transition-colors cursor-pointer border border-stone-200"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-bold text-stone-800 mb-1.5">
              Deskripsi Produk <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="deskripsi"
              rows={4}
              required
              defaultValue={initialData?.deskripsi || ""}
              placeholder="Jelaskan spesifikasi alat gambar, bahan, ukuran mata pena/kuas, dan keunggulan produk..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm transition-all placeholder:text-stone-400"
            ></textarea>
          </div>
        </div>

        {/* Kolom Kanan: Pratinjau Gambar & Kartu */}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-stone-800">
            Pratinjau Foto Produk
          </label>
          <div className="bg-stone-50 border-2 border-dashed border-stone-200 rounded-2xl p-4 text-center overflow-hidden">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 mb-3 shadow-inner">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={gambarUrl}
                alt="Pratinjau Gambar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80";
                }}
              />
            </div>
            <p className="text-xs text-stone-500">
              Pratinjau gambar alat gambar yang akan tampil di katalog.
            </p>
          </div>

          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-amber-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              Tips Input Data:
            </p>
            <p className="text-amber-800 leading-relaxed">
              Pastikan harga dalam bilangan bulat (rupiah), stok valid, dan URL
              gambar dapat diakses secara publik.
            </p>
          </div>
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-end gap-3">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 font-semibold text-sm transition-colors cursor-pointer"
        >
          Batal & Kembali
        </Link>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-bold text-sm transition-colors shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Menyimpan...
            </>
          ) : isEdit ? (
            "Simpan Perubahan"
          ) : (
            "Tambahkan Produk"
          )}
        </button>
      </div>
    </form>
  );
}
