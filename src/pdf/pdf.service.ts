import { Injectable, Logger } from '@nestjs/common';
import puppeteer, { Browser } from 'puppeteer';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name);
  private browserPromise: Promise<Browser> | null = null;
  private lastLaunchTs = 0;

  private async getBrowser(): Promise<Browser> {
    if (!this.browserPromise) {
      this.lastLaunchTs = Date.now();
      this.logger.log('Launching headless Chromium (Puppeteer)');
      this.browserPromise = puppeteer.launch({
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--font-render-hinting=medium',
          '--disable-dev-shm-usage',
        ],
        headless: true,
      });
    }
    return this.browserPromise;
  }

  private async restartBrowser(reason: string) {
    this.logger.warn(`Restarting browser due to: ${reason}`);
    try {
      if (this.browserPromise) {
        const b = await this.browserPromise;
        await b.close();
      }
    } catch (e) {
      this.logger.warn(`Error closing browser during restart: ${(e as Error).message}`);
    }
    this.browserPromise = null;
  }

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
    let browser = await this.getBrowser();
    const page = await browser.newPage();
    try {
      await this.withTimeout(
        page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 30000 }),
        35000,
        'setContent'
      );
      const buffer = (await this.withTimeout(
        page.pdf({
          format: 'A4',
          printBackground: true,
          margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
        }),
        30000,
        'page.pdf'
      )) as unknown as Buffer;
      this.logger.debug(
        `PDF generated in ${Date.now() - start}ms (${(buffer.length / 1024).toFixed(1)} KB) (browser uptime ${(Date.now() - this.lastLaunchTs) / 1000}s)`
      );
      return buffer;
    } catch (err) {
      const error = err as Error;
      this.logger.error(`Failed generating PDF: ${error.message}`);
      if (/Target closed|Navigation failed|setContent timed out|page\.pdf timed out/i.test(error.message)) {
        await this.restartBrowser(error.message);
      }
      throw err;
    } finally {
      try {
        await page.close();
      } catch (e) {
        this.logger.warn(`Error closing page: ${(e as Error).message}`);
      }
    }
  }
}
