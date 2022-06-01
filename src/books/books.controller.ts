import { Controller, Get, Post, Body, Put, Param, Delete  } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-books.dto';
import { BookDocument } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
	constructor(private readonly bookService: BooksService) {}

	@Get()
	public getAll(): Promise<BookDocument[]> {
		return this.bookService.getAll()
	}

	@Post()
	public create(@Body() body: CreateBookDto): Promise<BookDocument> {
		return this.bookService.create(body)
	}

	@Put(':id')
	public update(@Param('id') id: string, @Body() body: UpdateBookDto): Promise<BookDocument> {
		return this.bookService.update(id, body)
	}

	@Delete(':id')
	public delete(@Param('id') id: string): Promise<BookDocument> {
		return this.bookService.delete(id)
	}
}
