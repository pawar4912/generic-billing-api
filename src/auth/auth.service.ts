import { Injectable } from '@nestjs/common';
import { AdminUsersService } from '../admin-users/admin-users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private adminUserService: AdminUsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateAdminUser(username: string, pass: string): Promise<any> {
    const adminUser = await this.adminUserService.findOneByEmail(username);
    if (adminUser && (await bcrypt.compare(pass, adminUser.password))) {
      return {
        userId: adminUser._id.toString(),
        username: adminUser.email,
        fullName: adminUser.firstName + ' ' + adminUser.lastName,
        type: 'admin_user',
        role: 'admin_user',
      };
    }
    return null;
  }
  async generateToken(user: any) {
    const payload = {
      username: user.username,
      sub: user.userId,
      fullName: user.fullName,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('AUTH_JWT_SECRET'),
        expiresIn: '1d',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('AUTH_JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);
    return {
      access_token,
      refresh_token,
    };
  }
}
