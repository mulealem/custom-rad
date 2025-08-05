import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post(':userId/update-profile')
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @Param('userId') userId: number,
    @Body() updateProfileDto: Partial<RegisterDto>,
  ) {
    return this.authService.updateUserProfile(+userId, updateProfileDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // update password
  @Post('update-password')
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @Body()
    updatePasswordDto: {
      userId: number;
      currentPassword: string;
      newPassword: string;
    },
  ) {
    return this.authService.updatePassword(
      updatePasswordDto.userId,
      updatePasswordDto.currentPassword,
      updatePasswordDto.newPassword,
    );
  }

  // me from token
  @Post('me')
  @UsePipes(new ValidationPipe())
  async me(@Body() user: { id: number }) {
    return this.authService.me(user.id);
  }

  @Get('users')
  async getAllUsers() {
    return this.authService.getAllUsers();
  }
}
