import { Injectable, Logger } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from '../prisma.service';
import { PdfService } from '../pdf/pdf.service';
import { StudyUploadService } from './study-upload.service';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class StudyService {
  private readonly logger = new Logger(StudyService.name);
  constructor(
    private prisma: PrismaService,
    private pdfService: PdfService,
    private studyUpload: StudyUploadService,
  ) {}
  create(createStudyDto: CreateStudyDto) {
    return this.prisma.study.create({ data: createStudyDto });
  }

  search(query: any) {
    // query can include ids, patientIds, institutionIds, name, description, createdStartDate, createdEndDate
    // Example query: { ids: [1, 2, 3], patientIds: [4, 5], institutionIds: [6], name: 'Study Name', description: 'Study Description' }

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

  findOne(id: number) {
    return this.prisma.study.findUnique({
      where: { id },
      include: {
        patient: true,
        institution: true,
        assignedDoctor: true,
      },
    });
  }

  update(id: number, updateStudyDto: UpdateStudyDto) {
    return this.prisma.study.update({
      where: { id },
      data: updateStudyDto,
    });
  }

  assignDoctor(studyIds: number[], doctorId: number) {
    return this.prisma.study.updateMany({
      where: { id: { in: studyIds } },
      data: { assignedDoctorId: doctorId ? doctorId : null },
    });
  }

  remove(id: number) {
    return this.prisma.study.delete({ where: { id } });
  }

  private buildReportHTML(study: any, options: { bodyHtml?: string } = {}) {
    // If caller passed a complete HTML document, trust it (legacy behavior)
    if (options.bodyHtml && /<html[\s>]/i.test(options.bodyHtml)) {
      return options.bodyHtml;
    }

    const institution = study.institution || {};
    const patient = study.patient || {};
    const doctor = study.assignedDoctor || study.uploadedBy || {};

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
  const age = patient.dateOfBirth ? Math.floor((Date.now() - new Date(patient.dateOfBirth).getTime()) / (365.25*24*60*60*1000)) : 'N/A';
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

  private buildHeaderTemplate(study: any) {
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

  private buildFooterTemplate(study: any) {
    return `
      <div style="width:100%; font-family:Arial, sans-serif; font-size:8px; padding:0 10px 4px 10px; display:flex; align-items:center; border-top:1px solid #ccc; color:#555;">
        <div style="flex:1;">Confidential – For clinical use only</div>
        <div style="font-size:8px;">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>
      </div>`;
  }

  async publish(id: number, html?: string) {
    const study = await this.prisma.study.findUnique({
      where: { id },
      include: { patient: true, institution: true, assignedDoctor: true, uploadedBy: true },
    });
    if (!study) throw new Error('Study not found');
  const htmlContent = this.buildReportHTML(study, { bodyHtml: html });

    const pdfBuffer = await this.pdfService.generatePdfFromHtml(htmlContent, {
      headerTemplate: this.buildHeaderTemplate(study),
      footerTemplate: this.buildFooterTemplate(study),
      displayHeaderFooter: true,
    });

  const uploadsDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadsDir)) {
      mkdirSync(uploadsDir, { recursive: true });
    }
  const fileName = `study-${id}-${Date.now()}.pdf`;
  const diskPath = join(uploadsDir, fileName);
  writeFileSync(diskPath, pdfBuffer);
  const publicPath = `/uploads/${fileName}`;

    // Save as attachment and mark study as published
    const attachment = await this.prisma.studyAttachment.create({
      data: {
        studyId: id,
        fileName,
        filePath: publicPath,
        fileType: 'application/pdf',
        fileSize: pdfBuffer.length,
        createdById: study.uploadedById ?? null,
      },
    });

    await this.prisma.study.update({
      where: { id },
      data: { status: 'Published' },
    });
    // Attempt external upload (non-blocking for response if fails)
  // External identifier preference: parentStudyReferenceId > studyId > numeric id
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
}
