import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async signup(user: CreateUserDto) {
    return await this.userService.create(user);
  }

  async login({ email, password }) {
    const user = await this.authService.validateUser(email, password);
    return await this.authService.login(user);
  }
}
