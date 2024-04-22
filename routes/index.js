const express = require('express');
const router = express.Router();
const api = require('./api');
const pages = require('./pages');

router.use('/', pages);
router.use('/api',express.json(), api);

module.exports = router;