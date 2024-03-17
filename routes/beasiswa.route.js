const router = require("express").Router();
const upload = require("../libs/multer")

const {
    getBeasiswa,
    create,
} = require("../controllers/beasiswa.controller");

router.get("/", getBeasiswa);
router.post("/add", upload.upload.single('file'), create);

module.exports = router;
