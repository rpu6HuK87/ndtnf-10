import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class JoiValidate implements PipeTransform {
	constructor(private schema: any) {}

	public transform(values: any, metadata: ArgumentMetadata) {
		const { error, value } = this.schema.validate(values)
		if(error) throw new BadRequestException('Ошибка валидации Joi')
		
		return value
	}
}