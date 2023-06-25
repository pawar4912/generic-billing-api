import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import { Transform, Exclude } from 'class-transformer';

export type AdminUserDocument = AdminUser & Document;

@Schema({
  timestamps: true,
  selectPopulatedPaths: false,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})
export class AdminUser {
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop({ required: [true, 'First Name is required'] })
  firstName: string;

  @Prop({ required: [true, 'Last Name is required'] })
  lastName: string;

  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;

  @Prop({ required: [true, 'Password is required'] })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Prop({ default: '' })
  cellNumber: string;
}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);
