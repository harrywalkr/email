import {
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { standardizeEmail } from 'src/utils/helpers';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneByUsername(
      standardizeEmail(username),
    );
    if (!user) throw new NotFoundException();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (isPasswordCorrect) {
      delete user.password;
      return user;
    }

    throw new NotAcceptableException();
  }

  async login(req: any) {
    const user = req.user;
    const payload = {
      username: standardizeEmail(user.username),
      sub: user.id,
      blocked: user.blocked,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
