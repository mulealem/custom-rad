import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { PrismaService } from '../prisma.service';
export declare class UserRoleService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserRoleDto: CreateUserRoleDto): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateUserRoleDto: UpdateUserRoleDto): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
