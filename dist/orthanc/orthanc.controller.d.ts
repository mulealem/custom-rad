import { OrthancService } from './orthanc.service';
export declare class OrthancController {
    private readonly orthancService;
    constructor(orthancService: OrthancService);
    extract(study: any): Promise<any> | {
        message: string;
        study: any;
    };
    upload(data: any): void;
    uploadBinary(req: Request): Promise<unknown>;
}
