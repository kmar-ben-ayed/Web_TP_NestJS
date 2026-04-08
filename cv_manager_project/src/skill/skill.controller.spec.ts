import { Test, TestingModule } from '@nestjs/testing';
import { SkillController } from './skill.controller';
import { SkillService } from './skill.service';

const mockSkill = { id: 1, designation: 'TypeScript' };

const mockSkillService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('SkillController', () => {
  let controller: SkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SkillController],
      providers: [{ provide: SkillService, useValue: mockSkillService }],
    }).compile();

    controller = module.get<SkillController>(SkillController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should delegate to skillService.create and return the result', async () => {
      mockSkillService.create.mockResolvedValue(mockSkill);
      const dto = { designation: 'TypeScript' };
      const result = await controller.create(dto as any);
      expect(mockSkillService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockSkill);
    });
  });

  describe('findAll', () => {
    it('should delegate to skillService.findAll and return all skills', async () => {
      mockSkillService.findAll.mockResolvedValue([mockSkill]);
      const result = await controller.findAll();
      expect(mockSkillService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockSkill]);
    });
  });

  describe('findOne', () => {
    it('should convert the id param to a number and delegate to skillService.findOne', async () => {
      mockSkillService.findOne.mockResolvedValue(mockSkill);
      const result = await controller.findOne('1');
      expect(mockSkillService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockSkill);
    });
  });

  describe('update', () => {
    it('should convert the id param to a number and delegate to skillService.update', async () => {
      mockSkillService.update.mockResolvedValue({ affected: 1 });
      const dto = { designation: 'JavaScript' };
      await controller.update('1', dto as any);
      expect(mockSkillService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should convert the id param to a number and delegate to skillService.remove', async () => {
      mockSkillService.remove.mockResolvedValue({ affected: 1 });
      await controller.remove('1');
      expect(mockSkillService.remove).toHaveBeenCalledWith(1);
    });
  });
});
