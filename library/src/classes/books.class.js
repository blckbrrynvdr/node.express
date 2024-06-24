const Book = require('./book.class');


class Books {
	/**
	 * @param { Book[] } books
	 */
	constructor(books = []) {
		this.books = books;
	}

	getAll() {
		return this.books;
	}

	getById(id) {
		const book = this.books.find((book) => book.id === id);

		if (!book) {
			throw new Error('Book not found!');
		}

		return book;
	}

	getBookInnerIndex(id) {
		return this.books.findIndex((book) => book.id === id);
	}

	/**
	 *
	 * @param { Book } data
	 */
	create(data) {
		const newBook = new Book(data);
		this.books.push(newBook);
		return newBook;
	}

	update(id, data) {
		let book = this.getById(id);
		book = {
			...book,
			...data
		}

		this.books[this.getBookInnerIndex(id)] = book;

		return book;
	}

	delete(id) {
		if (this.getById(id)) {
			this.books.splice(this.getBookInnerIndex(id), 1);
		}
	}
}

module.exports = Books;