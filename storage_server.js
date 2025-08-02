/* eslint-disable @typescript-eslint/no-require-imports */
const express = require("ultimate-express");
const path = require("path");
require("dotenv").config();

// Ambil PORT dari environment, jika tidak ada gunakan 3001

const PORT = process.env.PORT || 3001;

// Akses path absolut ke folder ../storage dari dalam server/index.js
// const storagePath = path.resolve(__dirname, "../storage");

const storagePath = path.join(
  __dirname,
  process.env.STORAGE_ROOT || "./storage"
);
// Inisialisasi ultimate-express
const app = express({ threads: 4 });

// Enable CORS untuk semua domain
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Sajikan semua file dari folder storage melalui route / - built-in dan lebih cepat
app.use(express.static(storagePath));

// Halaman utama - harus ditempatkan setelah static middleware
app.get("/", (req, res) => {
  // Cek apakah ada file index.html di storage, jika tidak tampilkan halaman info
  res.send(`
    <h2>📁 File Server</h2>
    <p>Akses file seperti: <a href="/gambar.jpg">/gambar.jpg</a></p>
  `);
});

app.listen(PORT, () => {
  console.log(`🚀 Server storage aktif di http://localhost:${PORT}`);
});
