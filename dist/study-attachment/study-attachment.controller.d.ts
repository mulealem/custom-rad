import { Request as ExpressRequest } from 'express';
import { StudyAttachmentService } from './study-attachment.service';
import { CreateStudyAttachmentDto } from './dto/create-study-attachment.dto';
import { UpdateStudyAttachmentDto } from './dto/update-study-attachment.dto';
type AuthRequest = ExpressRequest & {
    user?: {
        userId?: number;
    };
};
export declare class StudyAttachmentController {
    private readonly studyAttachmentService;
    constructor(studyAttachmentService: StudyAttachmentService);
    create(createStudyAttachmentDto: CreateStudyAttachmentDto): import(".prisma/client").Prisma.Prisma__StudyAttachmentClient<{
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    uploadFile(file: Express.Multer.File, studyId: string, studyTag: string, req: AuthRequest): Promise<{
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__StudyAttachmentClient<{
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateStudyAttachmentDto: UpdateStudyAttachmentDto): import(".prisma/client").Prisma.Prisma__StudyAttachmentClient<{
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__StudyAttachmentClient<{
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any): Promise<({
        createdBy: {
            id: number;
            fullName: string | null;
        } | null;
    } & {
        studyTag: string | null;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        studyId: number;
        createdById: number | null;
        fileName: string;
        filePath: string;
        fileType: string;
        fileSize: number;
    })[]>;
}
export {};
