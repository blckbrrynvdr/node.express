const router = require('express').Router();
const books = require('./books');
const user = require('./user');
const error404 = require('../../middleware/404');

router.use('/books', books);
router.use('/user', user);


router.use(error404);

module.exports = router;