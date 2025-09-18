import { Injectable } from '@nestjs/common';
import { CreateStudyDto } from './dto/create-study.dto';
import { UpdateStudyDto } from './dto/update-study.dto';
import { PrismaService } from '../prisma.service';
import { PdfService } from '../pdf/pdf.service';
import { join } from 'path';
import { existsSync, mkdirSync, writeFileSync } from 'fs';

@Injectable()
export class StudyService {
  constructor(private prisma: PrismaService, private pdfService: PdfService) {}
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

  async publish(id: number, html?: string) {
    // Generate PDF from provided HTML (or from study content as fallback)
    const study = await this.prisma.study.findUnique({ where: { id } });
    if (!study) throw new Error('Study not found');
    const htmlContent = html || study.content || '<html><body><p>No content</p></body></html>';

    const pdfBuffer = await this.pdfService.generatePdfFromHtml(htmlContent);

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

    return { ok: true, attachmentId: attachment.id, fileName, filePath: publicPath };
  }
}
