import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from '../prisma.service';
import { PdfService } from '../pdf/pdf.service';
export declare class StudyService {
    private prisma;
    private pdfService;
    constructor(prisma: PrismaService, pdfService: PdfService);
    create(createStudyDto: CreateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
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
        parentStudyReferenceId: string | null;
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
            logo: string | null;
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
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
        parentStudyReferenceId: string | null;
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
            logo: string | null;
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
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
        parentStudyReferenceId: string | null;
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
            logo: string | null;
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
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
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
        parentStudyReferenceId: string | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateStudyDto: UpdateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
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
        parentStudyReferenceId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    assignDoctor(studyIds: number[], doctorId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number | null;
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
        parentStudyReferenceId: string | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    publish(id: number, html?: string): Promise<{
        ok: boolean;
        attachmentId: number;
        fileName: string;
        filePath: string;
    }>;
}
