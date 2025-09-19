import { PrismaService } from '../prisma.service';
export declare class OrthancService {
    private prisma;
    constructor(prisma: PrismaService);
    private orthancClient;
    deleteStudy(studyId: string): Promise<{
        ok: boolean;
        status: number;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
        status: any;
    }>;
    extract(tempStudy: any): Promise<any> | {
        message: string;
        study: any;
    };
    upload(file: Express.Multer.File): Promise<{
        filename: string;
        path: string;
        message: string;
    }>;
}
