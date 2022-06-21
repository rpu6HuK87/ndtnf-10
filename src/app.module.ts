import { Module } from '@nestjs/common';
import { MongooseModule } from'@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CommentsModule } from './modules/comments/comments.module';

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
		ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
		BooksModule,
		AuthModule,
		UsersModule,
		CommentsModule
	],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
