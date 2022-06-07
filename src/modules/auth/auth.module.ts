import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
	imports: [
		ConfigModule.forRoot(),
		UsersModule,
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '60s' }
		}),
	],
	controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy],
	exports: [AuthService]
})
export class AuthModule {}
