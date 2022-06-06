import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';


@Module({
  imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.DB_URL, {
			user: process.env.DB_USERNAME,
			pass: process.env.DB_PASSWORD,
			dbName: process.env.DB_NAME,
			useNewUrlParser: true,
			useUnifiedTopology: true
		}),
		BooksModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
