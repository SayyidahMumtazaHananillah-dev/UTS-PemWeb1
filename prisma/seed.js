const { Pool } = require("pg");
require("dotenv/config");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const dataProduk = [
  {
    nama_produk: "Pensil Sketsa Faber-Castell 9000 Art Set 12",
    kategori: "Pensil & Sketsa",
    merk: "Faber-Castell",
    harga: 115000,
    stok: 35,
    deskripsi:
      "Set pensil grafit profesional isi 12 tingkat kehitaman (8B sampai 2H). Lead tahan patah (SV bonding), ideal untuk teknik arsir halus, sketsa arsitektur, dan ilustrasi realistis.",
    gambar:
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Sakura Koi Watercolor Pocket Box 24 Warna",
    kategori: "Cat & Kuas",
    merk: "Sakura",
    harga: 245000,
    stok: 18,
    deskripsi:
      "Set cat air padat (half pan) portable dengan 24 warna cerah, dilengkapi water brush pen ukuran medium, spons penyerap, dan palet pencampur pada tutup box.",
    gambar:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Drawing Pen Sakura Pigma Micron Set 6 Hitam",
    kategori: "Marker & Pen",
    merk: "Sakura",
    harga: 98000,
    stok: 42,
    deskripsi:
      "Fineliner dengan tinta pigmen archival berkualitas museum, tahan air (waterproof), tahan pudar, dan cepat kering. Ukuran mata pena: 005, 01, 02, 03, 05, dan 08.",
    gambar:
      "https://images.unsplash.com/photo-1585336261026-613d09a06bdf?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Canson XL Aquarelle Watercolor Paper A4 300gsm",
    kategori: "Kertas & Sketchbook",
    merk: "Canson",
    harga: 88000,
    stok: 25,
    deskripsi:
      "Buku kertas cat air cold pressed isi 30 lembar spiral. Bebas asam (acid-free), tekstur halus medium yang menyerap air merata tanpa melengkung ekstrem.",
    gambar:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Copic Ciao Marker Set 12 Warna Basic",
    kategori: "Marker & Pen",
    merk: "Copic",
    harga: 475000,
    stok: 12,
    deskripsi:
      "Spidol alkohol ganda (dual tip: super brush & medium broad) standar ilustrator manga dan desainer konsep. Tinta transparan mudah dibaurkan dan dapat diisi ulang.",
    gambar:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Winsor & Newton Galeria Acrylic Colour 10 Set",
    kategori: "Cat & Kuas",
    merk: "Winsor & Newton",
    harga: 215000,
    stok: 15,
    deskripsi:
      "Cat akrilik kualitas studio dengan pigmen pekat, konsistensi buttery lembut, cepat kering dengan hasil akhir satin cemerlang pada media kanvas maupun kayu.",
    gambar:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Sketchbook Hardcover A5 Daler Rowney Ebony 150gsm",
    kategori: "Kertas & Sketchbook",
    merk: "Daler Rowney",
    harga: 79000,
    stok: 30,
    deskripsi:
      "Buku sketsa jilid hard cover elegan isi 62 lembar kertas putih 150gsm. Cocok untuk media kering seperti pensil grafit, pena tinta, arang sketsa, dan pastel.",
    gambar:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Meja Gambar Arsitek Portable A3 Multifungsi",
    kategori: "Peralatan & Aksesoris",
    merk: "Maries",
    harga: 320000,
    stok: 8,
    deskripsi:
      "Papan gambar teknik dan ilustrasi presisi ukuran A3 dengan rel paralel geser kunci ganda, penahan kertas magnetik, dan sudut kemiringan ergonomis yang dapat disetel.",
    gambar:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Kuas Lukis Set 15 Pcs Mont Marte Artist Brush",
    kategori: "Cat & Kuas",
    merk: "Mont Marte",
    harga: 135000,
    stok: 20,
    deskripsi:
      "Set lengkap kuas bulu sintetis taklon aneka bentuk: flat, round, filbert, fan, dan liner. Dilengkapi wadah kanvas zipper travel-friendly yang praktis dibawa.",
    gambar:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&auto=format&fit=crop&q=80",
  },
  {
    nama_produk: "Maries Soft Pastel 36 Warna Set",
    kategori: "Pensil & Sketsa",
    merk: "Maries",
    harga: 92000,
    stok: 22,
    deskripsi:
      "Krayon soft pastel lembut berpigmen tinggi dengan efek chalky halus, sangat mudah dibaurkan menggunakan jari atau blending stump pada kertas bertekstur.",
    gambar:
      "https://images.unsplash.com/photo-1580196969807-cc6de06c05be?w=800&auto=format&fit=crop&q=80",
  },
];

async function seed() {
  console.log("Memulai proses seeding database...");

  // Cek apakah tabel sudah memiliki data
  const checkProduk = await pool.query("SELECT COUNT(*) FROM alat_gambar");
  if (parseInt(checkProduk.rows[0].count) === 0) {
    for (const item of dataProduk) {
      await pool.query(
        `INSERT INTO alat_gambar (nama_produk, kategori, merk, harga, stok, deskripsi, gambar, "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())`,
        [
          item.nama_produk,
          item.kategori,
          item.merk,
          item.harga,
          item.stok,
          item.deskripsi,
          item.gambar,
        ]
      );
    }
    console.log(`Berhasil menambahkan ${dataProduk.length} data alat gambar.`);
  } else {
    console.log("Tabel alat_gambar sudah berisi data, lewati insert produk.");
  }

  // Cek data admin
  const checkUser = await pool.query("SELECT COUNT(*) FROM pengguna");
  if (parseInt(checkUser.rows[0].count) === 0) {
    await pool.query(
      `INSERT INTO pengguna (username, password, nama_lengkap, role, "createdAt")
       VALUES ($1, $2, $3, $4, NOW())`,
      ["admin", "admin123", "Sayyidah Mumtaza (Admin)", "admin"]
    );
    console.log("Berhasil menambahkan akun default admin (admin / admin123).");
  } else {
    console.log("Tabel pengguna sudah berisi data admin.");
  }

  await pool.end();
  console.log("Seeding selesai!");
}

seed().catch((err) => {
  console.error("Gagal melakukan seed:", err);
  process.exit(1);
});
