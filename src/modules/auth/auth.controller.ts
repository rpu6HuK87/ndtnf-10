import { Body, Request, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/loc-auth.guard';
import { JoiValidate } from 'src/common/pipes/joi.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { createUserSchema } from '../users/schemas/user-joi.schema';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
	constructor(
		private authService: AuthService,
		private userService: UsersService
	) {}

	@Post('api/users/signup')
	@UsePipes(new JoiValidate(createUserSchema))
	signIn(@Body() body: CreateUserDto) {
    return this.userService.create(body);
	}

	@UseGuards(LocalAuthGuard)
	@Post('api/users/signin')
	async signin(@Request() req) {
    return this.authService.login(req.user);
  }
}
