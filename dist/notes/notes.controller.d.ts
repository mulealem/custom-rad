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
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }>;
    findAll(req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }[]>;
    findOne(id: string, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    } | null>;
    update(id: string, updateNoteDto: UpdateNoteDto, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }>;
    remove(id: string, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
    }>;
    searchExternal(query: any): any;
    getNoteByReferenceId(referenceId: string): any;
    getOrthancStudyById(studyId: string): any;
    handleFileUpload(fileBuffer: Buffer): any;
}
export {};
