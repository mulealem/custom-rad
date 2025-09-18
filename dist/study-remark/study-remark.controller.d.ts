import { StudyRemarkService } from './study-remark.service';
import { CreateStudyRemarkDto } from './dto/create-study-remark.dto';
import { UpdateStudyRemarkDto } from './dto/update-study-remark.dto';
export declare class StudyRemarkController {
    private readonly studyRemarkService;
    constructor(studyRemarkService: StudyRemarkService);
    create(createStudyRemarkDto: CreateStudyRemarkDto): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateStudyRemarkDto: UpdateStudyRemarkDto): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    search(filters: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }[]>;
}
