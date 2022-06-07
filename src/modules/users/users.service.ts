import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private UserModel: Model<UserDocument>,
	) {}

	public async findOne(email: string): Promise<UserDocument> {
		return this.UserModel.findOne({ email: email }).exec()
	}

	public async create(data: CreateUserDto): Promise<UserDocument> {
		const hash = await bcrypt.hash(data.password, 10)
		const user = new this.UserModel({...data, password: hash})
		return user.save()
	}
}
