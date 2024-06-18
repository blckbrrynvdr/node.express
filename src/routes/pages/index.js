const express = require('express');
const router = express.Router();
const books = require('../../store/books');
const page404 = require('../../middleware/page-404');
const redisClient = require('../../store/redis');

books.create({title: '111', description: '222'})

router.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Главная',
        books: books.getAll(),

    })
});

router.get('/book/create', (req, res) => {
    res.render('pages/create', {
        title: 'Книги | создать',
        book: {},
    });
});

router.post('/book/create', (req, res) => {
    books.create({
        ...req.body,
    });
    res.redirect('/');
});

router.get('/book/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = books.getById(id);
    } catch (e) {
        res.redirect('/404');
    }

    const views = await redisClient.incr(id);

    res.render('pages/view', {
        title: 'Просмотр книги | ' + book.title,
        book,
        views
    });
});

router.get('/book/update/:id', (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = books.getById(id);
    } catch (e) {
        res.redirect('/404');
    }

    res.render('pages/update', {
        title: 'Обновление книги | ' + book.title,
        book
    });
});

router.post('/book/update/:id', (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = books.update(id, {
            ...req.body,
        });
    } catch (e) {
        res.redirect('/404');
    }

    res.redirect(`/book/${book.id}`);
});


router.post('/book/delete/:id', (req, res) => {
    const {id} = req.params;

    try {
        books.delete(id);
    } catch (e) {
        res.redirect('/404');
    }
    res.redirect(`/`);
});

router.use(page404)

module.exports = router;