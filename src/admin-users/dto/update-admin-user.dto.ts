import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAdminUserDto } from './create-admin-user.dto';
import { IsString } from 'class-validator';

export class UpdateAdminUserDto extends PartialType(CreateAdminUserDto) {
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
}
