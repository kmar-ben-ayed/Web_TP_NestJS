import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

const mockUser: Partial<User> = {
  id: 1,
  username: 'johndoe',
  email: 'john@example.com',
  password: 'hashed_password',
  cvs: [],
};

const mockRepository = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should save and return the user', async () => {
      mockRepository.save.mockResolvedValue(mockUser);
      const dto = { username: 'johndoe', email: 'john@example.com', password: 'secret123' };
      const result = await service.create(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return all users with their CVs', async () => {
      mockRepository.find.mockResolvedValue([mockUser]);
      const result = await service.findAll();
      expect(mockRepository.find).toHaveBeenCalledWith({ relations: ['cvs'] });
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should return a user with CVs by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(mockRepository.findOne).toHaveBeenCalledWith({ where: { id: 1 }, relations: ['cvs'] });
      expect(result).toEqual(mockUser);
    });

    it('should return null when user is not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should call repository.update with the correct id and dto', async () => {
      mockRepository.update.mockResolvedValue({ affected: 1 });
      const dto = { email: 'new@example.com' };
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
