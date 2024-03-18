/**
 * Deskripsi: Skema validasi menggunakan Joi untuk data nilai dan data mahasiswa.
 * 
 * Initial state: Skema validasi belum dipersiapkan.
 * Final state: Skema validasi untuk data nilai dan data mahasiswa telah disiapkan.
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const joi = require("joi"); // Memuat library Joi untuk validasi skema

// Skema validasi untuk data nilai
const nilaiSchema = joi.object({
  nim: joi.number().required(), // 'nim' harus berupa nomor dan wajib ada
  ipk: joi.number().required(), // 'ipk' harus berupa nomor dan wajib ada
});

// Skema validasi untuk data mahasiswa
const mahasiswaSchema = joi.object({
  nim: joi.number().required(), // 'nim' harus berupa nomor dan wajib ada
  nama_depan: joi.string().required(), // 'nama_depan' harus berupa string dan wajib ada
  nama_belakang: joi.string().required(), // 'nama_belakang' harus berupa string dan wajib ada
  email: joi.string().required(), // 'email' harus berupa string dan wajib ada
  no_hp: joi.string().required(), // 'no_hp' harus berupa string dan wajib ada
  semester: joi.number().required(), // 'semester' harus berupa nomor dan wajib ada
  beasiswa: joi.string().required().valid('akademik', 'non_akademik'), // 'beasiswa' harus berupa string dan wajib ada, serta hanya dapat bernilai 'akademik' atau 'non_akademik'
  status: joi.string().required().valid('Belum_daftar', 'Pending', 'Diterima', 'Ditolak'), // 'status' harus berupa string dan wajib ada, serta hanya dapat bernilai 'Belum_daftar', 'Pending', 'Diterima', atau 'Ditolak'
});

// Mengekspor skema validasi untuk digunakan di tempat lain
module.exports = {
    nilaiSchema,
    mahasiswaSchema,
}
