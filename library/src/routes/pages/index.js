const express = require('express');
const router = express.Router();
const page404 = require('../../middleware/page-404');
const redisClient = require('../../store/redis');
const Book = require("../../models/book");
const {v4: uuid} = require("uuid");


router.get('/', async (req, res) => {
    let books;
    try {
        books = await Book.find().select('-__v');
    } catch (e) {
        res.redirect('/404');
    }
    res.render('pages/index', {
        title: 'Главная',
        books: books,
    })
});

router.get('/book/create', (req, res) => {
    res.render('pages/create', {
        title: 'Книги | создать',
        book: {},
    });
});

router.post('/book/create', async (req, res) => {
    try {
        const newBook = new Book({
            ...req.body, _id: uuid(),
        });
        await newBook.save();
    } catch (e) {
        res.redirect('/');
    }
    res.redirect('/');
});

router.get('/book/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findById(id).select('-__v');
        if (!book) {
            res.redirect('/404');
        }
    } catch (e) {
        res.redirect('/404');
    }

    const views = await redisClient.incr(id);

    res.render('pages/view', {
        title: 'Просмотр книги | ' + book?.title,
        book,
        views
    });
});

router.get('/book/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findById(id).select('-__v');
    } catch (e) {
        res.redirect('/404');
    }

    res.render('pages/update', {
        title: 'Обновление книги | ' + book.title,
        book
    });
});

router.post('/book/update/:id', async (req, res) => {
    const {id} = req.params;
    let book;

    try {
        book = await Book.findByIdAndUpdate(id, {
            ...req.body,
        }).select('-__v');
        if (!book) {
            res.status(404).json('404');
        }
        res.redirect('/404');
    } catch (e) {
        res.redirect('/404');
    }

    res.redirect(`/book/${book.id}`);
});


router.post('/book/delete/:id', async (req, res) => {
    const {id} = req.params;

    try {
        await Book.deleteOne({_id: id});
    } catch (e) {
        res.redirect('/404');
    }
    res.redirect(`/`);
});

router.use(page404)

module.exports = router;