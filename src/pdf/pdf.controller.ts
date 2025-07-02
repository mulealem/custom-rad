import { Controller, Get, Res, Body, Post } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate-from-html')
  async generatePdfFromHtml(
    @Body('html') htmlContent: string,
    @Res() res: Response,
  ) {
    if (!htmlContent) {
      res.status(400).send('HTML content is required');
      return;
    }

    try {
      const buffer = await this.pdfService.generatePdfFromHtml(htmlContent);
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=generated.pdf',
        'Content-Length': buffer.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
      });
      res.end(buffer);
    } catch (err: any) {
      console.error('Error generating PDF:', err);
      res.status(500).send('Error generating PDF');
    }
  }
}
