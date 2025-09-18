import { Injectable } from '@nestjs/common';
import { CreateStudyAttachmentDto } from './dto/create-study-attachment.dto';
import { UpdateStudyAttachmentDto } from './dto/update-study-attachment.dto';
import { PrismaService } from '../prisma.service';
// no fs imports needed as Multer writes to disk

@Injectable()
export class StudyAttachmentService {
  constructor(private prisma: PrismaService) {}
  create(createStudyAttachmentDto: CreateStudyAttachmentDto) {
    return this.prisma.studyAttachment.create({
      data: createStudyAttachmentDto,
    });
  }

  async uploadFile(
    file: Express.Multer.File,
    studyId?: number,
    createdById?: number,
  ) {
    if (!file) {
      throw new Error('File not provided');
    }

    // With diskStorage, Multer writes file to disk and provides path/filename
    const publicPath = `/uploads/${file.filename}`;

    return await this.prisma.studyAttachment.create({
      data: {
        fileName: file.originalname,
        filePath: publicPath,
        fileType: file.mimetype,
        fileSize: file.size,
        studyId: studyId ?? 1,
        createdById: createdById ?? null,
        studyTag: null,
      },
    });
  }

  findAll() {
    return this.prisma.studyAttachment.findMany();
  }

  findOne(id: number) {
    return this.prisma.studyAttachment.findUnique({ where: { id } });
  }

  update(id: number, updateStudyAttachmentDto: UpdateStudyAttachmentDto) {
    return this.prisma.studyAttachment.update({
      where: { id },
      data: updateStudyAttachmentDto,
    });
  }

  remove(id: number) {
    return this.prisma.studyAttachment.delete({ where: { id } });
  }

  async search(filters: any) {
    const where: any = {};
    if (filters.Ids) where.id = { in: filters.Ids };
    if (filters.studyIds) where.studyId = { in: filters.studyIds };
    if (filters.studyTag)
      where.studyTag = { contains: filters.studyTag, mode: 'insensitive' };
    if (filters.createdByIds) where.createdById = { in: filters.createdByIds };
    if (filters.fileName)
      where.fileName = { contains: filters.fileName, mode: 'insensitive' };
    if (filters.fileType)
      where.fileType = { contains: filters.fileType, mode: 'insensitive' };
    if (filters.createdAtStart || filters.createdAtEnd) {
      where.createdAt = {};
      if (filters.createdAtStart) where.createdAt.gte = new Date(filters.createdAtStart);
      if (filters.createdAtEnd) where.createdAt.lte = new Date(filters.createdAtEnd);
    }
    const take = filters?.take ? Number(filters.take) : undefined;
    const skip = filters?.skip ? Number(filters.skip) : undefined;
    const orderBy = filters?.orderBy && filters?.order ? { [filters.orderBy]: filters.order } : undefined;
    return this.prisma.studyAttachment.findMany({
      where,
      take,
      skip,
      orderBy,
      include: { createdBy: { select: { id: true, fullName: true } } },
    });
  }
}
