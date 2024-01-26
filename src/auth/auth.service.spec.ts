import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, ConflictException } from '@nestjs/common';
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userModel: Model<User>;

  const mockJwtService = {
    sign: jest.fn(),
  };

  const mockUserModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getModelToken(User.name), useValue: mockUserModel },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should create a user and return a token and role', async () => {
      const signUpDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
        role: ['user'],
        title: 'Test Title',
        bio: 'Test Bio',
      };

      const createdUser = {
        ...signUpDto,
        _id: 'a uuid',
        password: await bcrypt.hash(signUpDto.password, 10),
      };

      mockUserModel.create.mockResolvedValue(createdUser);
      mockJwtService.sign.mockReturnValue('a jwt token');

      const result = await service.signUp(signUpDto);

      expect(result).toEqual({ token: 'a jwt token', role: signUpDto.role });
    });

    it('should throw a ConflictException if email is already in use', async () => {
      const signUpDto = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'password',
        role: ['user'],
        title: 'Test Title',
        bio: 'Test Bio',
      };

      mockUserModel.create.mockRejectedValue({ name: 'MongoError', code: 11000 });

      await expect(service.signUp(signUpDto)).rejects.toThrow(ConflictException);
    });
  });

  // ... rest of your code
});