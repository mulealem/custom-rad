"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var StudyUploadService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyUploadService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const FormData = require("form-data");
const fs_1 = require("fs");
let StudyUploadService = StudyUploadService_1 = class StudyUploadService {
    logger = new common_1.Logger(StudyUploadService_1.name);
    getEndpoint(studyOrthancId) {
        const base = process.env.REPLY_PDF_ENDPOINT || 'http://75.119.148.56:5000/api/studies';
        return `${base}/${studyOrthancId}/reply`;
    }
    async sendPdf(studyOrthancId, filePath, originalFileName) {
        try {
            const endpoint = this.getEndpoint(studyOrthancId);
            const form = new FormData();
            form.append('file', (0, fs_1.createReadStream)(filePath), {
                filename: originalFileName,
                contentType: 'application/pdf'
            });
            this.logger.log(`Uploading PDF for study ${studyOrthancId} to ${endpoint}`);
            const res = await axios_1.default.post(endpoint, form, {
                headers: {
                    ...form.getHeaders(),
                },
                maxBodyLength: Infinity,
                maxContentLength: Infinity,
                timeout: 20000,
            });
            this.logger.log(`Upload success (status ${res.status}) for study ${studyOrthancId}`);
            return { ok: true, status: res.status, data: res.data };
        }
        catch (error) {
            this.logger.error(`Upload failed for study ${studyOrthancId}: ${error.message}`);
            return { ok: false, error: error.message };
        }
    }
};
exports.StudyUploadService = StudyUploadService;
exports.StudyUploadService = StudyUploadService = StudyUploadService_1 = __decorate([
    (0, common_1.Injectable)()
], StudyUploadService);
//# sourceMappingURL=study-upload.service.js.map