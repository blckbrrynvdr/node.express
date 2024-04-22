const router = require('express').Router();
const books = require('./books');
const user = require('./user');

router.use('/books', books);
router.use('/user', user);

module.exports = router;