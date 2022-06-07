import { Controller, Get, Post, Body, Put, Param, Delete, UseInterceptors, UsePipes, UseGuards  } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-books.dto';
import { BookDocument } from './schemas/book.schema';
import { UpdateBookDto } from './dto/update-book.dto';
import { FailInterceptor, SuccessInterceptor } from 'src/common/interceptors/books.interceptor';
import { ValidateMongoDBObjectID } from 'src/common/pipes/validmongoid.pipe';
import { createBookSchema } from './schemas/book-joi.schema';
import { JoiValidate } from 'src/common/pipes/joi.pipe';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('books')
@UseInterceptors(SuccessInterceptor, FailInterceptor)
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  public getAll(): Promise<BookDocument[]> {
    //throw new Error('Тестовая ошибка!')
    return this.bookService.getAll()
  }

  @Get(':id')
  @UsePipes(ValidateMongoDBObjectID)
  public findOne(@Param('id') id: string): Promise<BookDocument> {
    return this.bookService.findOne(id)
  }

  @Post()
  @UsePipes(new JoiValidate(createBookSchema))
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
