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
    updateProfile(userId: number, updateProfileDto: Partial<RegisterDto>): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        fullName: string | null;
        phoneNumber: string | null;
        profilePicture: string | null;
        isActive: boolean;
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
        fullName: string | null;
        phoneNumber: string | null;
        profilePicture: string | null;
        isActive: boolean;
    }>;
    me(user: {
        id: number;
    }): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
    }>;
    getAllUsers(): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        fullName: string | null;
        phoneNumber: string | null;
        profilePicture: string | null;
        isActive: boolean;
    }[]>;
}
