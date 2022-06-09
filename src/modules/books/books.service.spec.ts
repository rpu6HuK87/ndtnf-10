import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book } from './schemas/book.schema';
import { getModelToken } from '@nestjs/mongoose';

const mockBook: any = {
  title: 'Книга #1',
  description: 'О том, о сем'
};

describe('BooksService', () => {
  let service: BooksService
	let model: Model<Book>

	const booksArray = [
    {
      title: 'Book #1',
      description: 'About #1'
    },
    {
      title: 'Book #2',
      description: 'About #2'
    },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
				BooksService,
				{
          provide: getModelToken('Book'),
          useValue: {
						find: jest.fn()
					},
        },
			],
    }).compile();

    service = module.get<BooksService>(BooksService);
		model = module.get<Model<Book>>(getModelToken('Book'));
  });

	it('должно вернуть все книги', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(booksArray),
    } as any);
    const books = await service.getAll();
    expect(books).toEqual(booksArray);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
