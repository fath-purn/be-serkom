/**
 * Deskripsi: Mendapatkan data mahasiswa berdasarkan NIM dan membuat data baru
 * 
 * Initial state: Mendapatkan input sesuai endpoint yang di panggil dan terhubung ke database
 * Final state: Dapat membuat dan memanggil data dari database mahasiswa dan yang saling relasi
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const prisma = require("../libs/prisma");
const { mahasiswaSchema } = require("../validations/validation");

// Melakukan konversi nomor HP yang di inputkan user supaya berawalan 62
function toIndonesianPhoneNumber(phoneNumber) {
  let digitsOnly = phoneNumber.replace(/\D/g, "");

  if (digitsOnly.startsWith("0")) {
    return "62" + digitsOnly.substring(1);
  }

  if (digitsOnly.startsWith("8")) {
    return "62" + digitsOnly;
  }

  if (!digitsOnly.startsWith("62")) {
    return "62" + digitsOnly;
  }

  return digitsOnly;
}

/**
 * Deskripsi: Mengambil data beasiswa berdasarkan nim dari database.
 * @param {object} req Objek permintaan dari klien.
 * @param {object} res Objek respons yang akan dikirimkan ke klien.
 * @param {function} next Fungsi untuk memanggil middleware berikutnya.
 * @returns {object} Objek respons yang berisi data beasiswa dari database.
 */
const getBeasiswa = async (req, res, next) => {
  try {
    // Jika parameter search ada maka akan di eksekusi
    if (req.query.search) {
      const { search } = req.query;

      // Mencari nim di dalam database mahasiswa dan relasinya
      const nilai = await prisma.mahasiswa.findUnique({
        where: {
          nim: Number(search),
        },
        include: {
          media: true,
          nilai: true,
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
 * Deskripsi: Membuat data baru untuk mahasiswa dan beasiswa berdasarkan data yang diberikan.
 * @param {object} req Objek permintaan dari klien.
 * @param {object} res Objek respons yang akan dikirimkan ke klien.
 * @param {function} next Fungsi untuk memanggil middleware berikutnya.
 * @returns {object} Objek respons yang berisi data mahasiswa dan beasiswa yang baru dibuat.
 */
const create = async (req, res, next) => {
  try {
    // Melakukan validasi nilai yang dikirim
    const { value, error } = mahasiswaSchema.validate(req.body);
    
    // Melakukan deklarasi nilai yang dikirim
    const {
      nim,
      nama_depan,
      nama_belakang,
      email,
      no_hp,
      semester,
      beasiswa,
      status,
    } = value;

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

    // Jika NIM tidak ada maka akan error
    if (!checkNim) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "NIM tidak ditemukan",
        data: null,
      });
    }

    // Mengecek apakah di database terdapat email yang sama
    const checkEmail = await prisma.mahasiswa.findUnique({
      where: {
        email: email,
      },
    });

    // Jika email sudah ada maka tidak dapat memasukkan email yang sama
    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "Email yang di masukkan sudah digunakan",
        data: null,
      });
    }

    // Mengecek apakah di database terdapat NIM yang sama
    const checkNimMahasiswa = await prisma.mahasiswa.findUnique({
      where: {
        nim: Number(nim),
      },
    });

    // Jika sudah ada nim yang sama di tabel mahasiswa maka tidak dapat menambahkan lagi mahasiswa ke tabel
    if (checkNimMahasiswa) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "Kamu sudah terdaftar di program beasiswa",
        data: null,
      });
    }

    // mengubah no HP ke format yang di inginkan
    let indonesianPhoneNumber = toIndonesianPhoneNumber(no_hp);

    // Jika sudah melewati security tadi dan lolos maka mahasiswa akan ditambahkan ke dalam tabel 
    const create = await prisma.mahasiswa.create({
      data: {
        nim: Number(nim),
        nama_depan,
        nama_belakang,
        email,
        no_hp: indonesianPhoneNumber,
        semester,
        beasiswa,
        status,
      },
    });

    // Mengambil link untuk file yang di inputkan
    const nama = req.file.filename;
    const fileUrl = `${req.protocol}://${req.get("host")}/${nama}`;

    // Menambahkan link ke dalam database
    await prisma.media.create({
      data: {
        id_mahasiswa: create.id,
        url: fileUrl,
        nama: nama,
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
  getBeasiswa,
  create,
};
