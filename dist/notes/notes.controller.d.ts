import { NotesService } from './notes.service';
import { CreateNoteDto } from './dtos/create-note.dto';
import { UpdateNoteDto } from './dtos/update-note.dto';
interface RequestWithUser extends Request {
    user: {
        userId: number;
    };
}
export declare class NotesController {
    private notesService;
    constructor(notesService: NotesService);
    create(createNoteDto: CreateNoteDto, req: RequestWithUser): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(req: RequestWithUser): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string, req: RequestWithUser): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
    update(id: string, updateNoteDto: UpdateNoteDto, req: RequestWithUser): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string, req: RequestWithUser): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    searchExternal(query: any): any;
    search(filters: any, req: RequestWithUser): Promise<{
        id: number;
        title: string;
        content: string;
        referenceId: string;
        userId: number;
        metadata: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getNoteByReferenceId(referenceId: string): any;
    getOrthancStudyById(studyId: string): any;
    handleFileUpload(fileBuffer: Buffer): any;
}
export {};
