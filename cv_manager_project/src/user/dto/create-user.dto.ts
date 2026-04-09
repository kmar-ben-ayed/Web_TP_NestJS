<<<<<<< HEAD
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe', description: 'Unique username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com', description: 'Unique email address' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'secret123', description: 'Password (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;
}
=======
export class CreateUserDto {}
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
