import { Category, User } from '@prisma/client';
export declare class Template {
    id: number;
    title: string;
    ordinal: number;
    categoryId: number;
    createdById?: number;
    createdAt: Date;
    updatedAt: Date;
    category?: Category;
    createdBy?: User;
}
