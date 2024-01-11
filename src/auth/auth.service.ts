import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from '../dto/signup.dto';
import { LoginDto } from '../dto/login.dto';
import { MongoError } from 'mongodb';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { 
      // name,
      firstName, lastName, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {

      const user = await this.userModel.create({
        // name,
        // username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: Array.isArray(role) ? role : [role],
      });
      
      const token = this.jwtService.sign({ id: user._id, role: user.role });
      
      return { token };
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        throw new UnauthorizedException('Email is already in use');
      }
      throw error; 
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      // throw new UnauthorizedException('Invalid email or password');
      throw new UnauthorizedException('User is not registered yet please signup.');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Incorrect password!');
    }

    // if (!this.isValidRole(role) || !user.role.includes(role)) {
    //   throw new UnauthorizedException('Invalid role');
    // }

    const token = this.jwtService.sign({ id: user._id, role: user.role });

    return { token };
  }
  // private isValidRole(role: string): boolean {
  //   return role === 'cook' || role === 'normal';
  // }
}
