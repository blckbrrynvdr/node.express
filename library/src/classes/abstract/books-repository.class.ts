import {Book} from "../../interfaces/book.interface";

export abstract class BooksRepositoryClass {
	abstract createBook(book: Book): Promise<Book>;

	abstract getBook(id: string): Promise<Book>;

	abstract getBooks(): Promise<Book[]>;

	abstract updateBook(id: string, book: Book): Promise<Book>;

	abstract deleteBook(id: string): Promise<Book>;
}