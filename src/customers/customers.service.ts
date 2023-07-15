import { Model } from 'mongoose';
import {
  Body,
  ConflictException,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CustomerUser, CustomerUserDocument } from './schemas/customers.schema';
import { hash } from 'bcrypt';
import { BlockCustomerDto } from './dto/block-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(CustomerUser.name)
    private customerUserModel: Model<CustomerUserDocument>,
  ) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const hashedPassword = await hash(createCustomerDto.password, 10);
    const createdAdminUser = new this.customerUserModel({
      ...createCustomerDto,
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

  //find all users
  async findAll(): Promise < CustomerUserDocument[] > {
    return this.customerUserModel.find()
      .exec();
  }

  //find user by id
  async findOne(id: string) {
    return this.customerUserModel.findById(id);
  }

  //update user by id 
  async update(id: string, updateEmployeeDto: UpdateCustomerDto): Promise < CustomerUserDocument > {
    return this.customerUserModel.findByIdAndUpdate(id, updateEmployeeDto);
  }

  // reomve user by id
  async remove(id: string) {
    return this.customerUserModel.findByIdAndRemove(id);
  }

  // remove all user data from database after deleting user from database
  async removeAllMetaDataforUser(id: string){

  }

  //update user by id 
  async BlockCustomerDto(id: string, updateEmployeeDto: BlockCustomerDto): Promise < CustomerUserDocument > {
    return this.customerUserModel.findByIdAndUpdate(id, updateEmployeeDto);
  }
}
