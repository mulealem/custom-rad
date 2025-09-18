import { Injectable, Logger } from '@nestjs/common';
import * as html_to_pdf from 'html-pdf-node';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);

  private async withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
    let timeoutHandle: NodeJS.Timeout;
    const timeoutPromise = new Promise<never>((_, reject) => {
      timeoutHandle = setTimeout(() => {
        reject(new Error(`${label} timed out after ${ms}ms`));
      }, ms);
    });
    try {
      return await Promise.race([promise, timeoutPromise]);
    } finally {
      clearTimeout(timeoutHandle!);
    }
  }

  async generatePdfFromHtml(htmlContent: string): Promise<Buffer> {
    const start = Date.now();
    try {
      const file: html_to_pdf.Source = { content: htmlContent };
      const buffer = await this.withTimeout(
        html_to_pdf.generatePdf(file, {
          format: 'A4',
          margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
          printBackground: true,
        }) as Promise<Buffer>,
        30000,
        'generatePdf'
      );
      this.logger.debug(
        `PDF generated in ${Date.now() - start}ms (${(buffer.length / 1024).toFixed(1)} KB)`
      );
      return buffer;
    } catch (err) {
      const error = err as Error;
      this.logger.error(`Failed generating PDF: ${error.message}`);
      throw err;
    }
  }
}
