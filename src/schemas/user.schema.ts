import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// export class User extends Document {
@Schema({ timestamps: true })
export class User {
  
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: 'normal' }) 
  role: string[];
  // role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);