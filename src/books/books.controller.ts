import { Controller, Get, Post, Body  } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBooksDto } from './dto/create-books.dto';
import { BookInterface } from 'src/books/interfaces/book.interface';

@Controller('books')
export class BooksController {
	constructor(private readonly bookService: BooksService) {}

	@Get()
  async getBooks(): Promise<BookInterface[]> {		
    return this.bookService.getBooks()
  }

	@Post()
	createBook(@Body() book: CreateBooksDto) {
		return this.bookService.create(book)
	}
}
