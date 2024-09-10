import {
  Controller,
  Request,
  Post,
  UseGuards,
  Inject,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/auth-local.guard';
import { AuthService } from './auth.service';
import { ResponseType } from 'src/types/response';
import { User } from 'src/users/user.decorator';
import { UserDetails } from './auth.type';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject() authService: AuthService;

  @UseGuards(JwtAuthGuard)
  @Get('self')
  self(@User() user: UserDetails): ResponseType<UserDetails> {
    return { result: user };
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any): Promise<any> {
    const result = await this.authService.login(req);
    return { result };
  }
}
