// import { Test, TestingModule } from '@nestjs/testing';
// import { AuthService } from './auth.service';
// import { getModelToken } from '@nestjs/mongoose';
// import { JwtService } from '@nestjs/jwt';
// import { ConflictException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import { Model } from 'mongoose';
// import { SignUpDto } from '../dto/signup.dto';
// import { User, UserDocument } from '../schemas/user.schema';

// describe('AuthService', () => {
//   let authService: AuthService;
//   let model: Model<User>;
//   let jwtServiceMock: JwtService;

//   const mockUser = {
//     _id: '659fd3f8849fdf01fefa59d4',
//     firstName: 'Aregawi',
//     lastName: 'Fikre',
//     email: 'aregawi@gmail.com',
//     password: 'passpass',
//     role: ['cook'],
//     title: '',
//     bio: '',
//     save: jest.fn(), 
//   } 
  
//   const mockAuthService = {
//     create: jest.fn().mockResolvedValue(mockUser),
//   }

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthService,
//         JwtService,
//         {
//           provide: getModelToken(User.name),
//           useValue: mockAuthService,
//         },
//       ],
//     }).compile();

//     authService = module.get<AuthService>(AuthService);
//     model = module.get<Model<User>>(getModelToken(User.name));
//     jwtServiceMock = module.get<JwtService>(JwtService);
//   });

//   it('should be defined', () => {
//     expect(authService).toBeDefined();
//   });

//   describe('signUp', () => {
//     const signUpDto: SignUpDto = {
//       firstName: 'Aregawi',
//       lastName: 'Fikre',
//       email: 'aregawi@gmail.com',
//       password: 'passpass',
//       role: 'cook',
//       title: '',
//       bio: ''
//     };

//     it('should register a new user and return token and role', async () => {
//       jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
//       jest.spyOn(model, 'create').mockResolvedValue(mockUser);
//       jest.spyOn(jwtServiceMock, 'sign').mockReturnValue('{token: token, role: user.role}');

//       const result = await authService.signUp(signUpDto);

//       expect(bcrypt.hash).toHaveBeenCalled();
//       expect(result).toEqual(jwtServiceMock.sign(mockUser));
//     });

//     it('should throw duplicate email error', async () => {
//       jest.spyOn(model, 'create').mockRejectedValue({ code: 11000 });

//       await expect(authService.signUp(signUpDto)).rejects.toThrow(ConflictException);
//     });
//   });
// });



import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Document, Model } from 'mongoose';
import { SignUpDto } from '../dto/signup.dto';
import { User } from '../schemas/user.schema';
import { Z_UNKNOWN } from 'zlib';

describe('AuthService', () => {
  let authService: AuthService;
  let model: Model<User>;
  let jwtServiceMock: JwtService;

  // const mockUser = {
  const mockUser: Document & User & { _id: any } = {
    _id: '659fd3f8849fdf01fefa59d4',
    firstName: 'Aregawi',
    lastName: 'Fikre',
    email: 'aregawi@gmail.com',
    password: 'passpass',
    role: ['cook'],
    title: '',
    bio: '',
    save: jest.fn(),
  }  as unknown as User;

  const mockAuthService = {
    create: jest.fn().mockResolvedValue(mockUser),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: mockAuthService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    model = module.get<Model<User>>(getModelToken(User.name));
    jwtServiceMock = module.get<JwtService>(JwtService);
  });
  
  // ... rest of the code
    
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp', () => {
    const signUpDto: SignUpDto = {
      firstName: 'Aregawi',
      lastName: 'Fikre',
      email: 'aregawi@gmail.com',
      password: 'passpass',
      role: 'cook',
      title: '',
      bio: ''
    };

    it('should register a new user and return token and role', async () => {
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword');
      jest.spyOn(model, 'create').mockResolvedValue(mockUser);
      jest.spyOn(jwtServiceMock, 'sign').mockReturnValue('{token: token, role: user.role}');

      const result = await authService.signUp(signUpDto);

      expect(bcrypt.hash).toHaveBeenCalled();
      expect(result).toEqual(jwtServiceMock.sign(mockUser));
    });

    it('should throw duplicate email error', async () => {
      jest.spyOn(model, 'create').mockRejectedValue({ code: 11000 });

      await expect(authService.signUp(signUpDto)).rejects.toThrow(ConflictException);
  });
})
});
