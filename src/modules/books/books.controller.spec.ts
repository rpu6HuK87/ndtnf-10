import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-books.dto';

describe('BooksController', () => {
  let controller: BooksController;
	let service: BooksService;

	const mockBook = {
		title: 'Book 1'
	};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
			providers: [
				{
					provide: BooksService,
					useValue: {
            getAll: jest.fn().mockResolvedValue([mockBook])
					}
				}
			]
    }).compile();

    controller = module.get<BooksController>(BooksController);
		service = module.get<BooksService>(BooksService);
  });

	describe('getAll()', () => {
    it('Массив books', async () => {
      expect(controller.getAll()).resolves.toEqual([mockBook]);
      expect(service.getAll).toHaveBeenCalled();
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
