const router = require('express').Router();
const books = require('../../store/books');
const fileMulter = require('../../middleware/file');

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
	res.status(201);
	res.json(books.getById(id));
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
	const book = books.update(id, {
		...req.body,
		fileBook: req.file ? req.file.path : '',
	});
	res.status(201);
	res.json(book);
});

router.delete('/:id', (req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	books.delete(id);
	res.status(201);
	res.json('ok')
});

router.get('/:id/download', (req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	res.status(201);
	const path = books.getById(id)?.fileBook;
	res.download(`./${path}`)
});

module.exports = router;