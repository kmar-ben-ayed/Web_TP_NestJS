import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userData: CreateUserDto) {
    return this.authService.register(userData);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: { email: string; pass: string }) {
    return this.authService.login(credentials);
  }
}
