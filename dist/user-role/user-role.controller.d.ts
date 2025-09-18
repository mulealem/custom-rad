import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
export declare class UserRoleController {
    private readonly userRoleService;
    constructor(userRoleService: UserRoleService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateUserRoleDto: UpdateUserRoleDto): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__UserRoleClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        role: string;
    }[]>;
}
