import { TagsService } from './tags.service';
import { CreateTagDto } from './dtos/create-tag.dto';
export declare class TagsController {
    private tagsService;
    constructor(tagsService: TagsService);
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
