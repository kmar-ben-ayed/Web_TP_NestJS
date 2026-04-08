import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SkillService } from './skill.service';
import { Skill } from './entities/skill.entity';

const mockSkill: Partial<Skill> = { id: 1, designation: 'TypeScript' };

const mockRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('SkillService', () => {
  let service: SkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SkillService,
        { provide: getRepositoryToken(Skill), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<SkillService>(SkillService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return the skill', async () => {
      mockRepository.save.mockResolvedValue(mockSkill);
      const dto = { designation: 'TypeScript' };
      const result = await service.create(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockSkill);
    });
  });

  describe('findAll', () => {
    it('should return all skills', async () => {
      mockRepository.find.mockResolvedValue([mockSkill]);
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalled();
      expect(result).toEqual([mockSkill]);
    });
  });

  describe('findOne', () => {
    it('should return a skill by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockSkill);
      const result = await service.findOne(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockSkill);
    });

    it('should return null when skill is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should call repository.update with the correct id and dto', async () => {
      mockRepository.update.mockResolvedValue({ affected: 1 });
      const dto = { designation: 'JavaScript' };
      await service.update(1, dto as any);
      expect(mockRepository.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should call repository.delete with the correct id', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });
      await service.remove(1);
      expect(mockRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
