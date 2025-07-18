import { Response } from 'express';
import { PdfService } from './pdf.service';
export declare class PdfController {
    private readonly pdfService;
    constructor(pdfService: PdfService);
    generatePdfFromHtml(htmlContent: string, res: Response): Promise<void>;
}
