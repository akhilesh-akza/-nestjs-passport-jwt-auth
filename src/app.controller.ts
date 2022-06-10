import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CreateUserDto } from './users/dto/create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.appService.signup(createUserDto);
  }

  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return await this.appService.login({ email, password });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  async isLoggedIn(@Request() req) {
    return req.user;
  }
}
