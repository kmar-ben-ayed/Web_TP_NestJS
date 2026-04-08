import { Test, TestingModule } from '@nestjs/testing';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';

const mockCv = { id: 1, name: 'Ben Ayed', firstname: 'Kmar', age: 25, cin: '12345678', job: 'Engineer', path: 'cv.pdf' };

const mockCvService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('CvController', () => {
  let controller: CvController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CvController],
      providers: [{ provide: CvService, useValue: mockCvService }],
    }).compile();

    controller = module.get<CvController>(CvController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should delegate to cvService.create and return the result', async () => {
      mockCvService.create.mockResolvedValue(mockCv);
      const dto = { name: 'Ben Ayed', firstname: 'Kmar', age: 25, cin: '12345678', job: 'Engineer', path: 'cv.pdf' };
      const result = await controller.create(dto as any);
      expect(mockCvService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCv);
    });
  });

  describe('findAll', () => {
    it('should delegate to cvService.findAll and return all CVs', async () => {
      mockCvService.findAll.mockResolvedValue([mockCv]);
      const result = await controller.findAll();
      expect(mockCvService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockCv]);
    });
  });

  describe('findOne', () => {
    it('should convert the id param to a number and delegate to cvService.findOne', async () => {
      mockCvService.findOne.mockResolvedValue(mockCv);
      const result = await controller.findOne('1');
      expect(mockCvService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockCv);
    });
  });

  describe('update', () => {
    it('should convert the id param to a number and delegate to cvService.update', async () => {
      mockCvService.update.mockResolvedValue({ affected: 1 });
      const dto = { job: 'Senior Engineer' };
      await controller.update('1', dto as any);
      expect(mockCvService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should convert the id param to a number and delegate to cvService.remove', async () => {
      mockCvService.remove.mockResolvedValue({ affected: 1 });
      await controller.remove('1');
      expect(mockCvService.remove).toHaveBeenCalledWith(1);
    });
  });
});
