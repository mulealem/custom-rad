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
    async generatePdfFromHtml(htmlContent) {
        const start = Date.now();
        try {
            const file = { content: htmlContent };
            const buffer = await this.withTimeout(html_to_pdf.generatePdf(file, {
                format: 'A4',
                margin: { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' },
                printBackground: true,
            }), 30000, 'generatePdf');
            this.logger.debug(`PDF generated in ${Date.now() - start}ms (${(buffer.length / 1024).toFixed(1)} KB)`);
            return buffer;
        }
        catch (err) {
            const error = err;
            this.logger.error(`Failed generating PDF: ${error.message}`);
            throw err;
        }
    }
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = PdfService_1 = __decorate([
    (0, common_1.Injectable)()
], PdfService);
//# sourceMappingURL=pdf.service.js.map