import { Module } from '@nestjs/common';
import { OrthancService } from './orthanc.service';
import { OrthancController } from './orthanc.controller';
import { PrismaService } from '../prisma.service';

import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
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
  controllers: [OrthancController],
  providers: [OrthancService, PrismaService],
})
export class OrthancModule {}
