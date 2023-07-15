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

  async findAll(): Promise < CustomerUserDocument[] > {
    return this.customerUserModel.find()
      .exec();
  }

  async findOne(id: string) {
    return this.customerUserModel.findById(id);
  }

  async update(id: string, updateEmployeeDto: UpdateCustomerDto): Promise < CustomerUserDocument > {
    return this.customerUserModel.findByIdAndUpdate(id, updateEmployeeDto);
  }

  async remove(id: string) {
    return this.customerUserModel.findByIdAndRemove(id);
  }
}
