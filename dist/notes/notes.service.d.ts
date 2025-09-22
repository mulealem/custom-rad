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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }>;
    findAll(userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    } | null>;
    findByReferenceId(referenceId: string): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    } | null>;
    update(id: number, updateNoteDto: UpdateNoteDto, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }>;
    remove(id: number, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }>;
    search(filters: any, userId: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }[]>;
    queryExternalApiWithOrthanc(query: any): any[];
    getOrthanicStudyByID(studyId: string): any;
    uploadOrthanicStudy(studyFile: any): any;
}
