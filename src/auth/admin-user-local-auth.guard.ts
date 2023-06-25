import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AdminUserLocalAuthGuard extends AuthGuard('admin-user-local') {}
