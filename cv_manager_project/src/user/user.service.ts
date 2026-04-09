import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ){}


  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    // On génère le sel
    const salt = await bcrypt.genSalt(10);
    // On hache le mot de passe
    user.password = await bcrypt.hash(user.password, salt);
    // On sauvegarde l'utilisateur
    return await this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({relations: ['cvs']});
  }

  findOne(id: number) {
    return this.userRepository.findOne({where : {id}});
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({where: {email}});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id,updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
