// apps\authentication\src\users\users.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email!: string;  // Add !

  @Prop({ required: true })
  password!: string;  // Add !

  @Prop()
  name?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);