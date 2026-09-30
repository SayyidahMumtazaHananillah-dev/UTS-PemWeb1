import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/produk
// Mengambil semua data produk alat gambar dalam format JSON
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const kategori = searchParams.get("kategori");
    const cari = searchParams.get("cari");

    let whereClause: any = {};

    if (kategori && kategori !== "Semua") {
      whereClause.kategori = kategori;
    }

    if (cari) {
      whereClause.OR = [
        { nama_produk: { contains: cari, mode: "insensitive" } },
        { merk: { contains: cari, mode: "insensitive" } },
      ];
    }

    const dataProduk = await prisma.alatGambar.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      sukses: true,
      pesan: "Data alat gambar berhasil diambil",
      total: dataProduk.length,
      data: dataProduk,
    });
  } catch (error) {
    console.error("Error pada GET /api/produk:", error);
    return NextResponse.json(
      {
        sukses: false,
        pesan: "Terjadi kesalahan pada server saat mengambil data",
      },
      { status: 500 }
    );
  }
}

// POST /api/produk
// Menambahkan produk alat gambar baru melalui API JSON
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.nama_produk || !body.kategori || !body.harga) {
      return NextResponse.json(
        {
          sukses: false,
          pesan: "Data tidak lengkap: nama_produk, kategori, dan harga wajib diisi",
        },
        { status: 400 }
      );
    }

    const produkBaru = await prisma.alatGambar.create({
      data: {
        nama_produk: body.nama_produk,
        kategori: body.kategori,
        merk: body.merk || "Umum",
        harga: Number(body.harga) || 0,
        stok: Number(body.stok) || 0,
        deskripsi: body.deskripsi || "",
        gambar:
          body.gambar ||
          "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
      },
    });

    return NextResponse.json(
      {
        sukses: true,
        pesan: "Produk alat gambar berhasil ditambahkan",
        data: produkBaru,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error pada POST /api/produk:", error);
    return NextResponse.json(
      {
        sukses: false,
        pesan: "Gagal menyimpan data baru melalui API",
      },
      { status: 500 }
    );
  }
}
