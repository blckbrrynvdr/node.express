const router = require('express').Router();

const Books = require('../classes/books.class');
const fileMulter = require('../middleware/file');

const books = new Books();

const checkRequestId = (id, res) => {
	if (!id) {
		res.status(400)
		res.json('400 | переданы неверные параметры')
	}
}

router.get('/', (req, res) => {
	res.json(books.getAll());
});

router.get('/:id', (req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	try {
		res.status(201);
		res.json(books.getById(id));
	} catch (e) {
		res.status(404);
		res.json('Книга не найдена');
	}
});

router.post('/',
	fileMulter.single('fileBook'),
	(req, res) => {
		const book = books.create({
			...req.body,
			fileBook: req.file ? req.file.path : '',
		});
		res.status(201);
		res.json(book);
	});

router.put('/:id',
	fileMulter.single('fileBook'),
	(req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	try {
		const book = books.update(id, {
			...req.body,
			fileBook: req.file ? req.file.path : '',
		});
		res.status(201);
		res.json(book);
	} catch (e) {
		res.status(404);
		res.json('Книга не найдена')
	}

})

router.delete('/:id', (req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	try {
		books.delete(id);
		res.status(201);
		res.json('ok')
	} catch (e) {
		res.status(500);
		res.json(e);
	}
})

router.get('/:id/download', (req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	try {
		res.status(201);
		const path = books.getById(id)?.fileBook;
		res.download(`./${path}`)
	} catch (e) {
		res.status(404);
		res.json('Книга не найдена');
	}
})

module.exports = router;