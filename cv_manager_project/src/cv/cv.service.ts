import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Skill } from '../skill/entities/skill.entity';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) { }


  create(createCvDto: CreateCvDto) {
    return this.cvRepository.save(createCvDto);
  }

  createWithRelations(data: CreateCvDto & { user: User; skills: Skill[] }) {
    const cv = this.cvRepository.create(data);
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find({ relations: ['user', 'skills'] });
  }

  findOne(id: number) {
    return this.cvRepository.findOne({ where: { id }, relations: ['user', 'skills'] });
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return this.cvRepository.update(id, updateCvDto);
  }

  remove(id: number) {
    return this.cvRepository.delete(id);
  }
}
