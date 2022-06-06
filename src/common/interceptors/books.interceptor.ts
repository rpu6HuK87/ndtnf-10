import { CallHandler, ExecutionContext, HttpException, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, EMPTY, map, Observable, tap, throwError } from "rxjs";

@Injectable()
export class SuccessInterceptor implements NestInterceptor{
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		console.log('success interceptor')

		return next.handle().pipe(
			map(data => ({
				status: "success",
				data: data
			}))
		)	
	}
}
export class FailInterceptor implements NestInterceptor{
	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
		console.log('fail interceptor')

		return next.handle().pipe(
			catchError(err => {
        return throwError(new HttpException({
					status: "fail",
					data: err.response
				}, 400))
      })
		)
	}
}