const {Schema, model} = require('mongoose');
const {BooksRepositoryClass} = require("./abstract/books-repository.class");
const {v4: uuid} = require("uuid");

const bookSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    authors: {
        type: String,
        default: '',
    },
    favorite: {
        type: String,
        default: '',
    },
    fileCover: {
        type: String,
        default: '',
    },
    fileName: {
        type: String,
        default: '',
    },
});

const Book = model('Book', bookSchema);

class BooksRepository extends BooksRepositoryClass {
    async createBook(book) {
        const newBook = new Book(book);
        await newBook.save();
        return newBook;
    }

    async getBook(id) {
        return Book.findById(id).select('-__v');
    }

    async getBooks() {
        return Book.find().select('-__v');
    }

    async updateBook(id, book) {
        return Book.findByIdAndUpdate(id, book).select('-__v');
    }

    async deleteBook(id) {
        return Book.deleteOne({_id: id});
    }
}

module.exports = BooksRepository;