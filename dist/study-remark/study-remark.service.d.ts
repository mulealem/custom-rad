import { CreateStudyRemarkDto } from './dto/create-study-remark.dto';
import { UpdateStudyRemarkDto } from './dto/update-study-remark.dto';
import { PrismaService } from '../prisma.service';
export declare class StudyRemarkService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: number, updateStudyRemarkDto: UpdateStudyRemarkDto): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__StudyRemarkClient<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        studyId: number;
        createdById: number | null;
        remarkType: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
