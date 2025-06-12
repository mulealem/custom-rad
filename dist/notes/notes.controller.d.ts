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
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
        userId: number;
    }>;
    findAll(req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
        userId: number;
    }[]>;
    findOne(id: string, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
        userId: number;
    } | null>;
    update(id: string, updateNoteDto: UpdateNoteDto, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
        userId: number;
    }>;
    remove(id: string, req: RequestWithUser): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        content: string;
        referenceId: string;
        metadata: string | null;
        userId: number;
    }>;
    searchExternal(query: any): any;
    getNoteByReferenceId(referenceId: string): any;
    getOrthancStudyById(studyId: string): any;
    handleFileUpload(fileBuffer: Buffer): any;
}
export {};
