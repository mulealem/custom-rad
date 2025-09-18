"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PdfService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_1 = require("puppeteer");
let PdfService = PdfService_1 = class PdfService {
    logger = new common_1.Logger(PdfService_1.name);
    browserPromise = null;
    lastLaunchTs = 0;
    async getBrowser() {
        if (!this.browserPromise) {
            this.lastLaunchTs = Date.now();
            this.logger.log('Launching headless Chromium (Puppeteer)');
            this.browserPromise = puppeteer_1.default.launch({
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
    async restartBrowser(reason) {
        this.logger.warn(`Restarting browser due to: ${reason}`);
        try {
            if (this.browserPromise) {
                const b = await this.browserPromise;
                await b.close();
            }
        }
        catch (e) {
            this.logger.warn(`Error closing browser during restart: ${e.message}`);
        }
        this.browserPromise = null;
    }
    async withTimeout(promise, ms, label) {
        let timeoutHandle;
        const timeoutPromise = new Promise((_, reject) => {
            timeoutHandle = setTimeout(() => {
                reject(new Error(`${label} timed out after ${ms}ms`));
            }, ms);
        });
        try {
            return await Promise.race([promise, timeoutPromise]);
        }
        finally {
            clearTimeout(timeoutHandle);
        }
    }
    async generatePdfFromHtml(htmlContent) {
        const start = Date.now();
        let browser = await this.getBrowser();
        const page = await browser.newPage();
        try {
            await this.withTimeout(page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 30000 }), 35000, 'setContent');
            const buffer = (await this.withTimeout(page.pdf({
                format: 'A4',
                printBackground: true,
                margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
            }), 30000, 'page.pdf'));
            this.logger.debug(`PDF generated in ${Date.now() - start}ms (${(buffer.length / 1024).toFixed(1)} KB) (browser uptime ${(Date.now() - this.lastLaunchTs) / 1000}s)`);
            return buffer;
        }
        catch (err) {
            const error = err;
            this.logger.error(`Failed generating PDF: ${error.message}`);
            if (/Target closed|Navigation failed|setContent timed out|page\.pdf timed out/i.test(error.message)) {
                await this.restartBrowser(error.message);
            }
            throw err;
        }
        finally {
            try {
                await page.close();
            }
            catch (e) {
                this.logger.warn(`Error closing page: ${e.message}`);
            }
        }
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = PdfService_1 = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map