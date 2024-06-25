const router = require('express').Router();
const fileMulter = require('../../middleware/file');
const Book = require('../../models/book');
const {v4: uuid} = require("uuid");


router.get('/', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        res.status(201).json(books);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const book = await Book.findById(id).select('-__v');
        if (!book) {
            res.status(404).json('404');
        }
        res.status(201).json(book);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/', fileMulter.single('fileBook'), async (req, res) => {
    try {
        const newBook = new Book({
            ...req.body, _id: uuid(), fileName: req.file ? req.file.path : '',
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.put('/:id', fileMulter.single('fileBook'), async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findByIdAndUpdate(id, {
            ...req.body, fileName: req.file ? req.file.path : '',
        }).select('-__v');
        if (!book) {
            res.status(404).json('404');
        }
        res.status(201).json(book);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        await Book.deleteOne({_id: id});
        res.status(201).json('ok');
    } catch (e) {
        res.status(500).json(e);
    }
});

router.get('/:id/download', async (req, res) => {
    const {id} = req.params;
    try {
        const book = await Book.findById(id).select('-__v');
        if (!book || !book?.fileName) {
            res.status(404).json('404');
        }
        res.download(`./${book?.fileName}`);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;