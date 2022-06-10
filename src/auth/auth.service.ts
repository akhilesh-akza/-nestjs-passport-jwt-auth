import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, incoming_password: string) {
    const [user] = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    if (user.password !== incoming_password) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    const { password, ...response } = user;
    return response;
  }

  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.firstName + ' ' + user.lastName,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
