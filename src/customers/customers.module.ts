import { Module, forwardRef } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { CustomerUser, AdminUserSchema } from './schemas/customers.schema';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
  imports: [
    MongooseModule.forFeature([
      { name: CustomerUser.name, schema: AdminUserSchema },
    ]),
    forwardRef(() => AuthModule),
  ]
})
export class CustomersModule {}
