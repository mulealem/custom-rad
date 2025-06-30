import { InstitutionService } from './institution.service';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
export declare class InstitutionController {
    private readonly institutionService;
    constructor(institutionService: InstitutionService);
    create(createInstitutionDto: CreateInstitutionDto): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateInstitutionDto: UpdateInstitutionDto): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
