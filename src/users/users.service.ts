import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepo.save(createUserDto);
  }

  async findOne(email: string) {
    return await this.userRepo.findBy({ email });
  }

  async findAll() {
    return await this.userRepo.find({
      select: ['email', 'firstName', 'lastName'],
    });
  }
}
