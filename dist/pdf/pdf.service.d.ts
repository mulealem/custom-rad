export declare class PdfService {
    private readonly logger;
    private withTimeout;
    generatePdfFromHtml(htmlContent: string): Promise<Buffer>;
}
