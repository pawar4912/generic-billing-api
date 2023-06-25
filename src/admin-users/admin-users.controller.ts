import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { Public } from '../auth/public-endpoint.decorator';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AdminUserLocalAuthGuard } from '../auth/admin-user-local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { AdminUserRefreshTokenGuard } from '../auth/admin-user-refresh-token.guard';
import { AdminUserJwtAuthGuard } from '../auth/admin-user-jwt.guard';

@ApiBearerAuth()
@UseGuards(AdminUserJwtAuthGuard)
@Controller('admin-users')
@ApiTags('Admin Users')
export class AdminUsersController {
  constructor(
    private readonly adminUsersService: AdminUsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('register')
  register(@Body() createAdminUserDto: CreateAdminUserDto) {
    return this.adminUsersService.create(createAdminUserDto);
  }

  @Public()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  @UseGuards(AdminUserLocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.generateToken(req.user);
  }

  @Public()
  @UseGuards(AdminUserRefreshTokenGuard)
  @Get('refresh-auth-token')
  async refreshAuthToken(@Request() req) {
    return await this.authService.generateToken(req.user);
  }
}
