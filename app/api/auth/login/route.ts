import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { sukses: false, pesan: "Username dan password wajib diisi!" },
        { status: 400 }
      );
    }

    // Cek di database PostgreSQL
    const user = await prisma.pengguna.findUnique({
      where: { username },
    });

    if (user && user.password === password) {
      const response = NextResponse.json({
        sukses: true,
        pesan: "Login berhasil!",
        user: {
          username: user.username,
          nama: user.nama_lengkap,
          role: user.role,
        },
      });

      // Simpan session cookie
      response.cookies.set("user_session", user.username, {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24, // 1 hari
      });

      return response;
    }

    // Fallback akun default admin jika belum ada di db
    if (
      (username === "admin" && password === "admin123") ||
      (username === "admin" && password === "admin")
    ) {
      const response = NextResponse.json({
        sukses: true,
        pesan: "Login berhasil sebagai Administrator!",
        user: {
          username: "admin",
          nama: "Administrator Seni",
          role: "admin",
        },
      });

      response.cookies.set("user_session", "admin", {
        path: "/",
        httpOnly: false,
        maxAge: 60 * 60 * 24,
      });

      return response;
    }

    return NextResponse.json(
      { sukses: false, pesan: "Username atau password salah!" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { sukses: false, pesan: "Terjadi gangguan saat memproses login" },
      { status: 500 }
    );
  }
}
