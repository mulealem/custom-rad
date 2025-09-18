import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { PrismaService } from '../prisma.service';
export declare class TemplateService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTemplateDto: CreateTemplateDto & {
        createdById?: number;
    }): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(createdById?: number): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateTemplateDto: UpdateTemplateDto): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }[]>;
}
