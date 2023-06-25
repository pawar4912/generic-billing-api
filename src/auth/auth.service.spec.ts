import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';

const mockJwtService = () => ({
  signAsync: jest.fn().mockResolvedValue('mock_jwt_token'),
});
const mockUsersService = () => ({
  findOneByEmail: jest.fn().mockResolvedValue({
    username: 'mock_user_name',
    password: '$2b$10$GGcd4nxHk3brNZBeKstBXe58wOhrjfNfG4uKd1caY77ikzLay67Zu',
    accountVerified: true,
    active: true,
  }),
});
const mockConfigService = () => ({
  get: jest.fn().mockResolvedValue('mock_env_variable'),
});

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useFactory: mockJwtService },
        { provide: UsersService, useFactory: mockUsersService },
        { provide: ConfigService, useFactory: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('validateUser', () => {
    it('Should validate users', async () => {
      const result = await service.validateUser('mock_user_name', '12345678');
      expect(result).toEqual({
        username: 'mock_user_name',
        accountVerified: true,
        active: true,
      });
    });
    it('Should return null when user is not found', async () => {
      jest.spyOn(usersService, 'findOneByEmail').mockResolvedValueOnce(null);
      const result = await service.validateUser('mock_user_name', '12345678');
      expect(result).toEqual(null);
    });
  });
  describe('generateToken', () => {
    it('Should generate JWT token', async () => {
      const result = await service.generateToken({
        id: 1,
        email: 'john@gmail.com',
        companyId: 1,
      });
      expect(result).toEqual({
        access_token: 'mock_jwt_token',
        refresh_token: 'mock_jwt_token',
      });
    });
  });
});
