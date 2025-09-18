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
const html_to_pdf = require("html-pdf-node");
const pdf_lib_1 = require("pdf-lib");
let PdfService = PdfService_1 = class PdfService {
    logger = new common_1.Logger(PdfService_1.name);
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
    async generatePdfFromHtml(htmlContent, options = {}) {
        const timeoutMs = parseInt(process.env.PDF_GENERATION_TIMEOUT_MS || '30000', 10);
        const start = Date.now();
        const attempts = [];
        const run = async (attempt, simplified) => {
            const attemptStart = Date.now();
            const file = { content: htmlContent };
            const { headerTemplate, footerTemplate, displayHeaderFooter, margin, format } = options;
            const effectiveOptions = {
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
            const buffer = await this.withTimeout(html_to_pdf.generatePdf(file, effectiveOptions), timeoutMs, 'generatePdf');
            attempts.push({ attempt, simplified, durationMs: Date.now() - attemptStart });
            return buffer;
        };
        try {
            try {
                return await run(1, false);
            }
            catch (e) {
                attempts.push({ attempt: 1, simplified: false, error: e.message, durationMs: Date.now() - start });
                if (/timed out/i.test(e.message)) {
                    this.logger.warn('Initial PDF generation timed out; retrying with simplified settings (no header/footer).');
                    try {
                        const buffer = await run(2, true);
                        this.logger.debug(`PDF generated on retry in ${Date.now() - start}ms total.`);
                        return buffer;
                    }
                    catch (e2) {
                        attempts.push({ attempt: 2, simplified: true, error: e2.message, durationMs: Date.now() - start });
                    }
                }
                else {
                    throw e;
                }
            }
            this.logger.warn('Falling back to plain text PDF generation via pdf-lib');
            const plain = await this.generatePlainPdf(htmlContent);
            attempts.push({ attempt: 3, simplified: true, durationMs: Date.now() - start });
            return plain;
        }
        catch (err) {
            const total = Date.now() - start;
            this.logger.error(`Failed generating PDF after ${total}ms attempts=${JSON.stringify(attempts)}`);
            throw err;
        }
    }
    async generatePlainPdf(htmlContent) {
        const doc = await pdf_lib_1.PDFDocument.create();
        const page = doc.addPage();
        const font = await doc.embedFont(pdf_lib_1.StandardFonts.Helvetica);
        const { width, height } = page.getSize();
        const maxWidth = width - 80;
        const fontSize = 10;
        const text = htmlContent
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/\s+/g, ' ')
            .trim();
        const words = text.split(' ');
        let line = '';
        let y = height - 50;
        const lines = [];
        for (const w of words) {
            const testLine = line ? line + ' ' + w : w;
            const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
            if (lineWidth > maxWidth) {
                lines.push(line);
                line = w;
            }
            else {
                line = testLine;
            }
        }
        if (line)
            lines.push(line);
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
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = PdfService_1 = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map