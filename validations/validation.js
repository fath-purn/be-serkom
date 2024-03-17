const joi = require("joi");

const nilaiSchema = joi.object({
  nim: joi.number().required(),
  ipk: joi.number().required(),
});

const mahasiswaSchema = joi.object({
  nim: joi.number().required(),
  nama_depan: joi.string().required(),
  nama_belakang: joi.string().required(),
  email: joi.string().required(),
  no_hp: joi.string().required(),
  semester: joi.number().required(),
  beasiswa: joi.string().required().valid('akademik', 'non_akademik'),
  status: joi.string().required().valid('Belum_daftar', 'Pending', 'Diterima', 'Ditolak'),
});
module.exports = {
    nilaiSchema,
    mahasiswaSchema,
}