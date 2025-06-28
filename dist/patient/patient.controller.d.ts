import { PatientService } from './patient.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updatePatientDto: UpdatePatientDto): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__PatientClient<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        dateOfBirth: Date;
        gender: string;
        createdById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
