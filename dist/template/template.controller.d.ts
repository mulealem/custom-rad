import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    create(createTemplateDto: CreateTemplateDto): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateTemplateDto: UpdateTemplateDto): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__TemplateClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        createdById: number | null;
        categoryId: number;
        ordinal: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
