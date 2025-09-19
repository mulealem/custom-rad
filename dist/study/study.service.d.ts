import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from '../prisma.service';
import { PdfService } from '../pdf/pdf.service';
import { StudyUploadService } from './study-upload.service';
import { OrthancService } from '../orthanc/orthanc.service';
export declare class StudyService {
    private prisma;
    private pdfService;
    private studyUpload;
    private orthancService;
    private readonly logger;
    constructor(prisma: PrismaService, pdfService: PdfService, studyUpload: StudyUploadService, orthancService: OrthancService);
    create(createStudyDto: CreateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        content: string | null;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        institutionId: number | null;
        uploadedById: number | null;
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
        institution: {
            id: number;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            slung: string;
            abbreviation: string | null;
            logo: string | null;
        } | null;
        assignedDoctor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            password: string;
            email: string;
            fullName: string | null;
            phoneNumber: string | null;
            profilePicture: string | null;
            isActive: boolean;
        } | null;
    } & {
        id: number;
        content: string | null;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        institutionId: number | null;
        uploadedById: number | null;
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
        institution: {
            id: number;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            slung: string;
            abbreviation: string | null;
            logo: string | null;
        } | null;
        assignedDoctor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            password: string;
            email: string;
            fullName: string | null;
            phoneNumber: string | null;
            profilePicture: string | null;
            isActive: boolean;
        } | null;
    } & {
        id: number;
        content: string | null;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        institutionId: number | null;
        uploadedById: number | null;
    })[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__StudyClient<({
        patient: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            dateOfBirth: Date | null;
            gender: string | null;
            createdById: number | null;
        } | null;
        institution: {
            id: number;
            title: string | null;
            createdAt: Date;
            updatedAt: Date;
            createdById: number | null;
            slung: string;
            abbreviation: string | null;
            logo: string | null;
        } | null;
        assignedDoctor: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            password: string;
            email: string;
            fullName: string | null;
            phoneNumber: string | null;
            profilePicture: string | null;
            isActive: boolean;
        } | null;
    } & {
        id: number;
        content: string | null;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        institutionId: number | null;
        uploadedById: number | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateStudyDto: UpdateStudyDto): import(".prisma/client").Prisma.Prisma__StudyClient<{
        id: number;
        content: string | null;
        userId: number | null;
        createdAt: Date;
        updatedAt: Date;
        studyId: string | null;
        parentStudyReferenceId: string | null;
        studyDIACOMReferenceObject: string | null;
        patientId: number | null;
        modality: string | null;
        referringPhysicianId: number | null;
        assignedDoctorId: number | null;
        status: string | null;
        institutionId: number | null;
        uploadedById: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    assignDoctor(studyIds: number[], doctorId: number): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: number): Promise<{
        ok: boolean;
        studyId: number;
        db: {
            attachments: number;
            remarks: number;
            tags: number;
        };
        orthanc: any;
    }>;
    private buildReportHTML;
    private buildHeaderTemplate;
    private buildFooterTemplate;
    publish(id: number, html?: string): Promise<{
        ok: boolean;
        attachmentId: number;
        fileName: string;
        filePath: string;
        uploaded: boolean;
    }>;
}
