import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, isBoolean, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'First name is required'})
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Last name is required'})
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone number is required'})
  @IsString()
  cellNumber: string;

  @ApiProperty()
  @IsEmail({}, { message: 'First name is required'})
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password is required'})
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'pin is required'})
  @IsString()
  pin: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
