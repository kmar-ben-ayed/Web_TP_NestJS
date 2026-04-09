import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CvService {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
  ) { }


  create(createCvDto: CreateCvDto) {
    return this.cvRepository.save(createCvDto);
  }

<<<<<<< HEAD
  createWithRelations(data: CreateCvDto & { user: User; skills: Skill[] }) {
    const cv = this.cvRepository.create(data);
    return this.cvRepository.save(cv);
  }

=======
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
  findAll() {
    return this.cvRepository.find({ relations: ['user', 'skills'] });
  }

  findOne(id: number) {
<<<<<<< HEAD
    return this.cvRepository.findOne({ where: { id }, relations: ['user', 'skills'] });
=======
    return this.cvRepository.findOne({where : {id}});
>>>>>>> d35f344b327b8549112fa70e4dac4f97363022e5
  }

  update(id: number, updateCvDto: UpdateCvDto) {
    return this.cvRepository.update(id, updateCvDto);
  }

  remove(id: number) {
    return this.cvRepository.delete(id);
  }
}
