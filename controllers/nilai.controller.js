const prisma = require("../libs/prisma");
const { nilaiSchema } = require("../validations/validation");

const getNilai = async (req, res, next) => {
  try {
    if (req.query.search) {
      const { search } = req.query;

      const nilai = await prisma.nilai.findUnique({
        where: {
          nim: Number(search),
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
    const { value, error } = nilaiSchema.validate(req.body);
    const { nim, ipk } = value;

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

    if(checkNim) {
      return res.status(400).json({
        success: false,
        message: "Bad Request!",
        err: "NIM yang di masukkan sudah ada",
        data: null,
      });
    }

    const create = await prisma.nilai.create({
      data: {
        nim: nim,
        ipk: ipk,
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
  getNilai,
  create,
};
