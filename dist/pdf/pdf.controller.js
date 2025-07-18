"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfController = void 0;
const common_1 = require("@nestjs/common");
const pdf_service_1 = require("./pdf.service");
let PdfController = class PdfController {
    pdfService;
    constructor(pdfService) {
        this.pdfService = pdfService;
    }
    async generatePdfFromHtml(htmlContent, res) {
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
        }
        catch (err) {
            console.error('Error generating PDF:', err);
            res.status(500).send('Error generating PDF');
        }
    }
};
exports.PdfController = PdfController;
__decorate([
    (0, common_1.Post)('generate-from-html'),
    __param(0, (0, common_1.Body)('html')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PdfController.prototype, "generatePdfFromHtml", null);
exports.PdfController = PdfController = __decorate([
    (0, common_1.Controller)('pdf'),
    __metadata("design:paramtypes", [pdf_service_1.PdfService])
], PdfController);
//# sourceMappingURL=pdf.controller.js.map