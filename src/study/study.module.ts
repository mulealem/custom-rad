import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { PrismaService } from '../prisma.service';
import { PdfModule } from '../pdf/pdf.module';
import { StudyUploadService } from './study-upload.service';

@Module({
  imports: [PdfModule],
  controllers: [StudyController],
  providers: [StudyService, PrismaService, StudyUploadService],
})
export class StudyModule {}
