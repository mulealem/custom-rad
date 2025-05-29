import { PrismaService } from '../prisma.service';
import { CreateTagDto } from './dtos/create-tag.dto';
export declare class TagsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTagDto: CreateTagDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
