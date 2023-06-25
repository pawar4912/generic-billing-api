import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class AdminUserLocalAuthStrategy extends PassportStrategy(
  Strategy,
  'admin-user-local',
) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateAdminUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid login details');
    }
    return user;
  }
}
