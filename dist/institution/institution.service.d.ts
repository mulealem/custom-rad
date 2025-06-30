import { CreateInstitutionDto } from './dto/create-institution.dto';
import { UpdateInstitutionDto } from './dto/update-institution.dto';
import { PrismaService } from '../prisma.service';
export declare class InstitutionService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateInstitutionDto: UpdateInstitutionDto): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        abbreviation: string | null;
        slung: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
