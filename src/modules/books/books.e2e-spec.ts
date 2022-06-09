import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BooksService } from './books.service';
import { BooksModule } from './books.module';

describe('Books (e2e)', () => {
  let app: INestApplication;
	let bookService: BooksService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    })
		.overrideProvider(BooksService)
		.useValue(BooksService)
		.compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET books', () => {
    return request(app.getHttpServer())
      .get('/books')
      .expect(200)
      .expect(
				{
					data: bookService.getAll()
				}
			);
  });
});
