"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Action untuk menambahkan data produk alat gambar baru
export async function tambahProduk(formData: FormData) {
  const nama_produk = formData.get("nama_produk") as string;
  const kategori = formData.get("kategori") as string;
  const merk = formData.get("merk") as string;
  const harga = parseInt(formData.get("harga") as string) || 0;
  const stok = parseInt(formData.get("stok") as string) || 0;
  const deskripsi = (formData.get("deskripsi") as string) || "";
  const gambar =
    (formData.get("gambar") as string) ||
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80";

  await prisma.alatGambar.create({
    data: {
      nama_produk,
      kategori,
      merk,
      harga,
      stok,
      deskripsi,
      gambar,
    },
  });

  revalidatePath("/");
  redirect("/");
}

// Action untuk memperbarui data produk berdasarkan ID (URL dinamis)
export async function updateProduk(id: number, formData: FormData) {
  const nama_produk = formData.get("nama_produk") as string;
  const kategori = formData.get("kategori") as string;
  const merk = formData.get("merk") as string;
  const harga = parseInt(formData.get("harga") as string) || 0;
  const stok = parseInt(formData.get("stok") as string) || 0;
  const deskripsi = (formData.get("deskripsi") as string) || "";
  const gambar = formData.get("gambar") as string;

  await prisma.alatGambar.update({
    where: { id },
    data: {
      nama_produk,
      kategori,
      merk,
      harga,
      stok,
      deskripsi,
      gambar,
    },
  });

  revalidatePath("/");
  redirect("/");
}

// Action untuk menghapus produk
export async function hapusProduk(id: number) {
  try {
    await prisma.alatGambar.delete({
      where: { id },
    });

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Gagal menghapus produk:", error);
    return { success: false, error: "Gagal menghapus data" };
  }
}
