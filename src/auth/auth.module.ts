import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './auth.constants';
import { jwtStrategy } from './auth.jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [AuthService, jwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
