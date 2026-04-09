import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
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

  createWithUser(createCvDto: CreateCvDto, user: User) {
    const cv = this.cvRepository.create({
      ...createCvDto,
      user,
    });
    return this.cvRepository.save(cv);
  }

  createWithRelations(data: CreateCvDto & { user: User; skills: Skill[] }) {
    const cv = this.cvRepository.create(data);
    return this.cvRepository.save(cv);
  }

  findAll() {
    return this.cvRepository.find({ relations: ['user', 'skills'] });
  }

  findAllForUser(user: User) {
    if (user.role === 'ADMIN') {
      return this.findAll();
    }

    return this.cvRepository.find({
      where: { user: { id: user.id } },
      relations: ['user', 'skills'],
    });
  }

  findOne(id: number) {
    return this.cvRepository.findOne({ where: { id }, relations: ['user', 'skills'] });
  }

  async findOwnedOrThrow(id: number, requester: User) {
    const cv = await this.findOne(id);
    if (!cv) {
      throw new NotFoundException('CV not found');
    }

    if (requester.role !== 'ADMIN' && cv.user?.id !== requester.id) {
      throw new ForbiddenException('You can only access your own CVs');
    }

    return cv;
  }

  async updateOwned(id: number, updateCvDto: UpdateCvDto, requester: User) {
    const cv = await this.findOwnedOrThrow(id, requester);
    const updated = this.cvRepository.merge(cv, updateCvDto);
    return this.cvRepository.save(updated);
  }

  async removeOwned(id: number, requester: User) {
    const cv = await this.findOwnedOrThrow(id, requester);
    return this.cvRepository.delete(cv.id);
  }
}
