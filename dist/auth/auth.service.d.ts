import { PrismaService } from '../prisma.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        id: number;
        email: string;
    }>;
    updateUserProfile(userId: number, updateData: Partial<RegisterDto>): Promise<{
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
    updatePassword(userId: number, currentPassword: string, newPassword: string): Promise<{
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
    me(userId: number): Promise<{
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
