import { OrthancService } from './orthanc.service';
export declare class OrthancController {
    private readonly orthancService;
    constructor(orthancService: OrthancService);
    extract(study: any): Promise<any> | {
        message: string;
        study: any;
    };
    upload(data: any): {
        filename: string;
        path: string;
        message: string;
    };
    uploadBinary(req: Request): Promise<unknown>;
    uploadFile(file: Express.Multer.File): {
        filename: string;
        path: string;
        message: string;
    };
}
