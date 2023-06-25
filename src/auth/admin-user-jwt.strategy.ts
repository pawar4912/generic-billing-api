import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AdminUserJwtStrategy extends PassportStrategy(
  Strategy,
  'admin-user-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    if (payload.type == 'admin-user') {
      return {
        userId: payload.sub,
        username: payload.username,
        fullName: payload.fullName,
      };
    }

    return null;
  }
}
