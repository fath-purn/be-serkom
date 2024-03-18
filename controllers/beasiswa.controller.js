const prisma = require("../libs/prisma");
const { mahasiswaSchema } = require("../validations/validation");

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

const getBeasiswa = async (req, res, next) => {
  try {
    if (req.query.search) {
      const { search } = req.query;

      const nilai = await prisma.mahasiswa.findUnique({
        where: {
          nim: Number(search),
        },
        include: {
          media: true,
          nilai: true,
        },
      });

      res.status(200).json({
        success: true,
        message: "OK",
        err: null,
        data: nilai,
      });
    }
  } catch (err) {
    next();
    return res.status(400).json({
      success: false,
      message: "Bad Request!",
      err: err.message,
      data: null,
    });
  }
};

const create = async (req, res, next) => {
  try {
    const { value, error } = mahasiswaSchema.validate(req.body);
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

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: error.message,
        data: null,
      });
    }

    const checkNim = await prisma.nilai.findUnique({
      where: {
        nim: Number(nim),
      },
    });

    if (!checkNim) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "NIM tidak ditemukan",
        data: null,
      });
    }

    const checkEmail = await prisma.mahasiswa.findUnique({
      where: {
        email: email,
      },
    });

    if (checkEmail) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "Email yang di masukkan sudah digunakan",
        data: null,
      });
    }

    const checkNimMahasiswa = await prisma.mahasiswa.findUnique({
      where: {
        nim: Number(nim),
      },
    });

    if (checkNimMahasiswa) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "Kamu sudah terdaftar di program beasiswa",
        data: null,
      });
    }

    let indonesianPhoneNumber = toIndonesianPhoneNumber(no_hp);

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

    let folder = req.file.destination.split("public/")[1];
    const nama = req.file.filename;
    const fileUrl = `${req.protocol}://${req.get("host")}/${nama}`;

    await prisma.media.create({
      data: {
        id_mahasiswa: create.id,
        url: fileUrl,
        nama: nama,
      },
    });

    res.status(200).json({
      success: true,
      message: "OK",
      err: null,
      data: create,
    });
  } catch (err) {
    next();
    return res.status(400).json({
      success: false,
      message: "Bad Request!",
      err: err.message,
      data: null,
    });
  }
};

module.exports = {
  getBeasiswa,
  create,
};
