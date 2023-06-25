import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminUserLocalAuthStrategy } from './admin-user-local-auth.strategy';
import { AdminUsersModule } from '../admin-users/admin-users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminUserJwtStrategy } from './admin-user-jwt.strategy';
import { AdminUserRefreshTokenStrategy } from './admin-user-refresh-token.strategy';

@Module({
  imports: [forwardRef(() => AdminUsersModule), PassportModule, JwtModule],
  providers: [
    AuthService,
    AdminUserLocalAuthStrategy,
    AdminUserJwtStrategy,
    AdminUserRefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
