import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async register(userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  async login(credentials: LoginDto) {
    const { email, password } = credentials;
    const user = await this.userService.findByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const payload = {
        userId: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      };

      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
