"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loginStatus = localStorage.getItem("login");
      const savedUser = localStorage.getItem("user");
      if (loginStatus === "true") {
        setIsLoggedIn(true);
        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setAdminName(parsed.nama || parsed.username || "Admin");
          } catch {
            setAdminName("Admin");
          }
        }
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLogin();
    window.addEventListener("loginStatusChanged", checkLogin);
    return () => window.removeEventListener("loginStatusChanged", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("login");
    localStorage.removeItem("user");
    document.cookie =
      "user_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("loginStatusChanged"));
    router.push("/login");
  };

  if (pathname === "/login") {
    return null;
  }

  const navLinks = [
    { href: "/", label: "Katalog Alat Gambar" },
    { href: "/tambah", label: "+ Tambah Produk" },
    { href: "/api/produk", label: "API JSON", external: true },
    { href: "/tentang", label: "Tentang Project" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-900/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-700 via-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
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
            <div>
              <span className="font-extrabold text-xl tracking-tight text-stone-900 block leading-none">
                ARTELIER<span className="text-amber-600">.</span>
              </span>
              <span className="text-[11px] font-medium text-stone-500 tracking-wider uppercase block">
                Toko Alat Gambar Lengkap
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-amber-100/80 text-amber-900 shadow-xs"
                      : "text-stone-600 hover:text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Info */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-amber-50/70 border border-amber-200/80 rounded-full py-1.5 pl-3 pr-1.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-semibold text-stone-800">
                    {adminName}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 hover:border-rose-300 rounded-full text-xs font-bold transition-all shadow-xs cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-sm font-semibold transition-all shadow-sm flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                  <polyline points="10 17 15 12 10 7" />
                  <line x1="15" x2="3" y1="12" y2="12" />
                </svg>
                Login Admin
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-semibold ${
                pathname === link.href
                  ? "bg-amber-100 text-amber-900"
                  : "text-stone-700 hover:bg-stone-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-stone-200">
            {isLoggedIn ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-stone-700">
                  {adminName}
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-md text-sm font-bold border border-rose-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full px-4 py-2 bg-stone-900 text-white rounded-md text-sm font-semibold"
              >
                Login Admin
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
