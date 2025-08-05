import { PrismaService } from '../prisma.service';
export declare class OrthancService {
    private prisma;
    constructor(prisma: PrismaService);
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
