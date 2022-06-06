import { ArgumentMetadata, HttpException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateMongoDBObjectID implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		if(value.length != 24) throw new HttpException('Невалидный id', 400)

		return value
	}
}