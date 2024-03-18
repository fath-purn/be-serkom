/**
 * Deskripsi: Router untuk menangani endpoint terkait data nilai.
 * 
 * Initial state: Router belum dilengkapi dengan endpoint dan handler fungsi.
 * Final state: Router sudah dilengkapi dengan endpoint dan handler fungsi.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const router = require("express").Router(); // Memuat objek router dari Express

const {
    getNilai, // Mendapatkan data nilai
    create, // Membuat data nilai
} = require("../controllers/nilai.controller"); // Memuat fungsi controller untuk nilai

// Definisi endpoint dan handler fungsi
router.get("/", getNilai); // Endpoint untuk mendapatkan data nilai
router.post("/add", create); // Endpoint untuk menambahkan data nilai

module.exports = router; // Mengekspor router untuk digunakan oleh aplikasi Express
