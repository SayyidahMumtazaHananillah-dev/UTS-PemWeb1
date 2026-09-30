import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/produk/[id]
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const produkId = parseInt(id);

    if (isNaN(produkId)) {
      return NextResponse.json(
        { sukses: false, pesan: "ID produk tidak valid" },
        { status: 400 }
      );
    }

    const produk = await prisma.alatGambar.findUnique({
      where: { id: produkId },
    });

    if (!produk) {
      return NextResponse.json(
        { sukses: false, pesan: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      sukses: true,
      data: produk,
    });
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memproses data" },
      { status: 500 }
    );
  }
}

// PUT /api/produk/[id]
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const produkId = parseInt(id);
    const body = await request.json();

    const updated = await prisma.alatGambar.update({
      where: { id: produkId },
      data: {
        nama_produk: body.nama_produk,
        kategori: body.kategori,
        merk: body.merk,
        harga: Number(body.harga),
        stok: Number(body.stok),
        deskripsi: body.deskripsi,
        gambar: body.gambar,
      },
    });

    return NextResponse.json({
      sukses: true,
      pesan: "Produk berhasil diperbarui",
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: "Gagal memperbarui data produk" },
      { status: 500 }
    );
  }
}

// DELETE /api/produk/[id]
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const produkId = parseInt(id);

    await prisma.alatGambar.delete({
      where: { id: produkId },
    });

    return NextResponse.json({
      sukses: true,
      pesan: "Produk berhasil dihapus",
    });
  } catch (error) {
    return NextResponse.json(
      { sukses: false, pesan: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}
