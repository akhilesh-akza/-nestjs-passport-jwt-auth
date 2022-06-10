import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './auth.constants';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      algorithms: 'HS256',
    });
  }

  // It's a builtin function of jwtStrategy ( of Passport JS that we are overriding now)
  async validate(payload: any) {
    return { username: payload.username, sub: payload.sub };
  }
}
