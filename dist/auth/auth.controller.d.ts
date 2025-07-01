import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
    }>;
    updatePassword(updatePasswordDto: {
        userId: number;
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
    }>;
    me(user: {
        id: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }>;
}
