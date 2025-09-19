import { PrismaService } from '../prisma.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
import { HttpService } from '@nestjs/axios';
export interface ExternalApiResponse {
    result: unknown;
    meta: unknown;
}
export declare class NotesService {
    private prisma;
    private httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    create(createNoteDto: CreateNoteDto, userId: number): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    findByReferenceId(referenceId: string): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(filters: any, userId: number): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    queryExternalApiWithOrthanc(query: any): any[];
    getOrthanicStudyByID(studyId: string): any;
    uploadOrthanicStudy(studyFile: any): any;
}
