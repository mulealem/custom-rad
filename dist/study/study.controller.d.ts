import { StudyService } from './study.service';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
export declare class StudyController {
    private readonly studyService;
    constructor(studyService: StudyService);
    create(createStudyDto: CreateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        content: string | null;
        institutionId: number | null;
        uploadedById: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(query: any): import(".prisma/client").Prisma.PrismaPromise<({
        patient: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        assignedDoctor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            fullName: string | null;
            phoneNumber: string | null;
            profilePicture: string | null;
            isActive: boolean;
        } | null;
        institution: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            title: string | null;
            slung: string;
            abbreviation: string | null;
            logo: string | null;
        } | null;
    } & {
        id: number;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        content: string | null;
        institutionId: number | null;
        uploadedById: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
    })[]>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        patient: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        assignedDoctor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            fullName: string | null;
            phoneNumber: string | null;
            profilePicture: string | null;
            isActive: boolean;
        } | null;
        institution: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            title: string | null;
            slung: string;
            abbreviation: string | null;
            logo: string | null;
        } | null;
    } & {
        id: number;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        content: string | null;
        institutionId: number | null;
        uploadedById: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
    })[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__StudyClient<({
        patient: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        assignedDoctor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            email: string;
            password: string;
            fullName: string | null;
            phoneNumber: string | null;
            profilePicture: string | null;
            isActive: boolean;
        } | null;
        institution: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            title: string | null;
            slung: string;
            abbreviation: string | null;
            logo: string | null;
        } | null;
    } & {
        id: number;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        content: string | null;
        institutionId: number | null;
        uploadedById: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    assignDoctor(studyIds: number[], doctorId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    update(id: string, updateStudyDto: UpdateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        content: string | null;
        institutionId: number | null;
        uploadedById: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    publish(id: string, html: string): Promise<{
        ok: boolean;
        attachmentId: number;
        fileName: string;
        filePath: string;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        content: string | null;
        institutionId: number | null;
        uploadedById: number | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
