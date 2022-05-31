import { Injectable } from '@nestjs/common'
import { BookInterface } from 'src/books/interfaces/book.interface'

@Injectable()
export class BooksService {
	private readonly books: BookInterface[] = []

	create(book: BookInterface) {
		this.books.push(book)
	}
	
	getBooks(): BookInterface[] {
		return this.books
	}
}
