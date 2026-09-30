"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.sukses) {
        setSuccessMessage("Login berhasil! Mengalihkan ke halaman utama...");
        localStorage.setItem("login", "true");
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("loginStatusChanged"));

        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 800);
      } else {
        setErrorMessage(data.pesan || "Username atau password salah!");
      }
    } catch (err) {
      setErrorMessage("Terjadi gangguan koneksi ke server database.");
    } finally {
      setIsLoading(false);
    }
  };

  const autofillAdmin = () => {
    setUsername("admin");
    setPassword("admin123");
    setErrorMessage("");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md">
        {/* Box Kartu Login */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-stone-200/80 relative overflow-hidden">
          {/* Aksen Latar Belakang */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-700"></div>

          {/* Logo & Judul */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto mb-3 shadow-inner">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 11-1.5-1.5a4.24 4.24 0 0 0-6 0L2 18l3 3 8.5-8.5a4.24 4.24 0 0 0 0-6L12 5" />
                <path d="m9 15 2 2" />
                <path d="M14.5 9.5 16 11" />
                <circle cx="19" cy="5" r="2" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-stone-900 tracking-tight">
              Portal Admin Toko
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Masuk untuk mengelola katalog inventaris alat gambar Artelier
            </p>
          </div>

          {/* Alert Notifikasi Error */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Alert Notifikasi Sukses */}
          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          {/* Formulir Login */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-stone-400">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username admin"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm transition-all placeholder:text-stone-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-3 text-stone-400">
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi"
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-stone-800 text-sm transition-all placeholder:text-stone-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-2.5 text-stone-400 hover:text-stone-600 p-1 cursor-pointer"
                  title={showPassword ? "Sembunyikan" : "Tampilkan"}
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
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
                  Memverifikasi...
                </>
              ) : (
                "Masuk Sekarang"
              )}
            </button>
          </form>

          {/* Tombol Isi Otomatis Kredensial Pengujian */}
          <div className="mt-6 pt-5 border-t border-stone-200">
            <div className="bg-amber-50/80 rounded-xl p-3.5 border border-amber-200 text-xs text-amber-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold flex items-center gap-1">
                  <span>🔑</span> Kredensial Default Guru / Penguji:
                </span>
                <button
                  type="button"
                  onClick={autofillAdmin}
                  className="text-[11px] font-bold text-amber-800 hover:text-amber-950 underline cursor-pointer"
                >
                  Isi Otomatis
                </button>
              </div>
              <div className="font-mono text-[11px] text-stone-700 bg-white/80 p-2 rounded-lg border border-amber-200/60">
                <p>Username: <strong className="text-stone-900">admin</strong></p>
                <p>Password: <strong className="text-stone-900">admin123</strong> (atau <strong>admin</strong>)</p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-xs text-stone-500 hover:text-stone-900 transition-colors inline-flex items-center gap-1"
            >
              <span>←</span> Kembali ke Halaman Utama Tanpa Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
