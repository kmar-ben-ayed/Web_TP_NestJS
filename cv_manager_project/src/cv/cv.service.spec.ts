import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CvService } from './cv.service';
import { Cv } from './entities/cv.entity';

const mockCv: Partial<Cv> = {
  id: 1,
  name: 'Ben Ayed',
  firstname: 'Kmar',
  age: 25,
  cin: '12345678',
  job: 'Engineer',
  path: 'cv.pdf',
};

const mockRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  create: jest.fn(),
};

describe('CvService', () => {
  let service: CvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CvService,
        { provide: getRepositoryToken(Cv), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<CvService>(CvService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return the CV', async () => {
      mockRepository.save.mockResolvedValue(mockCv);
      const dto = { name: 'Ben Ayed', firstname: 'Kmar', age: 25, cin: '12345678', job: 'Engineer', path: 'cv.pdf' };
      const result = await service.create(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockCv);
    });
  });

  describe('createWithRelations', () => {
    it('should create a CV entity with relations and save it', async () => {
      const user = { id: 1 } as any;
      const skills = [{ id: 1 }] as any;
      const dto = { name: 'Ben Ayed', firstname: 'Kmar', age: 25, cin: '12345678', job: 'Engineer', path: 'cv.pdf', user, skills };
      mockRepository.create.mockReturnValue({ ...dto });
      mockRepository.save.mockResolvedValue({ ...mockCv, user, skills });
      const result = await service.createWithRelations(dto);
      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalled();
      expect(result).toMatchObject({ user, skills });
    });
  });

  describe('findAll', () => {
    it('should return all CVs with user and skills relations', async () => {
      mockRepository.find.mockResolvedValue([mockCv]);
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['user', 'skills'] });
      expect(result).toEqual([mockCv]);
    });
  });

  describe('findOne', () => {
    it('should return a single CV with relations by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockCv);
      const result = await service.findOne(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['user', 'skills'] });
      expect(result).toEqual(mockCv);
    });

    it('should return null when CV is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should call repository.update with the correct id and dto', async () => {
      mockRepository.update.mockResolvedValue({ affected: 1 });
      const dto = { job: 'Senior Engineer' };
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
