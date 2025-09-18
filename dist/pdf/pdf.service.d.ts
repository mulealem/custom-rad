export interface PdfGenerationOptions {
    headerTemplate?: string;
    footerTemplate?: string;
    displayHeaderFooter?: boolean;
    margin?: {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
    };
    format?: string;
}
export declare class PdfService {
    private readonly logger;
    private withTimeout;
    generatePdfFromHtml(htmlContent: string, options?: PdfGenerationOptions): Promise<Buffer>;
    private generatePlainPdf;
}
