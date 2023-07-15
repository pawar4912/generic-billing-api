
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';
import { IsBoolean, IsString } from 'class-validator';

export class BlockCustomerDto extends PartialType(CreateCustomerDto) {

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;
}
