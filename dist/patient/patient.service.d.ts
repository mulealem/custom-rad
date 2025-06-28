import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from '../prisma.service';
export declare class PatientService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPatientDto: CreatePatientDto): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updatePatientDto: UpdatePatientDto): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
