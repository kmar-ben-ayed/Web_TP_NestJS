import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
<<<<<<< HEAD
=======
  exports: [UserService]
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
})
export class UserModule {}
