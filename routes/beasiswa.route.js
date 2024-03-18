/**
 * Deskripsi: Router untuk menangani rute data beasiswa.
 * 
 * Initial state: Router belum dilengkapi dengan endpoint dan subrouter.
 * Final state: Router sudah dilengkapi dengan endpoint untuk mendapatkan data beasiswa dan menambahkan data beasiswa.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const router = require("express").Router(); // Memuat objek router dari Express
const upload = require("../libs/multer"); // Memuat middleware multer untuk mengelola file upload

const { 
    getBeasiswa, // Mengimpor fungsi getBeasiswa dari controller
    create, // Mengimpor fungsi create dari controller
} = require("../controllers/beasiswa.controller"); // Mengimpor controller beasiswa

// Menentukan rute untuk mendapatkan data beasiswa
router.get("/", getBeasiswa);

// Menentukan rute untuk menambahkan data beasiswa
router.post("/add", upload.upload.single('file'), create);

module.exports = router; // Mengekspor router untuk digunakan oleh aplikasi Express
