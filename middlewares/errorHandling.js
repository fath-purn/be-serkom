/**
 * Deskripsi: Middleware untuk menangani respons saat sumber daya tidak ditemukan (404) dan kesalahan server (500).
 * 
 * Initial state: Middleware belum memiliki deskripsi dan penanganan jenis kesalahan tertentu.
 * Final state: Middleware sudah dilengkapi dengan deskripsi dan penanganan kesalahan khusus seperti kesalahan validasi Joi.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

// Middleware untuk menangani respons saat sumber daya tidak ditemukan (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Resource not found',
    data: null,
  });
};

// Middleware untuk menangani respons saat terjadi kesalahan server (500)
const serverError = (err, req, res, next) => {
  // Penanganan kesalahan validasi Joi
  if (err.isJoi) {
    return res.status(400).json({
      status: 'Error',
      message: err.name,
      error: err.message,
    });
  }

  // Penanganan kesalahan server umum
  if (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
      data: null,
    });
  }
};

module.exports = {
  notFound,
  serverError,
};
