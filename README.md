# E-Commerce Flower Shop

![Logo](./public/logo.svg)

Aplikasi e-commerce untuk toko bunga online yang dibangun dengan React, Vite, dan Tailwind CSS.

## 📋 Deskripsi

E-Commerce Flower adalah platform belanja online yang menawarkan berbagai jenis bunga segar dan produk floral. Aplikasi ini memungkinkan pengguna untuk menjelajahi katalog produk, berlangganan pengiriman bunga berkala, dan melakukan pembelian dengan mudah.

## ✨ Fitur

- **Halaman Beranda** - Tampilan utama dengan highlight produk
- **Katalog Produk** - Jelajahi berbagai jenis bunga dan produk floral
- **Sistem Keranjang Belanja** - Tambahkan produk ke keranjang dan kelola pembelian
- **Checkout** - Proses pembayaran yang aman dan mudah
- **Langganan Bunga** - Layanan pengiriman bunga berkala
- **Halaman Tentang Kami** - Informasi tentang toko dan layanan
- **Halaman Kontak** - Formulir kontak dan informasi

## 🚀 Teknologi

Proyek ini dibangun dengan teknologi modern:

- **React** - Library JavaScript untuk membangun antarmuka pengguna
- **Vite** - Build tool yang cepat untuk pengembangan web
- **Tailwind CSS** - Framework CSS untuk desain yang responsif
- **React Router** - Navigasi antar halaman
- **Mantine** - Komponen UI yang dapat disesuaikan
- **AOS** - Animasi scroll
- **Swiper** - Slider/carousel untuk tampilan produk

## 📦 Struktur Proyek

```
ecommerce-flower/
├── public/                # Aset statis
├── src/
│   ├── assets/            # Gambar dan data
│   ├── components/        # Komponen React
│   │   ├── atoms/         # Komponen dasar
│   │   ├── molecules/     # Komponen menengah
│   │   ├── organisms/     # Komponen kompleks
│   │   └── templates/     # Template halaman
│   ├── features/          # Fitur aplikasi
│   ├── pages/             # Halaman aplikasi
│   │   ├── AboutUs/       # Halaman Tentang Kami
│   │   ├── CheckOut/      # Halaman Checkout
│   │   ├── Contact/       # Halaman Kontak
│   │   ├── Landing/       # Halaman Beranda
│   │   ├── Subscribe/     # Halaman Langganan
│   │   └── shopProducts/  # Halaman Produk
│   └── utils/             # Utilitas dan hooks
└── ...
```

## 🛠️ Instalasi dan Penggunaan

### Prasyarat

- Node.js (versi 14 atau lebih baru)
- npm atau yarn

### Langkah Instalasi

1. Clone repositori
   ```bash
   git clone [url-repositori]
   cd ecommerce-flower
   ```

2. Instal dependensi
   ```bash
   npm install
   # atau
   yarn
   ```

3. Jalankan aplikasi dalam mode pengembangan
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

4. Buka `http://localhost:5173` di browser Anda

### Perintah yang Tersedia

- `npm run dev` - Menjalankan server pengembangan
- `npm run build` - Membangun aplikasi untuk produksi
- `npm run preview` - Pratinjau build produksi
- `npm run lint` - Menjalankan ESLint

## 📝 Lisensi

Proyek ini dilisensikan di bawah [Lisensi MIT](./LICENSE).
