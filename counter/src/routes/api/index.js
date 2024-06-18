const router = require('express').Router();
const counter = require('./counter');

router.use('/counter', counter);

module.exports = router;