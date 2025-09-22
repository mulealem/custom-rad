import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Request as ExpressRequest } from 'express';
type AuthRequest = ExpressRequest & {
    user?: {
        userId?: number;
    };
};
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto, req: AuthRequest): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        departmentId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(req: AuthRequest): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        departmentId: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        departmentId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        departmentId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__CategoryClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        departmentId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any, req: AuthRequest): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        createdById: number | null;
        abbreviation: string | null;
        departmentId: number;
    }[]>;
}
export {};
