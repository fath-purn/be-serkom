/**
 * Deskripsi: Konfigurasi server untuk aplikasi backend.
 * 
 * Initial state: Server belum berjalan.
 * Final state: Server berjalan dan siap menerima permintaan dari klien.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

require('dotenv').config(); // Memuat konfigurasi dari file .env
const express = require('express'); // Memuat library express untuk membuat server
const app = express(); // Membuat instance aplikasi express
const morgan = require('morgan'); // Memuat library morgan untuk logging
const cors = require('cors'); // Memuat library cors untuk menangani CORS
const { serverError, notFound } = require('./middlewares/errorHandling'); // Middleware untuk menangani kesalahan server
const PORT = process.env.PORT || 3000; // Mengambil port dari variabel lingkungan atau default ke 3000

// Mengaktifkan CORS untuk semua permintaan
app.use(
  cors({
    origin: '*',
  })
);

// Menggunakan middleware untuk parsing JSON
app.use(express.json());

// Menggunakan middleware untuk parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Menggunakan middleware untuk logging dengan morgan
app.use(morgan('dev'));

// Menyediakan akses ke file statis di folder 'public'
app.use('/', express.static('public'));

// Menggunakan router dari index.route untuk rute API
app.use('/api/v1', require('./routes/index.route'));

// Menangani kesalahan jika rute tidak ditemukan (404 Not Found)
app.use(notFound);

// Menangani kesalahan server (500 Internal Server Error)
app.use(serverError);

// Memulai server untuk mendengarkan permintaan di port yang ditentukan
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
