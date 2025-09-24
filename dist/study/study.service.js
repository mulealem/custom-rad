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
var StudyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const pdf_service_1 = require("../pdf/pdf.service");
const study_upload_service_1 = require("./study-upload.service");
const orthanc_service_1 = require("../orthanc/orthanc.service");
const path_1 = require("path");
const fs_1 = require("fs");
let StudyService = StudyService_1 = class StudyService {
    prisma;
    pdfService;
    studyUpload;
    orthancService;
    logger = new common_1.Logger(StudyService_1.name);
    constructor(prisma, pdfService, studyUpload, orthancService) {
        this.prisma = prisma;
        this.pdfService = pdfService;
        this.studyUpload = studyUpload;
        this.orthancService = orthancService;
    }
    create(createStudyDto) {
        return this.prisma.study.create({ data: createStudyDto });
    }
    search(query) {
        return this.prisma.study.findMany({
            where: {
                AND: [
                    query.ids ? { id: { in: query.ids } } : {},
                    query.patientIds ? { patientId: { in: query.patientIds } } : {},
                    query.institutionIds
                        ? { institutionId: { in: query.institutionIds } }
                        : {},
                    query.createdStartDate
                        ? { createdAt: { gte: new Date(query.createdStartDate) } }
                        : {},
                    query.createdEndDate
                        ? { createdAt: { lte: new Date(query.createdEndDate) } }
                        : {},
                ],
            },
            include: {
                patient: true,
                institution: true,
                assignedDoctor: true,
            },
        });
    }
    findAll() {
        return this.prisma.study.findMany({
            include: {
                patient: true,
                institution: true,
                assignedDoctor: true,
            },
        });
    }
    findOne(id) {
        return this.prisma.study.findUnique({
            where: { id },
            include: {
                patient: true,
                institution: true,
                assignedDoctor: true,
            },
        });
    }
    update(id, updateStudyDto) {
        return this.prisma.study.update({
            where: { id },
            data: updateStudyDto,
        });
    }
    assignDoctor(studyIds, doctorId) {
        return this.prisma.study.updateMany({
            where: { id: { in: studyIds } },
            data: { assignedDoctorId: doctorId ? doctorId : null },
        });
    }
    async remove(id) {
        const study = await this.prisma.study.findUnique({
            where: { id },
            include: {
                StudyAttachment: true,
                StudyRemark: true,
                StudyTag: true,
            },
        });
        if (!study)
            throw new Error('Study not found');
        let orthancId = study.parentStudyReferenceId || null;
        if (!orthancId && study.studyDIACOMReferenceObject) {
            try {
                const parsed = JSON.parse(study.studyDIACOMReferenceObject);
                orthancId = parsed?.seriesResponse?.ParentStudy || parsed?.studyResponse?.ID || null;
            }
            catch (_) {
            }
        }
        const toDeleteFs = [];
        for (const att of study.StudyAttachment) {
            if (att.filePath && att.filePath.startsWith('/uploads/')) {
                const abs = (0, path_1.join)(process.cwd(), att.filePath.replace(/^\//, ''));
                toDeleteFs.push(abs);
            }
        }
        const result = await this.prisma.$transaction(async (tx) => {
            const attachmentsDeleted = await tx.studyAttachment.deleteMany({ where: { studyId: id } });
            const remarksDeleted = await tx.studyRemark.deleteMany({ where: { studyId: id } });
            const tagsDeleted = await tx.studyTag.deleteMany({ where: { studyId: id } });
            const deletedStudy = await tx.study.delete({ where: { id } });
            return {
                deletedStudy,
                counts: {
                    attachments: attachmentsDeleted.count,
                    remarks: remarksDeleted.count,
                    tags: tagsDeleted.count,
                },
            };
        });
        for (const p of toDeleteFs) {
            try {
                if ((0, fs_1.existsSync)(p))
                    (0, fs_1.unlinkSync)(p);
            }
            catch (e) {
                this.logger.warn(`Failed removing file ${p}: ${e.message}`);
            }
        }
        let orthanc = { attempted: false };
        if (orthancId) {
            orthanc = { attempted: true, id: orthancId };
            this.orthancService
                .deleteStudy(orthancId)
                .then((res) => {
                if (!res.ok) {
                    this.logger.warn(`Orthanc study delete failed (${orthancId}): ${res.error}`);
                }
            })
                .catch((err) => this.logger.error(`Orthanc delete error (${orthancId}): ${err.message}`));
        }
        return {
            ok: true,
            studyId: id,
            db: result.counts,
            orthanc,
        };
    }
    buildReportHTML(study, options = {}) {
        if (options.bodyHtml && /<html[\s>]/i.test(options.bodyHtml)) {
            return options.bodyHtml;
        }
        const institution = study.institution || {};
        const patient = study.patient || {};
        const doctor = options.publisher || study.assignedDoctor || study.uploadedBy || {};
        console.log(doctor, options.publisher, study.assignedDoctor, study.uploadedBy);
        const logoUrl = institution.logo ? institution.logo : '';
        const institutionName = institution.title || 'Institution';
        const appName = 'Radet Teleradiology';
        const studyId = study.studyId || `STUDY-${study.id}`;
        const modality = study.modality || 'N/A';
        const status = study.status || 'N/A';
        const createdAt = new Date(study.createdAt).toLocaleString();
        const updatedAt = new Date(study.updatedAt).toLocaleString();
        const patientName = patient.name || 'N/A';
        const patientGender = patient.gender || 'N/A';
        const patientDOB = patient.dateOfBirth ? new Date(patient.dateOfBirth).toLocaleDateString() : 'N/A';
        const age = patient.dateOfBirth ? Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25 * 24 * 60 * 60 * 1000)) : 'N/A';
        const doctorName = doctor.fullName || 'Doctor';
        const reportContent = options.bodyHtml || study.content || '<p>No report content</p>';
        return `<!DOCTYPE html><html><head><meta charset="utf-8" />
    <style>
      body { font-family: Arial, sans-serif; font-size: 11pt; color:#222; }
      h1,h2,h3 { margin:0; }
      .report-container { width:100%; }
      .section { margin-top:14px; }
      .section-title { font-size:12pt; font-weight:bold; margin-bottom:4px; text-transform:uppercase; letter-spacing:0.5px; }
      table.meta { width:100%; border-collapse: collapse; font-size:10pt; }
      table.meta td { padding:4px 6px; vertical-align: top; }
      table.meta tr:nth-child(even){ background:#f7f7f7; }
      .label { font-weight:bold; white-space:nowrap; }
      .divider { border-top:1px solid #999; margin:18px 0 10px; }
      .content { line-height:1.4; }
      .signature-block { margin-top:30px; font-size:10pt; }
      .watermark { position: fixed; top: 45%; left: 20%; opacity:0.05; font-size:72pt; transform:rotate(-30deg); pointer-events:none; }
    </style></head><body>
      <div class="report-container">
        <div class="section">
          <div class="section-title">Patient Information</div>
          <table class="meta">
            <tr><td class="label">Name</td><td>${patientName}</td><td class="label">Gender</td><td>${patientGender}</td></tr>
            <tr><td class="label">Date of Birth</td><td>${patientDOB}</td><td class="label">Age</td><td>${age}</td></tr>
            <tr><td class="label">Study ID</td><td>${studyId}</td><td class="label">Modality</td><td>${modality}</td></tr>
          </table>
        </div>
        <div class="section">
          <div class="section-title">Report</div>
          <div class="content">${reportContent}</div>
        </div>
        <div class="section">
          <div class="section-title">Impression / Conclusion</div>
          <div class="content"><em>(Add impression here if separated from body)</em></div>
        </div>
        <div class="signature-block">
          <div class="divider"></div>
          <div>Signed By: <strong>${doctorName}</strong></div>
          <div>Status: ${status}</div>
          <div>Created: ${createdAt}</div>
          <div>Last Updated: ${updatedAt}</div>
        </div>
      </div>
      <div class="watermark">${institutionName}</div>
    </body></html>`;
    }
    buildHeaderTemplate(study) {
        const institution = study.institution || {};
        const institutionName = institution.title || 'Institution';
        const logoUrl = institution.logo || '';
        const studyId = study.studyId || `STUDY-${study.id}`;
        return `
      <div style="width:100%; font-family:Arial, sans-serif; font-size:10px; padding:4px 10px 0 10px; display:flex; align-items:center; border-bottom:1px solid #ccc;">
        ${logoUrl ? `<img src="${logoUrl}" style="height:28px;margin-right:8px;" />` : ''}
        <div style="flex:1;">
          <div style="font-size:11px; font-weight:bold;">${institutionName}</div>
          <div style="font-size:9px; color:#555;">Radiology Report • ${studyId}</div>
        </div>
        <div style="font-size:8px; text-align:right; color:#777;">Generated: <span class="date"></span></div>
      </div>`;
    }
    buildFooterTemplate(study) {
        return `
      <div style="width:100%; font-family:Arial, sans-serif; font-size:8px; padding:0 10px 4px 10px; display:flex; align-items:center; border-top:1px solid #ccc; color:#555;">
        <div style="flex:1;">Confidential – For clinical use only</div>
        <div style="font-size:8px;">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>
      </div>`;
    }
    async publish(id, html, publisher) {
        const study = await this.prisma.study.findUnique({
            where: { id },
            include: { patient: true, institution: true, assignedDoctor: true, uploadedBy: true },
        });
        if (!study)
            throw new Error('Study not found');
        const publisherUser = publisher ? await this.prisma.user.findUnique({ where: { id: +publisher.userId } }) : null;
        const htmlContent = this.buildReportHTML(study, { bodyHtml: html, publisher: publisherUser });
        const pdfBuffer = await this.pdfService.generatePdfFromHtml(htmlContent, {
            headerTemplate: this.buildHeaderTemplate(study),
            footerTemplate: this.buildFooterTemplate(study),
            displayHeaderFooter: true,
        });
        const uploadsDir = (0, path_1.join)(process.cwd(), 'uploads');
        if (!(0, fs_1.existsSync)(uploadsDir)) {
            (0, fs_1.mkdirSync)(uploadsDir, { recursive: true });
        }
        const fileName = `study-${id}-${Date.now()}.pdf`;
        const diskPath = (0, path_1.join)(uploadsDir, fileName);
        (0, fs_1.writeFileSync)(diskPath, pdfBuffer);
        const publicPath = `/uploads/${fileName}`;
        const attachment = await this.prisma.studyAttachment.create({
            data: {
                studyId: id,
                fileName,
                filePath: publicPath,
                fileType: 'application/pdf',
                fileSize: pdfBuffer.length,
                createdById: publisherUser?.id ?? study.uploadedById ?? null,
            },
        });
        await this.prisma.study.update({
            where: { id },
            data: { status: 'Published' },
        });
        const orthancId = study.parentStudyReferenceId || study.studyId || id;
        this.studyUpload
            .sendPdf(orthancId, diskPath, fileName)
            .then((res) => {
            if (!res.ok) {
                this.logger.warn(`External PDF upload failed for study ${id}: ${res.error}`);
            }
        })
            .catch((err) => this.logger.error(`Unexpected upload error for study ${id}: ${err.message}`));
        return { ok: true, attachmentId: attachment.id, fileName, filePath: publicPath, uploaded: true };
    }
};
exports.StudyService = StudyService;
exports.StudyService = StudyService = StudyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        pdf_service_1.PdfService,
        study_upload_service_1.StudyUploadService,
        orthanc_service_1.OrthancService])
], StudyService);
//# sourceMappingURL=study.service.js.map