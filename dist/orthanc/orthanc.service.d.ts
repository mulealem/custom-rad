import { PrismaService } from '../prisma.service';
export declare class OrthancService {
    private prisma;
    constructor(prisma: PrismaService);
    extract(study: any): Promise<any> | {
        message: string;
        study: any;
    };
}
