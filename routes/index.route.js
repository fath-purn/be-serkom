/**
 * Deskripsi: Router untuk menangani rute berbagai jenis data seperti nilai dan beasiswa.
 * 
 * Initial state: Router belum dilengkapi dengan endpoint dan subrouter.
 * Final state: Router sudah dilengkapi dengan endpoint dan subrouter untuk nilai dan beasiswa.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const router = require('express').Router(); // Memuat objek router dari Express

// Mengarahkan subrouter ke endpoint tertentu
router.use('/nilai', require('./nilai.route')); // Subrouter untuk data nilai
router.use('/beasiswa', require('./beasiswa.route')); // Subrouter untuk data beasiswa

module.exports = router; // Mengekspor router untuk digunakan oleh aplikasi Express
