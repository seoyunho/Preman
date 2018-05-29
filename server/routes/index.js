const router = require('express').Router();
const auth = require('./account');
const request = require('./request');

router.use('/', auth);
router.use('/', request);

module.exports = router;