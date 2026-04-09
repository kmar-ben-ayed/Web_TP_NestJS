import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async register(userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  async login(credentials: { email: string; pass: string }) {
    const user = await this.userService.findByEmail(credentials.email);

    if (user && await bcrypt.compare(credentials.pass, user.password)) {
      const payload = { 
        userId: user.id, 
        username: user.username,
        email: user.email 
      };
      
      return {
        access_token: this.jwtService.sign(payload),
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }
}
