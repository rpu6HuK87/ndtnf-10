import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Book, BookDocument } from './schemas/book.schema'
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-books.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
	constructor(
		@InjectModel(Book.name) private BookModel: Model<BookDocument>
	) {}

	public create(data: CreateBookDto): Promise<BookDocument> {
		const book = new this.BookModel(data)
		return book.save()
	}

	public getAll(): Promise<BookDocument[]> {
		return this.BookModel.find().exec()
	}

	public async update(id: string, data: UpdateBookDto): Promise<BookDocument> {
		return this.BookModel.findOneAndUpdate({ _id: id }, data)
	}

	public async delete(id: string): Promise<BookDocument> {
		return this.BookModel.findOneAndRemove({ _id: id })
	}
}
