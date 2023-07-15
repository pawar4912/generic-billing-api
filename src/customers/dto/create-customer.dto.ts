import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, isBoolean } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  cellNumber: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  pin: string;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
