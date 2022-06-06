import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
//import { FailInterceptor } from './interceptors/books.interceptor';
import { HttpExceptionFilter } from './common/exceptions/filters/http.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
	//app.useGlobalInterceptors(new FailInterceptor())
	app.useGlobalFilters(new HttpExceptionFilter)
  await app.listen(3000);
}
bootstrap();
