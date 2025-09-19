import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { StudyController } from './study.controller';
import { PrismaService } from '../prisma.service';
import { PdfModule } from '../pdf/pdf.module';
import { OrthancModule } from '../orthanc/orthanc.module';
import { OrthancService } from '../orthanc/orthanc.service';
import { StudyUploadService } from './study-upload.service';

@Module({
  imports: [PdfModule, OrthancModule],
  controllers: [StudyController],
  providers: [StudyService, PrismaService, StudyUploadService, OrthancService],
})
export class StudyModule {}
