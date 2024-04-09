const config = require('./config');
const express = require('express');
const Books = require('./classes/books.class');

const books = new Books();

const app = express();

app.use(express.json());

const checkRequestId = (id, res) => {
	if (!id) {
		res.status(400)
		res.json('400 | переданы неверные параметры')
	}
}

app.post('/api/user/login', (req, res) => {
	res.status(201);
	res.json({ id: 1, mail: "test@mail.ru" });
});

app.get('/api/books', (req, res) => {
	res.json(books.getAll());
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books', (req, res) => {
	const book = books.create(req.body);
	res.status(201);
	res.json(book);
});

app.put('/api/books/:id', (req, res) => {
	const {id} = req.params;
	checkRequestId(id, res);
	try {
		const book = books.update(id, req.body);
		res.status(201);
		res.json(book);
	} catch (e) {
		res.status('404');
		res.json('Книга не найдена')
	}

})

app.delete('/api/books/:id', (req, res) => {
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

app.listen(config.PORT, () => {
	console.log(`Server started on port ${config.PORT}`);
})
