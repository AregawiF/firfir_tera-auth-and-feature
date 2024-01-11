import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { updateUserDto } from 'src/dto/update-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) { }

  async getById(userId: string) {
    let user;
    try {
      user = await this.userModel.findById(userId).exec();
    }
    catch {
      throw new NotFoundException('Could not find user')
    }
    if (!user) {
      throw new NotFoundException('Could not find user')
    }
    return user
  }

  async updateById(id: string, user: updateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new NotFoundException(`Could not find user with ID ${id}`);
    }

    return updatedUser;
  }

  async deleteById(id: string): Promise<User> {
    const deletedAccount = await this.userModel.findByIdAndDelete(id).lean();

    if (!deletedAccount) {
      throw new NotFoundException('User not found!');
    }

    return deletedAccount as User;
  }
}
