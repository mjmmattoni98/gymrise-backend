import {
  Controller,
  Request,
  Get,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { GqlAuthGuard } from './auth/gql-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { CurrentUser } from './current-user';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    // return req.user;
    return this.authService.loginUser(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Query((returns) => Client)
  // @UseGuards(GqlAuthGuard)
  // whoAmI(@CurrentUser() client: Client) {
  //   return this.clientService.findById(client.id);
  // }
}
