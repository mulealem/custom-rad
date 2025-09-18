import { Injectable, Logger } from '@nestjs/common';
import * as html_to_pdf from 'html-pdf-node';
import { PDFDocument, StandardFonts } from 'pdf-lib';

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
    const timeoutMs = parseInt(process.env.PDF_GENERATION_TIMEOUT_MS || '30000', 10);
    const start = Date.now();
    const attempts: Array<{ attempt: number; simplified: boolean; error?: string; durationMs: number }> = [];

    const run = async (attempt: number, simplified: boolean): Promise<Buffer> => {
      const attemptStart = Date.now();
      const file: html_to_pdf.Source = { content: htmlContent };
      const { headerTemplate, footerTemplate, displayHeaderFooter, margin, format } = options;
      const effectiveOptions: any = {
        format: format || 'A4',
        margin: { top: '15mm', right: '10mm', bottom: '15mm', left: '10mm', ...(margin || {}) },
        printBackground: true,
      };
      if (!simplified) {
        effectiveOptions.headerTemplate = headerTemplate || undefined;
        effectiveOptions.footerTemplate = footerTemplate || undefined;
        effectiveOptions.displayHeaderFooter = displayHeaderFooter ?? !!(headerTemplate || footerTemplate);
      }
      this.logger.debug(`PDF gen attempt=${attempt} simplified=${simplified} htmlLength=${htmlContent.length}`);
      const buffer = await this.withTimeout(
        html_to_pdf.generatePdf(file, effectiveOptions) as Promise<Buffer>,
        timeoutMs,
        'generatePdf'
      );
      attempts.push({ attempt, simplified, durationMs: Date.now() - attemptStart });
      return buffer;
    };

    try {
      try {
        return await run(1, false);
      } catch (e: any) {
        attempts.push({ attempt: 1, simplified: false, error: e.message, durationMs: Date.now() - start });
        if (/timed out/i.test(e.message)) {
          this.logger.warn('Initial PDF generation timed out; retrying with simplified settings (no header/footer).');
          try {
            const buffer = await run(2, true);
            this.logger.debug(`PDF generated on retry in ${Date.now() - start}ms total.`);
            return buffer;
          } catch (e2: any) {
            attempts.push({ attempt: 2, simplified: true, error: e2.message, durationMs: Date.now() - start });
            // Will fall through to fallback
          }
        } else {
          throw e;
        }
      }
      // If we reach here, both attempts failed
      this.logger.warn('Falling back to plain text PDF generation via pdf-lib');
      const plain = await this.generatePlainPdf(htmlContent);
      attempts.push({ attempt: 3, simplified: true, durationMs: Date.now() - start });
      return plain;
    } catch (err) {
      const total = Date.now() - start;
      this.logger.error(`Failed generating PDF after ${total}ms attempts=${JSON.stringify(attempts)}`);
      throw err;
    }
  }

  private async generatePlainPdf(htmlContent: string): Promise<Buffer> {
    const doc = await PDFDocument.create();
    const page = doc.addPage();
    const font = await doc.embedFont(StandardFonts.Helvetica);
    const { width, height } = page.getSize();
    const maxWidth = width - 80;
    const fontSize = 10;
    // Strip tags to basic text
    const text = htmlContent
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ') // collapse whitespace
      .trim();
    const words = text.split(' ');
    let line = '';
    let y = height - 50;
    const lines: string[] = [];
    for (const w of words) {
      const testLine = line ? line + ' ' + w : w;
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (lineWidth > maxWidth) {
        lines.push(line);
        line = w;
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line);
    for (const l of lines) {
      if (y < 40) {
        page.drawText('...[truncated]', { x: 40, y, size: fontSize, font });
        break;
      }
      page.drawText(l, { x: 40, y, size: fontSize, font });
      y -= fontSize + 4;
    }
    const bytes = await doc.save();
    return Buffer.from(bytes);
  }
}
