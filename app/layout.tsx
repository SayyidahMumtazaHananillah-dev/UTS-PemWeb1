import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ARTELIER | Toko Alat Gambar Lengkap",
  description:
    "Aplikasi web katalog & manajemen penjualan alat gambar lengkap untuk Remedial Ulangan Tengah Semester (UTS) Pemrograman Web SMK - Sayyidah Mumtaza Hananillah (XI PPLG).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-stone-50/70 text-stone-800 antialiased selection:bg-amber-200 selection:text-amber-900">
        <Navbar />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
