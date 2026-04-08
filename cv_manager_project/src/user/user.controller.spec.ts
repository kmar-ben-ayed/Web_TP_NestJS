import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const mockUser = { id: 1, username: 'johndoe', email: 'john@example.com', password: 'secret123', cvs: [] };

const mockUserService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compile();

    controller = module.get<UserController>(UserController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should delegate to userService.create and return the result', async () => {
      mockUserService.create.mockResolvedValue(mockUser);
      const dto = { username: 'johndoe', email: 'john@example.com', password: 'secret123' };
      const result = await controller.create(dto as any);
      expect(mockUserService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(mockUser);
    });
  });

  describe('findAll', () => {
    it('should delegate to userService.findAll and return all users', async () => {
      mockUserService.findAll.mockResolvedValue([mockUser]);
      const result = await controller.findAll();
      expect(mockUserService.findAll).toHaveBeenCalled();
      expect(result).toEqual([mockUser]);
    });
  });

  describe('findOne', () => {
    it('should convert the id param to a number and delegate to userService.findOne', async () => {
      mockUserService.findOne.mockResolvedValue(mockUser);
      const result = await controller.findOne('1');
      expect(mockUserService.findOne).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });
  });

  describe('update', () => {
    it('should convert the id param to a number and delegate to userService.update', async () => {
      mockUserService.update.mockResolvedValue({ affected: 1 });
      const dto = { email: 'new@example.com' };
      await controller.update('1', dto as any);
      expect(mockUserService.update).toHaveBeenCalledWith(1, dto);
    });
  });

  describe('remove', () => {
    it('should convert the id param to a number and delegate to userService.remove', async () => {
      mockUserService.remove.mockResolvedValue({ affected: 1 });
      await controller.remove('1');
      expect(mockUserService.remove).toHaveBeenCalledWith(1);
    });
  });
});
