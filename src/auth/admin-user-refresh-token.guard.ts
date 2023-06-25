import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminUserRefreshTokenGuard extends AuthGuard('user-jwt-refresh') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, adminUser, info) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !adminUser) {
      throw err || new UnauthorizedException();
    }
    return adminUser;
  }
}
