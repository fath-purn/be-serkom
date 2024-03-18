const multer = require("multer");
const path = require("path");

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
