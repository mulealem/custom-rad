import { Module } from '@nestjs/common';
import { StudyAttachmentService } from './study-attachment.service';
import { StudyAttachmentController } from './study-attachment.controller';
import { PrismaService } from '../prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MulterModule.register({
      // storage: diskStorage({
      //   destination: './uploadds',
      //   filename: (req, file, callback) => {
      //     const uniqueSuffix =
      //       Date.now() + '-' + Math.round(Math.random() * 1e9);
      //     callback(null, uniqueSuffix + extname(file.originalname));
      //   },
      // }),
      fileFilter: (req, file, callback) => {
        const allowedTypes = [
          'image/jpeg',
          'image/png',
          'application/pdf',
          'application/zip',
        ];
        if (allowedTypes.includes(file.mimetype)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
      limits: {
        fileSize: 5005 * 1024 * 1024, // 5 GB limit
      },
    }),
  ],
  controllers: [StudyAttachmentController],
  providers: [StudyAttachmentService, PrismaService],
})
export class StudyAttachmentModule {}
