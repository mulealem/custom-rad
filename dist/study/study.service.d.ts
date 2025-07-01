import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from '../prisma.service';
export declare class StudyService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createStudyDto: CreateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        studyId: string | null;
        modality: string | null;
        status: string | null;
        patientId: number | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        institutionId: number | null;
        uploadedById: number | null;
        studyDIACOMReferenceObject: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        patient: {
            name: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        institution: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            createdById: number | null;
            abbreviation: string | null;
            slung: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        studyId: string | null;
        modality: string | null;
        status: string | null;
        patientId: number | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        institutionId: number | null;
        uploadedById: number | null;
        studyDIACOMReferenceObject: string | null;
    })[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        patient: {
            name: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        institution: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            createdById: number | null;
            abbreviation: string | null;
            slung: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        studyId: string | null;
        modality: string | null;
        status: string | null;
        patientId: number | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        institutionId: number | null;
        uploadedById: number | null;
        studyDIACOMReferenceObject: string | null;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__StudyClient<({
        patient: {
            name: string | null;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        institution: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            createdById: number | null;
            abbreviation: string | null;
            slung: string;
        } | null;
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        studyId: string | null;
        modality: string | null;
        status: string | null;
        patientId: number | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        institutionId: number | null;
        uploadedById: number | null;
        studyDIACOMReferenceObject: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateStudyDto: UpdateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        studyId: string | null;
        modality: string | null;
        status: string | null;
        patientId: number | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        institutionId: number | null;
        uploadedById: number | null;
        studyDIACOMReferenceObject: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string | null;
        studyId: string | null;
        modality: string | null;
        status: string | null;
        patientId: number | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        institutionId: number | null;
        uploadedById: number | null;
        studyDIACOMReferenceObject: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
