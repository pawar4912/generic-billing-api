import {
  Body,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { hash } from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { AdminUser, AdminUserDocument } from './schemas/admin-users.schema';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectModel(AdminUser.name)
    private adminUserModel: Model<AdminUserDocument>,
  ) {}
  async create(createAdminUserDto: CreateAdminUserDto) {
    const hashedPassword = await hash(createAdminUserDto.password, 10);
    const createdAdminUser = new this.adminUserModel({
      ...createAdminUserDto,
      password: hashedPassword,
    });
    return await createdAdminUser
      .save()
      .then(async (AdminUser) => {
        return AdminUser;
      })
      .catch((error) => {
        if (error.name == 'ValidationError') {
          const validationErrors = [];
          for (const x in error.errors) {
            validationErrors.push(error.errors[x].message);
          }

          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              message: validationErrors,
              error: 'Bad Request',
            },
            HttpStatus.BAD_REQUEST,
          );
        } else {
          if (error.code == '11000') {
            throw new ConflictException('Email is already registered');
          } else {
            throw new InternalServerErrorException();
          }
        }
      });
  }

  async findOneByEmail(email: string) {
    const adminUser = await this.adminUserModel.findOne({ email }).exec();
    if (!adminUser) {
      throw new NotFoundException(`Admin users with email ${email} not found`);
    }
    return adminUser;
  }

  async findByIdAndUpdate(id: string, updateAdminDto: UpdateAdminUserDto) {
    return await this.adminUserModel.findByIdAndUpdate({_id: id}, updateAdminDto, {new: true})
    .then(async (AdminUser) => {
      return AdminUser;
    })
    
  }
}
