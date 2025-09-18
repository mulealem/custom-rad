import { Injectable, Logger } from '@nestjs/common';
import * as html_to_pdf from 'html-pdf-node';

export interface PdfGenerationOptions {
  headerTemplate?: string;
  footerTemplate?: string;
  displayHeaderFooter?: boolean;
  margin?: {
    top?: string; right?: string; bottom?: string; left?: string;
  };
  format?: string; // default A4
}

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

  async generatePdfFromHtml(htmlContent: string, options: PdfGenerationOptions = {}): Promise<Buffer> {
    const start = Date.now();
    try {
      const file: html_to_pdf.Source = { content: htmlContent };
      const {
        headerTemplate,
        footerTemplate,
        displayHeaderFooter,
        margin,
        format
      } = options;
      const buffer = await this.withTimeout(
        html_to_pdf.generatePdf(file, {
          format: format || 'A4',
          margin: { top: '15mm', right: '10mm', bottom: '15mm', left: '10mm', ...(margin || {}) },
          printBackground: true,
          headerTemplate: headerTemplate || undefined,
          footerTemplate: footerTemplate || undefined,
          displayHeaderFooter: displayHeaderFooter ?? !!(headerTemplate || footerTemplate),
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
