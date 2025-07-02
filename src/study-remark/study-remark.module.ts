import { Module } from '@nestjs/common';
import { StudyRemarkService } from './study-remark.service';
import { StudyRemarkController } from './study-remark.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [StudyRemarkController],
  providers: [StudyRemarkService, PrismaService],
})
export class StudyRemarkModule {}
