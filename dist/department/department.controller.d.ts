import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Request as ExpressRequest } from 'express';
type AuthRequest = ExpressRequest & {
    user?: {
        userId?: number;
    };
};
export declare class DepartmentController {
    private readonly departmentService;
    constructor(departmentService: DepartmentService);
    create(createDepartmentDto: CreateDepartmentDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(req: AuthRequest): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateDepartmentDto: UpdateDepartmentDto): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__DepartmentClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        description: string | null;
    }[]>;
}
export {};
