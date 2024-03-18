/**
 * Deskripsi: Mendapatkan data nilai berdasarkan NIM dan membuat data baru
 * 
 * Initial state: Mendapatkan input sesuai endpoint yang di panggil dan terhubung ke database
 * Final state: Dapat membuat dan memanggil data dari database nilai
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const prisma = require("../libs/prisma");
const { nilaiSchema } = require("../validations/validation");

/**
 * Deskripsi: Mengambil data nilai berdasarkan NIM dari database.
 * @param {object} req Objek permintaan dari klien.
 * @param {object} res Objek respons yang akan dikirimkan ke klien.
 * @param {function} next Fungsi untuk memanggil middleware berikutnya.
 * @returns {object} Objek respons yang berisi nilai dari database.
 */
const getNilai = async (req, res, next) => {
  try {
    // Jika parameter search ada maka akan di eksekusi
    if (req.query.search) {
      const { search } = req.query;

      // Mencari NIM di dalam database nilai
      const nilai = await prisma.nilai.findUnique({
        where: {
          nim: Number(search),
        },
      });

      // Mengembalikan data yang diambil dari database dan mengembalikan status 200
      res.status(200).json({
        success: true,
        message: "OK",
        err: null,
        data: nilai,
      });
    }
  } catch (err) {
    // Jika data tidak ditemukan maka akan mengembalikan status 400
    next();
    return res.status(400).json({
      success: false,
      message: "Bad Request!",
      err: err.message,
      data: null,
    });
  }
};

/**
 * Deskripsi: Membuat data nilai baru berdasarkan nilai yang diberikan.
 * @param {object} req Objek permintaan dari klien.
 * @param {object} res Objek respons yang akan dikirimkan ke klien.
 * @param {function} next Fungsi untuk memanggil middleware berikutnya.
 * @returns {object} Objek respons yang berisi data nilai yang baru dibuat.
 */
const create = async (req, res, next) => {
  try {
    // Melakukan validasi nilai yang dikirim
    const { value, error } = nilaiSchema.validate(req.body);
    
    // Melakukan deklarasi nilai yang dikirim
    const { nim, ipk } = value;

    // Jika tidak lolos validasi maka akan error dan mengembalikan status 400
    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: error.message,
        data: null,
      });
    }

    // Mengecek apakah di database terdapat NIM yang di inginkan
    const checkNim = await prisma.nilai.findUnique({
      where: {
        nim: Number(nim),
      },
    });

    // Jika NIM sudah ada maka tidak dapat memasukkan NIM yang sama
    if (checkNim) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "NIM yang dimasukkan sudah ada",
        data: null,
      });
    }

    // Jika NIM tidak ditemukan di database maka akan membuat NIM baru dan data lain yang diminta
    const create = await prisma.nilai.create({
      data: {
        nim: nim,
        ipk: ipk,
      },
    });

    // Jika semua proses berhasil maka akan mengembalikan status 200
    res.status(200).json({
      success: true,
      message: "OK",
      err: null,
      data: create,
    });
  } catch (err) {
    // Jika terdapat error maka akan mengembalikan status 400
    next();
    return res.status(400).json({
      success: false,
      message: "Bad Request!",
      err: err.message,
      data: null,
    });
  }
};

// Melakukan export fungsi
module.exports = {
  getNilai,
  create,
};
