import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { PrismaService } from '../prisma.service';
export declare class DepartmentService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createDepartmentDto: CreateDepartmentDto): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateDepartmentDto: UpdateDepartmentDto): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }[]>;
}
