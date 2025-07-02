import { Injectable } from '@nestjs/common';
import { CreateStudyAttachmentDto } from './dto/create-study-attachment.dto';
import { UpdateStudyAttachmentDto } from './dto/update-study-attachment.dto';
import { PrismaService } from '../prisma.service';
import { join } from 'path';

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
    // , studyId: number
  ) {
    console.log('File received:', file);
    if (!file) {
      throw new Error('File not provided');
    }
    const uploadPath = join(
      __dirname,
      '..',
      '..',
      'uploads',
      file.originalname,
    );

    return await this.prisma.studyAttachment.create({
      data: {
        fileName: file.originalname,
        filePath: uploadPath,
        fileType: file.mimetype,
        fileSize: file.size,
        studyId: 1,
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
}
