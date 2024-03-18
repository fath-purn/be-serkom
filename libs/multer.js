/**
 * Deskripsi: Fungsi untuk menghasilkan konfigurasi storage multer sesuai dengan props yang diberikan.
 * 
 * Initial state: Menangani input file sesuai format file
 * Final state: Dapat menangani input file sesuai format yang di inginkan 
 *              dan mengembalikan error ketika tidak sesuai format
 * 
 * @author Fatkhurrohman Purnomo / @fath-purn
 * @date 18 Maret 2024
 */

const multer = require("multer");
const path = require("path");

/**
 * Deskripsi: Fungsi untuk menghasilkan konfigurasi storage multer sesuai dengan props yang diberikan.
 * @param {object} props Properti yang digunakan untuk konfigurasi storage multer.
 * @param {string} props.location Lokasi penyimpanan file.
 * @param {string[]} props.allowedMimeTypes Jenis MIME yang diperbolehkan untuk diunggah.
 * @returns {object} Konfigurasi storage multer.
 */
function generateStorage(props) {
  let { location, allowedMimeTypes } = props;
  return multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, location);
      },
      filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        const err = new Error(
          `Only ${allowedMimeTypes.join(", ")} allowed to upload!`
        );
        return callback(err, false);
      }
      callback(null, true);
    },
  });
}

module.exports = {
  /**
   * Deskripsi: Konfigurasi storage multer untuk mengunggah file.
   */
  upload: generateStorage({
    location: "public",
    allowedMimeTypes: [
      "application/pdf",
      "image/jpeg",
      "application/zip",
      "application/x-zip-compressed",
    ],
  }),
};
