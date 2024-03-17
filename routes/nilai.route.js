const router = require("express").Router();

const {
    getNilai,
    create,
} = require("../controllers/nilai.controller");

router.get("/", getNilai);
router.post("/add", create);

module.exports = router;
