import {Book} from "../../interfaces/book.interface";

export abstract class BooksRepositoryClass {
	createBook(book: Book) {}
	getBook(id: string) {}
	getBooks() {}
	updateBook(id: string){}
	deleteBook(id: string){}
}