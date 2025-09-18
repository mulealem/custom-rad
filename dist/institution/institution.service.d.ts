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
        slung: string;
        abbreviation: string | null;
        logo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        slung: string;
        abbreviation: string | null;
        logo: string | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        slung: string;
        abbreviation: string | null;
        logo: string | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateInstitutionDto: UpdateInstitutionDto): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        slung: string;
        abbreviation: string | null;
        logo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__InstitutionClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        slung: string;
        abbreviation: string | null;
        logo: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        createdById: number | null;
        slung: string;
        abbreviation: string | null;
        logo: string | null;
    }[]>;
}
