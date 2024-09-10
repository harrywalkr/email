import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repo';

@Injectable()
export class UsersService {
  @Inject() usersRepository: UsersRepository;

  async findOneByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne(username);
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.insert(user);
  }
}
