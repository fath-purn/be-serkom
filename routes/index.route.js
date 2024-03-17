const router = require('express').Router();

router.use('/nilai', require('./nilai.route'));
router.use('/beasiswa', require('./beasiswa.route'));

module.exports = router;
