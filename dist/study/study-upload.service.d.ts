export declare class StudyUploadService {
    private readonly logger;
    private getEndpoint;
    sendPdf(studyOrthancId: string | number, filePath: string, originalFileName: string): Promise<{
        ok: boolean;
        status: number;
        data: any;
        error?: undefined;
    } | {
        ok: boolean;
        error: any;
        status?: undefined;
        data?: undefined;
    }>;
}
